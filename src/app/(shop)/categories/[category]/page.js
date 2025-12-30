'use client'
import { useParams } from 'next/navigation'
import ProductCard from '@/components/product/ProductCard'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function CategoryPage() {
  const params = useParams()
  const categorySlug = params.category

  const categoryInfo = {
    name: categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1),
    description: 'Premium organic products for your wellness',
    icon: '🌿'
  }

  const products = [
    {
      id: 1,
      name: 'Organic Raw Crunch Granola',
      slug: 'organic-raw-crunch-granola',
      price: 1299,
      originalPrice: 1599,
      image: '/products/granola.jpg',
      rating: 4.8,
      reviewCount: 234,
      badge: 'bestseller',
      benefits: ['Grain Free', 'Plant-Based']
    },
  ]

  return (
    <div className="bg-[#f5f1e8] min-h-screen py-12">
      <div className="container-custom">
        <Link 
          href="/categories"
          className="inline-flex items-center gap-2 text-[#d87f3f] hover:text-[#c46f2f] mb-8 font-medium"
        >
          <ArrowLeft size={20} />
          Back to Categories
        </Link>

        <div className="text-center mb-12">
          <div className="text-6xl mb-4">{categoryInfo.icon}</div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#2d3e5f] mb-4">
            {categoryInfo.name}
          </h1>
          <p className="text-xl text-[#5a4a3a]">
            {categoryInfo.description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}
