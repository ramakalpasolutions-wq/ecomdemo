'use client'
import Link from 'next/link'
import { useState } from 'react'
import { ShoppingCart, Menu, X, User, Search } from 'lucide-react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)

  return (
    <header className="sticky top-0 z-50 bg-[#2d3e5f] shadow-lg">
      <nav className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="text-white">
              <div className="text-2xl font-bold tracking-tight">NATURE'S</div>
              <div className="text-sm tracking-widest text-[#d87f3f]">TREATS</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/products" className="text-white hover:text-[#d87f3f] transition-colors font-medium">
              Products
            </Link>
            <Link href="/categories" className="text-white hover:text-[#d87f3f] transition-colors font-medium">
              Categories
            </Link>
            <Link href="/about" className="text-white hover:text-[#d87f3f] transition-colors font-medium">
              About
            </Link>
            <Link href="/contact" className="text-white hover:text-[#d87f3f] transition-colors font-medium">
              Contact
            </Link>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <button className="hidden md:block p-2 text-white hover:text-[#d87f3f] transition-colors">
              <Search size={22} />
            </button>
            <Link href="/account" className="p-2 text-white hover:text-[#d87f3f] transition-colors">
              <User size={22} />
            </Link>
            <Link href="/cart" className="relative p-2 text-white hover:text-[#d87f3f] transition-colors">
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#d87f3f] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#3d5273]">
            <div className="flex flex-col space-y-4">
              <Link href="/products" className="text-white hover:text-[#d87f3f] transition-colors font-medium">
                Products
              </Link>
              <Link href="/categories" className="text-white hover:text-[#d87f3f] transition-colors font-medium">
                Categories
              </Link>
              <Link href="/about" className="text-white hover:text-[#d87f3f] transition-colors font-medium">
                About
              </Link>
              <Link href="/contact" className="text-white hover:text-[#d87f3f] transition-colors font-medium">
                Contact
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
