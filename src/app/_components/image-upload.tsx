'use client'
import { useEffect, useState, useRef, memo } from 'react'
import Image from 'next/image'
import FileUploadRequest from '@/models/files/file-load-request'
import { ConvertToCloudfontUrl } from '@/helper/cloudfont-helper'
import { UploadService } from '@/services/image-upload'

const ImageUpload = ({
	imageUrl,
	onUpdateAvatar,
	bucketName,
	prefix,
	isShowImage,
}: {
	imageUrl: string
	onUpdateAvatar: Function
	bucketName: string
	prefix: string
	isShowImage: boolean
}) => {
	const productService = new UploadService(bucketName, prefix)
	console.log('child rerender')

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

			const request = {
				formData: formData,
				bucketName: bucketName,
				prefix: prefix,
			} as FileUploadRequest
			const { succeeded, result } = await productService.upload(request)

			succeeded && result && onUpdateAvatar(result)
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<div className="grid grid-cols-12 place-items-center gap-4">
			<div className={`${!isShowImage ? 'hidden' : ''} col-span-2`}>
				<div className="w-[3.75rem] h-[3.75rem] relative rounded-full overflow-hidden ">
					<Image fill src={previewImg} alt={previewImg} className="object-contain object-center" />
				</div>
			</div>
			<div className="col-span-3 place-self-start">
				<button
					onClick={() => uploadInput.current?.click()}
					className="flex justify-center items-center w-[7.5rem] h-[3.125rem] border rounded-lg border-[#E7E7E7] font-bold"
				>
					<Image
						src={ConvertToCloudfontUrl('utilities-image/icon-upload.svg')}
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
			<span className="col-span-6 font-medium opacity-50">JPG, GIF or PNG. 1MB Max.</span>
			<button
				className="w-[1.155rem] h[1.283125rem] aspect-[18/20] relative cursor-pointer col-span-1"
				onClick={() => handleRemove()}
			>
				<Image
					src={ConvertToCloudfontUrl('utilities-image/icon-delete.svg')}
					width={18}
					height={20}
					alt="Picture of the author"
					className="object-contain object-center"
				/>
			</button>
		</div>
	)
}

export default memo(ImageUpload)
