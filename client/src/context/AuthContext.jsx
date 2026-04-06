"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"
import { refreshAccessToken } from "@/services/authService"

const AuthContext = createContext()

const decodeToken = (token) => {
  try {
    return jwtDecode(token)
  } catch {
    return null
  }
}

const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token)
    if (!decoded.exp) return true
    return decoded.exp * 1000 < Date.now()
  } catch {
    return true
  }
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  const logout = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")

    document.cookie = "accessToken=; path=/; max-age=0"

    setUser(null)
    setIsLoggedIn(false)
  }

  const initializeAuth = async () => {
    try {
      let token = localStorage.getItem("accessToken")

      if (!token) {
        logout()
        return
      }

      if (isTokenExpired(token)) {
        try {
          token = await refreshAccessToken()

          // update cookie too
          document.cookie = `accessToken=${token}; path=/`
        } catch {
          logout()
          return
        }
      }

      const decodedUser = decodeToken(token)

      if (!decodedUser) {
        logout()
        return
      }

      setUser(decodedUser)
      setIsLoggedIn(true)
    } catch (err) {
      console.error("Auth init error:", err)
      logout()
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    initializeAuth()
  }, [])

  const login = (data) => {
    const token = data.accessToken

    if (!token) return

    const decodedUser = decodeToken(token)

    document.cookie = `accessToken=${token}; path=/`

    setUser(decodedUser)
    setIsLoggedIn(true)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider")
  }

  return context
}