'use client'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import ProductCard from '@/components/product/ProductCard'
import { Star, Truck, Shield, Heart, Share2, Plus, Minus, ArrowLeft } from 'lucide-react'

export default function ProductDetailPage() {
  const params = useParams()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const product = {
    id: 1,
    name: 'Organic Raw Crunch Granola',
    slug: 'organic-raw-crunch-granola',
    price: 1299,
    originalPrice: 1599,
    discount: 19,
    images: [
      '/products/granola-1.jpg',
      '/products/granola-2.jpg',
      '/products/granola-3.jpg',
      '/products/granola-4.jpg',
    ],
    rating: 4.8,
    reviewCount: 234,
    badge: 'bestseller',
    benefits: ['Grain Free', 'Plant-Based', 'Organic', 'No Refined Sugar'],
    category: 'Snacks',
    stock: 45,
    description: 'Our Organic Raw Crunch Granola is made with sprouted ingredients and contains no refined sugars. Perfect for breakfast or as a healthy snack throughout the day. Made with love and care using only the finest organic ingredients.',
    ingredients: 'Organic Coconut Flakes, Sprouted Sunflower Seeds, Sprouted Pumpkin Seeds, Banana, Dried Plums, Organic Maca Powder',
    servingSize: '200g (7 oz)',
    servingsPerContainer: '7',
    nutritionFacts: [
      { label: 'Calories', value: '150' },
      { label: 'Total Fat', value: '8g' },
      { label: 'Protein', value: '5g' },
      { label: 'Total Carbs', value: '15g' },
      { label: 'Fiber', value: '4g' },
    ],
    certifications: ['USDA Organic', 'Non-GMO Project Verified', 'Vegan', 'Gluten-Free'],
    howToUse: 'Enjoy as is for a crunchy snack, add to yogurt, or use as a topping for smoothie bowls. Store in a cool, dry place.'
  }

  const relatedProducts = [
    {
      id: 2,
      name: 'Sprouted Almond Butter',
      slug: 'sprouted-almond-butter',
      price: 799,
      originalPrice: 999,
      image: '/products/almond-butter.jpg',
      rating: 4.7,
      reviewCount: 312,
      benefits: ['Sugar Free', 'Refined Free']
    },
  ]

  const handleAddToCart = () => {
    console.log('Added to cart:', product.id, 'Quantity:', quantity)
    alert(`Added ${quantity} item(s) to cart!`)
  }

  return (
    <div className="bg-[#f5f1e8] min-h-screen py-8">
      <div className="container-custom">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-8">
          <Link href="/" className="text-[#5a4a3a] hover:text-[#d87f3f]">Home</Link>
          <span className="text-gray-400">/</span>
          <Link href="/products" className="text-[#5a4a3a] hover:text-[#d87f3f]">Products</Link>
          <span className="text-gray-400">/</span>
          <Link href={`/categories/${product.category.toLowerCase()}`} className="text-[#5a4a3a] hover:text-[#d87f3f]">
            {product.category}
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-[#2d3e5f] font-medium">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div>
            <div className="bg-white rounded-3xl overflow-hidden mb-4 aspect-square relative">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
              />
              {product.badge && (
                <span className="absolute top-6 left-6 px-4 py-2 text-sm font-bold rounded-full bg-yellow-400 text-gray-900 uppercase">
                  {product.badge}
                </span>
              )}
              {product.discount && (
                <span className="absolute top-6 right-6 px-4 py-2 text-sm font-bold rounded-full bg-red-500 text-white">
                  {product.discount}% OFF
                </span>
              )}
            </div>

            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === index ? 'border-[#d87f3f]' : 'border-gray-200'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} ${index + 1}`}
                    width={150}
                    height={150}
                    className="object-cover w-full h-full"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-4xl font-bold text-[#2d3e5f] mb-4">{product.name}</h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="font-semibold text-[#2d3e5f]">{product.rating}</span>
                <span className="text-[#5a4a3a]">({product.reviewCount} reviews)</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {product.benefits.map((benefit, index) => (
                <span key={index} className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                  {benefit}
                </span>
              ))}
            </div>

            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-4xl font-bold text-[#2d3e5f]">₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">₹{product.originalPrice}</span>
              )}
            </div>

            <p className="text-[#5a4a3a] leading-relaxed mb-6">
              {product.description}
            </p>

            <div className="mb-6">
              {product.stock > 0 ? (
                <p className="text-green-600 font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                  In Stock ({product.stock} units available)
                </p>
              ) : (
                <p className="text-red-600 font-semibold">Out of Stock</p>
              )}
            </div>

            <div className="flex items-center gap-4 mb-6">
              <span className="font-semibold text-[#2d3e5f]">Quantity:</span>
              <div className="flex items-center border-2 border-gray-200 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-gray-100 transition-colors"
                >
                  <Minus size={18} />
                </button>
                <span className="px-6 font-semibold text-[#2d3e5f]">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="p-3 hover:bg-gray-100 transition-colors"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            <div className="flex gap-4 mb-8">
              <Button
                variant="primary"
                size="lg"
                className="flex-1"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                Add to Cart
              </Button>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`p-4 border-2 rounded-lg transition-all ${
                  isWishlisted
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-200 hover:border-[#d87f3f]'
                }`}
              >
                <Heart
                  size={24}
                  className={isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}
                />
              </button>
              <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-[#d87f3f] transition-all">
                <Share2 size={24} className="text-gray-600" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 p-6 bg-white rounded-2xl">
              <div className="flex items-center gap-3">
                <Truck className="text-[#d87f3f]" size={24} />
                <div>
                  <div className="font-semibold text-[#2d3e5f] text-sm">Free Shipping</div>
                  <div className="text-xs text-[#5a4a3a]">On orders over ₹999</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="text-[#d87f3f]" size={24} />
                <div>
                  <div className="font-semibold text-[#2d3e5f] text-sm">Certified Organic</div>
                  <div className="text-xs text-[#5a4a3a]">Lab tested & verified</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Information */}
        <div className="bg-white rounded-3xl p-8 mb-16">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold text-[#2d3e5f] mb-4">Ingredients</h3>
              <p className="text-[#5a4a3a] leading-relaxed">{product.ingredients}</p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#2d3e5f] mb-4">Nutrition Facts</h3>
              <div className="space-y-2">
                <div className="text-sm text-[#5a4a3a] mb-2">
                  Serving Size: {product.servingSize}
                </div>
                {product.nutritionFacts.map((fact, index) => (
                  <div key={index} className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-[#5a4a3a]">{fact.label}</span>
                    <span className="font-semibold text-[#2d3e5f]">{fact.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#2d3e5f] mb-4">How to Use</h3>
              <p className="text-[#5a4a3a] leading-relaxed mb-4">{product.howToUse}</p>
              <div className="flex flex-wrap gap-2">
                {product.certifications.map((cert, index) => (
                  <span key={index} className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-semibold">
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="text-3xl font-bold text-[#2d3e5f] mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
