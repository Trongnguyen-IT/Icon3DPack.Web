import { cookies } from 'next/headers'
import ChangePasswordForm from './change-password-form'
import { AuthService } from '@/services/user/auth-service'

export default async function ChangePassword() {
	const cookieStore = cookies()
	const token = cookieStore.get('token')

	const authService = new AuthService('users', token?.value)

	const { result: user } = await authService.profile()

	return <ChangePasswordForm props={{ user }} />
}
