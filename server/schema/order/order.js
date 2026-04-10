const {
  mysqlTable,
  serial,
  int,
  varchar,
  float,
  decimal,
  char,
  datetime,
  mysqlEnum,
  text,
  customType,
  tinyint
} = require("drizzle-orm/mysql-core")

const longblob = customType({
  dataType() {
    return "longblob";
  },
});

const orders = mysqlTable("wl_order", {
  order_id: serial("order_id").primaryKey(),

  customers_id: int("customers_id").notNull().default(0),

  customer_type: varchar("customer_type", { length: 100 }).default("Member"),

  invoice_number: varchar("invoice_number", { length: 30 }).notNull(),

  first_name: varchar("first_name", { length: 50 }).notNull(),
  last_name: varchar("last_name", { length: 50 }),

  mobile_number: varchar("mobile_number", { length: 50 }),
  phone: varchar("phone", { length: 50 }),

  email: varchar("email", { length: 50 }).notNull(),

  billing_name: varchar("billing_name", { length: 100 }),
  billing_address: varchar("billing_address", { length: 223 }),
  billing_phone: varchar("billing_phone", { length: 50 }),
  billing_mobile: varchar("billing_mobile", { length: 25 }),
  billing_fax: varchar("billing_fax", { length: 50 }),
  billing_zipcode: varchar("billing_zipcode", { length: 50 }),
  billing_country: varchar("billing_country", { length: 100 }),
  billing_state: varchar("billing_state", { length: 50 }),
  billing_city: varchar("billing_city", { length: 50 }),

  shipping_name: varchar("shipping_name", { length: 100 }),
  shipping_address: varchar("shipping_address", { length: 223 }),
  shipping_phone: varchar("shipping_phone", { length: 50 }),
  shipping_mobile: varchar("shipping_mobile", { length: 25 }),
  shipping_fax: varchar("shipping_fax", { length: 50 }),
  shipping_zipcode: varchar("shipping_zipcode", { length: 50 }),
  shipping_country: varchar("shipping_country", { length: 100 }),
  shipping_state: varchar("shipping_state", { length: 50 }),
  shipping_city: varchar("shipping_city", { length: 50 }),
  shipping_landmark: varchar("shipping_landmark", { length: 200 }),

  shipping_method: varchar("shipping_method", { length: 100 }).notNull(),
  shipping_location: varchar("shipping_location", { length: 250 }),

  discount_coupon_id: varchar("discount_coupon_id", { length: 40 }),
  coupon_discount_amount: float("coupon_discount_amount", { precision: 10, scale: 2 }),

  shipping_amount: float("shipping_amount", { precision: 10, scale: 2 }),

  cod_amount: float("cod_amount", { precision: 10, scale: 2 }).notNull(),

  cod_security_amount: float("cod_security_amount", { precision: 10, scale: 2 }).default(0),

  reason_comment: varchar("reason_comment", { length: 255 }),

  donation: float("donation", { precision: 10, scale: 2 }).notNull().default(0),

  total_amount: decimal("total_amount", { precision: 15, scale: 4 }).notNull(),

  vat_amount: decimal("vat_amount", { precision: 15, scale: 4 }),

  vat_applied_cent: float("vat_applied_cent", { precision: 10, scale: 2 }).notNull().default(0),

  currency_code: char("currency_code", { length: 3 }).notNull(),
  currency_symbol: char("currency_symbol", { length: 10 }).notNull(),

  currency_value: decimal("currency_value", { precision: 14, scale: 6 }).notNull(),

  order_status: mysqlEnum("order_status", [
    "Pending",
    "Return",
    "Canceled",
    "Delivered",
    "Ready For Dispatch",
    "Rejected",
    "Deleted"
  ]).notNull().default("Pending"),

  order_received_date: datetime("order_received_date"),
  order_delivery_date: datetime("order_delivery_date"),

  payment_method: varchar("payment_method", { length: 200 }),

  payment_status: mysqlEnum("payment_status", ["Paid", "Unpaid"])
    .notNull()
    .default("Unpaid"),

  courier_company_name: varchar("courier_company_name", { length: 150 }).notNull(),

  bill_number: varchar("bill_number", { length: 50 }).notNull(),

  reason: text("reason")
})


const orders_products = mysqlTable("wl_orders_products", {
  orders_products_id: serial("orders_products_id").primaryKey(),

  orders_id: int("orders_id").notNull(),

  products_id: int("products_id"),

  product_brand: varchar("product_brand", { length: 70 }),
  product_material: varchar("product_material", { length: 255 }),
  product_color: varchar("product_color", { length: 70 }),
  product_size: varchar("product_size", { length: 70 }),

  product_color_id: int("product_color_id"),
  product_size_id: int("product_size_id"),

  product_color_code: varchar("product_color_code", { length: 10 }),

  product_name: varchar("product_name", { length: 100 }),
  product_code: varchar("product_code", { length: 100 }),

  product_image: longblob("product_image").notNull(),

  product_price: float("product_price", { precision: 10, scale: 2 }),

  product_tax: float("product_tax", { precision: 10, scale: 2 })
    .notNull()
    .default(0),

  quantity: int("quantity").notNull().default(0),

  gst_percentage: float("gst_percentage", { precision: 10, scale: 2 })
    .notNull()
    .default(0),

  shipping_charge: decimal("shipping_charge", { precision: 11, scale: 2 }),

  is_return: mysqlEnum("is_return", ["0", "1", "2", "3", "4", "5"])
    .notNull()
    .default("0"),

  item_return: tinyint("item_return").notNull().default(1),

  item_cancel: tinyint("item_cancel").notNull().default(1),

  is_cancel: tinyint("is_cancel").notNull(),

  product_order_status: mysqlEnum("product_order_status", [
    "Pending",
    "Closed",
    "Cancelled",
    "Delivered"
  ])
    .notNull()
    .default("Pending"),

  sub_order_id: varchar("sub_order_id", { length: 20 }),

  reason: text("reason").notNull(),

  reason_comment: varchar("reason_comment", { length: 255 }).notNull(),

  request_date: varchar("request_date", { length: 255 }),

  return_date: datetime("return_date"),

  delivery_feedback: text("delivery_feedback"),

  is_stock_back: mysqlEnum("is_stock_back", ["0", "1"])
    .notNull()
    .default("0"),

  style_icon: varchar("style_icon", { length: 60 }),

  return_image: varchar("return_image", { length: 450 })
})

module.exports = { orders, orders_products }