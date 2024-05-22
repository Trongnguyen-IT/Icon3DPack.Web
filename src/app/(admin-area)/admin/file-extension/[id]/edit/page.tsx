import { cookies } from 'next/headers'
import AddOrEditFileExtension from '../../components/add-edit'
import { adminGetOne } from '@/services/file-extensions'

export default async function FileExtensionEditComponent({ params }: { params: any }) {
	const { id } = params
	const token = cookies().get('accessToken')

	const {
		data: { result: extension },
	} = await adminGetOne(id, token?.value)

	return (
		<div>
			<h1 className="font-bold text-[1.875rem] mb-12">Edit FileExtension</h1>
			<AddOrEditFileExtension id={id} extension={extension} />
		</div>
	)
}
