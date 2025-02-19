// middleware.js
import { NextRequest, NextResponse } from 'next/server';

// Middleware function to check for authentication token
export function middleware(req: NextRequest) {

  if (req.nextUrl.pathname.startsWith("/_next") || req.nextUrl.pathname.startsWith("/image")) {
    return NextResponse.next();
    }
    
  const token = req.cookies.get('token'); // Replace 'token' with your cookie name

  // Define the paths that should be accessible without a token
  const publicPaths = ['/signup', '/login', '/register','/verify','/verify-google'];

  // Check if the request path is one of the public paths
  const isPublicPath = publicPaths.includes(req.nextUrl.pathname);

  // If the token exists, allow access to all routes except the public paths
  if (token) {
    if (isPublicPath) {
      // If the user is authenticated and trying to access a public path, redirect them to the home page or another route
      return NextResponse.redirect(new URL('/', req.url)); // Redirect to home page
    }
    // If the token exists and the path is not public, allow the request to proceed
    return NextResponse.next();
  }

  // If the token does not exist and the path is not public, redirect to the login page
  if (!isPublicPath) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // If the path is public and no token is present, allow access
  return NextResponse.next();
}


// Specify that this middleware should run for all paths
export const config = {
  matcher: ['/', '/:path*'], // This matches all routes
};