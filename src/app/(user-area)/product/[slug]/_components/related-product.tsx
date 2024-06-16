import Link from 'next/link'
import ProductItem from './product-item'
import { memo } from 'react'
import ProductResponseModel from '@/models/products/product-response-model'
import { productFilter } from '@/services/products'

const RelatedProduct = async ({ product }: { product: ProductResponseModel }) => {
	const queryObject = {
		pageNumber: 1,
		pageSize: 30,
		sortBy: 'CreatedTime',
		categoryId: product.categoryId,
	}

	const {
		status,
		data: { result: relatedProducts },
	} = await productFilter(queryObject)

	return (
		<>
			<h2 className="font-bold text-[1.625rem]">
				More in{' '}
				<Link href={`/home?categoryId=${product.categoryId}`} className="text-[#46B8E9]">
					{product.categoryName}
				</Link>{' '}
				collection
			</h2>
			<div className="product-list">
				<div className="product-items py-12 grid grid-cols-6 gap-4">
					{status &&
						relatedProducts.items.map((product: ProductResponseModel) => {
							return (
								<div key={product.id} className="col-span-1">
									<ProductItem props={{ product }} />
								</div>
							)
						})}
				</div>
			</div>
		</>
	)
}

export default memo(RelatedProduct)
