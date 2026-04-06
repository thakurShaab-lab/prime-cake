import { useState } from "react"
import { registerUser, loginUser } from "@/services/authService"
import { useNotification } from "@/context/NotificationContext"
import { useAuthContext } from "@/context/AuthContext"

export const useAuth = () => {
  const [loading, setLoading] = useState(false)
  const { addNotification } = useNotification()
  const { login } = useAuthContext()

  const register = async (formData) => {
    try {
      setLoading(true)
      const res = await registerUser(formData)

      addNotification("Registration successful 🎉", "success")
      return res
    } catch (err) {
      addNotification(err.message, "error")
      throw err
    } finally {
      setLoading(false)
    }
  }

  const loginUserHandler = async (formData) => {
    try {
      setLoading(true)

      const res = await loginUser(formData)

      login(res)

      addNotification("Login successful 🎉", "success")

      return res
    } catch (err) {
      addNotification(err.message, "error")
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { register, loginUserHandler, loading }
}