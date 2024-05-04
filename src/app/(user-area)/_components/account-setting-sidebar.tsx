'use client'
import { userSettingRoutes } from '@/configs/routes'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function AccountSettingSidebar() {
	const pathname = usePathname()
	return (
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
								<Image fill src={item.icon} style={{ objectFit: 'contain' }} alt="search-icon" />
							</div>
							<p>{item.name}</p>
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
	)
}
