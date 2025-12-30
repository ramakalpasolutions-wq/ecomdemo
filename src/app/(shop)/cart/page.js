'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Button from '@/components/ui/Button'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react'

export default function CartPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [cart, setCart] = useState(null)
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    fetchCart()
  }, [])

  const fetchCart = async () => {
    try {
      const res = await fetch('/api/cart')
      const data = await res.json()
      
      if (data.success) {
        setCart(data.data)
      } else {
        router.push('/login?redirect=/cart')
      }
    } catch (error) {
      console.error('Error fetching cart:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return
    
    setUpdating(true)
    try {
      const res = await fetch(`/api/cart/${itemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: newQuantity })
      })

      const data = await res.json()

      if (data.success) {
        setCart(data.data)
      } else {
        alert(data.error || 'Failed to update cart')
      }
    } catch (error) {
      console.error('Update error:', error)
      alert('Failed to update cart')
    } finally {
      setUpdating(false)
    }
  }

  const removeItem = async (itemId) => {
    if (!confirm('Remove this item from cart?')) return
    
    setUpdating(true)
    try {
      const res = await fetch(`/api/cart/${itemId}`, {
        method: 'DELETE'
      })

      const data = await res.json()

      if (data.success) {
        setCart(data.data)
      } else {
        alert(data.error || 'Failed to remove item')
      }
    } catch (error) {
      console.error('Remove error:', error)
      alert('Failed to remove item')
    } finally {
      setUpdating(false)
    }
  }

  const clearCart = async () => {
    if (!confirm('Clear entire cart?')) return
    
    setUpdating(true)
    try {
      const res = await fetch('/api/cart', {
        method: 'DELETE'
      })

      const data = await res.json()

      if (data.success) {
        setCart({ items: [], totalItems: 0, totalPrice: 0 })
      } else {
        alert(data.error || 'Failed to clear cart')
      }
    } catch (error) {
      console.error('Clear error:', error)
      alert('Failed to clear cart')
    } finally {
      setUpdating(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Loading cart...</p>
      </div>
    )
  }

  const isEmpty = !cart?.items || cart.items.length === 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f1e8] to-[#faf7f0] py-12">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-[#2d3e5f]">Shopping Cart</h1>
            {!isEmpty && (
              <button
                onClick={clearCart}
                disabled={updating}
                className="text-red-600 hover:text-red-700 text-sm font-semibold"
              >
                Clear Cart
              </button>
            )}
          </div>

          {isEmpty ? (
            <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
              <ShoppingBag className="mx-auto text-gray-400 mb-4" size={64} />
              <h2 className="text-2xl font-bold text-[#2d3e5f] mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">Add some products to get started!</p>
              <Link href="/products">
                <Button variant="primary" size="lg">
                  Shop Now
                  <ArrowRight size={20} className="ml-2" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cart.items.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white rounded-xl shadow-sm p-6 flex gap-6"
                  >
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                      {item.product?.images?.[0] ? (
                        <Image
                          src={item.product.images[0]}
                          alt={item.product?.name || 'Product'}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <span className="absolute inset-0 flex items-center justify-center text-4xl">
                          📦
                        </span>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-bold text-lg text-[#2d3e5f]">
                            {item.product?.name || 'Product'}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {item.product?.category}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item._id)}
                          disabled={updating}
                          className="text-red-600 hover:text-red-700 p-2"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                            disabled={updating || item.quantity <= 1}
                            className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="font-semibold text-lg w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                            disabled={updating || item.quantity >= item.product?.stock}
                            className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        <div className="text-right">
                          <p className="text-xl font-bold text-[#d87f3f]">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-500">
                            ₹{item.price} each
                          </p>
                        </div>
                      </div>

                      {item.product?.stock <= 5 && (
                        <p className="text-xs text-red-600 mt-2">
                          Only {item.product.stock} left in stock!
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-xl p-6 sticky top-24">
                  <h2 className="text-2xl font-bold text-[#2d3e5f] mb-6">
                    Order Summary
                  </h2>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal ({cart.totalItems} items)</span>
                      <span>₹{cart.totalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span className="text-green-600 font-semibold">FREE</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Tax (18% GST)</span>
                      <span>₹{Math.round(cart.totalPrice * 0.18).toLocaleString()}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-3 mt-3">
                      <div className="flex justify-between text-xl font-bold text-[#2d3e5f]">
                        <span>Total</span>
                        <span>₹{Math.round(cart.totalPrice * 1.18).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full mb-3"
                    onClick={() => router.push('/checkout')}
                  >
                    Proceed to Checkout
                    <ArrowRight size={20} className="ml-2" />
                  </Button>

                  <Link href="/products">
                    <Button variant="secondary" size="lg" className="w-full">
                      Continue Shopping
                    </Button>
                  </Link>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <span>✓</span>
                      <span>Free shipping on all orders</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <span>✓</span>
                      <span>Secure checkout</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>✓</span>
                      <span>30-day return policy</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
