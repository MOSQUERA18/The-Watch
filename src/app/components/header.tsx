"use client"

import { useState, useEffect } from "react"
import { Watch, Moon, ShoppingCart, X, Menu, ChevronDown } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { cn } from "@/lib/utils"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { cart, theme, toggleTheme, openCart } = useCart()
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  useEffect(() => {
    // Toggle 'dark-theme' class on body based on theme state
    document.body.classList.toggle("dark-theme", theme === "dark")
    // Toggle 'show-menu' class on nav-menu based on isMenuOpen state
    const navMenu = document.getElementById("nav-menu")
    if (navMenu) {
      navMenu.classList.toggle("show-menu", isMenuOpen)
    }
  }, [theme, isMenuOpen])

  const handleNavLinkClick = () => {
    setIsMenuOpen(false)
  }

  return (
    <header
      className="header fixed top-0 left-0 w-full bg-brand-primary z-fixed transition-all duration-300 ease-in-out"
      id="header"
    >
      <nav className="nav container mx-auto h-16 flex justify-between items-center px-4">
        <a href="#" className="nav__logo flex items-center text-xl font-semibold text-white">
          <Watch className="nav__logo-icon mr-2 text-2xl text-brand-accent" /> The Marlon Watch
        </a>

        <div
          className={cn(
            "nav__menu fixed top-0 right-0 w-3/4 h-full bg-brand-primary shadow-light-dark transition-all duration-300 ease-in-out z-[1500] md:relative md:w-auto md:h-auto md:bg-transparent md:shadow-none md:translate-x-0",
            {
              "show-menu": isMenuOpen, // Use the class defined in globals.css
            },
          )}
          id="nav-menu"
        >
          <ul className="nav__list flex flex-col p-8 gap-6 md:flex-row md:p-0 md:gap-8">
            <li className="nav__item">
              <a
                href="#hero-gallery"
                className="nav__link active-link text-white hover:text-brand-accent dark:text-text-dark-secondary dark:hover:text-brand-accent"
                onClick={handleNavLinkClick}
              >
                Home
              </a>
            </li>
            <li className="nav__item nav__dropdown relative group">
              <a
                href="#rolex"
                className="nav__link nav__dropdown-link flex items-center text-white hover:text-brand-accent dark:text-text-dark-secondary dark:hover:text-brand-accent"
              >
                Rolex{" "}
                <ChevronDown className="nav__dropdown-icon ml-1 text-lg transition-transform duration-300 group-hover:rotate-180" />
              </a>
              <div className="nav__dropdown-menu absolute top-full left-0 bg-brand-primary shadow-light-medium rounded-md opacity-0 invisible transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 dark:bg-bg-dark-card md:min-w-[160px]">
                <a
                  href="#rolex"
                  className="nav__dropdown-item block px-4 py-2 text-white hover:bg-brand-accent hover:text-brand-primary dark:text-text-dark-secondary dark:hover:bg-dark-border"
                  onClick={handleNavLinkClick}
                >
                  Ver Colección
                </a>
                <a
                  href="#rolex"
                  className="nav__dropdown-item block px-4 py-2 text-white hover:bg-brand-accent hover:text-brand-primary dark:text-text-dark-secondary dark:hover:bg-dark-border"
                  onClick={handleNavLinkClick}
                >
                  Day-Date
                </a>
                <a
                  href="#rolex"
                  className="nav__dropdown-item block px-4 py-2 text-white hover:bg-brand-accent hover:text-brand-primary dark:text-text-dark-secondary dark:hover:bg-dark-border"
                  onClick={handleNavLinkClick}
                >
                  Submariner
                </a>
                <a
                  href="#rolex"
                  className="nav__dropdown-item block px-4 py-2 text-white hover:bg-brand-accent hover:text-brand-primary dark:text-text-dark-secondary dark:hover:bg-dark-border"
                  onClick={handleNavLinkClick}
                >
                  GMT-Master
                </a>
              </div>
            </li>
            <li className="nav__item nav__dropdown relative group">
              <a
                href="#richard-mille"
                className="nav__link nav__dropdown-link flex items-center text-white hover:text-brand-accent dark:text-text-dark-secondary dark:hover:text-brand-accent"
              >
                Richard Mille{" "}
                <ChevronDown className="nav__dropdown-icon ml-1 text-lg transition-transform duration-300 group-hover:rotate-180" />
              </a>
              <div className="nav__dropdown-menu absolute top-full left-0 bg-brand-primary shadow-light-medium rounded-md opacity-0 invisible transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 dark:bg-bg-dark-card md:min-w-[160px]">
                <a
                  href="#richard-mille"
                  className="nav__dropdown-item block px-4 py-2 text-white hover:bg-brand-accent hover:text-brand-primary dark:text-text-dark-secondary dark:hover:bg-dark-border"
                  onClick={handleNavLinkClick}
                >
                  Ver Colección
                </a>
                <a
                  href="#richard-mille"
                  className="nav__dropdown-item block px-4 py-2 text-white hover:bg-brand-accent hover:text-brand-primary dark:text-text-dark-secondary dark:hover:bg-dark-border"
                  onClick={handleNavLinkClick}
                >
                  RM Series
                </a>
                <a
                  href="#richard-mille"
                  className="nav__dropdown-item block px-4 py-2 text-white hover:bg-brand-accent hover:text-brand-primary dark:text-text-dark-secondary dark:hover:bg-dark-border"
                  onClick={handleNavLinkClick}
                >
                  Limited Edition
                </a>
                <a
                  href="#richard-mille"
                  className="nav__dropdown-item block px-4 py-2 text-white hover:bg-brand-accent hover:text-brand-primary dark:text-text-dark-secondary dark:hover:bg-dark-border"
                  onClick={handleNavLinkClick}
                >
                  Sport Collection
                </a>
              </div>
            </li>
            <li className="nav__item">
              <a
                href="#featured"
                className="nav__link text-white hover:text-brand-accent dark:text-text-dark-secondary dark:hover:text-brand-accent"
                onClick={handleNavLinkClick}
              >
                Featured
              </a>
            </li>
            <li className="nav__item">
              <a
                href="#products"
                className="nav__link text-white hover:text-brand-accent dark:text-text-dark-secondary dark:hover:text-brand-accent"
                onClick={handleNavLinkClick}
              >
                Products
              </a>
            </li>
            <li className="nav__item">
              <a
                href="#new"
                className="nav__link text-white hover:text-brand-accent dark:text-text-dark-secondary dark:hover:text-brand-accent"
                onClick={handleNavLinkClick}
              >
                New
              </a>
            </li>
          </ul>
          <div
            className="nav__close absolute top-4 right-4 text-2xl cursor-pointer md:hidden"
            id="nav-close"
            onClick={() => setIsMenuOpen(false)}
          >
            <X />
          </div>
        </div>

        <div className="nav__btns flex items-center gap-4">
          <div className="nav__icon-wrapper w-8 h-8" onClick={toggleTheme}>
            <Moon className="change-theme text-2xl text-white dark:text-text-dark-primary" id="theme-button" />
          </div>
          <div className="nav__shop relative cursor-pointer w-8 h-8" id="cart-shop" onClick={openCart}>
            <ShoppingCart className="text-2xl text-white dark:text-text-dark-primary" />
            {totalItems > 0 && (
              <span
                className="cart-count absolute -top-2 -right-2 bg-brand-accent text-brand-primary text-xs rounded-full w-5 h-5 flex items-center justify-center"
                id="cart-count"
              >
                {totalItems}
              </span>
            )}
          </div>
          <div
            className="nav__toggle text-2xl cursor-pointer md:hidden w-8 h-8"
            id="nav-toggle"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu />
          </div>
        </div>
      </nav>
    </header>
  )
}