import { AuthService } from '@/services/user/auth-service'
import NotificationForm from './notification-form'
import { cookies } from 'next/headers'

export default async function Notification() {
	return (
		<div>
			<p>
				<b>Email notifications</b>
			</p>
			<NotificationForm></NotificationForm>
		</div>
	)
}
