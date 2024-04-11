import MyCombobox from './my-combobox'
import SortInput from './sort-input'
import { ProductService } from '@/services/products'
import ProductResponseModel from '@/models/products/product-response-model'
import { CategoryResponseModel } from '@/models/categories/category-response-model'
import ProductHomeItem from './product-home-item'
import SearchInput from '@/app/_components/search-input'

export default async function ProductList({
	props,
}: {
	props: { categories: CategoryResponseModel[]; activeCategory?: CategoryResponseModel }
}) {
	const { categories, activeCategory } = props
	const productService = new ProductService('product')

	const queryObject = {
		categoryId: activeCategory ? activeCategory.id : '',
	}

	const { succeeded, result: products } = await productService.productFilter({ queryObject })
	return (
		<div className="product-list">
			<div className="product-filter grid grid-cols-12 gap-4">
				<div className="col-span-2">
					<div className="dropdown-list h-full">
						<MyCombobox props={{ categories, activeCategory }} />
					</div>
				</div>
				<div className="col-span-8">
					<SearchInput />
				</div>
				<div className="col-span-2">
					<SortInput />
				</div>
			</div>
			<div className="product-products py-12 grid grid-cols-6 gap-4">
				{products.items.map((product: ProductResponseModel, index: number) => {
					return (
						<div key={index} className="col-span-1">
							<ProductHomeItem props={{ product }} />
						</div>
					)
				})}
			</div>
		</div>
	)
}
