import { ProductCard } from "./product-card"

const products = [
  {
    id: "spirit-rose",
    name: "Spirit Rose",
    price: 1500,
    image: "/placeholder.svg?height=250&width=250",
  },
  {
    id: "khaki-pilot",
    name: "Khaki Pilot",
    price: 1350,
    image: "/placeholder.svg?height=250&width=250",
  },
  {
    id: "jubilee-black",
    name: "Jubilee Black",
    price: 870,
    image: "/placeholder.svg?height=250&width=250",
  },
  {
    id: "fosil-me3",
    name: "Fosil Me3",
    price: 650,
    image: "/placeholder.svg?height=250&width=250",
  },
  {
    id: "duchen",
    name: "Duchen",
    price: 950,
    image: "/placeholder.svg?height=250&width=250",
  },
]

export function Products() {
  return (
    <section className="products section container mx-auto px-4 py-16" id="products">
      <h2 className="section__title text-3xl md:text-4xl font-bold text-center mb-12 text-text-light-primary dark:text-text-dark-primary">
        Products
      </h2>
      <div className="products__container grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} type="product" />
        ))}
      </div>
    </section>
  )
}
