import { ProductService } from '@/services/products'
import AddOrEditProduct from '../../_components/add-edit'
import { cookies } from 'next/headers'

export default async function ProductEditComponent({ params }: { params: { id: string } }) {
	const cookieStore = cookies()
	const token = cookieStore.get('token')
	const productService = new ProductService('adminproduct', token?.value)

	const { id } = params

	const { result: product } = await productService.getOne(id)

	return (
		<div>
			<h1 className="font-bold text-[1.875rem] mb-12">Edit Product</h1>
			<AddOrEditProduct props={{ product }} />
		</div>
	)
}
