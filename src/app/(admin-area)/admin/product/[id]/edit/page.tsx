import { adminGetOne } from '@/services/products'
import AddOrEditProduct from '../../_components/add-edit'
import { cookies } from 'next/headers'

export default async function ProductEditComponent({ params }: { params: { id: string } }) {
	const { id } = params
	const token = cookies().get('accessToken')

	const {
		data: { result: product },
	} = await adminGetOne(id, token?.value)

	return (
		<div>
			<h1 className="font-bold text-[1.875rem] mb-12">Edit Product</h1>
			<AddOrEditProduct props={{ product }} />
		</div>
	)
}
