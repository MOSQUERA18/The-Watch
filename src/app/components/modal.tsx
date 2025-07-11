"use client";
import type React from "react"

import { X, PhoneIcon as Whatsapp } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { cn } from "@/lib/utils"
import { useState } from "react"

export function Modal() {
  const { isModalOpen, closeModal, sendToWhatsApp } = useCart()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id.replace("customer-", "")]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendToWhatsApp(formData)
  }

  return (
    <div
      className={cn(
        "modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-modal transition-opacity duration-300",
        {
          "show-modal": isModalOpen, // Use the class defined in globals.css
        },
      )}
      id="modal-overlay"
      onClick={(e) => e.target === e.currentTarget && closeModal()}
    >
      <div className="modal bg-bg-light-default rounded-lg shadow-xl p-6 w-full max-w-md mx-4 transform transition-transform duration-300 ease-out dark:bg-bg-dark-card">
        <div className="modal__header flex justify-between items-center mb-6 pb-4 border-b border-border-light-default dark:border-dark-border">
          <h3 className="modal__title text-2xl font-semibold text-text-light-primary dark:text-text-dark-primary">
            Datos para el Pedido
          </h3>
          <X
            className="modal__close text-2xl cursor-pointer text-text-light-secondary hover:text-red-500 dark:text-text-dark-secondary dark:hover:text-red-400"
            id="modal-close"
            onClick={closeModal}
          />
        </div>

        <form className="modal__form space-y-4" id="customer-form" onSubmit={handleSubmit}>
          <div className="form__group">
            <label
              htmlFor="customer-name"
              className="form__label block text-text-light-primary text-sm font-medium mb-1 dark:text-text-dark-secondary"
            >
              Nombre Completo *
            </label>
            <input
              type="text"
              id="customer-name"
              className="form__input w-full px-4 py-2 border border-border-light-default rounded-md focus:outline-none focus:ring-2 focus:ring-brand-accent dark:bg-bg-dark-soft dark:border-dark-border dark:text-text-dark-primary"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form__group">
            <label
              htmlFor="customer-email"
              className="form__label block text-text-light-primary text-sm font-medium mb-1 dark:text-text-dark-secondary"
            >
              Correo Electrónico *
            </label>
            <input
              type="email"
              id="customer-email"
              className="form__input w-full px-4 py-2 border border-border-light-default rounded-md focus:outline-none focus:ring-2 focus:ring-brand-accent dark:bg-bg-dark-soft dark:border-dark-border dark:text-text-dark-primary"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form__group">
            <label
              htmlFor="customer-phone"
              className="form__label block text-text-light-primary text-sm font-medium mb-1 dark:text-text-dark-secondary"
            >
              Teléfono
            </label>
            <input
              type="tel"
              id="customer-phone"
              className="form__input w-full px-4 py-2 border border-border-light-default rounded-md focus:outline-none focus:ring-2 focus:ring-brand-accent dark:bg-bg-dark-soft dark:border-dark-border dark:text-text-dark-primary"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form__group">
            <label
              htmlFor="customer-city"
              className="form__label block text-text-light-primary text-sm font-medium mb-1 dark:text-text-dark-secondary"
            >
              Ciudad *
            </label>
            <input
              type="text"
              id="customer-city"
              className="form__input w-full px-4 py-2 border border-border-light-default rounded-md focus:outline-none focus:ring-2 focus:ring-brand-accent dark:bg-bg-dark-soft dark:border-dark-border dark:text-text-dark-primary"
              required
              value={formData.city}
              onChange={handleChange}
            />
          </div>

          <div className="form__group">
            <label
              htmlFor="customer-message"
              className="form__label block text-text-light-primary text-sm font-medium mb-1 dark:text-text-dark-secondary"
            >
              Mensaje Adicional
            </label>
            <textarea
              id="customer-message"
              className="form__textarea w-full px-4 py-2 border border-border-light-default rounded-md focus:outline-none focus:ring-2 focus:ring-brand-accent dark:bg-bg-dark-soft dark:border-dark-border dark:text-text-dark-primary"
              rows={3}
              placeholder="Información adicional sobre tu pedido..."
              value={formData.message}
              onChange={handleChange}
            ></textarea>
          </div>

          <button
            type="submit"
            className="button modal__submit w-full py-3 bg-brand-whatsapp text-white font-semibold rounded-md hover:bg-brand-whatsapp transition-colors duration-300 flex items-center justify-center gap-2"
          >
            <Whatsapp className="text-xl" /> ENVIAR A WHATSAPP
          </button>
        </form>
      </div>
    </div>
  )
}
