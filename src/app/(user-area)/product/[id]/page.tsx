import Link from 'next/link'
import Image from 'next/image'
import ProductItem from '@/app/(user-area)/product/[id]/_components/product-item'
import { ProductService } from '@/services/products'
import { cookies } from 'next/headers'
import { ConvertToCloudfontUrl } from '@/helper/cloudfont-helper'
import ProductResponseModel from '@/models/products/product-response-model'

export default async function ProductDetails({ params }: { params: { id: string } }) {
	const cookieStore = cookies()
	const token = cookieStore.get('token')
	const productService = new ProductService('product', token?.value)
	const { succeeded, result: product } = await productService.getOne(params.id)

	const queryObject = {
		sortOrder: 'date_desc',
		categoryId: product.categoryId,
	}

	const { result: relatedProducts } = await productService.productFilter({ queryObject })

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
							<div>
								<div className="border border-solid border-[#E7E7E7] rounded-full inline-flex w-[3.25rem] h-[3.25rem] justify-center items-center">
									<Image
										src="/images/figma-icon.svg"
										style={{ objectFit: 'contain' }}
										alt="figma"
										className="w-[1.5rem] h-[1.5rem]"
										width={20}
										height={30}
									/>
								</div>
							</div>
							<div>
								<div className="border border-solid border-[#E7E7E7] rounded-full p-3 inline-flex w-[3.25rem] h-[3.25rem] justify-center items-center">
									<Image
										src="/images/ps-icon.svg"
										style={{ objectFit: 'contain' }}
										alt="ps icon"
										className="w-[1.5rem] h-[1.5rem]"
										width={20}
										height={30}
									/>
								</div>
							</div>
							<div>
								<div className="border border-solid border-[#E7E7E7] rounded-full p-3 inline-flex w-[3.25rem] h-[3.25rem] justify-center items-center">
									<Image
										src="/images/png-icon.svg"
										style={{ objectFit: 'contain' }}
										alt="png icon"
										className="w-[1.5rem] h-[1.5rem]"
										width={20}
										height={30}
									/>
								</div>
							</div>
							<div>
								<div className="border border-solid border-[#E7E7E7] rounded-full p-3 inline-flex w-[3.25rem] h-[3.25rem] justify-center items-center">
									<Image
										src="/images/blender-icon.svg"
										style={{ objectFit: 'contain' }}
										alt="blender-icon"
										className="w-[1.5rem] h-[1.5rem]"
										width={20}
										height={30}
									/>
								</div>
							</div>
						</div>
						<p>{product.description}</p>
					</div>
				</div>
			</div>
			<div className="mt-16">
				<h2 className="font-bold text-[1.625rem]">
					More in{' '}
					<Link href={`/home?categoryId=${product.categoryId}`} className="text-[#46B8E9]">
						{product.categoryName}
					</Link>{' '}
					collection
				</h2>
				<div className="product-list">
					<div className="product-items py-12 grid grid-cols-6 gap-4">
						{relatedProducts.items.map((product: ProductResponseModel) => {
							return (
								<div key={product.id} className="col-span-1">
									<ProductItem props={{ product }} />
								</div>
							)
						})}
					</div>
				</div>
			</div>
		</div>
	)
}
