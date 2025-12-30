import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Product from '@/models/Product'
import Order from '@/models/Order'
import User from '@/models/User'

export async function GET() {
  try {
    await connectDB()

    // Get total products
    const totalProducts = await Product.countDocuments()
    const activeProducts = await Product.countDocuments({ status: 'active' })

    // Get total orders
    const totalOrders = await Order.countDocuments()
    const pendingOrders = await Order.countDocuments({ status: 'pending' })
    const processingOrders = await Order.countDocuments({ status: 'processing' })
    const completedOrders = await Order.countDocuments({ status: 'delivered' })

    // Get total users
    const totalUsers = await User.countDocuments()
    const totalCustomers = await User.countDocuments({ role: 'user' })
    const totalAdmins = await User.countDocuments({ role: 'admin' })

    // Calculate total revenue
    const orders = await Order.find({ status: { $in: ['delivered', 'shipped'] } })
    const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0)

    // Get recent orders
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('user', 'name email')
      .select('_id user totalAmount status createdAt')

    // Get low stock products
    const lowStockProducts = await Product.find({ stock: { $lt: 10 } })
      .sort({ stock: 1 })
      .limit(5)
      .select('name stock price images')

    // Get top selling products
    const topProducts = await Product.find()
      .sort({ sold: -1 })
      .limit(5)
      .select('name sold price images')

    return NextResponse.json({
      success: true,
      data: {
        stats: {
          products: {
            total: totalProducts,
            active: activeProducts,
            draft: totalProducts - activeProducts
          },
          orders: {
            total: totalOrders,
            pending: pendingOrders,
            processing: processingOrders,
            completed: completedOrders
          },
          users: {
            total: totalUsers,
            customers: totalCustomers,
            admins: totalAdmins
          },
          revenue: {
            total: totalRevenue,
            formatted: `₹${totalRevenue.toLocaleString('en-IN')}`
          }
        },
        recentOrders,
        lowStockProducts,
        topProducts
      }
    })

  } catch (error) {
    console.error('Dashboard API error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch dashboard data',
        details: error.message 
      },
      { status: 500 }
    )
  }
}
