"use client"

import { useEffect } from "react"

export default function OverlayMessage({
  show,
  message,
  type = "success",
  onClose,
  duration = 3000,
}) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [show])

  if (!show) return null

  const isSuccess = type === "success"

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div
        className={`min-w-75 max-w-md p-5 rounded-xl shadow-xl text-center animate-fadeIn
        ${isSuccess ? "bg-green-100 border border-green-400" : "bg-red-100 border border-red-400"}`}
      >
        <h2
          className={`text-lg font-semibold mb-2 
          ${isSuccess ? "text-green-700" : "text-red-700"}`}
        >
          {isSuccess ? "Success" : "Error"}
        </h2>

        <p className="text-sm text-gray-700">{message}</p>

        <button
          onClick={onClose}
          className={`mt-4 px-4 py-1 rounded text-sm font-medium
          ${isSuccess
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-red-600 text-white hover:bg-red-700"}`}
        >
          Close
        </button>
      </div>
    </div>
  )
}