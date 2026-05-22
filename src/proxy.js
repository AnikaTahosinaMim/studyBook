import { NextResponse } from 'next/server'

export function proxy(request) {
	const session =
		request.cookies.get('better-auth.session_token') ||
		request.cookies.get('__Secure-better-auth.session_token')

	if (!session) {
		return NextResponse.redirect(new URL('/login', request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: [
		'/booking/:path*',
		'/my-listings/:path*',
		'/my-bookings/:path*',
		'/add-room/:path*',
	],
}
