import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const { pathname } = request.nextUrl

  const isAuthPage = pathname === '/login' || pathname === '/signup'
  const isProtectedPage =
    pathname.startsWith('/dashboard') || pathname.startsWith('/documents')
  const isRootPage = pathname === '/'

  // Root page → redirect based on auth state
  if (isRootPage) {
    return NextResponse.redirect(
      new URL(token ? '/dashboard' : '/login', request.url)
    )
  }

  // Not logged in but trying to access a protected page → send to login
  if (!token && isProtectedPage) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Already logged in but trying to visit login/signup → send to dashboard
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/login', '/signup', '/dashboard/:path*', '/documents/:path*'],
}

export default middleware