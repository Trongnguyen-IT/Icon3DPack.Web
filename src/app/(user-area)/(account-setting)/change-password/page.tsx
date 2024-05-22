import { cookies } from 'next/headers'
import ChangePasswordForm from './change-password-form'
import { profile as getProfile } from '@/services/user'

export default async function ChangePassword() {
	const token = cookies().get('accessToken')

	const {
		status,
		data: { result: profile },
	} = await getProfile(token?.value)

	return <ChangePasswordForm initialProfile={profile} />
}
