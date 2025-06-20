import { NextResponse } from 'next/server'

export function middleware(request) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // Define public paths that don't require authentication
  const isPublicPath = path === '/login'

  // Get the token from the cookies
  const token = request.cookies.get('muneem_user')?.value || ''

  // Redirect logic
  if (isPublicPath && token) {
    // If user is logged in and tries to access login page, redirect to dashboard
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  if (!isPublicPath && !token) {
    // If user is not logged in and tries to access protected page, redirect to login
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    '/',
    '/login',
    '/dashboard/:path*',
    '/billing/:path*',
    '/inventory/:path*',
    '/reports/:path*',
    '/menu/:path*',
    '/staff/:path*',
    '/settings/:path*',
  ],
} 