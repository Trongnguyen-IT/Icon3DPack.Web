import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const privatePaths = ['/profile', '/admin/category', '/admin']
const authPaths = ['/login', '/register']

//const productEditRegex = /^\/admin\/\d+\/edit$/
const productEditRegex = /^\/admin\/\d+\/$/

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl
	const token = request.cookies.get('token')?.value

	// Chưa đăng nhập thì không cho vào private paths
	if (privatePaths.some((path) => pathname.startsWith(path)) && !token) {
		return NextResponse.redirect(new URL('/', request.url))
	}
	// Đăng nhập rồi thì không cho vào login/register nữa
	if (authPaths.some((path) => pathname.startsWith(path)) && token) {
		return NextResponse.redirect(new URL('/profile', request.url))
	}

	if (pathname.match(productEditRegex) && !token) {
		return NextResponse.redirect(new URL('/', request.url))
	}

	return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: [
		'/profile',
		'/me',
		'/login',
		'/register',
		'/products/:path*',
		'/admin/category',
		'/',
		'/home',
		'/admin/:path*',
	],
}
