const { db } = require('../../config/db')
const { eq } = require('drizzle-orm')
const { wl_states } = require('../../schema/location/state')

const stateModel = {

    getAll: async () => {
        return await db
            .select()
            .from(wl_states)
            .where(eq(wl_states.status, '1'))
    },

    getByCountryId: async (country_id) => {
        return await db
            .select()
            .from(wl_states)
            .where(eq(wl_states.country_id, country_id))
    },

    getById: async (id) => {
        const result = await db
            .select()
            .from(wl_states)
            .where(eq(wl_states.id, id))
            .limit(1)

        return result[0] || null
    },

    create: async (data) => {
        return await db.insert(wl_states).values(data)
    },

    update: async (id, data) => {
        return await db
            .update(wl_states)
            .set(data)
            .where(eq(wl_states.id, id))
    },

    delete: async (id) => {
        return await db
            .update(wl_states)
            .set({ status: '0' })
            .where(eq(wl_states.id, id))
    }
}

module.exports = stateModel