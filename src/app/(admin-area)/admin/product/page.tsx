import { ConvertToCloudfontUrl } from '@/helper/cloudfont-helper'
import Image from 'next/image'
import Link from 'next/link'
import Delete from './_components/delete'
import { ProductService } from '@/services/products'
import ProductResponseModel from '@/models/products/product-response-model'

export default async function AdminCategory() {
	const productService = new ProductService('product')

	const {
		payload: { result: dataSource },
	} = await productService.getAll()

	return (
		<div>
			<h1 className="font-bold text-[1.875rem] mb-8">Product</h1>
			<div className="flex justify-end mb-4">
				<Link
					href="/admin/product/add"
					className="flex justify-center items-center w-[7.5rem] h-[3.125rem] bg-[#46B8E9] hover:bg-[#0F9CD9] focus:outline-none rounded-lg font-bold text-white transition-all"
				>
					Add
				</Link>
			</div>
			<table className="text-left w-full table-auto border-collapse border border-slate-400">
				<thead>
					<tr>
						<th className="border border-slate-300 px-2">Id</th>
						<th className="border border-slate-300 px-2">Cover</th>
						<th className="border border-slate-300 px-2">Name</th>
						<th className="border border-slate-300 px-2">Category</th>
						<th className="border border-slate-300 px-2">Actions</th>
					</tr>
				</thead>
				<tbody>
					{dataSource && dataSource.length ? (
						dataSource.map((item: ProductResponseModel): JSX.Element => {
							return (
								<tr key={item.id}>
									<td className="border border-slate-300 px-2">{item.id}</td>
									<td className="border border-slate-300 px-2">
										<div className="col-span-1 relative flex justify-center h-full aspect-[4/3] m-2 w-32">
											<Image
												fill
												src={ConvertToCloudfontUrl(item.imageUrl)}
												className="object-contain object-center"
												alt={ConvertToCloudfontUrl(item.imageUrl)}
											></Image>
										</div>
									</td>
									<td className="border border-slate-300 px-2">{item.name}</td>
									<td className="border border-slate-300 px-2">{item.categoryName}</td>

									<td className="border border-slate-300 px-2">
										<div className="grid grid-cols-2 gap-2 mx-4">
											<Link
												href={`/admin/product/${item.id}/edit`}
												className="col-span-1 border text-center border-[#E7E7E7] rounded-xl py-3"
											>
												Edit
											</Link>
											<Delete key={item.id} props={{ id: item.id }} />
										</div>
									</td>
								</tr>
							)
						})
					) : (
						<tr className="text-center">
							<td colSpan={4}>No File Extension</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	)
}
