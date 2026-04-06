import API from "./api"

export const addToCartAPI = (data) => API.post("/cart/add", data)
export const getCartAPI = () => API.get("/cart")
export const updateCartQtyAPI = async (id, action) => {
    const res = await API.put("/cart/quantity", { id, action })
    return res.data
}

export const removeCartItemAPI = async (id) => {
    const res = await API.delete(`/cart/${id}`)
    return res.data
}