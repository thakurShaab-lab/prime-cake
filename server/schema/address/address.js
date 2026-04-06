const { mysqlTable, serial, int, varchar, datetime, mysqlEnum, text } = require('drizzle-orm/mysql-core')

const addresses = mysqlTable('wl_customers_address', {
  address_id: serial('address_id').primaryKey(),
  customer_id: int('customer_id').notNull(),
  first_name: varchar('first_name', { length: 40 }),
  last_name: varchar('last_name', { length: 40 }),
  name: varchar('name', { length: 32 }),
  address: varchar('address', { length: 200 }),
  mobile: varchar('mobile', { length: 25 }),
  zipcode: varchar('zipcode', { length: 25 }),
  phone: varchar('phone', { length: 25 }),
  fax: varchar('fax', { length: 50 }),
  landmark: varchar('landmark', { length: 150 }),
  city: varchar('city', { length: 50 }),
  city_id: int('city_id'),
  state: varchar('state', { length: 50 }),
  country: varchar('country', { length: 80 }),
  reciv_date: datetime('reciv_date').notNull(),
  address_type: mysqlEnum('address_type', ['Bill', 'Ship']).notNull(),
  default_status: mysqlEnum('default_status', ['Y', 'N']).default('N').notNull(),
})

const temp_addresses = mysqlTable('temp_delivery_address', {
    user_id: int('user_id').notNull(),
  
    id: serial('id').primaryKey(),
  
    address_type: varchar('address_type', { length: 100 }),
  
    first_name: varchar('first_name', { length: 100 }),
  
    last_name: varchar('last_name', { length: 255 }),
  
    mobile: varchar('mobile', { length: 50 }),
  
    phone: varchar('phone', { length: 50 }),
  
    zipcode: varchar('zipcode', { length: 10 }),
  
    address: varchar('address', { length: 255 }),
  
    landmark: varchar('landmark', { length: 200 }),
  
    area: varchar('area', { length: 255 }).default('0'),
  
    city: varchar('city', { length: 255 }).default('0'),
  
    state: varchar('state', { length: 255 }).default('0'),
  
    country: varchar('country', { length: 50 }),
  
    is_default: int('is_default').notNull().default(0),
  
    status: int('status').notNull().default(1),
  
    reciv_date: datetime('reciv_date').notNull(),
  
    app_id: varchar('app_id', { length: 255 }),
  
    app_type: varchar('app_type', { length: 10 }),
  
    temp_id: int('temp_id'),
  
    slot_id: int('slot_id').notNull().default(0),
  
    longitude: varchar('longitude', { length: 255 }),
  
    latitude: varchar('latitude', { length: 255 }),
  
    atype: varchar('atype', { length: 255 }),
  
    block: varchar('block', { length: 255 }),
  
    street: varchar('street', { length: 255 }),
  
    default_status: mysqlEnum('default_status', ['Y', 'N']).notNull().default('N'),
  
    house_no: text('house_no'),
  
    floor_no: text('floor_no'),
  
    building: text('building'),
  })

module.exports = {addresses, temp_addresses}