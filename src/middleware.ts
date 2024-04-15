import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { decodeJWT } from './untils'

const privatePaths = ['/profile', '/change-password', '/notification', '/delete-account']
const authPaths = ['/login', '/register']
const adminPaths = ['/admin']
//const productEditRegex = /^\/admin\/\d+\/edit$/

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl
	const token = request.cookies.get('token')?.value
	const decode = decodeJWT(token || '')
	console.log('decode', decode)

	const claimType = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'

	const isAdmin = decode && Object.hasOwn(decode, claimType) && decode[claimType] === 'Admin'

	// Chưa đăng nhập thì không cho vào private paths
	if (privatePaths.some((path) => pathname.startsWith(path)) && !token) {
		return NextResponse.redirect(new URL('/', request.url))
	}
	// Đăng nhập rồi thì không cho vào login/register nữa
	if (authPaths.some((path) => pathname.startsWith(path)) && token) {
		return NextResponse.redirect(new URL('/profile', request.url))
	}

	// Only admin can access
	if (
		(adminPaths.some((path) => pathname.startsWith(path)) && !token) ||
		(adminPaths.some((path) => pathname.startsWith(path)) && token && !isAdmin)
	) {
		return NextResponse.redirect(new URL('/', request.url))
	}

	return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: ['/profile', '/change-password', '/notification', '/delete-account', '/admin/:path*'],
}
