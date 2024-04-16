'use client'

import ImageUpload from '@/app/_components/image-upload'
import { ChangeEvent, useEffect, useState } from 'react'
import Image from 'next/image'
import { ConvertToCloudfontUrl } from '@/helper/cloudfont-helper'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ProductService } from '@/services/products'
import ProductRequestModel from '@/models/products/product-request-model'
import Dropdown from '@/app/_components/dropdown'
import { CategoryService } from '@/services/categories'
import { TagResponseModel } from '@/models/tags/tag-response-model'
import { TagService } from '@/services/tag/tag-service'
import ProductResponseModel from '@/models/products/product-response-model'

export default function AddOrEditProduct({
	props,
}: {
	props?: { product?: ProductResponseModel }
}) {
	const product = props?.product

	const isAddMode = !product
	const router = useRouter()
	const [model, setModel] = useState(Object.assign({ ...product }) as ProductRequestModel)
	const [categories, setCategories] = useState([{ id: '', name: '' }])
	const [tags, setTags] = useState([Object.assign({})] as TagResponseModel[])
	const productService = new ProductService('adminproduct')
	const tagService = new TagService('admintag')
	const categoryService = new CategoryService('admincategory')

	const onSubmit = async (data: ProductRequestModel): Promise<void> => {
		const { succeeded, result } = isAddMode
			? await createOne(data)
			: await updateOne(product.id, data)

		if (succeeded) {
			router.push('/admin/product')
			router.refresh()
		}
	}

	useEffect(() => {
		getCategories()
		getTags()
	}, [])

	const getTags = async () => {
		const { result: tags } = await tagService.getAll()

		setTags(tags)
	}

	const getCategories = async () => {
		const { result: categories } = await categoryService.getAll()

		const mapDataSource = categories.map((p) => ({ id: p.id, name: p.name }))
		setCategories(mapDataSource)
	}

	async function createOne(data: ProductRequestModel) {
		return await productService.createOne(data)
	}

	async function updateOne(id: string, data: ProductRequestModel) {
		return await productService.updateOne(id, data)
	}

	const updateAvatar = (imageUrl: string): void => {
		setModel((prev) => ({
			...prev,
			imageUrl: imageUrl,
		}))
	}
	const callBack = (value: { id: string; name: string }): void => {
		setModel((prev) => {
			return {
				...prev,
				categoryId: value.id,
				categoryName: value.name,
			}
		})
	}

	return (
		<div>
			<div className="grid grid-cols-8 gap-10">
				<div className="col-span-2 flex justify-center items-center">
					<div className="grid grid-cols-1 row-span-1 col-span-1 w-full h-full">
						<div className=" flex justify-center items-center relative w-full aspect-[4/3]">
							<Image
								fill
								src={ConvertToCloudfontUrl(model.imageUrl)}
								alt={ConvertToCloudfontUrl(model.imageUrl)}
								className="object-contain object-center"
							/>
						</div>
					</div>
				</div>
				<div className="col-span-4">
					<div className="mb-4">
						<p className="mb-1 font-bold">Cover</p>
						<ImageUpload
							isShowImage={false}
							imageUrl=""
							bucketName="icon3dpack-bucket-s3"
							prefix="products"
							updateAvatar={updateAvatar}
						/>
					</div>
					<div className="mb-4">
						<p className="mb-1 font-bold">Category</p>
						<div className="grid grid-cols-2">
							<div className="col-span-1">
								<Dropdown
									props={{
										dataSource: categories,
										active: { id: model?.categoryId, name: model?.categoryName },
										callBack: callBack,
									}}
								></Dropdown>
							</div>
						</div>
						{/* <input
							className="w-full border rounded-lg py-3 px-2 border-[#E7E7E7] outline-none"
							type="text"
							placeholder="0"
							value={model.categoryId}
						/> */}
					</div>
					<div className="mb-4">
						<p className="mb-1 font-bold">Name</p>
						<input
							className="w-full border rounded-lg py-3 px-2 border-[#E7E7E7] outline-none"
							type="text"
							placeholder="Product name..."
							value={model.name || ''}
							onChange={(e: ChangeEvent<HTMLInputElement>) =>
								setModel((prev: ProductRequestModel) => ({
									...prev,
									name: e.target.value,
								}))
							}
						/>
					</div>
					<div className="flex flex-row mt-4">
						<select
							onChange={(e) =>
								setModel((prev: ProductRequestModel) => ({
									...prev,
									tagIds: [e.target.value],
								}))
							}
							name="tag"
							id="tag"
							className="w-full border rounded-lg py-3 px-2 border-[#E7E7E7] outline-none"
						>
							{tags.map((p, index) => {
								return (
									<option key={index} value={p.id} className="flex h-6 bg-red-700 py-6">
										{p.name}
									</option>
								)
							})}
						</select>
					</div>

					<div className="flex flex-row mt-4">
						{product?.tags.map((p, index) => {
							return (
								<div key={index}>
									<div className="flex justify-between items-center  bg-[#D9D9D9] px-4 h-[1.875rem] col-span-1 border border-transparent rounded-3xl font-medium mr-3">
										<span className="mr-2">{p.name}</span>
										<button className="">
											<Image
												src="/images/close-tag.svg"
												alt="close-tag"
												className="object-contain aspect-square"
												width={18}
												height={18}
											></Image>
										</button>
									</div>
								</div>
							)
						})}
					</div>
					<div className="mb-4">
						<p className="mb-1 font-bold">Description</p>
						<textarea
							rows={4}
							className="w-full border rounded-lg py-3 px-2 border-[#E7E7E7] outline-none"
							value={model.description || ''}
							onChange={(e) => {
								setModel((prev) => ({ ...prev, description: e.target.value }))
							}}
						/>
					</div>
					<div className="mb-4">
						<div className="flex items-center">
							<strong className="mr-2">Publish product</strong>
							<label className="inline-flex items-center cursor-pointer">
								<input
									onChange={(e) => {
										setModel((prev) => ({ ...prev, isShow: e.target.checked }))
									}}
									type="checkbox"
									defaultChecked={model.isShow}
									className="sr-only peer"
								/>
								<div className=" bg-[#E7E7E7] relative w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-transparent after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600"></div>
							</label>
						</div>
					</div>
					<div className="grid grid-cols-4 gap-4 mt-8">
						<Link
							href={`/admin/product`}
							className="col-span-1 text-center border border-[#E7E7E7] rounded-lg py-3 font-bold"
						>
							Cancel
						</Link>
						<button
							onClick={() => onSubmit(model)}
							className="col-span-1 border border-[#46B8E9] rounded-lg bg-[#46B8E9] py-3 font-medium text-white"
						>
							Save Changes
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
