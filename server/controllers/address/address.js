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
    }
}

module.exports = { AddressController }