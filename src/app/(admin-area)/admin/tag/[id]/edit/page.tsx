import { TagService } from '@/services/tag/tag-service'
import { cookies } from 'next/headers'
import AddOrEditTag from '../../_components/add-edit'

export default async function TagEditComponent({ params }: { params: { id: string } }) {
	const cookieStore = cookies()
	const token = cookieStore.get('token')

	const tagService = new TagService('admintag', token?.value)
	const { id } = params

	const { result: tag } = await tagService.getOne(id)

	return (
		<div>
			<h1 className="font-bold text-[1.875rem] mb-12">Edit Tag</h1>
			<AddOrEditTag id={id} tag={tag} />
		</div>
	)
}
