import ProductResponseModel from '@/models/products/product-response-model'
import ProductHomeItem from './product-home-item'
import { PaginatedList } from '@/models/base-models/paginated-list'

export default async function ProductList({
	props,
}: {
	props: { products: PaginatedList<ProductResponseModel> }
}) {
	const { products } = props

	return (
		<>
			<div className="py-12 grid grid-cols-6 gap-4">
				{products.items.map((product: ProductResponseModel, index: number) => {
					return (
						<div key={index} className="col-span-1">
							<ProductHomeItem props={{ product }} />
						</div>
					)
				})}
			</div>
		</>
	)
}
