'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { User, Package, MapPin, Lock, LogOut, Heart, Bell } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function AccountPage() {
    const router = useRouter()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('profile')

    useEffect(() => {
        fetchUser()
    }, [])

    const fetchUser = async () => {
        try {
            const res = await fetch('/api/auth/me')
            const data = await res.json()

            if (data.success) {
                setUser(data.user)
            } else {
                // Not logged in - redirect to login
                router.push('/login?redirect=/account')
            }
        } catch (error) {
            console.error('Error fetching user:', error)
            // On error, also redirect to login
            router.push('/login?redirect=/account')
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        if (confirm('Are you sure you want to logout?')) {
            try {
                const res = await fetch('/api/auth/logout', {
                    method: 'POST'
                })

                const data = await res.json()

                if (data.success) {
                    router.push('/')
                }
            } catch (error) {
                console.error('Logout error:', error)
            }
        }
    }

    // Show loading while checking authentication
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d87f3f] mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        )
    }

    // Don't render anything if user is null (redirecting)
    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600">Redirecting to login...</p>
                </div>
            </div>
        )
    }

    const menuItems = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'orders', label: 'My Orders', icon: Package },
        { id: 'addresses', label: 'Addresses', icon: MapPin },
        { id: 'wishlist', label: 'Wishlist', icon: Heart },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'security', label: 'Security', icon: Lock },
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f5f1e8] to-[#faf7f0] py-12">
            <div className="container-custom">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl font-bold text-[#2d3e5f] mb-8">My Account</h1>

                    <div className="grid lg:grid-cols-4 gap-8">
                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl shadow-sm p-6">
                                {/* User Info */}
                                <div className="text-center mb-6 pb-6 border-b border-gray-200">
                                    <div className="w-20 h-20 bg-[#d87f3f] rounded-full mx-auto mb-3 flex items-center justify-center text-white text-2xl font-bold">
                                        {user?.name?.charAt(0).toUpperCase()}
                                    </div>
                                    <h2 className="font-bold text-lg text-[#2d3e5f]">{user?.name}</h2>
                                    <p className="text-sm text-gray-600">{user?.email}</p>
                                    {user?.role === 'admin' && (
                                        <span className="inline-block mt-2 px-3 py-1 bg-[#d87f3f] text-white text-xs rounded-full">
                                            Admin
                                        </span>
                                    )}
                                </div>

                                {/* Menu */}
                                <nav className="space-y-2">
                                    {menuItems.map((item) => {
                                        const Icon = item.icon
                                        return (
                                            <button
                                                key={item.id}
                                                onClick={() => setActiveTab(item.id)}
                                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === item.id
                                                        ? 'bg-[#d87f3f] text-white'
                                                        : 'text-gray-700 hover:bg-gray-100'
                                                    }`}
                                            >
                                                <Icon size={20} />
                                                <span>{item.label}</span>
                                            </button>
                                        )
                                    })}
                                    {user?.role === 'admin' && (
                                        <Link href="/admin">
                                            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
                                                <Package size={20} />
                                                <span>Admin Panel</span>
                                            </button>
                                        </Link>
                                    )}


                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                                    >
                                        <LogOut size={20} />
                                        <span>Logout</span>
                                    </button>
                                </nav>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="lg:col-span-3">
                            <div className="bg-white rounded-2xl shadow-sm p-8">
                                {activeTab === 'profile' && <ProfileTab user={user} onUpdate={fetchUser} />}
                                {activeTab === 'orders' && <OrdersTab />}
                                {activeTab === 'addresses' && <AddressesTab />}
                                {activeTab === 'wishlist' && <WishlistTab />}
                                {activeTab === 'notifications' && <NotificationsTab />}
                                {activeTab === 'security' && <SecurityTab />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}




// Profile Tab Component
function ProfileTab({ user, onUpdate }) {
    const [editing, setEditing] = useState(false)
    const [saving, setSaving] = useState(false)
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || ''
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSaving(true)

        try {
            const res = await fetch('/api/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            const data = await res.json()

            if (data.success) {
                alert('Profile updated successfully!')
                setEditing(false)
                onUpdate()
            } else {
                alert(data.error || 'Failed to update profile')
            }
        } catch (error) {
            console.error('Update error:', error)
            alert('Failed to update profile')
        } finally {
            setSaving(false)
        }
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#2d3e5f]">Profile Information</h2>
                {!editing && (
                    <Button variant="secondary" size="sm" onClick={() => setEditing(true)}>
                        Edit Profile
                    </Button>
                )}
            </div>

            {editing ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-[#2d3e5f] mb-2">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d87f3f] focus:border-transparent outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-[#2d3e5f] mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d87f3f] focus:border-transparent outline-none"
                        />
                    </div>

                    <div className="flex gap-4">
                        <Button type="submit" variant="primary" disabled={saving}>
                            {saving ? 'Saving...' : 'Save Changes'}
                        </Button>
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => setEditing(false)}
                            disabled={saving}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            ) : (
                <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Full Name</p>
                        <p className="font-semibold text-[#2d3e5f]">{user?.name}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Email Address</p>
                        <p className="font-semibold text-[#2d3e5f]">{user?.email}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Account Type</p>
                        <p className="font-semibold text-[#2d3e5f] capitalize">{user?.role}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Member Since</p>
                        <p className="font-semibold text-[#2d3e5f]">
                            {new Date(user?.createdAt).toLocaleDateString('en-IN', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}

// Orders Tab Component
function OrdersTab() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchOrders()
    }, [])

    const fetchOrders = async () => {
        try {
            const res = await fetch('/api/orders')
            const data = await res.json()

            if (data.success) {
                setOrders(data.data)
            }
        } catch (error) {
            console.error('Error fetching orders:', error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return <p>Loading orders...</p>
    }

    return (
        <div>
            <h2 className="text-2xl font-bold text-[#2d3e5f] mb-6">My Orders</h2>

            {orders.length === 0 ? (
                <div className="text-center py-12">
                    <Package className="mx-auto text-gray-400 mb-4" size={64} />
                    <p className="text-gray-600 text-lg mb-2">No orders yet</p>
                    <p className="text-gray-500 mb-6">Start shopping to see your orders here</p>
                    <Link href="/products">
                        <Button variant="primary">Shop Now</Button>
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div key={order._id} className="border border-gray-200 rounded-lg p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="font-semibold text-[#2d3e5f]">Order #{order._id.slice(-8)}</p>
                                    <p className="text-sm text-gray-600">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                                        order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                                            order.status === 'processing' ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-gray-100 text-gray-700'
                                    }`}>
                                    {order.status}
                                </span>
                            </div>
                            <p className="text-lg font-bold text-[#d87f3f] mb-2">
                                ₹{order.totalAmount?.toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-600">{order.items?.length} items</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

// Addresses Tab Component
function AddressesTab() {
    return (
        <div>
            <h2 className="text-2xl font-bold text-[#2d3e5f] mb-6">Saved Addresses</h2>
            <div className="text-center py-12">
                <MapPin className="mx-auto text-gray-400 mb-4" size={64} />
                <p className="text-gray-600 mb-4">No saved addresses</p>
                <Button variant="primary">Add New Address</Button>
            </div>
        </div>
    )
}

// Wishlist Tab Component
function WishlistTab() {
    return (
        <div>
            <h2 className="text-2xl font-bold text-[#2d3e5f] mb-6">My Wishlist</h2>
            <div className="text-center py-12">
                <Heart className="mx-auto text-gray-400 mb-4" size={64} />
                <p className="text-gray-600 mb-4">Your wishlist is empty</p>
                <Link href="/products">
                    <Button variant="primary">Browse Products</Button>
                </Link>
            </div>
        </div>
    )
}

// Notifications Tab Component
function NotificationsTab() {
    return (
        <div>
            <h2 className="text-2xl font-bold text-[#2d3e5f] mb-6">Notifications</h2>
            <div className="text-center py-12">
                <Bell className="mx-auto text-gray-400 mb-4" size={64} />
                <p className="text-gray-600">No new notifications</p>
            </div>
        </div>
    )
}

// Security Tab Component
function SecurityTab() {
    const [changing, setChanging] = useState(false)
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (formData.newPassword !== formData.confirmPassword) {
            alert('Passwords do not match')
            return
        }

        setChanging(true)

        try {
            const res = await fetch('/api/profile/change-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    currentPassword: formData.currentPassword,
                    newPassword: formData.newPassword
                })
            })

            const data = await res.json()

            if (data.success) {
                alert('Password changed successfully!')
                setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' })
            } else {
                alert(data.error || 'Failed to change password')
            }
        } catch (error) {
            console.error('Change password error:', error)
            alert('Failed to change password')
        } finally {
            setChanging(false)
        }
    }

    return (
        <div>
            <h2 className="text-2xl font-bold text-[#2d3e5f] mb-6">Security Settings</h2>

            <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
                <div>
                    <label className="block text-sm font-semibold text-[#2d3e5f] mb-2">
                        Current Password
                    </label>
                    <input
                        type="password"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d87f3f] focus:border-transparent outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-[#2d3e5f] mb-2">
                        New Password
                    </label>
                    <input
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        required
                        minLength={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d87f3f] focus:border-transparent outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-[#2d3e5f] mb-2">
                        Confirm New Password
                    </label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        minLength={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d87f3f] focus:border-transparent outline-none"
                    />
                </div>

                <Button type="submit" variant="primary" disabled={changing}>
                    {changing ? 'Changing Password...' : 'Change Password'}
                </Button>
            </form>
        </div>
    )
}
