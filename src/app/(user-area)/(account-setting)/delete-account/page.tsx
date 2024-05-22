import { cookies } from 'next/headers'
import DeleteAccountForm from './_components/delete-account'
import { profile as getProfile } from '@/services/user'

export default async function DeleteAccount() {
	const token = cookies().get('accessToken')

	const {
		status,
		data: { result: profile },
	} = await getProfile(token?.value)

	return <DeleteAccountForm initialProfile={profile} />
}
