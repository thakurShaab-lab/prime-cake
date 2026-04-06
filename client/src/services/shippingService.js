import api from "./api"

export const getShippingAPI = async () => {
    const res = await api.get("/shipping")
    return res.data
}

export const getDefaultShippingAPI = async () => {
    const res = await api.get("/shipping/default")
    return res.data
}

export const applyShippingAPI = async (data) => {
    const res = await api.post("/shipping/applyshipping", data)
    return res.data
}

export const getUserShippingAPI = async () => {
    const res = await api.get("/shipping/get/applyshipping")
    return res.data
}
