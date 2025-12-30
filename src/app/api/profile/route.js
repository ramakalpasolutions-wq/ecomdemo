import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'
import { getSession } from '@/lib/session'
import { hashPassword } from '@/lib/auth'

// GET user profile
export async function GET() {
  try {
    const session = await getSession()
    
    if (!session) {
      return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 })
    }
    
    await connectDB()
    
    const user = await User.findById(session.userId).select('-password')
    
    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 })
    }
    
    return NextResponse.json({ success: true, data: user })
  } catch (error) {
    console.error('Get profile error:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }
}

// PUT update user profile
export async function PUT(request) {
  try {
    const session = await getSession()
    
    if (!session) {
      return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 })
    }
    
    await connectDB()
    
    const body = await request.json()
    const { name, email, currentPassword, newPassword } = body
    
    const user = await User.findById(session.userId)
    
    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 })
    }
    
    // Update name and email
    if (name) user.name = name
    if (email && email !== user.email) {
      // Check if email already exists
      const existingUser = await User.findOne({ email })
      if (existingUser) {
        return NextResponse.json({ success: false, error: 'Email already in use' }, { status: 400 })
      }
      user.email = email
    }
    
    // Update password if provided
    if (newPassword) {
      if (!currentPassword) {
        return NextResponse.json({ success: false, error: 'Current password required' }, { status: 400 })
      }
      
      const { verifyPassword } = await import('@/lib/auth')
      const isValidPassword = await verifyPassword(currentPassword, user.password)
      
      if (!isValidPassword) {
        return NextResponse.json({ success: false, error: 'Current password is incorrect' }, { status: 400 })
      }
      
      user.password = await hashPassword(newPassword)
    }
    
    await user.save()
    
    const updatedUser = await User.findById(user._id).select('-password')
    
    return NextResponse.json({ success: true, data: updatedUser, message: 'Profile updated successfully' })
  } catch (error) {
    console.error('Update profile error:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }
}
