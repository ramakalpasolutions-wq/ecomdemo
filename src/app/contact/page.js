'use client'
import { useState } from 'react'
import Button from '@/components/ui/Button'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Thank you! We will get back to you soon.')
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    })
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      content: 'support@naturestreats.com',
      link: 'mailto:support@naturestreats.com'
    },
    {
      icon: Phone,
      title: 'Call Us',
      content: '+91 98765 43210',
      link: 'tel:+919876543210'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      content: 'Bangalore, Karnataka, India',
      link: '#'
    },
    {
      icon: Clock,
      title: 'Working Hours',
      content: 'Mon - Sat: 9AM - 6PM',
      link: '#'
    }
  ]

  return (
    <div className="bg-[#f5f1e8] min-h-screen py-12">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2d3e5f] mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-[#5a4a3a] max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <div className="bg-white rounded-3xl shadow-sm p-8">
            <h2 className="text-2xl font-bold text-[#2d3e5f] mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-[#2d3e5f] mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#d87f3f] focus:border-transparent outline-none"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#2d3e5f] mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#d87f3f] focus:border-transparent outline-none"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#2d3e5f] mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#d87f3f] focus:border-transparent outline-none"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#2d3e5f] mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#d87f3f] focus:border-transparent outline-none"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#2d3e5f] mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#d87f3f] focus:border-transparent outline-none resize-none"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              <Button type="submit" variant="primary" size="lg" className="w-full">
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-[#2d3e5f] mb-6">Contact Information</h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon
                  return (
                    <a
                      key={index}
                      href={info.link}
                      className="flex items-start gap-4 p-4 rounded-xl hover:bg-[#f5f1e8] transition-colors group"
                    >
                      <div className="w-12 h-12 bg-[#d87f3f] rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Icon className="text-white" size={20} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#2d3e5f] mb-1">{info.title}</h3>
                        <p className="text-[#5a4a3a]">{info.content}</p>
                      </div>
                    </a>
                  )
                })}
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-3xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-[#2d3e5f] mb-4">Quick Answers</h2>
              <p className="text-[#5a4a3a] mb-4">
                Before reaching out, you might find answers in our FAQ section.
              </p>
              <Button variant="outline" className="w-full">
                Visit FAQ
              </Button>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white rounded-3xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-[#2d3e5f] mb-4">Find Us</h2>
              <div className="w-full h-64 bg-gray-200 rounded-xl flex items-center justify-center">
                <MapPin className="text-gray-400" size={48} />
              </div>
              <p className="text-sm text-[#5a4a3a] mt-4">
                Visit our store in Bangalore for personalized wellness consultations.
              </p>
            </div>
          </div>
        </div>

        {/* Trust Section */}
        <div className="bg-gradient-to-br from-[#2d3e5f] to-[#3d5273] rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">We're Here to Help</h2>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-8">
            Our customer support team is dedicated to ensuring your wellness journey is smooth and successful.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            <div>
              <div className="text-4xl font-bold text-[#d87f3f] mb-2">24h</div>
              <div className="text-sm">Response Time</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#d87f3f] mb-2">5000+</div>
              <div className="text-sm">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#d87f3f] mb-2">4.8★</div>
              <div className="text-sm">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
