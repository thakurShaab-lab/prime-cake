const db = require("../../config/db")
const { orders, orders_products } = require("../../schema/order/order")

const OrderModel = {
    createOrder: async (data) => {
        return await db.insert(orders).values(data)
    },

    addOrderItems: async (items) => {
        return await db.insert(orders_products).values(items)
    }
}

module.exports = {
    OrderModel
}