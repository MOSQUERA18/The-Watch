import { ProductCard } from "./product-card"

const featuredProducts = [
  {
    id: "jazzmaster",
    name: "Jazzmaster",
    price: 1050,
    image: "/placeholder.svg?height=300&width=300",
    tag: { text: "Sale", type: "sale" as const },
  },
  {
    id: "ingersoll",
    name: "Ingersoll",
    price: 250,
    image: "/placeholder.svg?height=300&width=300",
    tag: { text: "Sale", type: "sale" as const },
  },
  {
    id: "rose-gold",
    name: "Rose Gold",
    price: 890,
    image: "/placeholder.svg?height=300&width=300",
    tag: { text: "Sale", type: "sale" as const },
  },
]

export function Featured() {
  return (
    <section className="featured section container mx-auto px-4 py-16" id="featured">
      <h2 className="section__title text-3xl md:text-4xl font-bold text-center mb-12 text-text-light-primary dark:text-text-dark-primary">
        Featured
      </h2>
      <div className="featured__container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} {...product} type="featured" />
        ))}
      </div>
    </section>
  )
}
