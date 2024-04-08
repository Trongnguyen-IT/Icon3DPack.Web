import { FileExtensionService } from '@/services/file-extensions'
import { cookies } from 'next/headers'
import AddOrEditFileExtension from '../../components/add-edit'

export default async function FileExtensionEditComponent({ params }: { params: any }) {
	const cookieStore = cookies()
	const token = cookieStore.get('token')
	const fileextensionService = new FileExtensionService('adminfileextension', token?.value)
	const { id } = params

	const { result: fileextension } = await fileextensionService.getOne(id)

	return (
		<div>
			<h1 className="font-bold text-[1.875rem] mb-12">Edit FileExtension</h1>
			<AddOrEditFileExtension id={id} fileextension={fileextension} />
		</div>
	)
}
