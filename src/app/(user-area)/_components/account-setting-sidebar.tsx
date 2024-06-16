'use client'
import { userSettingRoutes } from '@/configs/routes'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { logout as handleLogout } from '@/services/user'
import { apiStatus } from '@/configs'
import { memo } from 'react'

const AccountSettingSidebar = () => {
	const pathname = usePathname()
	const router = useRouter()

	const logout = async () => {
		const { status } = await handleLogout(true)

		if (status === apiStatus.success) {
			localStorage.removeItem('accessToken')
			localStorage.removeItem('user')
		}

		router.push('/')
		router.refresh()
	}

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
				<button className="flex cursor-pointer" onClick={() => logout()}>
					Sign out
				</button>
			</li>
		</ul>
	)
}

export default memo(AccountSettingSidebar)
