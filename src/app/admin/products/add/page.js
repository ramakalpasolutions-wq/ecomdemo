'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import { ArrowLeft, Upload, X, Image as ImageIcon } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function AddProductPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [images, setImages] = useState([])
  const [imagePreviews, setImagePreviews] = useState([])
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    category: 'Dry Fruits',
    stock: '',
    unit: 'kg',
    badge: '',
    benefits: '',
    nutritionFacts: '',
    howToUse: ''
  })

  const categories = [
    'Dry Fruits',
    'Nuts',
    'Seeds',
    'Dried Berries',
    'Trail Mix',
    'Organic',
    'Gift Boxes'
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Handle Image Selection
  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files)
    
    if (files.length + images.length > 5) {
      alert('Maximum 5 images allowed')
      return
    }

    // Create preview URLs
    const previews = files.map(file => URL.createObjectURL(file))
    setImagePreviews(prev => [...prev, ...previews])
    
    // Store files for upload
    setImages(prev => [...prev, ...files])
  }

  // Remove Image
  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index))
    setImagePreviews(prev => prev.filter((_, i) => i !== index))
  }

  // Upload Images to Cloudinary
  const uploadImagesToCloudinary = async () => {
    const uploadedUrls = []
    
    for (let file of images) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET)
      formData.append('folder', 'products')

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: 'POST',
            body: formData
          }
        )

        const data = await response.json()
        
        if (data.secure_url) {
          uploadedUrls.push(data.secure_url)
        }
      } catch (error) {
        console.error('Image upload error:', error)
        throw new Error('Failed to upload images')
      }
    }

    return uploadedUrls
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (images.length === 0) {
      alert('Please add at least one product image')
      return
    }

    setLoading(true)
    setUploading(true)

    try {
      // Upload images to Cloudinary
      const imageUrls = await uploadImagesToCloudinary()
      
      setUploading(false)

      // Prepare product data
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
        stock: parseInt(formData.stock),
        images: imageUrls,
        benefits: formData.benefits.split(',').map(b => b.trim()).filter(Boolean),
        nutritionFacts: formData.nutritionFacts.split(',').map(n => n.trim()).filter(Boolean),
        howToUse: formData.howToUse.split(',').map(h => h.trim()).filter(Boolean)
      }

      // Create product
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      })

      const data = await res.json()

      if (data.success) {
        alert('Product added successfully!')
        router.push('/admin/products')
      } else {
        alert(data.error || 'Failed to add product')
      }
    } catch (error) {
      console.error('Submit error:', error)
      alert(error.message || 'Failed to add product')
    } finally {
      setLoading(false)
      setUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom max-w-4xl">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin/products">
            <Button variant="secondary" size="sm">
              <ArrowLeft size={16} className="mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-[#2d3e5f]">Add New Product</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-8">
          {/* Image Upload Section */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-[#2d3e5f] mb-3">
              Product Images (Max 5) *
            </label>
            
            {/* Image Previews */}
            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-5 gap-4 mb-4">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative group">
                    <div className="relative w-full h-32 rounded-lg overflow-hidden border-2 border-gray-200">
                      <Image
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={16} />
                    </button>
                    {index === 0 && (
                      <span className="absolute bottom-2 left-2 bg-[#d87f3f] text-white text-xs px-2 py-1 rounded">
                        Main
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Upload Button */}
            {imagePreviews.length < 5 && (
              <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#d87f3f] hover:bg-[#faf7f0] transition-all">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-10 h-10 mb-3 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG, WEBP (Max 5 images)</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  multiple
                  onChange={handleImageSelect}
                  disabled={loading}
                />
              </label>
            )}
          </div>

          {/* Basic Info */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-[#2d3e5f] mb-2">
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d87f3f] focus:border-transparent"
                placeholder="e.g., Premium Almonds"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#2d3e5f] mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d87f3f] focus:border-transparent"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-[#2d3e5f] mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d87f3f] focus:border-transparent"
              placeholder="Product description..."
            />
          </div>

          {/* Pricing & Stock */}
          <div className="grid md:grid-cols-4 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-[#2d3e5f] mb-2">
                Price (₹) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d87f3f] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#2d3e5f] mb-2">
                Original Price (₹)
              </label>
              <input
                type="number"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d87f3f] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#2d3e5f] mb-2">
                Stock *
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d87f3f] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#2d3e5f] mb-2">
                Unit *
              </label>
              <select
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d87f3f] focus:border-transparent"
              >
                <option value="kg">kg</option>
                <option value="g">g</option>
                <option value="piece">piece</option>
                <option value="pack">pack</option>
              </select>
            </div>
          </div>

          {/* Badge */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-[#2d3e5f] mb-2">
              Badge (Optional)
            </label>
            <select
              name="badge"
              value={formData.badge}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d87f3f] focus:border-transparent"
            >
              <option value="">None</option>
              <option value="bestseller">Bestseller</option>
              <option value="new">New</option>
            </select>
          </div>

          {/* Additional Info */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-[#2d3e5f] mb-2">
              Benefits (comma-separated)
            </label>
            <input
              type="text"
              name="benefits"
              value={formData.benefits}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d87f3f] focus:border-transparent"
              placeholder="e.g., Rich in Protein, Heart Healthy, Boosts Immunity"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-[#2d3e5f] mb-2">
              Nutrition Facts (comma-separated)
            </label>
            <input
              type="text"
              name="nutritionFacts"
              value={formData.nutritionFacts}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d87f3f] focus:border-transparent"
              placeholder="e.g., Protein: 21g, Fat: 49g, Fiber: 12g"
            />
          </div>

          <div className="mb-8">
            <label className="block text-sm font-semibold text-[#2d3e5f] mb-2">
              How to Use (comma-separated)
            </label>
            <input
              type="text"
              name="howToUse"
              value={formData.howToUse}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d87f3f] focus:border-transparent"
              placeholder="e.g., Eat raw as snack, Add to smoothies, Use in baking"
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={loading || images.length === 0}
              className="flex-1"
            >
              {uploading ? 'Uploading Images...' : loading ? 'Adding Product...' : 'Add Product'}
            </Button>
            <Link href="/admin/products">
              <Button type="button" variant="secondary" size="lg">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
