import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'

export async function getSession() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value

    if (!token) {
      return null
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    const { payload } = await jwtVerify(token, secret)
    
    return {
      userId: payload.userId,
      email: payload.email,
      role: payload.role
    }

  } catch (error) {
    console.error('Session error:', error)
    return null
  }
}
