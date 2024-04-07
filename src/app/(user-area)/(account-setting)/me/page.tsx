import { cookies } from 'next/headers'

export default async function Me() {
	const cookieStore = cookies()
	const sessionToken = cookieStore.get('sessionToken')

	const resultAPI = await fetch('http://localhost:5000/api/v1/users/profile', {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${sessionToken?.value}`,
			'Content-Type': 'application/json',
		},
	})
	const { result } = await resultAPI.json()

	return <div>{result.email}</div>
}
