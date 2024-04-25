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
import AdminCombobox from '@/app/(admin-area)/_components/combobox'
import { TagRequestModel } from '@/models/tags/tag-request-model'
import TagComponent from '@/app/(admin-area)/_components/tags/tag-component'

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
	const [tags, setTags] = useState([
		Object.assign({ id: '', name: '-- Select Tag --' }),
	] as TagResponseModel[])
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

	const getRelatedData = async () => {
		const [{ result: tags }, { result: categories }] = await Promise.all([
			await tagService.getAll(),
			await categoryService.getAll(),
		])

		setTags(tags)
		setCategories(categories)
	}

	useEffect(() => {
		getRelatedData()
	}, [])

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
	const onDropdownChange = (selected: any) => {
		setModel((prev) => {
			return {
				...prev,
				tags: [
					...(prev?.tags?.filter((p) => p.id !== selected.id) || []),
					Object.assign({} as TagRequestModel, selected),
				],
			}
		})
	}

	const handleTagsChange = (newTags: any) => {
		const updatedProduct = { ...model, tags: newTags }
		setModel(updatedProduct)
	}

	return (
		<div className="min-h-[100vh]">
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
						<Dropdown
							props={{
								dataSource: categories,
								active: { id: model?.categoryId, name: model?.categoryName },
								callBack: callBack,
							}}
						></Dropdown>
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
					<div className="mb-4">
						<p className="mb-1 font-bold">Tags</p>
						<AdminCombobox props={{ dataSource: tags, onChange: onDropdownChange }}></AdminCombobox>
					</div>

					<div className="flex flex-row mt-4">
						<TagComponent
							props={{ initialTags: model.tags, onChange: handleTagsChange }}
						></TagComponent>
					</div>
					<div className="my-4">
						<div className="flex items-center">
							<strong className="mr-2">Publish product</strong>
							<label className="inline-flex items-center cursor-pointer">
								<input
									onChange={(e) => {
										setModel((prev) => ({ ...prev, isPublish: e.target.checked }))
									}}
									type="checkbox"
									defaultChecked={model.isPublish}
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
