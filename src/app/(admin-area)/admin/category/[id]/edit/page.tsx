import AddOrEditCategory from '@/app/(admin-area)/admin/category/_components/add-edit'
import { TagResponseModel } from '@/models/tags/tag-response-model'
import { adminGetOne } from '@/services/categories'
import { adminGetAll as getTags } from '@/services/tag'
import { cookies } from 'next/headers'

export default async function CategoryEditComponent({ params }: { params: { id: string } }) {
	const { id } = params
	const token = cookies().get('accessToken')

	const [
		{
			data: { result: category },
		},
		{
			data: {
				result: { items: tags },
			},
		},
	] = await Promise.all([adminGetOne(id, token?.value), getTags(token?.value)])

	return (
		<div>
			<h1 className="font-bold text-[1.875rem] mb-12">Edit Category</h1>
			<AddOrEditCategory id={id} category={category} />
		</div>
	)
}
