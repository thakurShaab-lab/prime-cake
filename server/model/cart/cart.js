const { db } = require("../../config/db")
const { wl_cart } = require("../../schema/cart/cart")
const { eq, and } = require("drizzle-orm")

const CartModel = {

    async addToCart(data) {
        return await db.insert(wl_cart).values(data)
    },

    async getCart(user_id) {
        return await db
            .select()
            .from(wl_cart)
            .where(eq(wl_cart.user_id, user_id))
    },

    async updateCartQty(id, action) {
        const item = await db
            .select()
            .from(wl_cart)
            .where(eq(wl_cart.id, id))
    
        if (!item.length) throw new Error("Item not found")
    
        const currentQty = item[0].qty
    
        let newQty = currentQty
    
        if (action === "inc") newQty = currentQty + 1
        if (action === "dec") newQty = currentQty - 1
    
        if (newQty <= 0) {
            await db.delete(wl_cart).where(eq(wl_cart.id, id))
            return { removed: true }
        }
    
        await db
            .update(wl_cart)
            .set({ qty: newQty })
            .where(eq(wl_cart.id, id))
    
        return { removed: false, qty: newQty }
    },

    async updateQty(id, qty) {
        return await db
            .update(wl_cart)
            .set({ qty })
            .where(eq(wl_cart.id, id))
    },

    async removeItem(id) {
        return await db
            .delete(wl_cart)
            .where(eq(wl_cart.id, id))
    },

    async clearCart(user_id) {
        return await db
            .delete(wl_cart)
            .where(eq(wl_cart.user_id, user_id))
    },

    async checkExisting(pid, user_id) {
        const data = await db
            .select()
            .from(wl_cart)
            .where(and(
                eq(wl_cart.pid, pid),
                eq(wl_cart.user_id, user_id)
            ))

        return data[0]
    }
}

module.exports = { CartModel }