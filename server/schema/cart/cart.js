const { mysqlTable, int, varchar, float, date, } = require('drizzle-orm/mysql-core')

const wl_cart = mysqlTable('wl_cart', {

    id: int('id')
        .primaryKey()
        .autoincrement(),

    pid: int('pid'),

    qty: int('qty'),

    availableqty: int('availableqty'),

    price: float('price', { precision: 10, scale: 2 }),

    actual_price: float('actual_price', { precision: 10, scale: 2 }),

    discount_price: float('discount_price', { precision: 10, scale: 2 }),

    tax: float('tax', { precision: 10, scale: 2 })
        .default(0.00),

    name: varchar('name', { length: 150 }),

    origname: varchar('origname', { length: 250 }),

    img: varchar('img', { length: 120 }),

    img2: varchar('img2', { length: 120 }),

    code: varchar('code', { length: 120 }),

    color_id: int('color_id'),

    color_name: varchar('color_name', { length: 100 }),

    size_id: int('size_id'),

    size_name: varchar('size_name', { length: 100 }),

    brand_id: int('brand_id'),

    brand_name: varchar('brand_name', { length: 80 }),

    color_code: varchar('color_code', { length: 250 }),

    category_id: int('category_id'),

    user_id: int('user_id'),

    add_date: date('add_date')
        .notNull()
        .default('0000-00-00'),

})

module.exports = { wl_cart }