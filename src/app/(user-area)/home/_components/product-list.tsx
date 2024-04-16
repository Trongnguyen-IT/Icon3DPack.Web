import MyCombobox from './my-combobox'
import SortInput from './sort-input'
import { ProductService } from '@/services/products'
import ProductResponseModel from '@/models/products/product-response-model'
import { CategoryResponseModel } from '@/models/categories/category-response-model'
import ProductHomeItem from './product-home-item'
import SearchInput from '@/app/_components/search-input'
import { PaginatedList } from '@/models/base-models/paginated-list'

export default async function ProductList({
	props,
}: {
	props: { products: PaginatedList<ProductResponseModel> }
}) {
	const { products } = props
	const productService = new ProductService('product')

	return (
		<>
			<div className="product-products py-12 grid grid-cols-6 gap-4">
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
