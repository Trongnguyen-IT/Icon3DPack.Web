'use client'

import ImageUpload from '@/app/_components/image-upload'
import { ChangeEvent, useEffect, useState } from 'react'
import Image from 'next/image'
import { ConvertToCloudfontUrl } from '@/helper/cloudfont-helper'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { CategoryRequestModel } from '@/models/categories/category-request-model'
import { CategoryService } from '@/services/categories'
import { TagService } from '@/services/tag/tag-service'
import { TagResponseModel } from '@/models/tags/tag-response-model'
import { CategoryResponseModel } from '@/models/categories/category-response-model'

export default function AddOrEditCategory({
	id,
	category,
}: {
	id?: string
	category?: CategoryResponseModel
}) {
	const isAddMode = !id
	const router = useRouter()
	const [model, setModel] = useState({ ...category } as CategoryRequestModel)
	const [tags, setTags] = useState([Object.assign({ name: '' })] as TagResponseModel[])
	const categoryService = new CategoryService('admincategory')
	const tagService = new TagService('admintag')

	console.log('category', category)

	const onSubmit = async (data: CategoryRequestModel): Promise<void> => {
		const { succeeded, result } = isAddMode ? await createOne(data) : await updateOne(id, data)

		if (succeeded) {
			router.push('/admin/category')
			router.refresh()
		}
	}

	async function createOne(data: CategoryRequestModel) {
		return await categoryService.createOne(data)
	}

	async function updateOne(id: string, data: CategoryRequestModel) {
		return await categoryService.updateOne(id, data)
	}

	const updateAvatar = (imageUrl: string): void => {
		setModel((prev) => ({
			...prev,
			imageUrl: imageUrl,
		}))
	}

	useEffect(() => {
		const fetchData = async () => {
			const { succeeded, result: tags } = await tagService.getAll()
			succeeded && setTags(tags)
		}

		fetchData()
	}, [])

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
							prefix="categories"
							updateAvatar={updateAvatar}
						/>
					</div>
					<div className="mb-4">
						<p className="mb-1 font-bold">Name</p>
						<input
							className="w-full border rounded-lg py-3 px-2 border-[#E7E7E7] outline-none"
							type="text"
							placeholder="Category name..."
							value={model.name}
							onChange={(e: ChangeEvent<HTMLInputElement>) =>
								setModel((prev: CategoryRequestModel) => ({
									...prev,
									name: e.target.value,
								}))
							}
						/>
					</div>
					<div className="mb-4">
						<p className="mb-1 font-bold">Tag</p>
						{/* <input
							className="w-full border rounded-lg py-3 px-2 border-[#E7E7E7] outline-none"
							type="text"
							placeholder="Tag name..."
							value={model.name}
							onChange={(e: ChangeEvent<HTMLInputElement>) =>
								setModel((prev: CategoryRequestModel) => ({
									...prev,
									name: e.target.value,
								}))
							}
						/> */}

						<div className="flex flex-row mt-4">
							<select
								onChange={(e) =>
									setModel((prev: CategoryRequestModel) => ({
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
							{model.tags?.map((p, index) => {
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
					</div>
					<div className="mb-4">
						<p className="mb-1 font-bold">Product amount</p>
						<input
							disabled
							className="w-full border rounded-lg py-3 px-2 border-[#E7E7E7] outline-none"
							type="text"
							placeholder="0"
							value={model.productAmount}
						/>
					</div>
					<div className="grid grid-cols-4 gap-4 mt-8">
						<Link
							href="/admin/category"
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
