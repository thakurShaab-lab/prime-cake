const {db} = require("../../config/db")
const { eq } = require("drizzle-orm")

const { temp_addresses } = require("../../schema/address/address")
const { cart } = require("../../schema/cart/cart")

const {OrderModel } = require("../../model/order/OrderModel")

const placeOrder = async (req, res) => {
  try {
    const user = req.user

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Login required"
      })
    }

    const tempAddr = await db
      .select()
      .from(temp_addresses)
      .where(eq(temp_addresses.user_id, user.customer_id))

    if (tempAddr.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No delivery address found"
      })
    }

    const addr = tempAddr[0]

    const cartItems = await db
      .select()
      .from(cart)
      .where(eq(cart.user_id, user.customer_id))

    if (cartItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty"
      })
    }

    let subTotal = 0

    cartItems.forEach(item => {
      subTotal += Number(item.price) * Number(item.qty)
    })

    const vat = subTotal * 0.10
    const shipping = 0
    const grandTotal = subTotal + vat + shipping

    const orderData = {
      customers_id: user.customer_id,
      invoice_number: "INV-" + Date.now(),

      first_name: addr.first_name,
      last_name: addr.last_name,
      mobile_number: addr.mobile,
      email: addr.email,

      shipping_name: addr.first_name + " " + addr.last_name,
      shipping_address: addr.address,
      shipping_mobile: addr.mobile,
      shipping_zipcode: addr.zipcode,
      shipping_city: addr.city,
      shipping_state: addr.state,
      shipping_country: addr.country,
      shipping_landmark: addr.landmark,

      shipping_method: "Standard",

      cod_amount: grandTotal,
      total_amount: grandTotal,
      vat_amount: vat,

      currency_code: "AED",
      currency_symbol: "AED",
      currency_value: 1,

      payment_method: "COD",
      payment_status: "Unpaid",

      courier_company_name: "NA",
      bill_number: "NA",

      order_received_date: new Date()
    }

    let orderId

    await db.transaction(async (tx) => {

      const result = await tx.insert(orders).values(orderData)
      orderId = result[0].insertId

      const orderItems = cartItems.map(item => ({
        orders_id: orderId,
        products_id: item.product_id,

        product_name: item.name,
        product_code: item.code,
        product_price: item.price,

        quantity: item.qty,

        product_image: item.image || "",

        product_brand: item.brand || null,
        product_color: item.color || null,
        product_size: item.size || null,
        product_tax: 0,
        gst_percentage: 0,
        shipping_charge: 0,

        is_return: "0",
        item_return: 1,
        item_cancel: 1,
        is_cancel: 0,
        product_order_status: "Pending",

        reason: "",
        reason_comment: ""
      }))

      await tx.insert(orders_products).values(orderItems)

      await tx.delete(cart).where(eq(cart.user_id, user.customer_id))
    })

    return res.json({
      success: true,
      message: "Order placed successfully",
      order_id: orderId
    })

  } catch (err) {
    console.error("ORDER ERROR:", err)

    return res.status(500).json({
      success: false,
      message: err.message
    })
  }
}
module.exports = {
  placeOrder
}