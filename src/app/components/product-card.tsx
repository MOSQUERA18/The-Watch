"use client";
import type React from "react"

import {
  ShoppingCart,
  GlassWaterIcon as Water,
  Clock,
  Globe,
  Diamond,
  TimerIcon as Stopwatch,
  Award,
  RefreshCw,
  Shield,
  Car,
  Atom,
  TurtleIcon as TennisBall,
  Cog,
} from "lucide-react"
import { useCart } from "@/context/cart-context"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  id: string
  name: string
  price: number
  image: string
  description?: string
  features?: { icon: string; text: string }[]
  tag?: { text: string; type: "rolex" | "rm" | "sale" | "new" }
  badge?: { text: string; type: "bestseller" | "new" | "limited" | "exclusive" | "new-arrival" }
  type: "luxury" | "featured" | "product" | "new"
}

const iconMap: { [key: string]: React.ElementType } = {
  Water: Water,
  Clock: Clock,
  Globe: Globe,
  Diamond: Diamond,
  Stopwatch: Stopwatch,
  Award: Award,
  RefreshCw: RefreshCw,
  Shield: Shield,
  Car: Car,
  Atom: Atom,
  TennisBall: TennisBall,
  Cog: Cog,
  ShoppingCart: ShoppingCart,
}

export function ProductCard({ id, name, price, image, description, features, tag, badge, type }: ProductCardProps) {
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart({ id, name, price, image, quantity: 1 })
  }

  const renderButton = () => {
    if (type === "product") {
      return (
        <button
          className="products__button add-to-cart absolute top-4 right-4 bg-brand-primary text-white p-2 rounded-full text-xl hover:bg-brand-accent hover:text-brand-primary transition-all duration-300"
          onClick={handleAddToCart}
        >
          <ShoppingCart />
        </button>
      )
    } else {
      return (
        <button
          className="button add-to-cart w-full py-3 bg-brand-accent text-brand-primary font-semibold rounded-md hover:bg-brand-accent transition-colors duration-300 flex items-center justify-center gap-2 mt-4"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="text-xl" /> ADD TO CART
        </button>
      )
    }
  }

  return (
    <article
      className={cn(
        "relative bg-bg-light-default rounded-lg shadow-light-medium overflow-hidden transition-transform duration-300 hover:scale-105 dark:bg-bg-dark-card border border-border-light-default dark:border-dark-border",
        {
          luxury__card: type === "luxury",
          "luxury__card--rm": type === "luxury" && tag?.type === "rm",
          featured__card: type === "featured",
          "products__card group text-center": type === "product",
          new__card: type === "new",
        },
      )}
    >
      {(tag || badge) && (
        <div className="luxury__card-header absolute top-4 left-4 flex gap-2 z-10">
          {tag && (
            <span
              className={cn("luxury__tag px-3 py-1 rounded-full text-xs font-semibold text-white", {
                "luxury__tag--rolex": tag.type === "rolex", // Uses specific gradient from globals.css
                "luxury__tag--rm": tag.type === "rm", // Uses specific gradient from globals.css
                "bg-red-500": tag.type === "sale", // Keep red for sale
                "bg-green-500": tag.type === "new", // Keep green for new
              })}
            >
              {tag.text}
            </span>
          )}
          {badge && (
            <span
              className={cn("luxury__badge px-3 py-1 rounded-full text-xs font-semibold text-white", {
                "bg-yellow-500": badge.type === "bestseller", // Keep yellow for bestseller
                "bg-green-500": badge.type === "new" || badge.type === "new-arrival", // Keep green for new/new-arrival
                "bg-red-500": badge.type === "limited", // Keep red for limited
                "bg-blue-500": badge.type === "exclusive", // Keep blue for exclusive
              })}
            >
              {badge.text}
            </span>
          )}
        </div>
      )}

      <img
        src={image || "/placeholder.svg"}
        alt={name}
        className={cn("w-full object-cover", {
          "luxury__img h-64": type === "luxury",
          "featured__img h-56": type === "featured",
          "products__img h-48": type === "product",
          "new__img h-56": type === "new",
        })}
      />

      <div
        className={cn("p-6", {
          luxury__data: type === "luxury",
          featured__data: type === "featured",
          products__data: type === "product",
          new__data: type === "new",
        })}
      >
        <h3
          className={cn("font-semibold text-text-light-primary dark:text-text-dark-primary", {
            "luxury__title text-xl mb-1": type === "luxury",
            "featured__title text-lg mb-1": type === "featured",
            "products__title text-lg mb-1": type === "product",
            "new__title text-lg mb-1": type === "new",
          })}
        >
          {name}
        </h3>
        {description && (
          <p className="luxury__description text-text-light-secondary text-sm mb-2 dark:text-text-dark-secondary">
            {description}
          </p>
        )}
        <span
          className={cn("font-bold text-brand-accent dark:text-brand-accent", {
            "luxury__price text-2xl": type === "luxury",
            "featured__price text-xl": type === "featured",
            "products__price text-xl": type === "product",
            "new__price text-xl": type === "new",
          })}
        >
          ${price.toLocaleString()}
        </span>

        {features && features.length > 0 && (
          <div className="luxury__features mt-4 space-y-1">
            {features.map((feature, index) => {
              const IconComponent = iconMap[feature.icon]
              return (
                <span
                  key={index}
                  className="luxury__feature flex items-center text-text-light-secondary text-sm dark:text-text-dark-secondary"
                >
                  {IconComponent && <IconComponent className="w-4 h-4 mr-2 text-brand-accent" />} {feature.text}
                </span>
              )
            })}
          </div>
        )}
      </div>
      {renderButton()}
    </article>
  )
}
