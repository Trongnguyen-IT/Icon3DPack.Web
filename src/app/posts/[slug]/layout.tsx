'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function PostLayout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname()

	const navLinks = [
		{
			url: 'about',
			name: 'About us',
		},
		{
			url: 'licensing',
			name: 'Licensing',
		},
		{
			url: 'termsofuse',
			name: 'Terms of use',
		},
		{
			url: 'contact',
			name: 'Contact',
		},
	]

	return (
		<section className="bg-[#F9F9F9] py-12">
			<div className="container max-w-6xl mx-auto bg-[#F9F9F9]">
				<div className="flex flex-row text-sm">
					<div className="basis-3/12">
						<ul role="list" className="sidebar">
							{navLinks.map((item: any, index: number) => {
								const isActive = `/posts/${item.url}` === pathname
								return (
									<li
										key={index}
										className={`opacity-80 text-[#1B1B1B] rounded-lg py-3 px-3 hover:bg-[#E7E7E7] hover:opacity-100 ${
											isActive ? 'bg-[#E7E7E7]' : ''
										}`}
									>
										<Link href={item.url} className="flex items-center ">
											<span>{item.name}</span>
										</Link>
									</li>
								)
							})}
						</ul>
					</div>
					<div className="basis-9/12 p-8 mx-5 bg-white rounded-[1.25rem]">{children}</div>
				</div>
			</div>
		</section>
	)
}
