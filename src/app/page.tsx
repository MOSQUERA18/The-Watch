"use client"

import { Header } from "./components/header"
import { Cart } from "./components/cart"
import { Modal } from "./components/modal"
import { HeroGallery } from "./components/hero-gallery"
import { RolexCollection } from "./components/rolex-collection"
import { RichardMilleCollection } from "./components/richard-mille-collection"
import { Featured } from "./components/featured"
import { Products } from "./components/products"
import { NewArrivals } from "./components/new-arrivals"
import { Footer } from "./components/footer"
import { CartProvider } from "@/context/cart-context"
import { useEffect } from "react"

export default function Home() {
  // This useEffect is for handling the scroll active link logic
  // It's placed here to ensure it runs after all sections are rendered
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]")

    const scrollActive = () => {
      const scrollY = window.pageYOffset

      sections.forEach((current) => {
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 58 // Adjustment for fixed header
        const sectionId = current.getAttribute("id")
        const navLink = document.querySelector(`.nav__menu a[href*="${sectionId}"]`)

        if (navLink) {
          if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink.classList.add("active-link")
          } else {
            navLink.classList.remove("active-link")
          }
        }
      })
    }

    window.addEventListener("scroll", scrollActive)
    scrollActive() // Call once on load to set initial active link

    return () => {
      window.removeEventListener("scroll", scrollActive)
    }
  }, [])

  return (
    <CartProvider>
      <Header />
      <Cart />
      <Modal />
      <main className="main">
        <HeroGallery />
        <RolexCollection />
        <RichardMilleCollection />
        <Featured />
        <Products />
        <NewArrivals />
      </main>
      <Footer />
    </CartProvider>
  )
}
