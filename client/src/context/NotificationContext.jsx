"use client"

import { createContext, useContext, useState } from "react"

const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([])

  const addNotification = (message, type = "success") => {
    const id = Date.now()

    setNotifications((prev) => [
      ...prev,
      { id, message, type }
    ])

    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id))
    }, 3000)
  }

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {children}

      {/* Render notifications */}
      <div className="fixed top-5 right-5 z-50 space-y-2">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`px-4 py-2 rounded shadow text-white ${
              n.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {n.message}
          </div>
        ))}
      </div>

    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  const context = useContext(NotificationContext)

  if (!context) {
    throw new Error("useNotification must be used within NotificationProvider")
  }

  return context
}