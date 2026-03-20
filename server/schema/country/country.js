const { mysqlTable, int, varchar, char, mysqlEnum } = require('drizzle-orm/mysql-core')

const wl_countries = mysqlTable('wl_countries', {
    id: int('id')
        .primaryKey()
        .autoincrement(),

    country_name: varchar('country_name', { length: 64 })
        .notNull(),

    country_temp_name: varchar('country_temp_name', { length: 250 })
        .notNull(),

    country_iso_code_2: char('country_iso_code_2', { length: 2 })
        .default(null),

    country_iso_code_3: char('country_iso_code_3', { length: 3 })
        .default(null),

    country_flag: varchar('country_flag', { length: 250 })
        .default(null),

    address_format_id: int('address_format_id')
        .notNull()
        .default(0),

    is_feature: char('is_feature', { length: 1 })
        .notNull()
        .default('0'),

    premimum_ads_avl: mysqlEnum('premimum_ads_avl', ['0', '1'])
        .notNull()
        .default('1'),

    status: char('status', { length: 1 })
        .notNull()
        .default('1'),

    cont_currency: varchar('cont_currency', { length: 20 })
        .default(null),

    TimeZone: varchar('TimeZone', { length: 32 })
        .notNull(),

    UTC_offset: varchar('UTC_offset', { length: 8 })
        .notNull(),

    created_by: int('created_by')
        .notNull()
        .default(1),
})

module.exports  = {wl_countries}