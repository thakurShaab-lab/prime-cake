const { db } = require('../../config/db')
const { eq } = require('drizzle-orm')
const { wl_cities } = require('../../schema/location/city')

const cityModel = {

    getAll: async () => {
        return await db
            .select()
            .from(wl_cities)
            .where(eq(wl_cities.status, '1'))
    },

    getByStateId: async (state_id) => {
        return await db
            .select()
            .from(wl_cities)
            .where(eq(wl_cities.state_id, state_id))
    },

    getByCountryId: async (country_id) => {
        return await db
            .select()
            .from(wl_cities)
            .where(eq(wl_cities.country_id, country_id))
    },

    getById: async (id) => {
        const result = await db
            .select()
            .from(wl_cities)
            .where(eq(wl_cities.id, id))
            .limit(1)

        return result[0] || null
    },

    create: async (data) => {
        return await db.insert(wl_cities).values(data)
    },

    update: async (id, data) => {
        return await db
            .update(wl_cities)
            .set(data)
            .where(eq(wl_cities.id, id))
    },

    delete: async (id) => {
        return await db
            .update(wl_cities)
            .set({ status: '0' })
            .where(eq(wl_cities.id, id))
    }
}

module.exports = cityModel