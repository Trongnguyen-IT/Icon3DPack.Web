import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const privatePaths = ['/profile', '/admin/category']
const authPaths = ['/login', '/register']

const productEditRegex = /^\/admin\/\d+\/edit$/

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl
	const sessionToken = request.cookies.get('sessionToken')?.value
	// console.log('pathname', pathname)
	// console.log('sessionToken', sessionToken)
	// console.log('privatePaths', privatePaths)

	// Chưa đăng nhập thì không cho vào private paths
	if (privatePaths.some((path) => pathname.startsWith(path)) && !sessionToken) {
		return NextResponse.redirect(new URL('/', request.url))
	}
	// Đăng nhập rồi thì không cho vào login/register nữa
	if (authPaths.some((path) => pathname.startsWith(path)) && sessionToken) {
		return NextResponse.redirect(new URL('/profile', request.url))
	}

	if (pathname.match(productEditRegex) && !sessionToken) {
		return NextResponse.redirect(new URL('/profile', request.url))
	}

	return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: ['/profile', '/me', '/login', '/register', '/products/:path*', '/admin/category'],
}
