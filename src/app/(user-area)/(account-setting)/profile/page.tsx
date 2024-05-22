import 'react-toastify/dist/ReactToastify.css'
import ProfileClient from './profile-form'
import { profile as getProfile } from '@/services/user'
import { cookies } from 'next/headers'
import { apiStatus } from '@/configs'

export default async function Profile() {
	const token = cookies().get('accessToken')

	const {
		status,
		data: { result: profile },
	} = await getProfile(token?.value)

	return status === apiStatus.success && <ProfileClient profileProp={profile} />
}
