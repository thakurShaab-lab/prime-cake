const express = require("express")
const router = express.Router()
const { ShippingController } = require("../../controllers/shipping//shipping")
const { authMiddleware } = require("../../middleware/authMiddleware")

router.get("/", ShippingController.getAll)
router.get("/default", ShippingController.getDefault)
router.post("/applyshipping", authMiddleware, ShippingController.applyShipping)
router.get("/get/applyshipping", authMiddleware, ShippingController.getShipping)

module.exports = router