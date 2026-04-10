"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getTempAddressAPI } from "@/services/addressService"
import { getCartAPI } from "@/services/cartService"
import { placeOrderAPI } from "@/services/orderService"

export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState("COD")
  const router = useRouter()
  const [address, setAddress] = useState(null)
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const addrRes = await getTempAddressAPI()
    const cartRes = await getCartAPI()

    const addrData = addrRes.data?.data || addrRes.data || []
    if (addrData.length > 0) setAddress(addrData[0])

    setCartItems(cartRes.data.data || [])
  }

  const handlePlaceOrder = async () => {
    try {
      const res = await placeOrderAPI({
        payment_method: paymentMethod
      })

      if (res.success) {
        router.push(`/order-success?order_id=${res.order_id}`)
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">

      <h1 className="text-2xl font-bold mb-4">Payment</h1>

      {/* Address */}
      {address && (
        <div className="border p-4 mb-4">
          <h2 className="font-bold">Deliver To:</h2>
          <p>{address.first_name} {address.last_name}</p>
          <p>{address.address}, {address.city}</p>
        </div>
      )}

      {/* Payment Options */}
      <div className="border p-4 mb-4">
        <h2 className="font-bold mb-2">Select Payment Method</h2>

        <label className="block">
          <input
            type="radio"
            name="payment"
            value="COD"
            checked={paymentMethod === "COD"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Cash on Delivery
        </label>

        <label className="block">
          <input
            type="radio"
            name="payment"
            value="RAZORPAY"
            checked={paymentMethod === "RAZORPAY"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Razorpay
        </label>
      </div>

      <button
        onClick={handlePlaceOrder}
        className="bg-green-600 text-white px-6 py-2 rounded cursor-pointer"
      >
        Place Order
      </button>

    </div>
  )
}