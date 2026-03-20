import { useState } from "react"
import { registerUser, loginUser } from "@/services/authService"
import { useNotification } from "@/context/NotificationContext"

export const useAuth = () => {
  const [loading, setLoading] = useState(false)
  const { addNotification } = useNotification()

  const register = async (formData) => {
    try {
      setLoading(true)

      const res = await registerUser(formData)

      addNotification("Registration successful 🎉", "success")

      return res

    } catch (err) {
      addNotification(err.message || "Registration failed", "error")
      throw err
    } finally {
      setLoading(false)
    }
  }

  const login = async (data) => {
    try {
      setLoading(true)

      const res = await loginUser(data)

      localStorage.setItem("accessToken", res.accessToken)
      localStorage.setItem("refreshToken", res.refreshToken)

      addNotification("Login successful 🎉", "success")

      return res

    } catch (err) {
      addNotification(err.message || "Login failed", "error")
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { register, login, loading }
}