'use client'

import { getOne } from '@/apis/products'
import AddOrEditProduct from '@/app/admin/components/products/add-edit'
import ProductResponseModel from '@/models/products/product-response-model'
import { useEffect, useState } from 'react'

export default function EditProductComponent({ id }: { id: string }) {
	const [product, setProduct] = useState({} as ProductResponseModel | undefined)

	useEffect(() => {
		const fetchData = async () => {
			const result = await getOne(id)

			result.status && result.data.succeeded && setProduct(result.data.result)
		}
		fetchData()
	}, [id])

	return (
		<div>
			<h1 className="font-bold text-[1.875rem]">Edit Category</h1>
			<AddOrEditProduct props={product} />
		</div>
	)
}
