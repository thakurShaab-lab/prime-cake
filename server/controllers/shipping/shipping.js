const { ShippingModel } = require("../../model/shipping/shipping")

const ShippingController = {

    async getAll(req, res) {
        try {
            const data = await ShippingModel.getAll()
            res.json({ success: true, data })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Error fetching shipping",
                error: error.message
            })
        }
    },

    async getDefault(req, res) {
        try {
            const data = await ShippingModel.getDefault()
            res.json({ success: true, data })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Error fetching default shipping",
                error: error.message
            })
        }
    },

    async applyShipping(req, res) {
        try {
            const user = req.user

            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: "Login required"
                })
            }

            const { shipping_id, shipment_rate, shipping_type } = req.body

            if (!shipping_id || shipment_rate == null || !shipping_type) {
                return res.status(400).json({
                    success: false,
                    message: "Missing shipping data"
                })
            }

            const existing = await ShippingModel.getUserShipping(user.id)


            if (existing) {
                await ShippingModel.updateShipping(user.id, {
                    shipping_id,
                    shipment_rate,
                    shipping_type
                })

                return res.json({
                    success: true,
                    message: "Shipping updated"
                })
            }

            await ShippingModel.applyShipping({
                shipping_id,
                shipment_rate,
                shipping_type,
                user_id: user.id,
                app_id: user.appId,
                app_type: "web"
            })

            return res.json({
                success: true,
                message: "Shipping applied"
            })

        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Error applying shipping",
                error: error.message
            })
        }
    },

    async getShipping(req, res) {
        try {
            const user = req.user
    
            console.log("USER:", user)
    
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: "Login required"
                })
            }
    
            const data = await ShippingModel.getUserShipping(user.userId)
    
            res.json({
                success: true,
                data
            })
    
        } catch (error) {
            console.error("GET SHIPPING ERROR:", error)
    
            res.status(500).json({
                success: false,
                message: "Error fetching shipping",
                error: error.message
            })
        }
    }
}

module.exports = { ShippingController }