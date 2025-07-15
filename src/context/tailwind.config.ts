import type { Config } from "tailwindcss"
import defaultConfig from "shadcn/ui/tailwind.config"

const config: Config = {
  ...defaultConfig,
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
      ...defaultConfig.theme.extend,
      colors: {
        ...defaultConfig.theme.extend.colors,
        primary: {
          ...defaultConfig.theme.extend.colors.primary,
          50: "hsl(48, 100%, 95%)",
          100: "hsl(48, 100%, 90%)",
          200: "hsl(48, 100%, 80%)",
          300: "hsl(48, 100%, 70%)",
          400: "hsl(48, 100%, 60%)",
          500: "hsl(48, 100%, 50%)", // Bright Yellow
          600: "hsl(48, 100%, 40%)", // Darker Yellow
          700: "hsl(48, 100%, 30%)",
          800: "hsl(48, 100%, 20%)",
          900: "hsl(48, 100%, 10%)",
        },
        gray: {
          50: "hsl(0, 0%, 95%)", // Light body background
          100: "hsl(0, 0%, 100%)", // White container background
          200: "hsl(0, 0%, 90%)",
          300: "hsl(0, 0%, 65%)", // Light text
          400: "hsl(0, 0%, 50%)",
          500: "hsl(0, 0%, 35%)", // Default text
          600: "hsl(0, 0%, 24%)", // Dark container background (dark theme)
          700: "hsl(0, 0%, 18%)", // Dark body background (dark theme)
          800: "hsl(0, 0%, 15%)", // Dark title
          900: "hsl(0, 0%, 0%)", // True Black for dark mode body/container
        },
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      zIndex: {
        tooltip: "10",
        fixed: "100",
        modal: "1000",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [...defaultConfig.plugins, require("tailwindcss-animate")],
}

export default config
