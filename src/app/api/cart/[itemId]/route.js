import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Cart from '@/models/Cart'
import Product from '@/models/Product'
import { getSession } from '@/lib/session'

// PUT update cart item quantity
export async function PUT(request, { params }) {
  try {
    const session = await getSession()
    
    if (!session) {
      return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 })
    }
    
    await connectDB()
    
    const { itemId } = await params
    const { quantity } = await request.json()
    
    if (quantity < 1) {
      return NextResponse.json({ success: false, error: 'Quantity must be at least 1' }, { status: 400 })
    }
    
    const cart = await Cart.findOne({ user: session.userId })
    
    if (!cart) {
      return NextResponse.json({ success: false, error: 'Cart not found' }, { status: 404 })
    }
    
    const item = cart.items.id(itemId)
    
    if (!item) {
      return NextResponse.json({ success: false, error: 'Item not found in cart' }, { status: 404 })
    }
    
    // Check stock
    const product = await Product.findById(item.product)
    if (quantity > product.stock) {
      return NextResponse.json({ success: false, error: 'Insufficient stock' }, { status: 400 })
    }
    
    item.quantity = quantity
    
    await cart.save()
    await cart.populate('items.product')
    
    return NextResponse.json({ success: true, data: cart, message: 'Cart updated' })
  } catch (error) {
    console.error('Update cart error:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }
}

// DELETE remove item from cart
export async function DELETE(request, { params }) {
  try {
    const session = await getSession()
    
    if (!session) {
      return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 })
    }
    
    await connectDB()
    
    const { itemId } = await params
    
    const cart = await Cart.findOne({ user: session.userId })
    
    if (!cart) {
      return NextResponse.json({ success: false, error: 'Cart not found' }, { status: 404 })
    }
    
    cart.items.pull(itemId)
    
    await cart.save()
    await cart.populate('items.product')
    
    return NextResponse.json({ success: true, data: cart, message: 'Item removed from cart' })
  } catch (error) {
    console.error('Remove from cart error:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }
}
