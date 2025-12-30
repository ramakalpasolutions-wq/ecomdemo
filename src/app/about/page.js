import { Leaf, Heart, Award, Users } from 'lucide-react'

export default function AboutPage() {
  const values = [
    {
      icon: Leaf,
      title: 'Organic First',
      description: 'We source only certified organic ingredients from trusted farmers.'
    },
    {
      icon: Heart,
      title: 'Health Focused',
      description: 'Every product is designed with your wellness in mind.'
    },
    {
      icon: Award,
      title: 'Quality Assured',
      description: 'Third-party lab tested for purity and potency.'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Built by wellness enthusiasts, for wellness enthusiasts.'
    }
  ]

  return (
    <div className="bg-[#f5f1e8] min-h-screen py-12">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2d3e5f] mb-4">
            About Nature's Treats
          </h1>
          <p className="text-xl text-[#5a4a3a] max-w-3xl mx-auto">
            We're on a mission to make plant-based wellness accessible, transparent, and delicious.
          </p>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-3xl p-12 mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#2d3e5f] mb-6">Our Story</h2>
              <p className="text-[#5a4a3a] leading-relaxed mb-4">
                Founded in 2020, Nature's Treats was born from a simple belief: that the best supplements come from nature, not laboratories. We started with a commitment to organic, plant-based nutrition that actually tastes good.
              </p>
              <p className="text-[#5a4a3a] leading-relaxed mb-4">
                Today, we're proud to serve thousands of customers who trust us for their daily wellness. Every product is crafted with care, tested for quality, and made with ingredients you can actually pronounce.
              </p>
              <p className="text-[#5a4a3a] leading-relaxed">
                We believe in transparency, sustainability, and the power of plants to transform your health.
              </p>
            </div>
            <div className="relative h-96 rounded-2xl bg-gradient-to-br from-[#d87f3f] to-[#e89d5f] flex items-center justify-center">
              <span className="text-9xl">🌿</span>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#2d3e5f] text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div key={index} className="bg-white rounded-2xl p-8 text-center">
                  <div className="w-16 h-16 bg-[#d87f3f] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="text-white" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-[#2d3e5f] mb-3">{value.title}</h3>
                  <p className="text-[#5a4a3a]">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-br from-[#2d3e5f] to-[#3d5273] rounded-3xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-12">By The Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-5xl font-bold text-[#d87f3f] mb-2">100%</div>
              <div className="text-sm">Organic Ingredients</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-[#d87f3f] mb-2">5000+</div>
              <div className="text-sm">Happy Customers</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-[#d87f3f] mb-2">50+</div>
              <div className="text-sm">Products</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-[#d87f3f] mb-2">4.8★</div>
              <div className="text-sm">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
