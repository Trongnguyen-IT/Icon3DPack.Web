'use client'

import Image from 'next/image'
import Link from 'next/link'
import { showLoginHandlerDispatch } from './login'
import { ConvertToCloudfontUrl } from '../helper/cloudfont-helper'
import { useAppContext } from '@/app/app-provider'
export default function Header() {
	const { user } = useAppContext()

	return (
		<header className="border-b border-[#E7E7E7] h-20">
			<div className="px-6 h-full flex items-center justify-between">
				<div className="inline-flex w-full h-full col-start-1 col-end-2-1">
					<Link href="/" className="aspect-[186/40] relative max-w-[150px]">
						<Image
							src={'../../../images/logo.svg'}
							fill
							style={{ objectFit: 'contain' }}
							alt="3DIconPack"
						/>
					</Link>
				</div>
				<div className="col-end-12">
					{!user && (
						<button
							onClick={() => showLoginHandlerDispatch()}
							className="w-[7.5rem] h-[3.125rem] bg-[#46B8E9] hover:bg-[#0F9CD9] focus:outline-none rounded-full font-bold text-white transition-all"
						>
							Log in
						</button>
					)}

					{user && (
						<Link href="profile">
							<div className="w-[3.125rem] h-[3.125rem] relative rounded-full overflow-hidden aspect-[1/1]">
								<Image
									fill
									src={ConvertToCloudfontUrl(user.imageUrl)}
									style={{ objectFit: 'contain' }}
									alt={ConvertToCloudfontUrl(user.imageUrl)}
								/>
							</div>
						</Link>
					)}
				</div>
			</div>
		</header>
	)
}
