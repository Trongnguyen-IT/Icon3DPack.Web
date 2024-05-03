import { AuthService } from '@/services/user/auth-service'
import { cookies } from 'next/headers'
import DeleteAccountForm from './_components/delete-account'

export default async function DeleteAccount() {
	const cookieStore = cookies()
	const token = cookieStore.get('token')

	const authService = new AuthService('users', token?.value)

	const { result: user } = await authService.profile()

	return <DeleteAccountForm props={{ user }}></DeleteAccountForm>
}
