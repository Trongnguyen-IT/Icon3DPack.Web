'use client'

import { PostResponseModel } from '@/models/posts/post-response-model'
import { PostService } from '@/services/posts'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function PostLayout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname()
	const [routes, setRoutes] = useState([Object.assign({})] as PostResponseModel[])
	const postService = new PostService('post')

	useEffect(() => {
		const fetchData = async () => {
			const { succeeded, result } = await postService.getAll()

			succeeded && setRoutes(result)
		}

		fetchData()
	}, [])

	return (
		<section className="bg-[#F9F9F9] py-12">
			<div className="container mx-auto bg-[#F9F9F9]">
				<div className="flex flex-row">
					<div className="basis-3/12">
						<ul role="list" className="sidebar">
							{routes.map((item: PostResponseModel, index: number) => {
								const isActive = `/posts/${item.slug}` === pathname

								return (
									<li
										key={index}
										className={`opacity-80 text-[#1B1B1B] rounded-lg py-3 px-3 hover:bg-[#E7E7E7] hover:opacity-100 ${
											isActive ? 'bg-[#E7E7E7]' : ''
										}`}
									>
										<Link href={item.slug || '/'} className="flex items-center ">
											<span>{item.name}</span>
										</Link>
									</li>
								)
							})}
							<li
								className={`opacity-80 text-[#1B1B1B] rounded-lg py-3 px-3 hover:bg-[#E7E7E7] hover:opacity-100 ${
									pathname === `/posts/contact` ? 'bg-[#E7E7E7]' : ''
								}`}
							>
								<Link href="contact" className="flex items-center ">
									<span>Contact</span>
								</Link>
							</li>
						</ul>
					</div>
					<div className="basis-9/12 p-8 mx-5 bg-white rounded-[1.25rem]">{children}</div>
				</div>
			</div>
		</section>
	)
}
