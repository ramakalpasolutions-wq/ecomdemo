import Link from 'next/link'
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#2d3e5f] text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <div className="text-2xl font-bold tracking-tight">NATURE'S</div>
              <div className="text-sm tracking-widest text-[#d87f3f]">TREATS</div>
            </div>
            <p className="text-sm text-gray-300 mb-6">
              Plant-powered nutrition that's actually good for you. Organic, sprouted, and refined sugar-free.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-[#3d5273] hover:bg-[#d87f3f] transition-colors flex items-center justify-center">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#3d5273] hover:bg-[#d87f3f] transition-colors flex items-center justify-center">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#3d5273] hover:bg-[#d87f3f] transition-colors flex items-center justify-center">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#3d5273] hover:bg-[#d87f3f] transition-colors flex items-center justify-center">
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-bold mb-4 text-[#d87f3f] uppercase tracking-wide text-sm">Shop</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/products" className="hover:text-[#d87f3f] transition-colors">All Products</Link></li>
              <li><Link href="/categories/snacks" className="hover:text-[#d87f3f] transition-colors">Snacks</Link></li>
              <li><Link href="/categories/superfoods" className="hover:text-[#d87f3f] transition-colors">Superfoods</Link></li>
              <li><Link href="/categories/proteins" className="hover:text-[#d87f3f] transition-colors">Proteins</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold mb-4 text-[#d87f3f] uppercase tracking-wide text-sm">Support</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/contact" className="hover:text-[#d87f3f] transition-colors">Contact Us</Link></li>
              <li><Link href="/shipping" className="hover:text-[#d87f3f] transition-colors">Shipping Info</Link></li>
              <li><Link href="/returns" className="hover:text-[#d87f3f] transition-colors">Returns</Link></li>
              <li><Link href="/faq" className="hover:text-[#d87f3f] transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold mb-4 text-[#d87f3f] uppercase tracking-wide text-sm">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/privacy" className="hover:text-[#d87f3f] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-[#d87f3f] transition-colors">Terms of Service</Link></li>
              <li><Link href="/certifications" className="hover:text-[#d87f3f] transition-colors">Certifications</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#3d5273] pt-8 text-center text-sm text-gray-400">
          <p>© 2025 Nature's Treats. All rights reserved. Made with 🌿 for your wellness.</p>
        </div>
      </div>
    </footer>
  )
}
