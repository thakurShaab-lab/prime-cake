"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { getCartAPI } from "@/services/cartService"

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0)
  const [cartItems, setCartItems] = useState([])

  const fetchCart = async () => {
    try {
      const res = await getCartAPI()
      const items = res.data.data || []

      setCartItems(items)
      setCartCount(items.length)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchCart()
  }, [])

  return (
    <CartContext.Provider value={{ cartCount, setCartCount, cartItems, fetchCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)