import Image from 'next/image'
import MyCombobox from '../../../../_components/my-combobox'
import SearchInput from '../../../../_components/search-input'
import SortInput from '../../../../_components/sort-input'
import { cookies } from 'next/headers'
import { ProductService } from '@/services/products'
import Link from 'next/link'
import ProductResponseModel from '@/models/products/product-response-model'
import { ConvertToCloudfontUrl } from '@/helper/cloudfont-helper'
import { CategoryResponseModel } from '@/models/categories/category-response-model'

export default async function ProductList({
	props,
}: {
	props: { categories: CategoryResponseModel[] }
}) {
	const { categories } = props
	const cookieStore = cookies()
	const token = cookieStore.get('token')
	const productService = new ProductService('product', token?.value)

	const { succeeded, result: products } = await productService.getAll()

	return (
		<div className="product-list">
			<div className="product-filter grid grid-cols-12 gap-4">
				<div className="col-span-2">
					<div className="dropdown-list h-full">
						<MyCombobox props={{ categories }} />
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
				{products.map((product: ProductResponseModel, index: number) => {
					return (
						<div key={index} className="col-span-1">
							{/* <ProductItem product={product} /> */}
							<Link href={`/product/${product.id}/`}>
								<div className="product-box relative group overflow-hidden border-transparent rounded-[20px] border-solid border-2 hover:border-[#46B8E9] transition duration-300">
									<div className="relative product-image aspect-[217/213] overflow-hidden">
										<Image
											fill
											src={ConvertToCloudfontUrl(product.imageUrl)}
											alt={ConvertToCloudfontUrl(product.imageUrl)}
											className="object-contain object-center"
										/>
									</div>
									<span className="w-full text-center product-name font-medium absolute bottom-4 left-1/2 translate-x-[-50%] opacity-0 group-hover:opacity-100 transition duration-300">
										{product.name}
									</span>
								</div>
							</Link>
						</div>
					)
				})}
			</div>
		</div>
	)
}
