import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Product from '@/models/Product'
import mongoose from 'mongoose'

// GET single product
export async function GET(request, { params }) {
  try {
    await connectDB()
    
    // Await params (Next.js 15 requirement)
    const { id } = await params
    
    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: 'Invalid product ID' }, { status: 400 })
    }
    
    const product = await Product.findById(id)
    
    if (!product) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 })
    }
    
    return NextResponse.json({ success: true, data: product })
  } catch (error) {
    console.error('GET product error:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }
}

// PUT update product
export async function PUT(request, { params }) {
  try {
    await connectDB()
    
    // Await params (Next.js 15 requirement)
    const { id } = await params
    
    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: 'Invalid product ID' }, { status: 400 })
    }
    
    const body = await request.json()
    console.log('Updating product:', id, body)
    
    const product = await Product.findByIdAndUpdate(
      id,
      body,
      {
        new: true,
        runValidators: true,
      }
    )
    
    if (!product) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 })
    }
    
    return NextResponse.json({ success: true, data: product })
  } catch (error) {
    console.error('UPDATE product error:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }
}

// DELETE product
export async function DELETE(request, { params }) {
  try {
    await connectDB()
    
    // Await params (Next.js 15 requirement)
    const { id } = await params
    
    console.log('Attempting to delete product:', id)
    
    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error('Invalid ObjectId:', id)
      return NextResponse.json({ success: false, error: 'Invalid product ID' }, { status: 400 })
    }
    
    const product = await Product.findByIdAndDelete(id)
    
    if (!product) {
      console.error('Product not found:', id)
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 })
    }
    
    console.log('Product deleted successfully:', product.name)
    return NextResponse.json({ success: true, message: 'Product deleted successfully', data: product })
  } catch (error) {
    console.error('DELETE product error:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }
}
