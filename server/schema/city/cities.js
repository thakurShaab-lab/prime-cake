const { mysqlTable, int, varchar, char, datetime, mysqlEnum } = require('drizzle-orm/mysql-core')

const wl_cities = mysqlTable('wl_cities', {
    id: int('id')
        .primaryKey()
        .autoincrement(),

    city_group_id: varchar('city_group_id', { length: 200 })
        .default(null),

    state_id: int('state_id')
        .notNull(),

    country_id: int('country_id')
        .notNull()
        .default(0),

    title: varchar('title', { length: 100 })
        .notNull(),

    temp_title: varchar('temp_title', { length: 100 })
        .notNull(),

    premimum_ads_avl: mysqlEnum('premimum_ads_avl', ['0', '1'])
        .notNull()
        .default('0'),

    created_at: datetime('created_at')
        .notNull()
        .default(new Date('0000-00-00 00:00:00')),

    is_city_popular: mysqlEnum('is_city_popular', ['0', '1'])
        .notNull()
        .default('0'),

    is_othercity_popular: char('is_othercity_popular', { length: 1 })
        .notNull()
        .default('0'),

    created_by: int('created_by')
        .notNull()
        .default(1),

    status: char('status', { length: 1 })
        .notNull()
        .default('1'),
})

module.exports  = {wl_cities}