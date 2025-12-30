'use client'
import { useState } from 'react'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { ArrowLeft, CreditCard, Truck } from 'lucide-react'

export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'card'
  })

  const cartItems = [
    {
      id: 1,
      name: 'Organic Raw Crunch Granola',
      price: 1299,
      quantity: 2
    },
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 0
  const total = subtotal + shipping

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Order placed:', formData)
    alert('Order placed successfully!')
  }

  return (
    <div className="bg-[#f5f1e8] min-h-screen py-12">
      <div className="container-custom">
        <Link 
          href="/cart"
          className="inline-flex items-center gap-2 text-[#d87f3f] hover:text-[#c46f2f] mb-8 font-medium"
        >
          <ArrowLeft size={20} />
          Back to Cart
        </Link>

        <h1 className="text-4xl font-bold text-[#2d3e5f] mb-8">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Information */}
              <div className="bg-white rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Truck className="text-[#d87f3f]" size={24} />
                  <h2 className="text-xl font-bold text-[#2d3e5f]">Shipping Information</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name *"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#d87f3f] focus:border-transparent outline-none"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name *"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#d87f3f] focus:border-transparent outline-none"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email *"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#d87f3f] focus:border-transparent outline-none"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone *"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#d87f3f] focus:border-transparent outline-none"
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Address *"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    className="md:col-span-2 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#d87f3f] focus:border-transparent outline-none"
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="City *"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#d87f3f] focus:border-transparent outline-none"
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="State *"
                    required
                    value={formData.state}
                    onChange={handleInputChange}
                    className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#d87f3f] focus:border-transparent outline-none"
                  />
                  <input
                    type="text"
                    name="pincode"
                    placeholder="Pincode *"
                    required
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="md:col-span-2 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#d87f3f] focus:border-transparent outline-none"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <CreditCard className="text-[#d87f3f]" size={24} />
                  <h2 className="text-xl font-bold text-[#2d3e5f]">Payment Method</h2>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[#d87f3f] transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleInputChange}
                      className="mr-3"
                    />
                    <span className="font-medium text-[#2d3e5f]">Credit/Debit Card</span>
                  </label>
                  <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[#d87f3f] transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={formData.paymentMethod === 'upi'}
                      onChange={handleInputChange}
                      className="mr-3"
                    />
                    <span className="font-medium text-[#2d3e5f]">UPI</span>
                  </label>
                  <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[#d87f3f] transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleInputChange}
                      className="mr-3"
                    />
                    <span className="font-medium text-[#2d3e5f]">Cash on Delivery</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 sticky top-24">
                <h2 className="text-xl font-bold text-[#2d3e5f] mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-[#5a4a3a]">{item.name} x{item.quantity}</span>
                      <span className="font-semibold text-[#2d3e5f]">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 mb-6 pt-4 border-t-2 border-gray-200">
                  <div className="flex justify-between text-[#5a4a3a]">
                    <span>Subtotal</span>
                    <span className="font-semibold">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-[#5a4a3a]">
                    <span>Shipping</span>
                    <span className="font-semibold text-green-600">FREE</span>
                  </div>
                  <div className="flex justify-between text-[#2d3e5f] pt-3 border-t-2 border-gray-200">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-2xl font-bold">₹{total}</span>
                  </div>
                </div>

                <Button type="submit" variant="primary" size="lg" className="w-full">
                  Place Order
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
