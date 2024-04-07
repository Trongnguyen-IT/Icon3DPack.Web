import 'react-toastify/dist/ReactToastify.css'
import { cookies } from 'next/headers'
import ProfileClient from './profile-client'
import { UserService } from '@/services/user'

export default async function Profile() {
	const cookieStore = cookies()
	const sessionToken = cookieStore.get('sessionToken')
	console.log('sessionToken', sessionToken)

	const userService = new UserService('users')

	const {
		payload: { result: profile },
	} = await userService.profile(sessionToken?.value)

	return (
		<div>
			{' '}
			<ProfileClient props={profile} />{' '}
		</div>
	)
}
