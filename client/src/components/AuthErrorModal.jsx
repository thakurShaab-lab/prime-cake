"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { eventBus } from "@/services/eventBus"

export default function AuthErrorModal() {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState("")
  const router = useRouter()

  useEffect(() => {
    const handler = (e) => {
      setMessage(e.detail.message)
      setOpen(true)
    }

    eventBus.on("authError", handler)

    return () => eventBus.off("authError", handler)
  }, [])

  const handleClose = () => {
    setOpen(false)
    router.push("/Login")
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-[300px] text-center">
        <h2 className="text-lg font-semibold mb-2">Session Expired</h2>
        <p className="text-gray-600 mb-4">{message}</p>
        <button
          onClick={handleClose}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Go to Login
        </button>
      </div>
    </div>
  )
}