import { cookies } from 'next/headers'
import ChangePasswordForm from './change-password-form'
import { AuthService } from '@/services/user/auth-service'

export default async function ChangePassword() {
	const cookieStore = cookies()
	const sessionToken = cookieStore.get('sessionToken')

	const authService = new AuthService('users')

	const {
		payload: { result: user },
	} = await authService.profile(sessionToken?.value)

	return <ChangePasswordForm props={{ user }} />
}
