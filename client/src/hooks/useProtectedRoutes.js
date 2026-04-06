"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthContext } from "@/context/AuthContext"

export const useProtectedRoute = () => {
  const { isLoggedIn, loading } = useAuthContext()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.push("/Login")
    }
  }, [isLoggedIn, loading])
}