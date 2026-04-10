const { db } = require('../../config/db')
const { eq } = require('drizzle-orm')
const { wl_states } = require('../../schema/states/states')

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
}

module.exports = stateModel