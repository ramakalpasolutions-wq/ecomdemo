import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Product from '@/models/Product'

// POST - Create new product (NO AUTH CHECK - FOR TESTING)
export async function POST(request) {
  try {
    console.log('📥 Admin products API called')
    
    await connectDB()
    console.log('✅ Database connected')

    const data = await request.json()
    console.log('📦 Received product data:', {
      name: data.name,
      price: data.price,
      category: data.category,
      images: data.images?.length || 0
    })

    // Validate required fields
    if (!data.name || !data.price || !data.category) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: name, price, or category' },
        { status: 400 }
      )
    }

    // Create slug from name
    const slug = data.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    // Create product
    const product = await Product.create({
      name: data.name,
      slug,
      description: data.description,
      price: data.price,
      originalPrice: data.originalPrice,
      category: data.category,
      stock: data.stock,
      unit: data.unit,
      images: data.images || [],
      badge: data.badge,
      benefits: data.benefits || [],
      nutritionFacts: data.nutritionFacts || [],
      howToUse: data.howToUse || [],
      status: 'active',
      sold: 0,
      rating: 0,
      reviewCount: 0
    })

    console.log('✅ Product created successfully:', product._id, product.name)

    return NextResponse.json(
      { 
        success: true, 
        data: product,
        message: 'Product created successfully'
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('❌ Create product error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to create product',
        details: error.toString()
      },
      { status: 500 }
    )
  }
}

// GET - Get all products
export async function GET(request) {
  try {
    await connectDB()

    const products = await Product.find().sort({ createdAt: -1 })

    return NextResponse.json({
      success: true,
      data: products
    })

  } catch (error) {
    console.error('Get products error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}
