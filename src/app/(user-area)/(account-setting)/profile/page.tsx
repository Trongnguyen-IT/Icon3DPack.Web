import 'react-toastify/dist/ReactToastify.css'
import { cookies } from 'next/headers'
import ProfileClient from './profile-form'
import { AuthService } from '@/services/user/auth-service'

export default async function Profile() {
	const cookieStore = cookies()
	const sessionToken = cookieStore.get('sessionToken')

	const authService = new AuthService('users')

	const {
		payload: { result: user },
	} = await authService.profile(sessionToken?.value)

	return (
		<div>
			{' '}
			<ProfileClient props={{ user }} />{' '}
		</div>
	)
}
