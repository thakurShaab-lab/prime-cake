const express = require("express")
const router = express.Router()

const { placeOrder } = require("../../controllers/order/order")
const { authMiddleware } = require("../../middleware/authMiddleware")

router.post("/place-order", authMiddleware, placeOrder)

module.exports = router