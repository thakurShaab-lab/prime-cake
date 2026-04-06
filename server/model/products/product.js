const { db } = require("../../config/db")
const { eq, and } = require("drizzle-orm")
const { products } = require("../../schema/product/product")

const sectionFilterMap = {
    hot: products.is_hot,
    new: products.is_new,
    featured: products.is_featured,
    popular: products.is_popular,
    special_offer: products.is_special_offer,
    deal: products.is_deal,
    recently_added: products.is_recently_added,
}

const ProductModel = {
    async getAllProducts() {
        return await db.select().from(products)
    },

    async getProductById(id) {
        return await db
            .select()
            .from(products)
            .where(eq(products.products_id, id))
            .limit(1)
    },

    async getProductsBySection(sectionKey) {
        const column = sectionFilterMap[sectionKey];
        if (!column) throw new Error(`Invalid section key: ${sectionKey}`);

        const filteredProducts = await db
            .select()
            .from(products)
            .where(eq(column, "1"));

        return filteredProducts;
    }
}

module.exports = { ProductModel }