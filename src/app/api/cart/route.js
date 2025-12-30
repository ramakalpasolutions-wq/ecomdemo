import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Cart from '@/models/Cart'
import Product from '@/models/Product'
import { getSession } from '@/lib/session'

// GET user's cart
export async function GET() {
  try {
    const session = await getSession()
    
    if (!session) {
      return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 })
    }
    
    await connectDB()
    
    let cart = await Cart.findOne({ user: session.userId }).populate('items.product')
    
    if (!cart) {
      return NextResponse.json({ 
        success: true, 
        data: { items: [], totalItems: 0, totalPrice: 0 } 
      })
    }
    
    return NextResponse.json({ success: true, data: cart })
  } catch (error) {
    console.error('Get cart error:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

// POST add item to cart
export async function POST(request) {
  try {
    const session = await getSession()
    
    if (!session) {
      return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 })
    }
    
    await connectDB()
    
    const { productId, quantity = 1 } = await request.json()
    
    // Validate product exists
    const product = await Product.findById(productId)
    if (!product) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 })
    }
    
    // Check stock
    if (product.stock < quantity) {
      return NextResponse.json({ success: false, error: 'Insufficient stock' }, { status: 400 })
    }
    
    // Find or create cart
    let cart = await Cart.findOne({ user: session.userId })
    
    if (!cart) {
      cart = new Cart({
        user: session.userId,
        items: [],
        totalItems: 0,
        totalPrice: 0
      })
    }
    
    // Check if product already in cart
    const existingItem = cart.items.find(item => item.product.toString() === productId)
    
    if (existingItem) {
      // Update quantity
      const newQuantity = existingItem.quantity + quantity
      
      // Check stock again
      if (newQuantity > product.stock) {
        return NextResponse.json({ success: false, error: 'Insufficient stock' }, { status: 400 })
      }
      
      existingItem.quantity = newQuantity
    } else {
      // Add new item
      cart.items.push({
        product: productId,
        quantity,
        price: product.price
      })
    }
    
    // Save and populate
    await cart.save()
    await cart.populate('items.product')
    
    return NextResponse.json({ 
      success: true, 
      data: cart, 
      message: 'Item added to cart' 
    }, { status: 201 })
    
  } catch (error) {
    console.error('Add to cart error:', error)
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 })
  }
}

// DELETE clear cart
export async function DELETE() {
  try {
    const session = await getSession()
    
    if (!session) {
      return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 })
    }
    
    await connectDB()
    
    await Cart.findOneAndDelete({ user: session.userId })
    
    return NextResponse.json({ 
      success: true, 
      data: { items: [], totalItems: 0, totalPrice: 0 },
      message: 'Cart cleared' 
    })
  } catch (error) {
    console.error('Clear cart error:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
