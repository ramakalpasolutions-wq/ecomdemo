'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Package, FolderTree, Image, Users, LogOut } from 'lucide-react'


export default function AdminLayout({ children }) {
  const pathname = usePathname()
  const router = useRouter()

  const menuItems = [
  { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/products', icon: Package, label: 'Products' },
  { href: '/admin/categories', icon: FolderTree, label: 'Categories' },
  { href: '/admin/users', icon: Users, label: 'Users' }, // ADD THIS
  { href: '/admin/hero', icon: Image, label: 'Hero Section' },
]


  const handleLogout = async () => {
    if (confirm('Are you sure you want to logout?')) {
      try {
        const res = await fetch('/api/auth/logout', {
          method: 'POST'
        })
        
        const data = await res.json()
        
        if (data.success) {
          router.push('/login')
        }
      } catch (error) {
        console.error('Logout error:', error)
        alert('Failed to logout')
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-[#2d3e5f] text-white">
        <div className="p-6 border-b border-[#3d5273]">
          <div className="text-xl font-bold">ADMIN PANEL</div>
          <div className="text-sm text-[#d87f3f]">Nature's Treats</div>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-[#d87f3f] text-white' 
                        : 'text-gray-300 hover:bg-[#3d5273]'
                    }`}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#3d5273]">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-[#3d5273] rounded-lg transition-colors w-full"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        {children}
      </main>
    </div>
  )
}
