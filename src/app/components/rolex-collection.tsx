import { ProductCard } from "./product-card"
import { Crown } from "lucide-react"

const rolexProducts = [
  {
    id: "rolex-submariner",
    name: "Submariner Date",
    price: 285000,
    image: "rolexnegro.png",
    description: "Acero Oystersteel - 41mm",
    features: [
      { icon: "Water", text: "Waterproof 300m" },
      { icon: "Clock", text: "Automatic Movement" },
    ],
    tag: { text: "Rolex", type: "rolex" as const },
    badge: { text: "Bestseller", type: "bestseller" as const },
  },
  {
    id: "rolex-gmt",
    name: "GMT-Master II",
    price: 450000,
    image: "rolex1.png",
    description: "Oro Everose - 40mm",
    features: [
      { icon: "Globe", text: "Dual Time Zone" },
      { icon: "Diamond", text: "18k Gold" },
    ],
    tag: { text: "Rolex", type: "rolex" as const },
    badge: { text: "New", type: "new" as const },
  },
  {
    id: "rolex-daytona",
    name: "Cosmograph Daytona",
    price: 650000,
    image: "rolex2.png",
    description: "Platino - 40mm",
    features: [
      { icon: "Stopwatch", text: "Chronograph" },
      { icon: "Award", text: "Platinum Case" },
    ],
    tag: { text: "Rolex", type: "rolex" as const },
    badge: { text: "Limited", type: "limited" as const },
  },
]

export function RolexCollection() {
  return (
    <section className="rolex section container mx-auto px-4 py-16" id="rolex">
      <h2 className="section__title text-3xl md:text-4xl font-bold text-center mb-4 text-text-light-primary dark:text-text-dark-primary flex items-center justify-center gap-2">
        <Crown className="section__title-icon text-brand-accent text-3xl" /> Rolex Collection
      </h2>
      <p className="section__subtitle text-center text-text-light-secondary mb-12 dark:text-text-dark-secondary">
        Precisión suiza y elegancia atemporal
      </p>

      <div className="rolex__container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {rolexProducts.map((product) => (
          <ProductCard key={product.id} {...product} type="luxury" />
        ))}
      </div>
    </section>
  )
}
