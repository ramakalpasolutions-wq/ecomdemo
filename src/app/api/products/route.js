import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Product from '@/models/Product'

// GET all products
export async function GET(request) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    
    let query = { status: 'active' }
    
    if (category && category !== 'all') {
      query.category = category
    }
    
    if (search) {
      query.$text = { $search: search }
    }
    
    const products = await Product.find(query).sort({ createdAt: -1 })
    
    return NextResponse.json({ success: true, data: products })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }
}

// POST create product
export async function POST(request) {
  try {
    await connectDB()
    
    const body = await request.json()
    const product = await Product.create(body)
    
    return NextResponse.json({ success: true, data: product }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }
}
