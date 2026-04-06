const { mysqlTable, int, varchar, decimal, datetime, mysqlEnum } = require("drizzle-orm/mysql-core")

const shipping = mysqlTable("wl_shipping", {

    shipping_id: int("shipping_id")
        .primaryKey()
        .autoincrement(),

    is_default: mysqlEnum("is_default", ["0", "1"])
        .notNull()
        .default("0"),

    shipping_type: varchar("shipping_type", { length: 50 })
        .notNull(),

    shipment_rate: decimal("shipment_rate", { precision: 10, scale: 2 })
        .notNull()
        .default("0.00"),

    status: mysqlEnum("status", ["1", "0", "2"])
        .notNull()
        .default("1"),

    added_date: datetime("added_date")
        .notNull(),

})

const applyShipping = mysqlTable('tbl_temp_shipping', {
    ship_id: int('ship_id').primaryKey().autoincrement(),
    shipping_id: int('shipping_id'),
    shipment_rate: decimal('shipment_rate', { precision: 10, scale: 2 }),
    shipping_type: varchar('shipping_type', { length: 100 }),
    app_id: varchar('app_id', { length: 255 }),
    app_type: varchar('app_type', { length: 10 }),
    language_id: int('language_id'),
    user_id: int('user_id'),
})

module.exports = { shipping, applyShipping }