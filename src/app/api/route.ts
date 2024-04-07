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
	return Response.json(body, {
		status: 200,
		headers: {
			'Set-Cookie': `sessionToken=${token}; Path=/; HttpOnly; SameSite=Lax; Secure`,
		},
	})
}
