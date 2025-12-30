'use client'
import { useState } from 'react'
import Image from 'next/image'
import { Upload } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function HeroManagementPage() {
  const [heroData, setHeroData] = useState({
    badge: 'Plant-Powered Nutrition',
    title: 'Real Ingredients.',
    subtitle: 'Smarter Wellness.',
    description: 'Organic, plant-based supplements crafted with nature\'s finest ingredients. No refined sugars, no compromises.',
    buttonText: 'Shop Now',
    buttonLink: '/products',
    image: '/hero-image.jpg'
  })
  const [imagePreview, setImagePreview] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setHeroData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const preview = URL.createObjectURL(file)
      setImagePreview(preview)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Will implement API call to save to MongoDB
    console.log('Hero Data:', heroData)
    alert('Hero section will be updated in MongoDB!')
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#2d3e5f] mb-8">Hero Section Management</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            {/* Badge Text */}
            <div>
              <label className="block text-sm font-semibold text-[#2d3e5f] mb-2">
                Badge Text
              </label>
              <input
                type="text"
                name="badge"
                value={heroData.badge}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d87f3f] focus:border-transparent outline-none"
              />
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-[#2d3e5f] mb-2">
                Main Title
              </label>
              <input
                type="text"
                name="title"
                value={heroData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d87f3f] focus:border-transparent outline-none"
              />
            </div>

            {/* Subtitle */}
            <div>
              <label className="block text-sm font-semibold text-[#2d3e5f] mb-2">
                Subtitle (Orange Text)
              </label>
              <input
                type="text"
                name="subtitle"
                value={heroData.subtitle}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d87f3f] focus:border-transparent outline-none"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-[#2d3e5f] mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={heroData.description}
                onChange={handleInputChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d87f3f] focus:border-transparent outline-none"
              />
            </div>

            {/* Button Text */}
            <div>
              <label className="block text-sm font-semibold text-[#2d3e5f] mb-2">
                Button Text
              </label>
              <input
                type="text"
                name="buttonText"
                value={heroData.buttonText}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d87f3f] focus:border-transparent outline-none"
              />
            </div>

            {/* Button Link */}
            <div>
              <label className="block text-sm font-semibold text-[#2d3e5f] mb-2">
                Button Link
              </label>
              <input
                type="text"
                name="buttonLink"
                value={heroData.buttonLink}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d87f3f] focus:border-transparent outline-none"
              />
            </div>
          </div>

          {/* Hero Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-[#2d3e5f] mb-2">
              Hero Image
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center h-96">
              {imagePreview || heroData.image ? (
                <div className="relative w-full h-full">
                  <Image
                    src={imagePreview || heroData.image}
                    alt="Hero"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              ) : (
                <>
                  <Upload className="mx-auto text-gray-400 mb-2" size={40} />
                  <p className="text-sm text-gray-600">Upload hero image</p>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="hero-upload"
              />
              <label 
                htmlFor="hero-upload" 
                className="inline-block mt-4 px-4 py-2 bg-[#d87f3f] text-white rounded-lg cursor-pointer hover:bg-[#c46f2f]"
              >
                Change Image
              </label>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <Button type="submit" variant="primary" size="lg">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  )
}
