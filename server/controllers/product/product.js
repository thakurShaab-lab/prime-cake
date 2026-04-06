const { ProductModel } = require("../../model/products/product")

const ProductController = {
  async getAll(req, res) {
    try {
      const data = await ProductModel.getAllProducts()
      res.json({ success: true, data })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      })
    }
  },

  async getById(req, res) {
    try {
      const id = Number(req.params.id)

      const data = await ProductModel.getProductById(id)

      if (!data.length) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        })
      }

      res.json({ success: true, data: data[0] })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      })
    }
  },

  async getBySection(req, res) {
    try {
        const { section } = req.query;

        console.log(section)
    
        if (!section) {
          return res.status(400).json({ message: "Section query parameter is required" });
        }
    
        const products = await ProductModel.getProductsBySection(section);
    
        res.json({ products });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching products", error: error.message });
      }
  },
}

module.exports = { ProductController }