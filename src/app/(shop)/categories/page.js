import Link from 'next/link'
import { Leaf, Pill, Droplet, Zap, Heart, Moon } from 'lucide-react'

export default function CategoriesPage() {
  const categories = [
    {
      name: 'Snacks',
      slug: 'snacks',
      icon: '🥜',
      description: 'Healthy, plant-based snacks with no refined sugars',
      count: 45,
      color: 'bg-orange-100',
      textColor: 'text-orange-700',
      borderColor: 'border-orange-200'
    },
    {
      name: 'Superfoods',
      slug: 'superfoods',
      icon: '🌱',
      description: 'Nutrient-dense foods packed with vitamins and minerals',
      count: 32,
      color: 'bg-green-100',
      textColor: 'text-green-700',
      borderColor: 'border-green-200'
    },
    {
      name: 'Proteins',
      slug: 'proteins',
      icon: '💪',
      description: 'Plant-based proteins for muscle and recovery',
      count: 28,
      color: 'bg-blue-100',
      textColor: 'text-blue-700',
      borderColor: 'border-blue-200'
    },
    {
      name: 'Wellness',
      slug: 'wellness',
      icon: '✨',
      description: 'Supplements for overall health and vitality',
      count: 38,
      color: 'bg-purple-100',
      textColor: 'text-purple-700',
      borderColor: 'border-purple-200'
    },
    {
      name: 'Herbs',
      slug: 'herbs',
      icon: '🌿',
      description: 'Traditional herbal remedies and adaptogens',
      count: 24,
      color: 'bg-teal-100',
      textColor: 'text-teal-700',
      borderColor: 'border-teal-200'
    },
    {
      name: 'Vitamins',
      slug: 'vitamins',
      icon: '💊',
      description: 'Essential vitamins for daily health',
      count: 35,
      color: 'bg-pink-100',
      textColor: 'text-pink-700',
      borderColor: 'border-pink-200'
    },
  ]

  const healthGoals = [
    { name: 'Energy Boost', icon: Zap, color: 'text-yellow-600' },
    { name: 'Better Sleep', icon: Moon, color: 'text-indigo-600' },
    { name: 'Heart Health', icon: Heart, color: 'text-red-600' },
    { name: 'Immunity', icon: Leaf, color: 'text-green-600' },
    { name: 'Digestion', icon: Droplet, color: 'text-blue-600' },
    { name: 'Stress Relief', icon: Pill, color: 'text-purple-600' },
  ]

  return (
    <div className="bg-[#f5f1e8] min-h-screen py-12">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2d3e5f] mb-4">
            Browse by Category
          </h1>
          <p className="text-xl text-[#5a4a3a] max-w-2xl mx-auto">
            Find the perfect supplements for your wellness goals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {categories.map(category => (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className={`group bg-white rounded-3xl p-8 border-2 ${category.borderColor} hover:shadow-2xl transition-all duration-300 hover:-translate-y-2`}
            >
              <div className={`w-20 h-20 ${category.color} rounded-2xl flex items-center justify-center mb-6 text-4xl group-hover:scale-110 transition-transform`}>
                {category.icon}
              </div>
              <h2 className="text-2xl font-bold text-[#2d3e5f] mb-3 group-hover:text-[#d87f3f] transition-colors">
                {category.name}
              </h2>
              <p className="text-[#5a4a3a] mb-4 leading-relaxed">
                {category.description}
              </p>
              <div className={`inline-flex items-center gap-2 ${category.textColor} font-semibold`}>
                <span>{category.count} products</span>
                <span className="group-hover:translate-x-2 transition-transform">→</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="bg-white rounded-3xl p-12 shadow-sm">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#2d3e5f] mb-4">
              Shop by Health Goal
            </h2>
            <p className="text-lg text-[#5a4a3a]">
              What would you like to improve today?
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {healthGoals.map(goal => {
              const Icon = goal.icon
              return (
                <Link
                  key={goal.name}
                  href={`/products?goal=${goal.name.toLowerCase().replace(' ', '-')}`}
                  className="flex flex-col items-center p-6 rounded-2xl hover:bg-gray-50 transition-colors group"
                >
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className={goal.color} size={28} />
                  </div>
                  <span className="text-sm font-semibold text-[#2d3e5f] text-center">
                    {goal.name}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
