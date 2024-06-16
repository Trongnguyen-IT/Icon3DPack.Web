'use client'

import Loading from '@/app/_components/loading'
import { ConvertToCloudfontUrl } from '@/helper/cloudfont-helper'
import { FileExtensionResponseModel } from '@/models/file-extensions/file-extension-response-model'
import ProductResponseModel from '@/models/products/product-response-model'
import { downloadFile } from '@/services/products'
import Image from 'next/image'
import { useState } from 'react'

export default function DownloadFile({
	props,
}: {
	props: { product: ProductResponseModel; extension: FileExtensionResponseModel }
}) {
	const { product, extension } = props
	const [isLoading, setIsLoading] = useState(false)
	const [currentFile] = useState(() => {
		return product.fileEntities.find((p) => p.fileExtensionId == extension.id)
	})

	const handleDownload = async () => {
		try {
			setIsLoading(true)

			const file = product.fileEntities.find((p) => p.fileExtensionId == extension.id)

			if (file) {
				const { status, data } = await downloadFile({
					bucketName: 'icon3dpack-bucket-s3',
					key: file.fileUrl,
					fileId: file.id,
				})

				// Create a blob from the response data
				const blob = new Blob([data])

				// Create a temporary URL for the blob
				const url = window.URL.createObjectURL(blob)

				// Create a link element to trigger download
				const link = document.createElement('a') as HTMLAnchorElement
				link.href = url
				link.setAttribute('download', file.name) // Set the filename here
				document.body.appendChild(link)
				link.click()
				if (link.parentNode) {
					link.parentNode.removeChild(link)
				}
			}
		} catch (error) {
			console.error('Error downloading file:', error)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<>
			<button
				onClick={() => handleDownload()}
				key={extension.id}
				className={`border border-solid border-[#E7E7E7] rounded-full inline-flex w-[3.25rem] h-[3.25rem] justify-center items-center ${
					isLoading || !currentFile ? 'cursor-no-drop' : 'cursor-pointer'
				}`}
			>
				{isLoading ? (
					<Loading />
				) : (
					<span>
						<Image
							src={ConvertToCloudfontUrl(extension.imageUrl)}
							style={{ objectFit: 'contain' }}
							alt={ConvertToCloudfontUrl(extension.imageUrl)}
							className="w-[1.5rem] h-[1.5rem]"
							width={20}
							height={30}
						/>
					</span>
				)}
			</button>
		</>
	)
}
