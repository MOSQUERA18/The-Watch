import { ProductCard } from "./product-card"

const newArrivals = [
  {
    id: "longines-rose",
    name: "Longines Rose",
    price: 980,
    image: "/placeholder.svg?height=300&width=300",
    tag: { text: "New", type: "new" as const },
  },
  {
    id: "jazzmaster-new",
    name: "Jazzmaster",
    price: 1150,
    image: "/placeholder.svg?height=300&width=300",
    tag: { text: "New", type: "new" as const },
  },
  {
    id: "dreyfuss-gold",
    name: "Dreyfuss Gold",
    price: 750,
    image: "/placeholder.svg?height=300&width=300", // Original was img/story.png
    tag: { text: "New", type: "new" as const },
  },
  {
    id: "portuguese-rose",
    name: "Portuguese Rose",
    price: 1590,
    image: "/placeholder.svg?height=300&width=300", // Original was img/testimonial.png
    tag: { text: "New", type: "new" as const },
  },
]

export function NewArrivals() {
  return (
    <section className="new section container mx-auto px-4 py-16" id="new">
      <h2 className="section__title text-3xl md:text-4xl font-bold text-center mb-12 text-text-light-primary dark:text-text-dark-primary">
        New Arrivals
      </h2>
      <div className="new__container">
        <div className="new__grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} {...product} type="new" />
          ))}
        </div>
      </div>
    </section>
  )
}
