import { FileExtensionService } from '@/services/file-extensions'
import { cookies } from 'next/headers'
import AddOrEditFileExtension from '../../components/add-edit'

export default async function FileExtensionEditComponent({ params }: { params: any }) {
	const fileextensionService = new FileExtensionService('adminfileextension')
	const { id } = params
	const cookieStore = cookies()
	const sessionToken = cookieStore.get('sessionToken')

	const { status, payload } = await fileextensionService.getOne(id)

	const fileextension = payload.result

	return (
		<div>
			<h1 className="font-bold text-[1.875rem]">Edit FileExtension</h1>
			<AddOrEditFileExtension id={id} fileextension={fileextension} />
		</div>
	)
}
