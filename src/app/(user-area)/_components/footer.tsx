'use client'

import { PostResponseModel } from '@/models/posts/post-response-model'
import { PostService } from '@/services/posts'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import { useCallback, useEffect, useRef, useState } from 'react'

export default function Footer() {
	const icons = ['Figma', 'Dribbble', 'Behance', 'Pinterest', 'Instagram', 'Youtube'].map(
		(p) => `../../../images/${p}.svg`
	)
	const postService = new PostService('post')
	const [routes, setRoutes] = useState([Object.assign({})] as PostResponseModel[])
	const donateRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const fetchData = async () => {
			const { succeeded, result } = await postService.getAll()

			succeeded && setRoutes(result)
		}

		fetchData()

		window.addEventListener('scroll', handleScroll, { passive: true })
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	const handleScroll = () => {
		const productFilterRef = document.getElementById('product-filter')
		const triggerHeight = productFilterRef?.offsetTop || 0

		if (productFilterRef && window.scrollY >= triggerHeight) {
			donateRef?.current?.classList.remove('hidden')
		} else {
			donateRef?.current?.classList.add('hidden')
		}
	}

	return (
		<footer className="bg-black text-white">
			<div className="container mx-auto py-20">
				<div className="flex flex-row items-center">
					<div className="basis-3/4">
						<div className="flex flex-col">
							<Link href="." className="flex aspect-[186/40] relative max-w-[150px] mb-4">
								<Image
									src={'../../../images/logo-footer.svg'}
									fill
									style={{ objectFit: 'contain' }}
									alt="3DIconPack"
								/>
							</Link>
							<ul className="grid grid-flow-col gap-7 auto-cols-max">
								{routes.map((p: any, index: number) => {
									return (
										<li className="text-white opacity-50" key={index}>
											<Link href={`/posts/${p.slug}`} className="">
												{p.name}
											</Link>
										</li>
									)
								})}
								<li className="text-white opacity-50">
									<Link href="/posts/contact" className="flex items-center ">
										<span>Contact</span>
									</Link>
								</li>
							</ul>
						</div>
					</div>
					<div className="basis-1/4">
						<div className="flex flex-col">
							<p className="font-bold mb-4">Connect with us</p>
							<ul className="grid grid-cols-6 gap-1">
								{icons.map((p: string, index: number) => {
									return (
										<li key={index} className="">
											<Link href="." className="w-10 h-10 inline-flex relative aspect-[1/1]">
												<Image src={p} fill style={{ objectFit: 'contain' }} alt={p} />
											</Link>
										</li>
									)
								})}
							</ul>
						</div>
					</div>
				</div>
			</div>

			<div className="border-solid border-t border-[#292929] py-10 relative">
				<div className="container mx-auto">
					<p className="opacity-60">© 2020-{new Date().getFullYear()} by 3DICONPACK</p>
				</div>
				<div
					className="fixed bottom-0 right-[7%] -translate-y-1/2 z-10 hidden transition duration-300"
					ref={donateRef}
				>
					<button className="flex aspect-[1/1] relative w-[3.75rem] h-[3.7rem]">
						<Image
							src={'../../../images/icon-donate.svg'}
							fill
							style={{ objectFit: 'contain' }}
							alt="3DIconPack"
						/>
						{/* <Script
							src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
							data-id="3diconpack"
							data-description="Support me on Buy me a coffee!"
							data-message=""
							data-color="#FF813F"
							data-position="Right"
							data-x_margin="18"
							data-y_margin="18"
						/> */}
					</button>
				</div>
			</div>
		</footer>
	)
}
