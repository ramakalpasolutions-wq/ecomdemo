import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Category from '@/models/Category'
import mongoose from 'mongoose'

// GET single category
export async function GET(request, { params }) {
  try {
    await connectDB()
    
    // Await params (Next.js 15 requirement)
    const { id } = await params
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: 'Invalid category ID' }, { status: 400 })
    }
    
    const category = await Category.findById(id)
    
    if (!category) {
      return NextResponse.json({ success: false, error: 'Category not found' }, { status: 404 })
    }
    
    return NextResponse.json({ success: true, data: category })
  } catch (error) {
    console.error('GET category error:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }
}

// PUT update category
export async function PUT(request, { params }) {
  try {
    await connectDB()
    
    // Await params (Next.js 15 requirement)
    const { id } = await params
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: 'Invalid category ID' }, { status: 400 })
    }
    
    const body = await request.json()
    
    const category = await Category.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    })
    
    if (!category) {
      return NextResponse.json({ success: false, error: 'Category not found' }, { status: 404 })
    }
    
    return NextResponse.json({ success: true, data: category })
  } catch (error) {
    console.error('UPDATE category error:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }
}

// DELETE category
export async function DELETE(request, { params }) {
  try {
    await connectDB()
    
    // Await params (Next.js 15 requirement)
    const { id } = await params
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: 'Invalid category ID' }, { status: 400 })
    }
    
    const category = await Category.findByIdAndDelete(id)
    
    if (!category) {
      return NextResponse.json({ success: false, error: 'Category not found' }, { status: 404 })
    }
    
    return NextResponse.json({ success: true, message: 'Category deleted successfully', data: category })
  } catch (error) {
    console.error('DELETE category error:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }
}
