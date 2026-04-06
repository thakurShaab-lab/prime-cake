const { db } = require("../../config/db")
const { shipping, applyShipping } = require("../../schema/shipping/shipping")
const { eq } = require("drizzle-orm")

const ShippingModel = {

    async getAll() {
        return await db
            .select()
            .from(shipping)
            .where(eq(shipping.status, "1"))
    },

    async getDefault() {
        const data = await db
            .select()
            .from(shipping)
            .where(eq(shipping.is_default, "1"))

        return data[0]
    },

    async applyShipping(data) {
        return await db.insert(applyShipping).values(data)
    },

    async getUserShipping(user_id) {
        const data = await db
            .select()
            .from(applyShipping)
            .where(eq(applyShipping.user_id, user_id))

        return data[0]
    },

    async updateShipping(user_id, data) {
        return await db
            .update(applyShipping)
            .set(data)
            .where(eq(applyShipping.user_id, user_id))
    },

    async checkExisting(user_id) {
        const data = await db
            .select()
            .from(applyShipping)
            .where(eq(applyShipping.user_id, user_id))

        return data[0]
    }

}

module.exports = { ShippingModel }