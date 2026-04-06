const express = require("express")
const router = express.Router()

const { AddressController } = require("../../controllers/address/address")
const { authMiddleware } = require("../../middleware/authMiddleware")

router.get("/", authMiddleware, AddressController.getAll)
router.post("/add", authMiddleware, AddressController.add)
router.put("/update/:id", authMiddleware, AddressController.update)
router.delete("/delete/:id", authMiddleware, AddressController.delete)
router.get("/default", authMiddleware, AddressController.getDefault)

router.get("/temp", authMiddleware, AddressController.getTemp)
router.post("/temp", AddressController.addOrUpdateTemp)

module.exports = router