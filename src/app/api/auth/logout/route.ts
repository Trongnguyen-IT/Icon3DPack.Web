export async function POST(request: Request) {
	const res = await request.json()
	//const force = res.force as boolean | undefined

	return Response.json(
		{
			message: 'Buộc đăng xuất thành công',
		},
		{
			status: 200,
			headers: {
				// Xóa cookie sessionToken
				'Set-Cookie': `accessToken=; Path=/; Max-Age=0`,
			},
		}
	)
}
