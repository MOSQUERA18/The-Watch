import type { Config } from "tailwindcss"
import defaultConfig from "shadcn/ui/tailwind.config"

const config: Config = {
  darkMode: ["class"], // Enable dark mode based on 'dark' class
  content: [
    ...defaultConfig.content,
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    ...defaultConfig.theme,
    extend: {
      colors: {
        ...defaultConfig.theme.extend.colors,
        // Custom brand colors based on your new CSS variables
        "brand-primary": "#1a1a1a", // Soft black for header, default dark elements
        "brand-secondary": "#f5f5f5", // Light background for some sections
        "brand-accent": "#d4af37", // Gold accent
        "brand-whatsapp": "#25d366", // WhatsApp green

        // Text colors (light theme)
        "text-light-primary": "#333333",
        "text-light-secondary": "#666666",
        "text-light-tertiary": "#999999",

        // Backgrounds/Borders/Shadows (light theme)
        "bg-light-default": "#ffffff",
        "bg-light-soft": "#f5f5f5",
        "border-light-default": "#e5e5e5",
        "shadow-light-soft": "rgba(0, 0, 0, 0.05)",
        "shadow-light-medium": "rgba(0, 0, 0, 0.15)",
        "shadow-light-dark": "rgba(0, 0, 0, 0.25)",

        // Dark Theme Specific Colors
        "bg-dark-default": "#121212", // Very soft dark background for body
        "bg-dark-card": "#212121", // Darker background for cards in dark mode
        "text-dark-primary": "#e0e0e0", // Light text for dark backgrounds
        "text-dark-secondary": "#b0b0b0", // Slightly darker light text
        "border-dark-default": "#333333", // Dark border
        "shadow-dark-soft": "rgba(255, 255, 255, 0.08)", // Soft shadow for dark mode
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Updated font family
      },
      zIndex: {
        tooltip: "10",
        fixed: "100",
        modal: "1000",
      },
    },
  },
  plugins: [...defaultConfig.plugins, require("tailwindcss-animate")],
}

export default config
