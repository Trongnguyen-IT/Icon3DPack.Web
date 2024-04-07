'use client'

import { userSettingRoutes } from '@/router/routes'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function SettingLayout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname()

	return (
		<div className="bg-[#F9F9F9] py-12 min-h-[60vh]">
			<div className="container mx-auto bg-[#F9F9F9]">
				<h2 className="text-center font-bold mb-5">Account settings</h2>
				<div className="flex flex-row">
					<div className="basis-3/12">
						<ul role="list" className="sidebar">
							{userSettingRoutes.map((item: any, index: number) => {
								const isActive = `/${item.url}` === pathname
								return (
									<li
										key={index}
										className={`opacity-80 text-[#1B1B1B] rounded-lg py-3 px-3 hover:bg-[#E7E7E7] hover:opacity-100 ${
											isActive ? 'bg-[#E7E7E7]' : ''
										}`}
									>
										<Link href={item.url} className="flex items-center ">
											<div className="relative w-[17px] aspect-[1/1] mr-2">
												<Image
													fill
													src={item.icon}
													style={{ objectFit: 'contain' }}
													alt="search-icon"
												/>
											</div>
											<span>{item.name}</span>
										</Link>
									</li>
								)
							})}
							<li className="opacity-50 text-[#1B1B1B] rounded-lg py-2 px-3 hover:bg-[#E7E7E7] hover:opacity-100">
								<a href="#" className="flex">
									Sign out
								</a>
							</li>
						</ul>
					</div>
					<div className="basis-9/12 p-8 mx-5 bg-white rounded-[1.25rem]">{children}</div>
				</div>
			</div>
		</div>
	)
}
