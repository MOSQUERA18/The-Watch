"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import Swal from "sweetalert2"

interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

interface CustomerData {
  name: string
  email: string
  phone: string
  city: string
  message: string
}

interface CartContextType {
  cart: CartItem[]
  isCartOpen: boolean
  isModalOpen: boolean
  theme:"dark"
  whatsappNumber: string
  addToCart: (product: CartItem) => void
  removeFromCart: (productId: string) => void
  increaseQuantity: (productId: string) => void
  decreaseQuantity: (productId: string) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  openModal: () => void
  closeModal: () => void
  sendToWhatsApp: (customerData: CustomerData) => void
  toggleTheme: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [theme, setTheme] = useState("dark")
  const whatsappNumber = "573213554763" // CAMBIA ESTE NÚMERO POR TU NÚMERO DE WHATSAPP

  // Load cart and theme from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("shopping-cart")
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
    const savedTheme = localStorage.getItem("selected-theme")
    if (savedTheme === "dark") {
      setTheme("dark")
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("shopping-cart", JSON.stringify(cart))
    updateCartCount()
  }, [cart])

  // Save theme to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("selected-theme", theme)
    document.body.classList.toggle("dark-theme", theme === "dark")
  }, [theme])

  const updateCartCount = useCallback(() => {
    // This logic is now handled in the Header component directly using `totalItems`
    // No need to manipulate DOM elements here.
  }, [])

  const addToCart = useCallback((product: CartItem) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id)
      if (existingProduct) {
        return prevCart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      } else {
        return [...prevCart, { ...product, quantity: 1 }]
      }
    })
    Swal.fire({
      title: "¡Agregado al carrito!",
      text: `${product.name} ha sido agregado al carrito`,
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
      toast: true,
      position: "top-end",
    })
  }, [])

  const removeFromCart = useCallback((productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId))
  }, [])

  const increaseQuantity = useCallback((productId: string) => {
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === productId ? { ...item, quantity: item.quantity + 1 } : item)),
    )
  }, [])

  const decreaseQuantity = useCallback((productId: string) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item,
      ),
    )
  }, [])

  const clearCart = useCallback(() => {
    setCart([])
    setIsCartOpen(false) // Moved closeCart call to here
  }, [])

  const openCart = useCallback(() => {
    setIsCartOpen(true)
  }, [])

  const closeCart = useCallback(() => {
    setIsCartOpen(false)
  }, [])

  const openModal = useCallback(() => {
    if (cart.length === 0) {
      Swal.fire({
        title: "Carrito vacío",
        text: "Agrega productos al carrito antes de enviar por WhatsApp",
        icon: "warning",
      })
      return
    }
    setIsModalOpen(true)
    document.body.style.overflow = "hidden" // Prevent scrolling when modal is open
  }, [cart.length])

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
    document.body.style.overflow = "auto" // Restore scrolling
  }, [])

  const generateWhatsAppMessage = useCallback(
    (customerData: CustomerData) => {
      const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

      let message = `🛍️ *NUEVO PEDIDO DE RELOJES* 🛍️\n\n`
      message += `👤 *DATOS DEL CLIENTE:*\n`
      message += `• Nombre: ${customerData.name}\n`
      message += `• Email: ${customerData.email}\n`
      message += `• Ciudad: ${customerData.city}\n`
      if (customerData.phone) {
        message += `• Teléfono: ${customerData.phone}\n`
      }
      message += `\n`

      message += `🛒 *PRODUCTOS SELECCIONADOS:*\n`
      cart.forEach((item, index) => {
        message += `\n${index + 1}. *${item.name}*\n`
        message += `   💰 Precio: $${item.price.toLocaleString()}\n`
        message += `   📦 Cantidad: ${item.quantity}\n`
        message += `   💵 Subtotal: $${(item.price * item.quantity).toLocaleString()}\n`
      })

      message += `\n📊 *RESUMEN DEL PEDIDO:*\n`
      message += `• Total de productos: ${totalItems}\n`
      message += `• *TOTAL A PAGAR: $${total.toLocaleString()}*\n\n`

      if (customerData.message) {
        message += `💬 *MENSAJE ADICIONAL:*\n${customerData.message}\n\n`
      }

      message += `📞 *¡Hola! Estoy interesado(a) en estos productos. ¿Podrías ayudarme con información sobre envío y formas de pago?*\n\n`
      message += `🚚 Por favor, proporciona información sobre:\n`
      message += `• Costos de envío a ${customerData.city}\n`
      message += `• Tiempo de entrega\n`
      message += `• Formas de pago disponibles\n`
      message += `• Disponibilidad de los productos\n\n`
      message += `¡Gracias! 😊`

      return message
    },
    [cart],
  )

  const sendToWhatsApp = useCallback(
    (customerData: CustomerData) => {
      if (!customerData.name || !customerData.email || !customerData.city) {
        Swal.fire({
          title: "Campos requeridos",
          text: "Por favor completa todos los campos obligatorios",
          icon: "error",
        })
        return
      }

      const message = generateWhatsAppMessage(customerData)
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
      window.open(whatsappUrl, "_blank")

      closeModal()
      Swal.fire({
        title: "¡Enviado!",
        text: "Te hemos redirigido a WhatsApp. Envía el mensaje para completar tu pedido.",
        icon: "success",
        timer: 3000,
        showConfirmButton: false,
      })
      clearCart() // Clear cart after sending to WhatsApp
    },
    [generateWhatsAppMessage, whatsappNumber, closeModal, clearCart],
  )

  const toggleTheme = useCallback(() => {
    setTheme("dark")
  }, [])

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        isModalOpen,
        theme,
        whatsappNumber,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        openCart,
        closeCart,
        openModal,
        closeModal,
        sendToWhatsApp,
        toggleTheme,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
