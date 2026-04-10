import API from "./api"

export const addAddressAPI = async (data) => {
  const res = await API.post("/address/add", data)
  return res.data
}

export const getAddressAPI = async () => {
  const res = await API.get("/address")
  return res.data
}

export const getDefaultAddressAPI = async () => {
  const res = await API.get("/address/default")
  return res.data
}

export const getTempAddressAPI = async () => {
  const res = await API.get("/address/temp")
  return res.data
}

export const saveTempAddressAPI = async (data) => {
  const res = await API.post("/address/temp", data)
  return res.data
}

export const deleteAddressAPI = async (id) => {
  const res = await API.delete(`/address/delete/${id}`)
  return res.data
}

export const selectAddressAPI = async (address_id) => {
  const res = await API.post("/address/select-address", { address_id })
  return res.data
}