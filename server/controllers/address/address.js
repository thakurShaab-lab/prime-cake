const { AddressModel } = require("../../model/address/address")

const AddressController = {

    async getAll(req, res) {
        try {
            const user = req.user

            if (!user) {
                return res.status(401).json({ success: false, message: "Login required" })
            }

            const data = await AddressModel.getAll(user.id)

            res.json({ success: true, data })

        } catch (err) {
            res.status(500).json({ success: false, message: err.message })
        }
    },

    async add(req, res) {
        try {
            const user = req.user

            if (!user) {
                return res.status(401).json({ success: false, message: "Login required" })
            }

            const body = req.body

            await AddressModel.add({
                ...body,
                customer_id: user.id,
                reciv_date: new Date(),
            })

            res.json({ success: true, message: "Address added" })

        } catch (err) {
            res.status(500).json({ success: false, message: err.message })
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params

            await AddressModel.update(id, req.body)

            res.json({ success: true, message: "Address updated" })

        } catch (err) {
            res.status(500).json({ success: false, message: err.message })
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params

            await AddressModel.delete(id)

            res.json({ success: true, message: "Address deleted" })

        } catch (err) {
            res.status(500).json({ success: false, message: err.message })
        }
    },

    async getDefault(req, res) {
        try {
            const user = req.user

            const data = await AddressModel.getDefault(user.id)

            res.json({ success: true, data })

        } catch (err) {
            res.status(500).json({ success: false, message: err.message })
        }
    },

    async getTemp(req, res) {
        try {
            const user = req.user

            const data = await AddressModel.getTemp(user.id)

            res.json({ success: true, data })

        } catch (err) {
            res.status(500).json({ success: false, message: err.message })
        }
    },

    async addOrUpdateTemp(req, res) {
        try {
            const user = req.user

            console.log("USER:", req.user)

            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: "Login required"
                })
            }

            const existing = await AddressModel.getTemp(user.id)

            if (existing.length > 0) {
                await AddressModel.updateTemp(user.id, req.body)
                return res.json({ success: true, message: "Temp address updated" })
            }

            await AddressModel.addTemp({
                ...req.body,
                user_id: user.id,
                reciv_date: new Date()
            })

            res.json({ success: true, message: "Temp address added" })

        } catch (err) {
            res.status(500).json({ success: false, message: err.message })
        }
    },

    async selectAddressForOrder(req, res) {
    try {
        const user = req.user
        const { address_id } = req.body

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Login required"
            })
        }

        const data = await AddressModel.getById(address_id)

        if (!data || data.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Address not found"
            })
        }

        const addr = data[0]

        const payload = {
            user_id: user.id,
            first_name: addr.first_name,
            last_name: addr.last_name,
            mobile: addr.mobile,
            email: addr.email,
            address: addr.address,
            zipcode: addr.zipcode,
            landmark: addr.landmark,
            city: addr.city,
            state: addr.state,
            country: addr.country,
            address_type: addr.address_type,
            reciv_date: new Date()
        }

        const existing = await AddressModel.getTemp(user.id)

        if (existing.length > 0) {
            await AddressModel.updateTemp(user.id, payload)

            return res.json({
                success: true,
                message: "Temp address updated"
            })
        }

        await AddressModel.addTemp(payload)

        res.json({
            success: true,
            message: "Temp address added"
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
}

module.exports = { AddressController }