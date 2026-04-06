const { CartModel } = require("../../model/cart/cart")

const CartController = {

    async addToCart(req, res) {
        try {
            const user = req.user

            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: "Login required"
                })
            }

            const body = req.body

            const existing = await CartModel.checkExisting(body.pid, user.id)

            if (existing) {
                await CartModel.updateQty(existing.id, existing.qty + body.qty)
                return res.json({ success: true, message: "Cart updated" })
            }

            await CartModel.addToCart({
                ...body,
                user_id: user.id,
                add_date: new Date()
            })

            res.json({ success: true, message: "Added to cart" })

        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Error adding to cart",
                error: error.message
            })
        }
    },

    async updateQuantity(req, res) {
        try {
            const { id, action } = req.body
    
            if (!id || !["inc", "dec"].includes(action)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid request"
                })
            }
    
            const result = await CartModel.updateCartQty(id, action)
    
            if (result.removed) {
                return res.json({
                    success: true,
                    message: "Item removed from cart"
                })
            }
    
            res.json({
                success: true,
                message: "Quantity updated",
                qty: result.qty
            })
    
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Error updating quantity",
                error: error.message
            })
        }
    },

    async getCart(req, res) {
        try {
            const user = req.user

            if (!user) {
                return res.status(401).json({ message: "Login required" })
            }

            const data = await CartModel.getCart(user.id)

            res.json({ success: true, data })

        } catch (error) {
            res.status(500).json({
                message: "Error fetching cart",
                error: error.message
            })
        }
    },

    async updateQty(req, res) {
        try {
            const { id, qty } = req.body

            await CartModel.updateQty(id, qty)

            res.json({ success: true, message: "Quantity updated" })

        } catch (error) {
            res.status(500).json({
                message: "Error updating cart",
                error: error.message
            })
        }
    },

    async removeItem(req, res) {
        try {
            const { id } = req.params

            await CartModel.removeItem(id)

            res.json({ success: true, message: "Item removed" })

        } catch (error) {
            res.status(500).json({
                message: "Error removing item",
                error: error.message
            })
        }
    }
}

module.exports = { CartController }