import NotificationForm from './notification-form'
import { cookies } from 'next/headers'
import { profile as getProfile } from '@/services/user'

export default async function Notification() {
	const token = cookies().get('accessToken')

	const {
		status,
		data: { result: profile },
	} = await getProfile(token?.value)

	return (
		<div>
			<p>
				<b>Email notifications</b>
			</p>
			<NotificationForm initialProfile={profile} />
		</div>
	)
}
