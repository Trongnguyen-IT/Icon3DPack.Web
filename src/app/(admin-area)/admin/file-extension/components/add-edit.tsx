'use client'

import ImageUpload from '@/components/image-upload'
import { ChangeEvent, useState } from 'react'
import Image from 'next/image'
import { ConvertToCloudfontUrl } from '@/helper/cloudfont-helper'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FileExtensionRequestModel } from '@/models/file-extensions/file-extenstion-request-model'
import { FileExtensionService } from '@/services/file-extensions'

export default function AddOrEditFileExtension({
	id,
	fileextension,
}: {
	id?: string
	fileextension?: FileExtensionRequestModel
}) {
	const isAddMode = !id
	const router = useRouter()
	const [model, setModel] = useState(
		Object.assign({ name: '' }, fileextension) as FileExtensionRequestModel
	)
	const fileextensionService = new FileExtensionService('adminfileextension')

	const onSubmit = async (data: FileExtensionRequestModel): Promise<void> => {
		const { payload } = isAddMode ? await createOne(data) : await updateOne(id, data)

		if (payload.succeeded) {
			router.push('/admin/file-extension')
			router.refresh()
		}
	}

	async function createOne(data: FileExtensionRequestModel) {
		return await fileextensionService.createOne(data)
	}

	async function updateOne(id: string, data: FileExtensionRequestModel) {
		return await fileextensionService.updateOne(id, data)
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
					<div className="flex justify-center items-center relative h-full w-full">
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
					<div className="grid grid-cols-4 gap-4 mt-8">
						<Link
							href="/admin/file-extension"
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
