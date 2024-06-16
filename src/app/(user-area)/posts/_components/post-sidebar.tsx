'use client'

import { PostResponseModel } from '@/models/posts/post-response-model'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { memo } from 'react'

const PostSideBar = ({ initialPost }: { initialPost: PostResponseModel[] }) => {
	const pathname = usePathname()

	return (
		<ul role="list" className="sidebar">
			{initialPost.map((item: PostResponseModel, index: number) => {
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
	)
}

export default memo(PostSideBar)
