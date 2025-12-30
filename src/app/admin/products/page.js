'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Edit, Trash2, Search, AlertTriangle } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products')
      const data = await res.json()
      console.log('Fetched products:', data) // Debug log
      if (data.success) {
        setProducts(data.data)
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id, name) => {
    console.log('Attempting to delete product ID:', id) // Debug log
    console.log('Product ID type:', typeof id) // Debug log
    
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        const url = `/api/products/${id}`
        console.log('DELETE URL:', url) // Debug log
        
        const res = await fetch(url, {
          method: 'DELETE'
        })
        
        const data = await res.json()
        console.log('Delete response:', data) // Debug log
        
        if (data.success) {
          alert('Product deleted successfully!')
          fetchProducts() // Refresh list
        } else {
          alert('Error deleting product: ' + data.error)
        }
      } catch (error) {
        alert('Error deleting product: ' + error.message)
        console.error('Delete error:', error)
      }
    }
  }

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-xl text-gray-600">Loading products...</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#2d3e5f]">Products</h1>
          <p className="text-gray-600 mt-1">{products.length} total products</p>
        </div>
        <Link href="/admin/products/add">
          <Button variant="primary">
            <Plus size={20} className="mr-2" />
            Add Product
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d87f3f] focus:border-transparent outline-none"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left p-4 font-semibold text-[#2d3e5f]">Product</th>
              <th className="text-left p-4 font-semibold text-[#2d3e5f]">Category</th>
              <th className="text-left p-4 font-semibold text-[#2d3e5f]">Price</th>
              <th className="text-left p-4 font-semibold text-[#2d3e5f]">Stock</th>
              <th className="text-left p-4 font-semibold text-[#2d3e5f]">Status</th>
              <th className="text-right p-4 font-semibold text-[#2d3e5f]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product._id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center">
                      {product.images && product.images[0] ? (
                        <Image 
                          src={product.images[0]} 
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <span className="text-2xl">📦</span>
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-[#2d3e5f]">{product.name}</div>
                      <div className="text-sm text-gray-500">{product.slug}</div>
                      <div className="text-xs text-gray-400">ID: {product._id}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-gray-700">{product.category}</td>
                <td className="p-4">
                  <div className="font-semibold text-[#2d3e5f]">₹{product.price}</div>
                  {product.originalPrice && (
                    <div className="text-sm text-gray-500 line-through">₹{product.originalPrice}</div>
                  )}
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      product.stock > 50 ? 'bg-green-100 text-green-700' : 
                      product.stock > 10 ? 'bg-yellow-100 text-yellow-700' : 
                      'bg-red-100 text-red-700'
                    }`}>
                      {product.stock} units
                    </span>
                    {product.stock <= 10 && (
                      <AlertTriangle size={16} className="text-red-500" />
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    product.status === 'active' ? 'bg-green-100 text-green-700' :
                    product.status === 'draft' ? 'bg-gray-100 text-gray-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {product.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex justify-end gap-2">
                    <Link href={`/admin/products/edit/${product._id}`}>
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit size={18} />
                      </button>
                    </Link>
                    <button 
                      onClick={() => handleDelete(String(product._id), product.name)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found</p>
          </div>
        )}
      </div>
    </div>
  )
}
