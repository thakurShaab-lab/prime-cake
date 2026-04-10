import axios from "axios"
import { eventBus } from "./eventBus"

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

instance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken")

      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (error) => Promise.reject(error)
)

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken")
      }

      eventBus.emit("authError", {
        message: "Session expired. Please login again.",
      })
    }

    const message =
      error.response?.data?.message || "Something went wrong"

    return Promise.reject(new Error(message))
  }
)

export default instance