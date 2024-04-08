import 'react-toastify/dist/ReactToastify.css'
import { cookies } from 'next/headers'
import ProfileClient from './profile-form'
import { AuthService } from '@/services/user/auth-service'

export default async function Profile() {
	const cookieStore = cookies()
	const sessionToken = cookieStore.get('token')
	const authService = new AuthService('users', sessionToken?.value)

	const { result: user } = await authService.profile()
	return <ProfileClient props={{ user }} />
}
