'use client'
import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import FileUploadRequest from '@/models/files/file-load-request'
import { ConvertToCloudfontUrl } from '@/helper/cloudfont-helper'
import PropTypes from 'prop-types'
import { FileExtensionResponseModel } from '@/models/file-extensions/file-extension-response-model'
import { FileEntity } from '@/models/files/file-entity'
import { uploadService } from '@/services/image-upload'
import { apiStatus } from '@/configs'

const FileUpload = ({
	props,
}: {
	props: {
		imageUrl: string
		bucketName: string
		prefix: string
		fileType: string
		fileEntity?: FileEntity
		onChangeFile: Function
		extension: FileExtensionResponseModel
	}
}) => {
	const { imageUrl, bucketName, prefix, fileEntity, fileType, onChangeFile, extension } = props

	const [fileImage, setFileImage] = useState('')
	const [previewImg, setPreviewImg] = useState(imageUrl || '/images/default-avatar.svg')
	const uploadInput = useRef<HTMLInputElement>(null)

	// useEffect(() => {
	// 	imageUrl && setPreviewImg(imageUrl)
	// 	return () => {
	// 		fileImage && URL.revokeObjectURL(previewImg)
	// 	}
	// }, [imageUrl])

	const handlePreviewfileImage = (e: any): void => {
		const file = e.target.files[0]

		//const preview = URL.createObjectURL(file)
		//setFileImage(file)
		//setPreviewImg(preview)

		uploadImage(file)
	}

	const handleRemove = (): void => {
		setFileImage('')
		setPreviewImg('/images/default-avatar.svg')
	}

	const uploadImage = async (e: any): Promise<void> => {
		try {
			const file = e.target.files[0]

			let formData = new FormData()
			formData.append('file', file)

			const awsConfig = {
				bucketName: bucketName,
				prefix: prefix,
			}

			const {
				status,
				data: { result: imageUrl },
			} = await uploadService.upload(formData, awsConfig)

			const fileEntity = {
				name: file.name,
				fileUrl: imageUrl,
				fileExtensionId: extension.id,
			}

			status == apiStatus.success && onChangeFile(fileEntity)
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<div className="grid grid-cols-12 place-items-center gap-4">
			<div className="col-span-2">
				<div className="w-[3.75rem] h-[3.75rem] relative rounded-full overflow-hidden ">
					<Image
						fill
						src={ConvertToCloudfontUrl(imageUrl)}
						alt={previewImg}
						className="object-contain object-center"
					/>
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
					onChange={uploadImage}
					className='hidden className="max-w-[260px] ext-sm text-stone-500 file:mr-5 file:py-1 file:px-3 file:border-[1px] file:text-xs file:font-medium file:bg-stone-50 file:text-stone-700 hover:file:cursor-pointer hover:file:bg-blue-50 hover:file:text-blue-700"'
				/>
			</div>
			<span className="col-span-6 font-medium opacity-50">{fileEntity?.name}</span>
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

FileUpload.propTypes = {
	imageUrl: PropTypes.string,
	bucketName: PropTypes.string,
	prefix: PropTypes.string,
	fileType: PropTypes.string,
	onChangeFile: PropTypes.func,
	extension: PropTypes.any,
	fileEntity: PropTypes.any,
}

export default FileUpload
