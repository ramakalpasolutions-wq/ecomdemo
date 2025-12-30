import Link from 'next/link'
import Button from '@/components/ui/Button'
import ProductCard from '@/components/product/ProductCard'
import ErrorBanner from '@/components/ui/ErrorBanner'
import { ArrowRight, Shield, Truck, Award, Leaf } from 'lucide-react'

// Fetch products from API
async function getFeaturedProducts() {
  try {
    const res = await fetch('http://localhost:3000/api/products', {
      cache: 'no-store'
    })
    const data = await res.json()
    return data.success ? data.data.slice(0, 4) : []
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

// Fetch categories from API
async function getCategories() {
  try {
    const res = await fetch('http://localhost:3000/api/categories', {
      cache: 'no-store'
    })
    const data = await res.json()
    return data.success ? data.data.slice(0, 4) : []
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

export default async function HomePage({ searchParams }) {
  const featuredProducts = await getFeaturedProducts()
  const categories = await getCategories()
  
  // Get error from search params
  const error = searchParams?.error

  return (
    <div>
      {/* Error Banners */}
      {error === 'admin_only' && (
        <ErrorBanner 
          message="Access Denied: Only administrators can access the admin panel." 
          type="error"
        />
      )}
      {error === 'unauthorized' && (
        <ErrorBanner 
          message="You don't have permission to access that page." 
          type="warning"
        />
      )}

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#f5f1e8] via-[#faf7f0] to-white overflow-hidden">
        <div className="container-custom py-24 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <div className="inline-block mb-4 px-4 py-2 bg-[#d87f3f] text-white text-sm font-semibold rounded-full uppercase tracking-wide">
                Plant-Powered Nutrition
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#2d3e5f] mb-6 leading-tight">
                Real Ingredients.<br/>
                <span className="text-[#d87f3f]">Smarter Wellness.</span>
              </h1>
              <p className="text-xl text-[#5a4a3a] mb-8 leading-relaxed">
                Organic, plant-based supplements crafted with nature's finest ingredients. No refined sugars, no compromises.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link href="/products">
                  <Button variant="primary" size="lg">
                    Shop Now
                    <ArrowRight size={20} className="ml-2" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="secondary" size="lg">
                    Our Story
                  </Button>
                </Link>
              </div>
              
              <div className="flex flex-wrap gap-6 mt-12 justify-center md:justify-start">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-[#6b8e4e] flex items-center justify-center">
                    <Leaf className="text-white" size={20} />
                  </div>
                  <span className="text-sm font-semibold text-[#2d3e5f]">100% Organic</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-[#d87f3f] flex items-center justify-center">
                    <Shield className="text-white" size={20} />
                  </div>
                  <span className="text-sm font-semibold text-[#2d3e5f]">Lab Tested</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-[#5a7c9f] flex items-center justify-center">
                    <Award className="text-white" size={20} />
                  </div>
                  <span className="text-sm font-semibold text-[#2d3e5f]">Non-GMO</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative h-[500px] rounded-[3rem] bg-gradient-to-br from-[#d87f3f] to-[#e89d5f] overflow-hidden shadow-2xl">
                <div className="absolute inset-0 flex items-center justify-center text-9xl opacity-20">
                  🌿
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 max-w-xs">
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-3xl">✓</div>
                  <div>
                    <p className="font-bold text-[#2d3e5f]">Certified Organic</p>
                    <p className="text-sm text-[#5a4a3a]">USDA & Non-GMO</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Shop by Category - FROM DATABASE */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#2d3e5f] mb-4">
              Shop by Category
            </h2>
            <p className="text-xl text-[#5a4a3a]">Find your perfect plant-based wellness companion</p>
          </div>
          
          {categories.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categories.map((category) => (
                <Link 
                  key={category._id}
                  href={`/categories/${category.slug}`}
                  className="group relative bg-white p-8 rounded-3xl text-center hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-[#d87f3f] overflow-hidden"
                >
                  <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <h3 className="font-bold text-xl text-[#2d3e5f] group-hover:text-[#d87f3f] transition-colors mb-2">
                    {category.name}
                  </h3>
                  <p className="text-sm text-[#5a4a3a]">{category.count || 0} products</p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No categories available yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Featured Products - FROM DATABASE */}
      <section className="py-20 bg-[#f5f1e8]">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#2d3e5f] mb-4">
              Customer Favorites
            </h2>
            <p className="text-xl text-[#5a4a3a]">Our most loved plant-based treats</p>
          </div>
          
          {featuredProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {featuredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
              <div className="text-center mt-12">
                <Link href="/products">
                  <Button variant="primary" size="lg">
                    View All Products
                    <ArrowRight size={20} className="ml-2" />
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No products available yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#2d3e5f] mb-4">
              Naturally Pure, Thoroughly Tested
            </h2>
            <p className="text-xl text-[#5a4a3a]">Clean, plant-based ingredients you can trust</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-3xl bg-gradient-to-br from-[#f5f1e8] to-white">
              <div className="w-20 h-20 mx-auto mb-6 bg-[#6b8e4e] rounded-full flex items-center justify-center">
                <Leaf className="text-white" size={32} />
              </div>
              <h3 className="font-bold text-2xl text-[#2d3e5f] mb-3">Plant-Based</h3>
              <p className="text-[#5a4a3a] leading-relaxed">
                Sprouted, organic ingredients with no refined sugars or artificial additives.
              </p>
            </div>
            <div className="text-center p-8 rounded-3xl bg-gradient-to-br from-[#f5f1e8] to-white">
              <div className="w-20 h-20 mx-auto mb-6 bg-[#d87f3f] rounded-full flex items-center justify-center">
                <Shield className="text-white" size={32} />
              </div>
              <h3 className="font-bold text-2xl text-[#2d3e5f] mb-3">Lab Verified</h3>
              <p className="text-[#5a4a3a] leading-relaxed">
                Third-party tested for purity, potency, and heavy metals.
              </p>
            </div>
            <div className="text-center p-8 rounded-3xl bg-gradient-to-br from-[#f5f1e8] to-white">
              <div className="w-20 h-20 mx-auto mb-6 bg-[#5a7c9f] rounded-full flex items-center justify-center">
                <Award className="text-white" size={32} />
              </div>
              <h3 className="font-bold text-2xl text-[#2d3e5f] mb-3">Certified Organic</h3>
              <p className="text-[#5a4a3a] leading-relaxed">
                USDA Organic, Non-GMO Project Verified, and allergen-free.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-[#2d3e5f] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 text-9xl">🌿</div>
          <div className="absolute bottom-10 left-10 text-9xl">🥜</div>
        </div>
        <div className="container-custom text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Subscribe & Save 15%
          </h2>
          <p className="text-xl text-[#f5f1e8] mb-8 max-w-2xl mx-auto">
            Never run out of your wellness essentials. Free shipping on all subscriptions.
          </p>
          <Button variant="primary" size="lg">
            Start Your Subscription
          </Button>
        </div>
      </section>
    </div>
  )
}
