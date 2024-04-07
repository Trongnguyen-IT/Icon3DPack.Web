'use client'

import { ConvertToCloudfontUrl } from '@/helper/cloudfont-helper'
import ProductResponseModel from '@/models/products/product-response-model'
import { getAll } from '@/services/products'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function AdminProduct() {
	const [products, setProducts] = useState([] as ProductResponseModel[])

	const fetchData = async () => {
		const result = await getAll({})
		result.data.succeeded && result.data.result && setProducts(result.data.result)
	}

	useEffect(() => {
		fetchData()
	}, [])

	return (
		<div>
			<h1 className="font-bold text-[1.875rem]">Product</h1>
			<table className="w-full table-auto border-collapse border border-slate-400">
				<thead>
					<tr>
						<th className="border border-slate-300">ID</th>
						<th className="border border-slate-300">Cover</th>
						<th className="border border-slate-300">Name</th>
						<th className="border border-slate-300">Category</th>
						<th className="border border-slate-300">Category</th>
						<th className="border border-slate-300">Actions</th>
					</tr>
				</thead>
				<tbody>
					{products.map((item: ProductResponseModel) => {
						return (
							<tr key={item.id}>
								<td className="border border-slate-300">{item.id}</td>
								<td className="border border-slate-300">
									<div className="flex justify-center">
										<div className="relative p-4">
											<Image
												fill
												src={ConvertToCloudfontUrl(item.imageUrl)}
												className="object-contain object-center"
												alt={item.imageUrl}
											></Image>
										</div>
									</div>
								</td>
								<td className="border border-slate-300">{item.name}</td>
								<td className="border border-slate-300">{item.description}</td>

								<td>
									<div className="grid grid-cols-2 gap-2">
										<button className="col-span-1 border border-[#E7E7E7] rounded-xl py-3">
											Edit
										</button>
										<button className="col-span-1 text-white border bg-[#F04F23] border-[#E7E7E7] rounded-xl py-3">
											Delete
										</button>
									</div>
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</div>
	)
}
