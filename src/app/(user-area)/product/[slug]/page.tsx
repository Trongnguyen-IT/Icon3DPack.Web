import Link from 'next/link'
import Image from 'next/image'
import { ConvertToCloudfontUrl } from '@/helper/cloudfont-helper'
import DownloadFile from './_components/download-file'
import { getBySlug } from '@/services/products'
import { getAll as getExtensions } from '@/services/file-extensions'
import RelatedProduct from './_components/related-product'

export default async function ProductDetails({ params }: { params: { slug: string } }) {
	const { slug } = params
	const [
		{
			data: { result: product },
		},
		{
			data: {
				result: { items: extension },
			},
		},
	] = await Promise.all([getBySlug(slug), getExtensions()])

	return (
		<div className="container mx-auto py-20">
			<div>
				<Link href="/home">
					<span className="w-[15px] h-[15px] aspect-[1/1] relative cursor-pointer inline-block mb-4">
						<Image
							fill
							src="/images/left-arrow.svg"
							alt="left-arrow-icon"
							className="object-contain object-center"
						/>
					</span>
				</Link>
				<div className="grid md:grid-cols-2 gap-12">
					<div className="w-[full] h-full">
						<div className="w-full aspect-[690/518] relative cursor-pointer inline-block border rounded-2xl border-[#E7E7E7] overflow-hidden">
							<Image
								fill
								src={ConvertToCloudfontUrl(product.imageUrl)}
								alt={ConvertToCloudfontUrl(product.imageUrl)}
								className="object-contain object-center"
							/>
						</div>
					</div>
					<div>
						<div className="flex flex-row justify-between items-center mb-8">
							<h1 className="text-[1.625rem] font-bold">{product.name}</h1>
							<span className="inline-flex border border-solid border-[#E7E7E7] rounded-full p-3">
								<span className="w-[19px] h-[19px] aspect-[1/1] relative cursor-pointer inline-block ">
									<Image
										fill
										src="/images/share-icon.svg"
										alt="share-icon"
										className="object-contain object-center"
									/>
								</span>
							</span>
						</div>
						<div className="flex flex-row items-center mb-4">
							<span className="w-[19px] h-[19px] aspect-[1/1] relative cursor-pointer inline-block mr-3">
								<Image
									fill
									src="/images/high-resolution.svg"
									alt="high-resolution"
									className="object-contain object-center"
								/>
							</span>
							<span>High Resolution</span>
						</div>
						<div className="flex flex-row items-center mb-4">
							<span className="w-[19px] h-[19px] aspect-[1/1] relative cursor-pointer inline-block mr-3">
								<Image
									fill
									src="/images/changeable.svg"
									alt="changeable"
									className="object-contain object-center"
								/>
							</span>
							<span>Changeable Colors</span>
						</div>
						<div className="flex flex-row items-center mb-4">
							<span className="w-[19px] h-[19px] aspect-[1/1] relative cursor-pointer inline-block mr-3">
								<Image
									fill
									src="/images/file-type.svg"
									alt="file type"
									className="object-contain object-center"
								/>
							</span>
							<span>File type: FIG, PSD, PNG, Blender</span>
						</div>
						<div className="flex flex-row items-center mt-8 mb-6">
							<span className="w-[1rem] h-[1rem] aspect-[1/1] relative cursor-pointer inline-block mr-3">
								<Image
									fill
									src="/images/download-icon.svg"
									alt="download icon"
									className="object-contain object-center"
								/>
							</span>
							<strong>Download</strong>
						</div>

						<div className="grid grid-cols-8 mb-8">
							{extension &&
								extension.map((item) => {
									return (
										<DownloadFile key={item.id} props={{ product, extension: item }}></DownloadFile>
									)
								})}
						</div>
					</div>
				</div>
			</div>
			<div className="mt-16">
				<RelatedProduct product={product} />
			</div>
		</div>
	)
}
