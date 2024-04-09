import AddOrEditCategory from '@/app/(admin-area)/admin/category/_components/add-edit'
import { CategoryService } from '@/services/categories'
import { cookies } from 'next/headers'

export default async function CategoryEditComponent({ params }: { params: { id: string } }) {
	const cookieStore = cookies()
	const token = cookieStore.get('token')

	const categoryService = new CategoryService('admincategory', token?.value)
	const { id } = params

	const { result: category } = await categoryService.getOne(id)

	return (
		<div>
			<h1 className="font-bold text-[1.875rem] mb-12">Edit Category</h1>
			<AddOrEditCategory id={id} category={category} />
		</div>
	)
}
