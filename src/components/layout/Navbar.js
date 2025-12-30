'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { ShoppingCart, Menu, X, User, LogOut } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function Navbar() {
    const pathname = usePathname()
    const router = useRouter()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [user, setUser] = useState(null)
    const [cartCount, setCartCount] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchUser()
        fetchCart()
    }, [])

    const fetchUser = async () => {
        try {
            const res = await fetch('/api/auth/me')
            const data = await res.json()
            if (data.success) {
                setUser(data.user)
            }
        } catch (error) {
            console.error('Error fetching user:', error)
        } finally {
            setLoading(false)
        }
    }

    const fetchCart = async () => {
        try {
            const res = await fetch('/api/cart')
            const data = await res.json()
            if (data.success) {
                setCartCount(data.data.totalItems || 0)
            }
        } catch (error) {
            console.error('Error fetching cart:', error)
        }
    }

    const handleLogout = async () => {
        try {
            const res = await fetch('/api/auth/logout', {
                method: 'POST'
            })

            const data = await res.json()

            if (data.success) {
                setUser(null)
                setCartCount(0)
                router.push('/')
            }
        } catch (error) {
            console.error('Logout error:', error)
        }
    }

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/products', label: 'Products' },
        { href: '/about', label: 'About' },
        { href: '/contact', label: 'Contact' },
    ]

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="container-custom">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="text-2xl font-bold text-[#2d3e5f]">
                            Nature's <span className="text-[#d87f3f]">Treats</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`font-medium transition-colors ${
                                    pathname === link.href
                                        ? 'text-[#d87f3f]'
                                        : 'text-[#2d3e5f] hover:text-[#d87f3f]'
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Right Side Actions */}
                    <div className="hidden md:flex items-center space-x-4">
                        {!loading && (
                            <>
                                {user ? (
                                    <div className="flex items-center space-x-4">
                                        <Link href="/account"> {/* ← Changed from /profile */}
                                            <div className="flex items-center space-x-2 hover:text-[#d87f3f] transition-colors cursor-pointer">
                                                <User size={20} />
                                                <div className="text-sm">
                                                    <p className="font-semibold text-[#2d3e5f]">{user.name}</p>
                                                </div>
                                            </div>
                                        </Link>
                                        {user?.role === 'admin' && (
                                            <Link href="/admin">
                                                <Button variant="secondary" size="sm">
                                                    Admin Panel
                                                </Button>
                                            </Link>
                                        )}

                                        <button
                                            onClick={handleLogout}
                                            className="p-2 text-gray-600 hover:text-[#d87f3f] transition-colors"
                                            title="Logout"
                                        >
                                            <LogOut size={20} />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex items-center space-x-3">
                                        <Link href="/login">
                                            <Button variant="secondary" size="sm">
                                                Login
                                            </Button>
                                        </Link>
                                        <Link href="/register">
                                            <Button variant="primary" size="sm">
                                                Sign Up
                                            </Button>
                                        </Link>
                                    </div>
                                )}
                            </>
                        )}

                        <Link href="/cart">
                            <button className="relative p-2 text-[#2d3e5f] hover:text-[#d87f3f] transition-colors">
                                <ShoppingCart size={24} />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-[#d87f3f] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                                        {cartCount}
                                    </span>
                                )}
                            </button>
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 text-[#2d3e5f]"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-200">
                        <div className="flex flex-col space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`font-medium transition-colors ${
                                        pathname === link.href
                                            ? 'text-[#d87f3f]'
                                            : 'text-[#2d3e5f] hover:text-[#d87f3f]'
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            ))}

                            <Link href="/cart" onClick={() => setMobileMenuOpen(false)}>
                                <div className="flex items-center gap-2 font-medium text-[#2d3e5f]">
                                    <ShoppingCart size={20} />
                                    Cart ({cartCount})
                                </div>
                            </Link>

                            {!loading && (
                                <>
                                    {user ? (
                                        <>
                                            <div className="pt-4 border-t border-gray-200">
                                                <Link href="/account" onClick={() => setMobileMenuOpen(false)}> {/* ← Changed from /profile */}
                                                    <p className="font-semibold text-[#2d3e5f]">{user.name}</p>
                                                    <p className="text-xs text-gray-500">{user.email}</p>
                                                </Link>
                                            </div>
                                            {user.role === 'admin' && (
                                                <Link href="/admin" onClick={() => setMobileMenuOpen(false)}>
                                                    <Button variant="secondary" size="sm" className="w-full">
                                                        Admin Panel
                                                    </Button>
                                                </Link>
                                            )}
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                className="w-full"
                                                onClick={() => {
                                                    handleLogout()
                                                    setMobileMenuOpen(false)
                                                }}
                                            >
                                                Logout
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                                                <Button variant="secondary" size="sm" className="w-full">
                                                    Login
                                                </Button>
                                            </Link>
                                            <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                                                <Button variant="primary" size="sm" className="w-full">
                                                    Sign Up
                                                </Button>
                                            </Link>
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}
