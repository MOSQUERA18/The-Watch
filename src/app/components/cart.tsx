"use client"

import { X, ShoppingBag, Plus, Minus, Trash2, PhoneIcon as Whatsapp } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { cn } from "@/lib/utils"

export function Cart() {
  const { cart, isCartOpen, closeCart, increaseQuantity, decreaseQuantity, removeFromCart, openModal } = useCart()

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div
      className={cn(
        "cart fixed top-0 right-0 w-full max-w-xs h-full bg-bg-light-default shadow-light-medium transition-transform duration-300 ease-in-out z-[100] p-6 flex flex-col dark:bg-bg-dark-card",
        {
          "show-cart": isCartOpen, // Use the class defined in globals.css
        },
      )}
      id="cart"
    >
      <X
        className="cart__close absolute top-4 right-4 text-2xl cursor-pointer text-text-light-primary dark:text-text-dark-primary"
        id="cart-close"
        onClick={closeCart}
      />

      <h2 className="cart__title-center text-2xl font-semibold text-center mb-6 text-text-light-primary dark:text-text-dark-primary">
        My Cart
      </h2>

      <div className="cart__container flex-grow overflow-y-auto pr-2" id="cart-container">
        {cart.length === 0 ? (
          <div className="cart__empty flex flex-col items-center justify-center h-full text-text-light-secondary dark:text-text-dark-secondary">
            <ShoppingBag className="cart__empty-icon text-6xl mb-4" />
            <p className="cart__empty-text text-lg">Tu carrito está vacío</p>
          </div>
        ) : (
          cart.map((item) => (
            <article
              key={item.id}
              className="cart__card flex items-center mb-4 p-3 bg-bg-light-soft rounded-lg shadow-sm dark:bg-bg-dark-soft border border-border-light-default dark:border-dark-border"
              data-id={item.id}
            >
              <div className="cart__box w-20 h-20 flex-shrink-0 mr-4">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="cart__img w-full h-full object-contain"
                />
              </div>

              <div className="cart__details flex-grow">
                <h3 className="cart__title text-lg font-medium text-text-light-primary dark:text-text-dark-primary">
                  {item.name}
                </h3>
                <span className="cart__price text-brand-accent font-semibold dark:text-brand-accent">
                  ${item.price.toLocaleString()}
                </span>

                <div className="cart__amount flex items-center justify-between mt-2">
                  <div className="cart__amount-content flex items-center border border-border-light-default rounded-md dark:border-dark-border">
                    <span
                      className="cart__amount-box p-1 cursor-pointer hover:bg-bg-light-soft dark:hover:bg-dark-border rounded-l-md"
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      <Minus className="w-4 h-4 text-text-light-primary dark:text-text-dark-secondary" />
                    </span>
                    <span className="cart__amount-number px-3 text-text-light-primary dark:text-text-dark-primary">
                      {item.quantity}
                    </span>
                    <span
                      className="cart__amount-box p-1 cursor-pointer hover:bg-bg-light-soft dark:hover:bg-dark-border rounded-r-md"
                      onClick={() => increaseQuantity(item.id)}
                    >
                      <Plus className="w-4 h-4 text-text-light-primary dark:text-text-dark-secondary" />
                    </span>
                  </div>
                  <Trash2
                    className="cart__amount-trash text-red-500 text-xl cursor-pointer hover:text-red-600"
                    onClick={() => removeFromCart(item.id)}
                  />
                </div>
              </div>
            </article>
          ))
        )}
      </div>

      <div
        className="cart__prices flex justify-between items-center mt-6 pt-4 border-t border-border-light-default dark:border-dark-border"
        id="cart-prices"
      >
        <span
          className="cart__prices-item text-lg font-medium text-text-light-primary dark:text-text-dark-secondary"
          id="cart-items-count"
        >
          {totalItems} items
        </span>
        <span className="cart__prices-total text-xl font-bold text-brand-accent dark:text-brand-accent" id="cart-total">
          ${totalPrice.toLocaleString()}
        </span>
      </div>

      <div className="cart__buttons flex flex-col gap-3 mt-6">
        <button
          className="button cart__checkout w-full py-3 bg-brand-accent text-brand-primary font-semibold rounded-md hover:bg-brand-accent transition-colors duration-300"
          id="checkout-btn"
          onClick={openModal}
        >
          CHECKOUT
        </button>
        <button
          className="button cart__whatsapp w-full py-3 bg-brand-whatsapp text-white font-semibold rounded-md hover:bg-brand-whatsapp transition-colors duration-300 flex items-center justify-center gap-2"
          id="whatsapp-btn"
          onClick={openModal}
        >
          <Whatsapp className="text-xl" /> ENVIAR POR WHATSAPP
        </button>
      </div>
    </div>
  )
}
