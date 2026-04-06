const {
    mysqlTable,
    int,
    varchar,
    float,
    text,
    datetime,
    mysqlEnum,
    bigint,
  } = require("drizzle-orm/mysql-core")
  
  const products = mysqlTable("wl_products", {
    products_id: int("products_id").autoincrement().primaryKey().notNull(),
  
    category_id: int("category_id").notNull(),
  
    category_links: varchar("category_links", { length: 80 }).notNull(),
  
    product_name: varchar("product_name", { length: 100 }).notNull(),
  
    friendly_url: varchar("friendly_url", { length: 200 }),
  
    product_code: varchar("product_code", { length: 64 }).notNull(),
  
    product_price: float("product_price", { precision: 15, scale: 2 })
      .notNull()
      .default(0.0),
  
    product_discounted_price: float("product_discounted_price", {
      precision: 15,
      scale: 2,
    })
      .notNull()
      .default(0.0),
  
    product_discount_percent: float("product_discount_percent", {
      precision: 10,
      scale: 2,
    }).default(0.0),
  
    product_tax: float("product_tax", { precision: 10, scale: 2 })
      .notNull()
      .default(0.0),
  
    products_description: text("products_description"),
  
    products_specification: text("products_specification"),
  
    products_offer: text("products_offer"),
  
    return_policy: text("return_policy"),
  
    is_cod: varchar("is_cod", { length: 55 }),
  
    gst: int("gst").notNull().default(0),
  
    youtube_video: varchar("youtube_video", { length: 455 }),
  
    product_color_ids: varchar("product_color_ids", { length: 255 }),
  
    product_size_ids: varchar("product_size_ids", { length: 255 }),
  
    brand_id: int("brand_id"),
  
    location_id: int("location_id"),
  
    style_id: int("style_id").notNull().default(0),
  
    material_id: int("material_id").default(0),
  
    is_hot: mysqlEnum("is_hot", ["1", "0"]).notNull().default("0"),
  
    is_new: mysqlEnum("is_new", ["1", "0"]).notNull().default("0"),
  
    is_featured: mysqlEnum("is_featured", ["0", "1"])
      .notNull()
      .default("0"),
  
    is_popular: mysqlEnum("is_popular", ["1", "0"])
      .notNull()
      .default("0"),
  
    is_deal: mysqlEnum("is_deal", ["1", "0"])
      .notNull()
      .default("0"),
  
    deal_price: float("deal_price", { precision: 15, scale: 2 }),
  
    from_date: datetime("from_date"),
  
    fromdate_strtotime: int("fromdate_strtotime"),
  
    end_date: datetime("end_date"),
  
    end_date_strtotome: int("end_date_strtotome"),
  
    exclusive_deal: mysqlEnum("exclusive_deal", ["1", "0"])
      .notNull()
      .default("0"),
  
    from_date_exclusive: datetime("from_date_exclusive"),
  
    end_date_exclusive: datetime("end_date_exclusive"),
  
    fromdate_strtotime_exclusive: bigint("fromdate_strtotime_exclusive", {
      mode: "number",
    }),
  
    end_date_strtotome_exclusive: bigint("end_date_strtotome_exclusive", {
      mode: "number",
    }),
  
    product_quantity: int("product_quantity").notNull().default(0),
  
    used_quantity: int("used_quantity").notNull().default(0),
  
    low_stocks: int("low_stocks").notNull().default(0),
  
    shipping_text: text("shipping_text"),
  
    status: mysqlEnum("status", ["0", "1", "2"])
      .notNull()
      .default("1"),
  
    product_added_date: datetime("product_added_date"),
  
    product_updated_date: datetime("product_updated_date"),
  
    products_viewed: int("products_viewed")
      .notNull()
      .default(0),
  
    product_alt: varchar("product_alt", { length: 100 }),
  
    product_weight: varchar("product_weight", { length: 55 }),
  
    xls_type: mysqlEnum("xls_type", ["0", "1"])
      .notNull()
      .default("0"),
  
    product_brochure: varchar("product_brochure", { length: 255 }),
  
    product_size_chart: varchar("product_size_chart", { length: 255 }),
  
    max_sold_qty: int("max_sold_qty"),
  
    deal_from_date: datetime("deal_from_date"),
  
    deal_end_date: datetime("deal_end_date"),
  
    vat_type: int("vat_type"),
  
    vat_rate: float("vat_rate"),
  
    seller_name: varchar("seller_name", { length: 255 }),
  
    in_stock: mysqlEnum("in_stock", ["1", "2"]).default("2"),
  })

  module.exports = {products}