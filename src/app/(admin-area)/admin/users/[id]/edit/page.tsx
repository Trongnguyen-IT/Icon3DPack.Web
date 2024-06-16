import AddOrEditUser from '../../_components/add-edit'
import { cookies } from 'next/headers'
import { adminGetOne } from '@/services/user'

export default async function UserEditComponent({ params }: { params: { id: string } }) {
	const token = cookies().get('accessToken')
	const { id } = params
	const {
		data: { result: user },
	} = await adminGetOne(id, token?.value)

	return (
		<div>
			<h1 className="font-bold text-[1.875rem] mb-12">Edit User</h1>
			<AddOrEditUser user={user} />
		</div>
	)
}
