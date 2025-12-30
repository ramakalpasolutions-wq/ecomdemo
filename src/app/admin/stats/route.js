import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Product from '@/models/Product'
import Category from '@/models/Category'
import Order from '@/models/Order'

export async function GET() {
  try {
    await connectDB()
    
    const totalProducts = await Product.countDocuments({ status: 'active' })
    const totalCategories = await Category.countDocuments({ status: 'active' })
    const totalOrders = await Order.countDocuments()
    
    // Calculate total revenue
    const orders = await Order.find({ paymentStatus: 'paid' })
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)
    
    // Low stock products
    const lowStockProducts = await Product.find({ stock: { $lte: 10 }, status: 'active' })
    
    return NextResponse.json({
      success: true,
      data: {
        totalProducts,
        totalCategories,
        totalOrders,
        totalRevenue,
        lowStockCount: lowStockProducts.length,
        lowStockProducts
      }
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }
}
