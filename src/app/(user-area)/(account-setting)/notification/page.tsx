import { AuthService } from '@/services/user/auth-service'
import NotificationForm from './notification-form'
import { cookies } from 'next/headers'

export default async function Notification() {
	const cookieStore = cookies()
	const token = cookieStore.get('token')

	const authService = new AuthService('users', token?.value)

	const { result: user } = await authService.profile()

	return (
		<div>
			<p>
				<b>Email notifications</b>
			</p>
			<NotificationForm props={{ user }}></NotificationForm>
		</div>
	)
}
