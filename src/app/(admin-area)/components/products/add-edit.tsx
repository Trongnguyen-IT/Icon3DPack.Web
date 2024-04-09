'use client'

import ImageUpload from '@/_components/image-upload'
import { ChangeEvent, useEffect, useState } from 'react'
import Image from 'next/image'
import { ConvertToCloudfontUrl } from '@/helper/cloudfont-helper'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import ProductRequestModel from '@/models/products/product-request-model'
import { createOne, updateOne } from '@/apis/products'

export default function AddOrEditProduct({ props }: { props?: ProductRequestModel }) {
	const router = useRouter()
	const [model, setModel] = useState({} as ProductRequestModel)

	useEffect(() => {
		setModel(
			props
				? (Object.assign({}, props) as ProductRequestModel)
				: (Object.assign({}) as ProductRequestModel)
		)
	}, [props])

	const isAddMode = !props

	// set default form values if in edit mode
	if (!isAddMode) {
		//formOptions.defaultValues = props.user;
	}

	function onSubmit(data: ProductRequestModel) {
		return isAddMode ? createProduct(data) : updateProduct(model.id, data)
	}

	async function createProduct(data: ProductRequestModel) {
		const result = await createOne(data)
		result.status && result.data.succeeded && router.push('/admin/Product')
	}

	async function updateProduct(id: string, data: ProductRequestModel) {
		const result = await updateOne(id, data)
		result.status && result.data.succeeded && router.push('/admin/Product')
	}

	const updateAvatar = (imageUrl: string): void => {
		setModel((prev) => ({
			...prev,
			imageUrl: imageUrl,
		}))
	}

	return (
		<div>
			<div className="grid grid-cols-8 gap-10">
				<div className="col-span-2 flex justify-center items-center">
					<div className=" flex justify-center items-center relative h-full w-full">
						<Image
							fill
							src={ConvertToCloudfontUrl(model.imageUrl)}
							alt={ConvertToCloudfontUrl(model.imageUrl)}
							className="object-contain object-center"
						/>
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
							placeholder="Product name..."
							value={model.name}
							onChange={(e: ChangeEvent<HTMLInputElement>) =>
								setModel((prev: ProductRequestModel) => ({
									...prev,
									name: e.target.value,
								}))
							}
						/>
					</div>
					<div className="grid grid-cols-4 gap-4 mt-8">
						<Link
							href="/admin/Product"
							className="col-span-1 border border-[#E7E7E7] rounded-lg py-3 font-bold"
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
