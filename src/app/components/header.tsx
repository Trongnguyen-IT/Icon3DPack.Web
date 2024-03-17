'use client'

import Image from 'next/image'
import Link from 'next/link'
import { showLoginHandlerDispatch } from './login'
export default function Header() {
	return (
		<header className="px-6 border-b border-[#E7E7E7]">
			<div className="grid grid-cols-2 py-3  place-items-center place-content-between">
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
					<button
						onClick={() => showLoginHandlerDispatch()}
						className="bg-[#46B8E9] hover:bg-[#0F9CD9] focus:outline-none px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white transition-all"
					>
						Log in
					</button>
				</div>
			</div>
		</header>
	)
}
