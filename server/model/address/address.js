const { db } = require("../../config/db")
const { addresses, temp_addresses } = require("../../schema/address/address")
const { eq } = require("drizzle-orm")

const AddressModel = {

    async getAll(customer_id) {
        return await db
            .select()
            .from(addresses)
            .where(eq(addresses.customer_id, customer_id))
    },

    async add(data) {
        return await db.insert(addresses).values(data)
    },

    async update(address_id, data) {
        return await db
            .update(addresses)
            .set(data)
            .where(eq(addresses.address_id, address_id))
    },

    async delete(address_id) {
        return await db
            .delete(addresses)
            .where(eq(addresses.address_id, address_id))
    },

    async getDefault(customer_id) {
        const data = await db
            .select()
            .from(addresses)
            .where(eq(addresses.customer_id, customer_id))

        return data.find(a => a.default_status === "Y")
    },

    async getTemp(user_id) {
        return await db
            .select()
            .from(temp_addresses)
            .where(eq(temp_addresses.user_id, user_id))
    },

    async addTemp(data) {
        return await db.insert(temp_addresses).values(data)
    },

    async updateTemp(user_id, data) {
        return await db
            .update(temp_addresses)
            .set(data)
            .where(eq(temp_addresses.user_id, user_id))
    },

    async deleteTemp(user_id) {
        return await db
            .delete(temp_addresses)
            .where(eq(temp_addresses.user_id, user_id))
    },

    async getById(address_id) {
        return await db
            .select()
            .from(addresses)
            .where(eq(addresses.address_id, address_id))
    },
}

module.exports = { AddressModel }