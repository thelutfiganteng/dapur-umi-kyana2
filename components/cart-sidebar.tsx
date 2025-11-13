"use client"

import { useState } from "react"
import { X, Trash2, Plus, Minus, ShoppingCart } from "lucide-react"
import type { CartState } from "@/hooks/useCart"

interface CartSidebarProps {
  cart: CartState
  onUpdateQuantity: (id: string, quantity: number) => void
  onRemoveItem: (id: string) => void
  onClearCart: () => void
}

export default function CartSidebar({ cart, onUpdateQuantity, onRemoveItem, onClearCart }: CartSidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLocked, setIsLocked] = useState(false)

  const handleWhatsAppOrder = () => {
    if (cart.items.length === 0) return

    let message = `*Pesanan dari Dapur Umi Kyana* 🍗\n\n`
    message += `━━━━━━━━━━━━━━━━━━━━━━━\n`
    message += `*Daftar Pesanan*\n`
    message += `━━━━━━━━━━━━━━━━━━━━━━━\n\n`

    cart.items.forEach((item, index) => {
      const subtotal = item.price * item.quantity
      message += `${index + 1}. *${item.name}*\n`
      message += `   Rp${item.price.toLocaleString("id-ID")} × ${item.quantity}\n`
      message += `   Subtotal: Rp${subtotal.toLocaleString("id-ID")}\n\n`
    })

    message += `━━━━━━━━━━━━━━━━━━━━━━━\n`
    message += `*TOTAL: Rp${cart.total.toLocaleString("id-ID")}*\n`
    message += `━━━━━━━━━━━━━━━━━━━━━━━\n\n`
    message += `Mohon konfirmasi ketersediaan dan detail pengiriman. Terima kasih! 🙏`

    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/628983064613?text=${encodedMessage}`, "_blank")
    onClearCart()
    setIsOpen(false)
  }

  return (
    <>
      {/* Floating Cart Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-primary to-accent text-white p-4 rounded-full shadow-2xl hover:shadow-primary/40 transition-all duration-300 hover:scale-110 animate-bounce-soft"
        aria-label="Open cart"
      >
        <ShoppingCart className="w-6 h-6" />
        {cart.items.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
            {cart.items.length}
          </span>
        )}
      </button>

      {/* Sidebar Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40" onClick={() => !isLocked && setIsOpen(false)} />}

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 h-screen w-96 bg-white shadow-2xl transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } flex flex-col`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-accent text-white p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Pesanan Saya</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="hover:bg-white/20 p-2 rounded-lg transition-colors"
            aria-label="Close cart"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {cart.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingCart className="w-16 h-16 text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground text-lg">Keranjang masih kosong</p>
              <p className="text-sm text-muted-foreground mt-2">Pilih menu untuk memulai pemesanan</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.items.map((item) => {
                const subtotal = item.price * item.quantity
                return (
                  <div key={item.id} className="bg-muted rounded-xl p-4 space-y-3 hover:bg-muted/80 transition-colors">
                    <div className="flex gap-3">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm line-clamp-2 text-foreground">{item.name}</h4>
                        <p className="text-xs text-muted-foreground mt-1">Rp{item.price.toLocaleString("id-ID")}</p>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                        className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4 text-primary" />
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => onUpdateQuantity(item.id, Math.max(0, Number.parseInt(e.target.value) || 0))}
                        className="w-12 text-center border border-border rounded-lg font-semibold"
                        min="0"
                      />
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4 text-primary" />
                      </button>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="ml-auto p-2 hover:bg-red-50 rounded-lg transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>

                    {/* Subtotal */}
                    <div className="pt-2 border-t border-border/50">
                      <p className="text-xs text-muted-foreground">Subtotal</p>
                      <p className="font-bold text-primary">Rp{subtotal.toLocaleString("id-ID")}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.items.length > 0 && (
          <div className="border-t border-border p-6 space-y-4">
            {/* Total */}
            <div className="space-y-2">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>Rp{cart.total.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t border-border pt-2">
                <span>Total</span>
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Rp{cart.total.toLocaleString("id-ID")}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleWhatsAppOrder}
                className="w-full bg-gradient-to-r from-primary to-accent text-white py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-primary/40 transition-all duration-300"
              >
                Lanjut ke WhatsApp 📱
              </button>
              <button
                onClick={() => {
                  onClearCart()
                  setIsOpen(false)
                }}
                className="w-full bg-muted text-foreground py-3 rounded-xl font-semibold hover:bg-muted/80 transition-colors"
              >
                Batalkan
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
