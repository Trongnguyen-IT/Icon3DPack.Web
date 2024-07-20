'use client'

import ImageUpload from '@/app/_components/image-upload'
import { ChangeEvent, useCallback, useState } from 'react'
import Image from 'next/image'
import { ConvertToCloudfontUrl } from '@/helper/cloudfont-helper'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FileExtensionRequestModel } from '@/models/file-extensions/file-extenstion-request-model'
import { apiStatus } from '@/configs'
import { adminCreateOne, adminUpdateOne } from '@/services/file-extensions'
import SaveButton from '@/app/_components/save-button'

export default function AddOrEditFileExtension({
	id,
	extension,
}: {
	id?: string
	extension?: FileExtensionRequestModel
}) {
	const isAddMode = !id
	const router = useRouter()
	const [model, setModel] = useState(
		Object.assign({ name: '', order: 0 }, extension) as FileExtensionRequestModel
	)
	const [isLoading, setIsLoading] = useState(false)

	const handleSubmit = useCallback(async (): Promise<void> => {
		setIsLoading(true)

		const {
			status,
			data: { result },
		} = isAddMode ? await createOne(model) : await updateOne(id, model)

		setIsLoading(false)

		if (status === apiStatus.success) {
			router.push('/admin/file-extension')
			router.refresh()
		}
	}, [model])

	async function createOne(data: FileExtensionRequestModel) {
		return await adminCreateOne(data)
	}

	async function updateOne(id: string, data: FileExtensionRequestModel) {
		return await adminUpdateOne(id, data)
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
							onUpdateAvatar={updateAvatar}
						/>
					</div>
					<div className="mb-4">
						<p className="mb-1 font-bold">Name</p>
						<input
							className="w-full border rounded-lg py-3 px-2 border-[#E7E7E7] outline-none"
							type="text"
							placeholder="FileExtension name..."
							value={model.name}
							onChange={(e: ChangeEvent<HTMLInputElement>) =>
								setModel((prev: FileExtensionRequestModel) => ({
									...prev,
									name: e.target.value,
								}))
							}
						/>
					</div>
					<div className="mb-4">
						<p className="mb-1 font-bold">Order</p>
						<input
							className="w-full border rounded-lg py-3 px-2 border-[#E7E7E7] outline-none"
							type="text"
							placeholder="Order"
							value={model.order}
							onChange={(e: ChangeEvent<HTMLInputElement>) =>
								setModel((prev: FileExtensionRequestModel) => ({
									...prev,
									order: +e.target.value,
								}))
							}
						/>
					</div>
					<div className="grid grid-cols-4 gap-4 mt-8">
						<Link
							href="/admin/file-extension"
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
