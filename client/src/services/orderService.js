import API from "./api"

export const placeOrderAPI = async () => {
  const res = await API.post("/order/place-order")
  return res.data
}