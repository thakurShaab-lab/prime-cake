import api from "./api"

export const getProductsBySection = async (section) => {
  try {
    const res = await api.get(`product/getFiltered?section=${section}`)
    return res.data.products
  } catch (error) {
    throw error.message
  }
}