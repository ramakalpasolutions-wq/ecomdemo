'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Star, ShoppingCart } from 'lucide-react'

export default function ProductCard({ product }) {
  const [adding, setAdding] = useState(false)

  const addToCart = async (e) => {
    e.preventDefault() // Prevent Link navigation
    
    setAdding(true)
    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product._id, quantity: 1 })
      })

      const data = await res.json()

      if (data.success) {
        alert('Added to cart!')
        // Refresh navbar cart count
        window.dispatchEvent(new Event('cartUpdated'))
      } else {
        if (res.status === 401) {
          alert('Please login to add items to cart')
          window.location.href = '/login?redirect=/products'
        } else {
          alert(data.error || 'Failed to add to cart')
        }
      }
    } catch (error) {
      console.error('Add to cart error:', error)
      alert('Failed to add to cart')
    } finally {
      setAdding(false)
    }
  }

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <Link href={`/products/${product.slug}`} className="block group">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
        {/* Product Image */}
        <div className="relative h-64 bg-gray-100 overflow-hidden">
          {product.images && product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-6xl">
              📦
            </div>
          )}
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.badge === 'bestseller' && (
              <span className="px-3 py-1 bg-[#d87f3f] text-white text-xs font-bold rounded-full">
                BESTSELLER
              </span>
            )}
            {product.badge === 'new' && (
              <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                NEW
              </span>
            )}
            {discount > 0 && (
              <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                {discount}% OFF
              </span>
            )}
          </div>

          {/* Stock Badge */}
          {product.stock <= 5 && product.stock > 0 && (
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 bg-yellow-500 text-white text-xs font-bold rounded-full">
                Only {product.stock} left
              </span>
            </div>
          )}
          {product.stock === 0 && (
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 bg-gray-500 text-white text-xs font-bold rounded-full">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-6">
          <div className="text-sm text-[#d87f3f] font-semibold mb-2">
            {product.category}
          </div>
          
          <h3 className="font-bold text-lg text-[#2d3e5f] mb-2 group-hover:text-[#d87f3f] transition-colors line-clamp-2">
            {product.name}
          </h3>
          
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {product.description}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
              />
            ))}
            <span className="text-sm text-gray-600 ml-1">
              ({product.reviewCount || 0})
            </span>
          </div>

          {/* Price & Add to Cart */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-[#2d3e5f]">
                ₹{product.price}
              </div>
              {product.originalPrice && (
                <div className="text-sm text-gray-500 line-through">
                  ₹{product.originalPrice}
                </div>
              )}
            </div>

            <button
              onClick={addToCart}
              disabled={adding || product.stock === 0}
              className="bg-[#d87f3f] text-white p-3 rounded-full hover:bg-[#c46f2f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title={product.stock === 0 ? 'Out of stock' : 'Add to cart'}
            >
              {adding ? (
                <div className="animate-spin">⏳</div>
              ) : (
                <ShoppingCart size={20} />
              )}
            </button>
          </div>

          {/* Benefits */}
          {product.benefits && product.benefits.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {product.benefits.slice(0, 3).map((benefit, index) => (
                <span
                  key={index}
                  className="text-xs bg-[#f5f1e8] text-[#5a4a3a] px-2 py-1 rounded-full"
                >
                  {benefit}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
