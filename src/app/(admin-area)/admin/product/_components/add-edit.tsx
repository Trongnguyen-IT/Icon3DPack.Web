'use client'

import ImageUpload from '@/app/_components/image-upload'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { ConvertToCloudfontUrl } from '@/helper/cloudfont-helper'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import ProductRequestModel from '@/models/products/product-request-model'
import Dropdown from '@/app/_components/dropdown'
import { TagResponseModel } from '@/models/tags/tag-response-model'
import ProductResponseModel from '@/models/products/product-response-model'
import AdminCombobox from '@/app/(admin-area)/_components/combobox'
import { TagRequestModel } from '@/models/tags/tag-request-model'
import TagComponent from '@/app/(admin-area)/_components/tags/tag-component'
import FileUpload from '@/app/_components/file-upload'
import { FileExtensionRequestModel } from '@/models/file-extensions/file-extenstion-request-model'
import { FileEntity } from '@/models/files/file-entity'
import { apiStatus } from '@/configs'
import { adminCreateOne as createTag, adminGetAll as getTags } from '@/services/tag'
import { adminGetAll as getCategories } from '@/services/categories'
import { adminGetAll as getExtensions } from '@/services/file-extensions'
import {
	adminCreateOne as createProduct,
	adminUpdateOne as updateProduct,
} from '@/services/products'

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
	const [newTag, setNewTag] = useState({} as TagResponseModel)
	const [extensions, setExtensions] = useState([] as FileExtensionRequestModel[])
	const [fileEntities, setFileEntities] = useState([] as FileEntity[])

	const onSubmit = async (data: ProductRequestModel): Promise<void> => {
		const {
			status,
			data: { result },
		} = isAddMode ? await createOne(data) : await updateOne(product.id, data)

		if (status === apiStatus.success) {
			router.push('/admin/product')
			router.refresh()
		}
	}

	const getRelatedData = async () => {
		const [
			{
				data: { result: tags },
			},
			{
				data: { result: categories },
			},
			{
				data: { result: extensions },
			},
		] = await Promise.all([await getTags(), await getCategories(), await getExtensions()])

		setTags(tags)
		setCategories(categories)
		setExtensions(extensions)
	}

	useEffect(() => {
		getRelatedData()
	}, [])

	async function createOne(data: ProductRequestModel) {
		return await createProduct(data)
	}

	async function updateOne(id: string, data: ProductRequestModel) {
		return await updateProduct(id, data)
	}

	const handleUpdateAvatar = useCallback((imageUrl: string) => {
		setModel((prev) => ({
			...prev,
			imageUrl: imageUrl,
		}))
	}, [])

	const handleCategoryChange = useCallback((value: any): void => {
		setModel((prev) => {
			return {
				...prev,
				categoryId: value.id,
				categoryName: value.name,
			}
		})
	}, [])

	const onDropdownChange = useCallback((selected: any) => {
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
						tags: [...(prev.tags || []), Object.assign({} as TagRequestModel, addedTag)],
					}
				})
			}
		}
	}

	const handleChangeFile = useCallback((file: any) => {
		setModel((prev) => {
			return {
				...prev,
				fileEntities: [
					...(prev?.fileEntities?.filter((p) => p.fileExtensionId !== file.fileExtensionId) || []),
					file,
				],
			}
		})
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
							prefix="products"
							onUpdateAvatar={handleUpdateAvatar}
						/>
					</div>
					<div className="mb-4">
						<p className="mb-1 font-bold">Category</p>
						<Dropdown
							dataSource={categories}
							active={{ id: product?.categoryId, name: product?.categoryName }}
							onCategoryChange={handleCategoryChange}
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
						<div className="grid grid-cols-8">
							<div className="col-span-7">
								<AdminCombobox
									dataSource={tags}
									onChange={onDropdownChange}
									onChangeInputTag={handleChangeInputTag}
								></AdminCombobox>
							</div>
							<button
								className="col-span-1 h-full border border-[#46B8E9] rounded-lg bg-[#46B8E9] font-medium text-white"
								onClick={() => addTag()}
							>
								add
							</button>
						</div>
					</div>

					<div className="flex flex-row mb-4 mt-4">
						<TagComponent initialTags={model.tags} onChange={handleTagsChange}></TagComponent>
					</div>
					<div className="mb-4">
						<p className="mb-1 font-bold">Files</p>
						{extensions.map((item, index) => {
							const fileEntity = product?.fileEntities.find((p) => p.fileExtensionId === item.id)
							return (
								<FileUpload
									key={index}
									props={{
										imageUrl: item.imageUrl,
										bucketName: 'icon3dpack-bucket-s3',
										prefix: 'products',
										fileType: item.name,
										extension: item,
										onChangeFile: handleChangeFile,
										fileEntity: fileEntity,
									}}
								></FileUpload>
							)
						})}
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
