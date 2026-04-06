const express = require("express")
const router = express.Router()

const { ProductController } = require("../../controllers/product/product")

router.get("/products", ProductController.getAll);
router.get("/products/:id", ProductController.getById);
router.get("/getFiltered", ProductController.getBySection)

module.exports = router