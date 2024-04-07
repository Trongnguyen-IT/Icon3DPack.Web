import { ProductService } from '@/services/products'
import AddOrEditProduct from '../../_components/add-edit'

export default async function ProductEditComponent({ params }: { params: any }) {
	const productService = new ProductService('adminproduct')
	const { id } = params

	const {
		status,
		payload: { result: product },
	} = await productService.getOne(id)

	return (
		<div>
			<h1 className="font-bold text-[1.875rem]">Edit Category</h1>
			<AddOrEditProduct props={{ product }} />
		</div>
	)
}
