'use client'
import { useState, useEffect } from 'react'
import { Package, Users, ShoppingCart, IndianRupee, TrendingUp, AlertTriangle } from 'lucide-react'

export default function AdminDashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchDashboard()
  }, [])

  const fetchDashboard = async () => {
    try {
      const res = await fetch('/api/admin/dashboard')
      const result = await res.json()

      if (result.success) {
        setData(result.data)
      } else {
        setError(result.error || 'Failed to fetch dashboard data')
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
      setError('Failed to fetch dashboard data')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d87f3f] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertTriangle className="mx-auto mb-4 text-red-500" size={48} />
          <p className="text-red-600 font-semibold mb-2">Error Loading Dashboard</p>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={fetchDashboard}
            className="px-4 py-2 bg-[#d87f3f] text-white rounded-lg hover:bg-[#c06f35] transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  const stats = data?.stats || {}

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#2d3e5f] mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your store.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Products */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border-l-4 border-[#6b8e4e]">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-[#6b8e4e] bg-opacity-10 rounded-lg">
              <Package className="text-[#6b8e4e]" size={24} />
            </div>
            <span className="text-sm text-gray-500">Total</span>
          </div>
          <h3 className="text-3xl font-bold text-[#2d3e5f] mb-1">
            {stats.products?.total || 0}
          </h3>
          <p className="text-sm text-gray-600">Products</p>
          <p className="text-xs text-green-600 mt-2">
            {stats.products?.active || 0} active
          </p>
        </div>

        {/* Total Orders */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border-l-4 border-[#d87f3f]">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-[#d87f3f] bg-opacity-10 rounded-lg">
              <ShoppingCart className="text-[#d87f3f]" size={24} />
            </div>
            <span className="text-sm text-gray-500">Total</span>
          </div>
          <h3 className="text-3xl font-bold text-[#2d3e5f] mb-1">
            {stats.orders?.total || 0}
          </h3>
          <p className="text-sm text-gray-600">Orders</p>
          <p className="text-xs text-yellow-600 mt-2">
            {stats.orders?.pending || 0} pending
          </p>
        </div>

        {/* Total Users */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border-l-4 border-[#5a7c9f]">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-[#5a7c9f] bg-opacity-10 rounded-lg">
              <Users className="text-[#5a7c9f]" size={24} />
            </div>
            <span className="text-sm text-gray-500">Total</span>
          </div>
          <h3 className="text-3xl font-bold text-[#2d3e5f] mb-1">
            {stats.users?.total || 0}
          </h3>
          <p className="text-sm text-gray-600">Users</p>
          <p className="text-xs text-blue-600 mt-2">
            {stats.users?.customers || 0} customers
          </p>
        </div>

        {/* Total Revenue */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-500 bg-opacity-10 rounded-lg">
              <IndianRupee className="text-green-500" size={24} />
            </div>
            <span className="text-sm text-gray-500">Revenue</span>
          </div>
          <h3 className="text-3xl font-bold text-[#2d3e5f] mb-1">
            {stats.revenue?.formatted || '₹0'}
          </h3>
          <p className="text-sm text-gray-600">Total Sales</p>
          <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
            <TrendingUp size={12} />
            Active orders: {stats.orders?.processing || 0}
          </p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-[#2d3e5f] mb-4">Recent Orders</h2>
          {data?.recentOrders?.length > 0 ? (
            <div className="space-y-3">
              {data.recentOrders.map((order) => (
                <div key={order._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-sm">#{order._id.slice(-8)}</p>
                    <p className="text-xs text-gray-600">{order.user?.name || 'Customer'}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-[#d87f3f]">₹{order.totalAmount}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                      order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No orders yet</p>
          )}
        </div>

        {/* Low Stock Products */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-[#2d3e5f] mb-4">Low Stock Alert</h2>
          {data?.lowStockProducts?.length > 0 ? (
            <div className="space-y-3">
              {data.lowStockProducts.map((product) => (
                <div key={product._id} className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                  <AlertTriangle className="text-red-500" size={20} />
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{product.name}</p>
                    <p className="text-xs text-red-600">Only {product.stock} left in stock</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">All products have sufficient stock</p>
          )}
        </div>
      </div>
    </div>
  )
}
