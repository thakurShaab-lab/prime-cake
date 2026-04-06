import api from "./api"

export const registerUser = async (data) => {
  const res = await api.post("auth/register", data)

  const result = res.data

  if (!result.success) {
    throw new Error(result.message || "Registration failed")
  }

  return result
}

export const loginUser = async (data) => {
  const res = await api.post("auth/login", data)

  const result = res.data

  if (!result.success) {
    throw new Error(result.message || "Login failed")
  }

  localStorage.setItem("accessToken", result.accessToken)
  localStorage.setItem("refreshToken", result.refreshToken)

  return result
}

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken")

  if (!refreshToken) throw new Error("No refresh token")

  const res = await api.post("auth/refresh", { refreshToken })

  const data = res.data

  if (!data.success) {
    throw new Error("Session expired")
  }

  localStorage.setItem("accessToken", data.accessToken)

  return data.accessToken
}