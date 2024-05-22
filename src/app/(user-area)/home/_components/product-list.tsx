'use client'

import ProductResponseModel from '@/models/products/product-response-model'
import ProductHomeItem from './product-home-item'
import { memo } from 'react'

const ProductList = ({ products }: { products: ProductResponseModel[] }) => {
	return (
		<>
			<div className="py-12 grid grid-cols-6 gap-4">
				{products &&
					products.map((product: ProductResponseModel, index: number) => {
						return (
							<div key={index} className="col-span-1">
								<ProductHomeItem product={product} />
							</div>
						)
					})}
			</div>
		</>
	)
}

export default memo(ProductList)
