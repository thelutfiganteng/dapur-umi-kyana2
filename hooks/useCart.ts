"use client"

import { useState, useCallback, useEffect } from "react"

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

export interface CartState {
  items: CartItem[]
  total: number
}

export function useCart() {
  const [cart, setCart] = useState<CartState>({ items: [], total: 0 })

  // Simpan ke localStorage
  useEffect(() => {
    const saved = localStorage.getItem("dapur-umi-cart")
    if (saved) {
      setCart(JSON.parse(saved))
    }
  }, [])

  const updateLocalStorage = (newCart: CartState) => {
    localStorage.setItem("dapur-umi-cart", JSON.stringify(newCart))
  }

  const addItem = useCallback((item: Omit<CartItem, "quantity">) => {
    setCart((prev) => {
      const existing = prev.items.find((i) => i.id === item.id)

      let newItems: CartItem[]
      if (existing) {
        newItems = prev.items.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i))
      } else {
        newItems = [...prev.items, { ...item, quantity: 1 }]
      }

      const newTotal = newItems.reduce((sum, i) => sum + i.price * i.quantity, 0)
      const newCart = { items: newItems, total: newTotal }
      updateLocalStorage(newCart)
      return newCart
    })
  }, [])

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setCart((prev) => {
      let newItems = prev.items

      if (quantity <= 0) {
        newItems = prev.items.filter((i) => i.id !== id)
      } else {
        newItems = prev.items.map((i) => (i.id === id ? { ...i, quantity } : i))
      }

      const newTotal = newItems.reduce((sum, i) => sum + i.price * i.quantity, 0)
      const newCart = { items: newItems, total: newTotal }
      updateLocalStorage(newCart)
      return newCart
    })
  }, [])

  const removeItem = useCallback((id: string) => {
    setCart((prev) => {
      const newItems = prev.items.filter((i) => i.id !== id)
      const newTotal = newItems.reduce((sum, i) => sum + i.price * i.quantity, 0)
      const newCart = { items: newItems, total: newTotal }
      updateLocalStorage(newCart)
      return newCart
    })
  }, [])

  const clearCart = useCallback(() => {
    const newCart = { items: [], total: 0 }
    setCart(newCart)
    updateLocalStorage(newCart)
  }, [])

  return { cart, addItem, updateQuantity, removeItem, clearCart }
}
