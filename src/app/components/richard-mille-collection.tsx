import { ProductCard } from "./product-card"
import { Diamond } from "lucide-react"

const richardMilleProducts = [
  {
    id: "rm-mclaren",
    name: "RM 11-03 McLaren",
    price: 1200000,
    image: "richard1.png",
    description: "Titanio y Carbono TPT",
    features: [
      { icon: "Car", text: "McLaren Edition" }, // Using generic 'Car' icon as 'bx-car' is not in Lucide
      { icon: "Atom", text: "Carbon TPT" }, // Using generic 'Atom' icon as 'bx-atom' is not in Lucide
    ],
    tag: { text: "Richard Mille", type: "rm" as const },
    badge: { text: "Exclusive", type: "exclusive" as const },
  },
  {
    id: "rm-nadal",
    name: "RM 27-04 Tourbillon",
    price: 2500000,
    image: "richard1.png",
    description: "Rafael Nadal Edition",
    features: [
      { icon: "TennisBall", text: "Nadal Edition" }, // Using generic 'TennisBall' icon as 'bx-tennis-ball' is not in Lucide
      { icon: "Cog", text: "Tourbillon" }, // Using generic 'Cog' icon as 'bx-cog' is not in Lucide
    ],
    tag: { text: "Richard Mille", type: "rm" as const },
    badge: { text: "Limited 50pcs", type: "limited" as const },
  },
  {
    id: "rm-automatic",
    name: "RM 35-03 Automatic",
    price: 850000,
    image: "richard1.png",
    description: "Carbon TPT y Cuarzo TPT",
    features: [
      { icon: "RefreshCw", text: "Automatic" },
      { icon: "Shield", text: "Shock Resistant" },
    ],
    tag: { text: "Richard Mille", type: "rm" as const },
    badge: { text: "New Arrival", type: "new-arrival" as const },
  },
]

export function RichardMilleCollection() {
  return (
    <section className="richard-mille section container mx-auto px-4 py-16" id="richard-mille">
      <h2 className="section__title text-3xl md:text-4xl font-bold text-center mb-4 text-white flex items-center justify-center gap-2">
        <Diamond className="section__title-icon text-brand-accent text-3xl" /> Richard Mille Collection
      </h2>
      <p className="section__subtitle text-center text-white mb-12">Innovación extrema y diseño vanguardista</p>

      <div className="richard-mille__container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {richardMilleProducts.map((product) => (
          <ProductCard key={product.id} {...product} type="luxury" />
        ))}
      </div>
    </section>
  )
}
