const { db } = require('../../config/db')
const { eq } = require('drizzle-orm')
const { wl_countries } = require('../../schema/country/country')

const countryModel = {

    getAll: async () => {
        return await db
            .select()
            .from(wl_countries)
            .where(eq(wl_countries.status, '1'))
    },

    getById: async (id) => {
        const result = await db
            .select()
            .from(wl_countries)
            .where(eq(wl_countries.id, id))
            .limit(1)

        return result[0] || null
    },

    getByStateId: async (state_id) => {
        const result = await db
            .select({
                country_id: wl_countries.id,
                country_name: wl_countries.country_name
            })
            .from(wl_states)
            .innerJoin(
                wl_countries,
                eq(wl_states.country_id, wl_countries.id)
            )
            .where(eq(wl_states.id, state_id))
            .limit(1)

        return result[0] || null
    },

    create: async (data) => {
        return await db.insert(wl_countries).values(data)
    },

    update: async (id, data) => {
        return await db
            .update(wl_countries)
            .set(data)
            .where(eq(wl_countries.id, id))
    },

    delete: async (id) => {
        return await db
            .update(wl_countries)
            .set({ status: '0' })
            .where(eq(wl_countries.id, id))
    }
}

module.exports = countryModel