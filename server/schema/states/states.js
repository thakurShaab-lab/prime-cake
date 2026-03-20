const { mysqlTable, int, varchar, char, datetime, mysqlEnum } = require('drizzle-orm/mysql-core')

const wl_states = mysqlTable('wl_states', {
    id: int('id')
        .primaryKey()
        .autoincrement(),

    country_id: int('country_id')
        .notNull(),

    title: varchar('title', { length: 100 })
        .notNull(),

    temp_title: varchar('temp_title', { length: 250 })
        .notNull(),

    created_at: datetime('created_at')
        .notNull()
        .default(new Date('0000-00-00 00:00:00')),

    is_state_popular: mysqlEnum('is_state_popular', ['0', '1'])
        .notNull()
        .default('0'),

    created_by: int('created_by')
        .notNull()
        .default(1),

    status: char('status', { length: 1 })
        .notNull()
        .default('1'),
})

module.exports  = {wl_states}