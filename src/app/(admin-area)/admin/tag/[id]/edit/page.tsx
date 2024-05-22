import { cookies } from 'next/headers'
import AddOrEditTag from '../../_components/add-edit'
import { adminGetOne } from '@/services/tag'

export default async function TagEditComponent({ params }: { params: { id: string } }) {
	const cookieStore = cookies()
	const token = cookieStore.get('accessToken')

	const { id } = params

	const {
		data: { result: tag },
	} = await adminGetOne(id, token?.value)

	return (
		<div>
			<h1 className="font-bold text-[1.875rem] mb-12">Edit Tag</h1>
			<AddOrEditTag id={id} tag={tag} />
		</div>
	)
}
