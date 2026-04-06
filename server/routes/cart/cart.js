const express = require("express")
const router = express.Router()

const { CartController } = require("../../controllers/cart/cart")
const { authMiddleware } = require("../../middleware/authMiddleware")

router.post("/add", authMiddleware, CartController.addToCart)
router.put("/quantity", authMiddleware, CartController.updateQuantity)
router.get("/", authMiddleware, CartController.getCart)
router.put("/update", authMiddleware, CartController.updateQty)
router.delete("/:id", authMiddleware, CartController.removeItem)

module.exports = router