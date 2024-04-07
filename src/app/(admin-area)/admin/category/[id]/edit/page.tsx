import AddOrEditCategory from '@/app/(admin-area)/admin/category/_components/add-edit'
import { CategoryService } from '@/services/categories'
import { cookies } from 'next/headers'

export default async function CategoryEditComponent({ params }: { params: any }) {
	const categoryService = new CategoryService('admincategory')
	const { id } = params
	const cookieStore = cookies()
	const sessionToken = cookieStore.get('sessionToken')

	const { status, payload } = await categoryService.getOne(id)

	const category = payload.result

	return (
		<div>
			<h1 className="font-bold text-[1.875rem]">Edit Category</h1>
			<AddOrEditCategory id={id} category={category} />
		</div>
	)
}
