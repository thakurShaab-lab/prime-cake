import axios from "axios"
import { refreshAccessToken } from "./authService"

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
    const message =
      error.response?.data?.message || "Something went wrong"
    return Promise.reject(new Error(message))
  }
)

let isRefreshing = false
let failedQueue = []

const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
      if (error) {
        prom.reject(error)
      } else {
        prom.resolve(token)
      }
    })
  
    failedQueue = []
  }
  
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config
  
      if (
        error.response?.status === 401 &&
        !originalRequest._retry
      ) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject })
          })
            .then((token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`
              return instance(originalRequest)
            })
            .catch((err) => Promise.reject(err))
        }
  
        originalRequest._retry = true
        isRefreshing = true
  
        try {
          const newToken = await refreshAccessToken()
  
          processQueue(null, newToken)
  
          originalRequest.headers.Authorization = `Bearer ${newToken}`
  
          return instance(originalRequest)
        } catch (err) {
          processQueue(err, null)
  
          localStorage.removeItem("accessToken")
          localStorage.removeItem("refreshToken")
  
          window.location.href = "/Login"
  
          return Promise.reject(err)
        } finally {
          isRefreshing = false
        }
      }
  
      return Promise.reject(error)
    }
  )

export default instance