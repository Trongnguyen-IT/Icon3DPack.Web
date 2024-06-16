import { PostResponseModel } from '@/models/posts/post-response-model'
import Link from 'next/link'
import { memo, useEffect, useRef } from 'react'
import Image from 'next/image'

const FooterClient = ({ initialPost }: { initialPost: PostResponseModel[] }) => {
	return (
		<ul className="grid grid-flow-col gap-7 auto-cols-max">
			{initialPost.map((p: any, index: number) => {
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
	)
}
export default memo(FooterClient)
