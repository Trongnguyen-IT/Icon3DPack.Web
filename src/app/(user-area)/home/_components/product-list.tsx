'use client'

import ProductResponseModel from '@/models/products/product-response-model'
import ProductHomeItem from './product-home-item'
import { PaginatedList } from '@/models/base-models/paginated-list'
import { ProductService } from '@/services/products'
import { cookies } from 'next/headers'
import { memo, useEffect, useState } from 'react'

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
