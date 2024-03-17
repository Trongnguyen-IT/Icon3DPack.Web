'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import ProductItem from '../../components/product-item'

export default function ProductDetails({ params }: { params: { product_id: string } }) {
	const [products, setProduct] = useState(() => {
		let productsList = []
		for (let index = 0; index < 18; index++) {
			productsList.push({
				name: `product-${index + 1}`,
				path: `../../images/products/product-${index + 1}.svg`,
			})
		}

		return productsList
	})

	return (
		<div className="container max-w-6xl mx-auto py-20 text-sm">
			<div>
				<Link href="/">
					<span
						className="w-[15px] h-[15px] aspect-[1/1] relative cursor-pointer inline-block mb-4"
						onClick={() => {}}
					>
						<Image
							fill
							src="/images/left-arrow.svg"
							style={{ objectFit: 'contain' }}
							alt="left-arrow-icon"
							className=""
						/>
					</span>
				</Link>
				<div className="grid md:grid-cols-2 gap-12">
					<div className="w-[full] h-full">
						<div className="w-full aspect-[690/518] relative cursor-pointer inline-block border rounded-2xl border-[#E7E7E7] overflow-hidden">
							<Image
								fill
								src="/images/products/product-1.svg"
								style={{ objectFit: 'contain' }}
								alt="left-arrow-icon"
								className=""
							/>
						</div>
					</div>
					<div>
						<div className="flex flex-row justify-between items-center mb-8">
							<h1 className="text-[1.625rem] font-bold">Stopwatch</h1>
							<span className="inline-flex border border-solid border-[#E7E7E7] rounded-full p-3">
								<span
									className="w-[19px] h-[19px] aspect-[1/1] relative cursor-pointer inline-block "
									onClick={() => {}}
								>
									<Image
										fill
										src="/images/share-icon.svg"
										style={{ objectFit: 'contain' }}
										alt="share-icon"
										className=""
									/>
								</span>
							</span>
						</div>
						<div className="flex flex-row items-center mb-4">
							<span
								className="w-[19px] h-[19px] aspect-[1/1] relative cursor-pointer inline-block mr-3"
								onClick={() => {}}
							>
								<Image
									fill
									src="/images/high-resolution.svg"
									style={{ objectFit: 'contain' }}
									alt="high-resolution"
									className=""
								/>
							</span>
							<span>High Resolution</span>
						</div>
						<div className="flex flex-row items-center mb-4">
							<span
								className="w-[19px] h-[19px] aspect-[1/1] relative cursor-pointer inline-block mr-3"
								onClick={() => {}}
							>
								<Image
									fill
									src="/images/changeable.svg"
									style={{ objectFit: 'contain' }}
									alt="changeable"
									className=""
								/>
							</span>
							<span>Changeable Colors</span>
						</div>
						<div className="flex flex-row items-center mb-4">
							<span
								className="w-[19px] h-[19px] aspect-[1/1] relative cursor-pointer inline-block mr-3"
								onClick={() => {}}
							>
								<Image
									fill
									src="/images/file-type.svg"
									style={{ objectFit: 'contain' }}
									alt="file type"
									className=""
								/>
							</span>
							<span>File type: FIG, PSD, PNG, Blender</span>
						</div>
						<div className="flex flex-row items-center mt-8 mb-6">
							<span
								className="w-[1rem] h-[1rem] aspect-[1/1] relative cursor-pointer inline-block mr-3"
								onClick={() => {}}
							>
								<Image
									fill
									src="/images/download-icon.svg"
									style={{ objectFit: 'contain' }}
									alt="download icon"
									className=""
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
						<p>
							3d, accuracy, achievement, activity, black, button, challenge, clock, countdown,
							deadline, dial, duration, efficiency, event, fitness, goal, icon, illustration,
							interval, isolated, limit, measure, nobody
						</p>
					</div>
				</div>
			</div>
			<div className="mt-16">
				<h2 className="font-bold text-[1.625rem]">
					More in{' '}
					<Link href="" className="text-[#46B8E9]">
						Marketing
					</Link>{' '}
					collection
				</h2>
				<div className="product-list">
					<div className="product-items py-12 grid grid-cols-6 gap-4">
						{products.map((item: any, index: number) => {
							return (
								<div key={index} className="col-span-1">
									<ProductItem product={item} />
								</div>
							)
						})}
					</div>
				</div>
			</div>
		</div>
	)
}
