'use client'

import ImageUpload from '@/app/_components/image-upload'
import { ChangeEvent, useCallback, useEffect, useState, memo } from 'react'
import Image from 'next/image'
import { ConvertToCloudfontUrl } from '@/helper/cloudfont-helper'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { CategoryRequestModel } from '@/models/categories/category-request-model'
import { TagResponseModel } from '@/models/tags/tag-response-model'
import { CategoryResponseModel } from '@/models/categories/category-response-model'
import TagComponent from '@/app/(admin-area)/_components/tags/tag-component'
import AdminCombobox from '@/app/(admin-area)/_components/combobox'
import { TagRequestModel } from '@/models/tags/tag-request-model'
import { apiStatus } from '@/configs'
import { adminCreateOne, adminUpdateOne } from '@/services/categories'
import { adminCreateOne as createTag, adminGetAll as getTags } from '@/services/tag'
import SaveButton from '@/app/_components/save-button'
import slugify from 'slugify'

const AddOrEditCategory = ({ id, category }: { id?: string; category?: CategoryResponseModel }) => {
	const isAddMode = !id
	const [isLoading, setIsLoading] = useState(false)
	const router = useRouter()
	const [model, setModel] = useState(
		Object.assign({ name: '', tags: [] }, { ...category }) as CategoryRequestModel
	)
	const [tags, setTags] = useState([
		Object.assign({ id: '', name: '-- Select Tag --' }),
	] as TagResponseModel[])
	const [newTag, setNewTag] = useState({} as TagResponseModel)

	const handleSubmit = useCallback(async (): Promise<void> => {
		setIsLoading(true)

		model.slug = slugify(model.name, { lower: true, strict: true })
		const {
			status,
			data: { result },
		} = isAddMode ? await createOne(model) : await updateOne(id, model)

		setIsLoading(false)

		if (status === apiStatus.success) {
			router.push('/admin/category')
			router.refresh()
		}
	}, [model])

	async function createOne(data: CategoryRequestModel) {
		return await adminCreateOne(data)
	}

	async function updateOne(id: string, data: CategoryRequestModel) {
		return await adminUpdateOne(id, data)
	}

	const handleUpdateAvatar = useCallback((imageUrl: string) => {
		setModel((prev) => ({
			...prev,
			imageUrl: imageUrl,
		}))
	}, [])

	const handleDropdownChange = useCallback((selected: any) => {
		setModel((prev) => {
			return {
				...prev,
				tags: [
					...(prev?.tags?.filter((p) => p.id !== selected.id) || []),
					Object.assign({} as TagRequestModel, selected),
				],
			}
		})
	}, [])

	const handleTagsChange = useCallback((newTags: any) => {
		const updatedProduct = { ...model, tags: newTags }
		setModel(updatedProduct)
	}, [])

	const handleChangeInputTag = useCallback((newTag: any) => {
		if (!tags.find((t) => t.id === newTag.id)) {
			setNewTag(newTag)
		}
	}, [])

	const addTag = async () => {
		if (!tags.find((t) => t.id === newTag.id)) {
			const {
				status,
				data: { result: addedTag },
			} = await createTag(Object.assign({} as TagRequestModel, { name: newTag }))
			if (status === apiStatus.success) {
				setTags((prev) => {
					return [...prev, addedTag]
				})
				setModel((prev) => {
					return {
						...prev,
						tags: [...prev.tags, Object.assign({} as TagRequestModel, addedTag)],
					}
				})
			}
		}
	}

	const getRelatedData = async () => {
		const {
			data: {
				result: { items: tags },
			},
		} = await getTags()

		setTags(tags)
	}

	useEffect(() => {
		getRelatedData()
	}, [])

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
							prefix="categories"
							onUpdateAvatar={handleUpdateAvatar}
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
						<p className="mb-1 font-bold">Tags</p>
						<div className="grid grid-cols-8">
							<div className="col-span-7">
								<AdminCombobox
									dataSource={tags}
									onChange={handleDropdownChange}
									onChangeInputTag={handleChangeInputTag}
								></AdminCombobox>
							</div>
							<button
								className="col-span-1 h-full border border-[#46B8E9] rounded-lg bg-[#46B8E9] font-medium text-white"
								onClick={() => addTag()}
							>
								Add tag
							</button>
						</div>
					</div>

					<div className="flex flex-row mt-4">
						<TagComponent initialTags={model.tags} onChange={handleTagsChange}></TagComponent>
					</div>
					{/* <div className="mb-4">
						<p className="mb-1 font-bold">Product amount</p>
						<input
							disabled
							className="w-full border rounded-lg py-3 px-2 border-[#E7E7E7] outline-none"
							type="text"
							placeholder="0"
							value={model.productAmount}
						/>
					</div> */}
					<div className="grid grid-cols-4 gap-4 mt-8">
						<Link
							href="/admin/category"
							className="col-span-1 text-center border border-[#E7E7E7] rounded-lg py-3 font-bold"
						>
							Cancel
						</Link>

						<SaveButton isLoading={isLoading} onHandleClick={handleSubmit} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default memo(AddOrEditCategory)
