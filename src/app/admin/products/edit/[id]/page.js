'use client'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Button from '@/components/ui/Button'

export default function EditProductPage() {
  const router = useRouter()
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    price: '',
    originalPrice: '',
    category: '',
    benefits: '',
    ingredients: '',
    servingSize: '',
    servingsPerContainer: '',
    howToUse: '',
    stock: '',
    badge: '',
    status: 'active'
  })

  const categories = ['Snacks', 'Superfoods', 'Proteins', 'Wellness', 'Herbs', 'Vitamins']
  const badges = ['', 'bestseller', 'new', 'sale']

  useEffect(() => {
    fetchProduct()
  }, [params.id])

  const fetchProduct = async () => {
    try {
      const res = await fetch(`/api/products/${params.id}`)
      const data = await res.json()
      
      if (data.success) {
        const product = data.data
        setFormData({
          name: product.name,
          slug: product.slug,
          description: product.description || '',
          price: product.price,
          originalPrice: product.originalPrice || '',
          category: product.category,
          benefits: Array.isArray(product.benefits) ? product.benefits.join(', ') : '',
          ingredients: product.ingredients || '',
          servingSize: product.servingSize || '',
          servingsPerContainer: product.servingsPerContainer || '',
          howToUse: product.howToUse || '',
          stock: product.stock,
          badge: product.badge || '',
          status: product.status
        })
      }
    } catch (error) {
      console.error('Error fetching product:', error)
      alert('Failed to load product')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    if (name === 'name') {
      const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      setFormData(prev => ({ ...prev, slug }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)

    try {
      const productData = {
        name: formData.name,
        slug: formData.slug,
        description: formData.description,
        price: Number(formData.price),
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : null,
        stock: Number(formData.stock),
        category: formData.category,
        benefits: formData.benefits ? formData.benefits.split(',').map(b => b.trim()).filter(b => b) : [],
        ingredients: formData.ingredients || '',
        servingSize: formData.servingSize || '',
        servingsPerContainer: formData.servingsPerContainer || '',
        howToUse: formData.howToUse || '',
        badge: formData.badge || '',
        status: formData.status
      }

      const res = await fetch(`/api/products/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      })

      const data = await res.json()

      if (data.success) {
        alert('Product updated successfully!')
        router.push('/admin/products')
      } else {
        alert('Error: ' + data.error)
      }
    } catch (error) {
      console.error('Error updating product:', error)
      alert('Failed to update product')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-xl text-gray-600">Loading product...</p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#2d3e5f] mb-8">Edit Product</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-[#2d3e5f] mb-2">Product Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d87f3f] focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#2d3e5f] mb-2">URL Slug *</label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#2d3e5f] mb-2">Price (₹) *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d87f3f] focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#2d3e5f] mb-2">Original Price (₹)</label>
            <input
              type="number"
              name="originalPrice"
              value={formData.originalPrice}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d87f3f] focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#2d3e5f] mb-2">Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d87f3f] focus:border-transparent outline-none"
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#2d3e5f] mb-2">Stock Quantity *</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d87f3f] focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#2d3e5f] mb-2">Badge</label>
            <select
              name="badge"
              value={formData.badge}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d87f3f] focus:border-transparent outline-none"
            >
              {badges.map(badge => (
                <option key={badge} value={badge}>{badge || 'None'}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#2d3e5f] mb-2">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d87f3f] focus:border-transparent outline-none"
            >
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-semibold text-[#2d3e5f] mb-2">Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d87f3f] focus:border-transparent outline-none"
          />
        </div>

        <div className="mt-6">
          <label className="block text-sm font-semibold text-[#2d3e5f] mb-2">Benefits (comma-separated)</label>
          <input
            type="text"
            name="benefits"
            value={formData.benefits}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d87f3f] focus:border-transparent outline-none"
          />
        </div>

        <div className="mt-6">
          <label className="block text-sm font-semibold text-[#2d3e5f] mb-2">Ingredients</label>
          <textarea
            name="ingredients"
            value={formData.ingredients}
            onChange={handleInputChange}
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d87f3f] focus:border-transparent outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-6 mt-6">
          <div>
            <label className="block text-sm font-semibold text-[#2d3e5f] mb-2">Serving Size</label>
            <input
              type="text"
              name="servingSize"
              value={formData.servingSize}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d87f3f] focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#2d3e5f] mb-2">Servings Per Container</label>
            <input
              type="text"
              name="servingsPerContainer"
              value={formData.servingsPerContainer}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d87f3f] focus:border-transparent outline-none"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-semibold text-[#2d3e5f] mb-2">How to Use</label>
          <textarea
            name="howToUse"
            value={formData.howToUse}
            onChange={handleInputChange}
            rows="2"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d87f3f] focus:border-transparent outline-none"
          />
        </div>

        <div className="flex gap-4 mt-8">
          <Button type="submit" variant="primary" size="lg" disabled={saving}>
            {saving ? 'Updating...' : 'Update Product'}
          </Button>
          <Button 
            type="button" 
            variant="secondary" 
            size="lg"
            onClick={() => router.push('/admin/products')}
            disabled={saving}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
