import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	const body = await request.json()

	const { username, email, token } = body
	//const expiresAt = body.expiresAt as string
	if (!token) {
		return Response.json(
			{ message: `Don't have token` },
			{
				status: 400,
			}
		)
	}

	//const expiresDate = new Date(expiresAt).toUTCString()

	const response = NextResponse.json(body, {
		status: 200,
		statusText: 'Set cookie successfully',
		headers: {
			'Set-Cookie': `accessToken=${token}; Path=/; HttpOnly; Secure`,
		},
	})

	return Response.json(body, {
		status: 200,
		headers: {
			'Set-Cookie': `accessToken=${token}; Path=/; HttpOnly; Secure`,
		},
	})

	//response.cookies.set('accessToken', token.accessToken)
	//response.cookies.set('refreshToken', token.refreshToken)

	//return response
}
