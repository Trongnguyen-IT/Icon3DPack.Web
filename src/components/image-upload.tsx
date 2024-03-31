'use client'
import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { upload } from '@/apis/image-upload'
import FileUploadRequest from '@/models/users/file-load-model'

export default function ImageUpload({
	imageUrl,
	updateAvatar,
	bucketName,
	prefix,
}: {
	imageUrl: string
	updateAvatar: Function
	bucketName: string
	prefix: string
}) {
	const [fileImage, setFileImage] = useState('')
	const [previewImg, setPreviewImg] = useState(imageUrl || '/images/default-avatar.svg')
	const uploadInput = useRef<HTMLInputElement>(null)

	useEffect(() => {
		imageUrl && setPreviewImg(imageUrl)
		return () => {
			fileImage && URL.revokeObjectURL(previewImg)
		}
	}, [imageUrl])

	const handlePreviewfileImage = (e: any): void => {
		const file = e.target.files[0]

		const preview = URL.createObjectURL(file)
		setFileImage(file)
		setPreviewImg(preview)

		uploadImage(file)
	}

	const handleRemove = (): void => {
		setFileImage('')
		setPreviewImg('/images/default-avatar.svg')
	}

	const uploadImage = async (file: any): Promise<void> => {
		try {
			let formData = new FormData()
			formData.append('file', file)

			const resuest = {
				formData: formData,
				bucketName: bucketName,
				prefix: prefix,
			} as FileUploadRequest
			const result = await upload(resuest)

			result.data.succeeded && result.data.result && updateAvatar(result.data.result)
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<div className="flex items-center justify-between">
			<div className="w-[3.75rem] h-[3.75rem] relative rounded-full overflow-hidden aspect-[1/1]">
				<Image fill src={previewImg} style={{ objectFit: 'contain' }} alt={previewImg} />
			</div>
			<div>
				<button
					onClick={() => uploadInput.current?.click()}
					className="flex justify-center items-center w-[7.5rem] h-[3.125rem] border rounded-lg border-[#E7E7E7] font-bold"
				>
					<Image
						src="images/icon-upload.svg"
						width={16}
						height={16}
						alt="Picture of the author"
						className="mr-2"
					/>
					Upload
				</button>
				<input
					ref={uploadInput}
					type="file"
					onChange={handlePreviewfileImage}
					className='hidden className="max-w-[260px] ext-sm text-stone-500 file:mr-5 file:py-1 file:px-3 file:border-[1px] file:text-xs file:font-medium file:bg-stone-50 file:text-stone-700 hover:file:cursor-pointer hover:file:bg-blue-50 hover:file:text-blue-700"'
				/>
			</div>
			<span className="font-medium opacity-50">JPG, GIF or PNG. 1MB Max.</span>
			<button
				className="w-[1.155rem] h[1.283125rem] aspect-[18/20] relative cursor-pointer"
				onClick={() => handleRemove()}
			>
				<Image
					src="images/delete.svg"
					width={18}
					height={20}
					alt="Picture of the author"
					style={{ objectFit: 'contain' }}
				/>
			</button>
		</div>
	)
}
