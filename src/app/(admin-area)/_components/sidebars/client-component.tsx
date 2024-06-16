'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { adminRoutes } from '@/configs/routes'
import { memo } from 'react'

const AdminSideBar = () => {
	const pathname = usePathname()

	return (
		<ul role="list" className="sidebar">
			{adminRoutes.map((item: any, index: number) => {
				const isActive = `/${item.path}` === pathname
				return (
					<li
						key={index}
						className={`opacity-50 text-[#ffffff] rounded-lg py-3 px-3 hover:bg-[#46B8E9] hover:opacity-100 ${
							isActive ? 'bg-[#E7E7E7]' : ''
						}`}
					>
						<Link href={item.path} className="flex items-center">
							<div className="relative w-[18px] h-[18px] aspect-[1/1] mr-2">
								<Image fill src={item.icon} style={{ objectFit: 'contain' }} alt="search-icon" />
							</div>
							<span>{item.name}</span>
						</Link>
					</li>
				)
			})}
		</ul>
	)
}
export default memo(AdminSideBar)
