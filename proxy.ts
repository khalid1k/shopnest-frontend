// proxy.ts
import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  // 1. Get the token from cookies
  const token = request.cookies.get('accessToken')?.value;

  const { pathname } = request.nextUrl;

  // 2. Define your public routes
  const isPublicRoute = pathname === '/login' || pathname === '/register';

  // 3. If no token and trying to access a protected route, redirect to login
  if (!token && !isPublicRoute) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // 4. If token exists and trying to access login/register, redirect to dashboard
  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL('/chat', request.url));
  }

  return NextResponse.next();
}

// 5. Apply proxy to all routes EXCEPT static files and internal Next.js paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};