import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

export async function middleware(request) {
  const token = request.cookies.get('token')?.value
  const { pathname } = request.nextUrl

  console.log('🔍 Middleware:', pathname, 'Token:', token ? 'exists' : 'missing')

  // Check if accessing admin routes
  if (pathname.startsWith('/admin')) {
    if (!token) {
      console.log('❌ No token, redirecting to login')
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }

    try {
      // Verify token using jose (Edge-compatible)
      const secret = new TextEncoder().encode(process.env.JWT_SECRET)
      const { payload } = await jwtVerify(token, secret)
      
      if (payload.role !== 'admin') {
        console.log('❌ Not an admin, access denied')
        // Redirect non-admin users to home page with error message
        const homeUrl = new URL('/', request.url)
        homeUrl.searchParams.set('error', 'admin_only')
        return NextResponse.redirect(homeUrl)
      }

      console.log('✅ Admin access granted')
    } catch (error) {
      console.error('Token verification failed:', error.message)
      // Invalid token, redirect to login
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  // Check other protected routes
  const protectedRoutes = ['/account', '/cart', '/checkout', '/orders']
  const isProtected = protectedRoutes.some(route => pathname.startsWith(route))

  if (isProtected && !token) {
    console.log('❌ No token, redirecting to login')
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  console.log('✅ Access granted')
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/account/:path*',
    '/cart/:path*',
    '/checkout/:path*',
    '/orders/:path*',
    '/admin/:path*'
  ]
}
