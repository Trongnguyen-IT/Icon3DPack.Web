'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'

export default function Footer() {
	const icons = ['Figma', 'Dribbble', 'Behance', 'Pinterest', 'Instagram', 'Youtube'].map(
		(p) => `../../../images/${p}.svg`
	)
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
			url: 'privacy',
			name: 'Privacy',
		},
		{
			url: 'contact',
			name: 'Contact',
		},
	]

	// const onScroll = useCallback((event: any) => {
	// 	scrollTo({
	// 		top: 0,
	// 		behavior: 'smooth',
	// 	})
	// }, [])

	// useEffect(() => {
	// 	//add eventlistener to window
	// 	window.addEventListener('scroll', onScroll, { passive: true })
	// 	// remove event on unmount to prevent a memory leak with the cleanup
	// 	return () => {
	// 		window.removeEventListener('scroll', onScroll, { passive: true })
	// 	}
	// }, [])

	return (
		<footer className="bg-black text-white">
			<div className="container mx-auto py-20">
				<div className="flex flex-row items-center">
					<div className="basis-3/4">
						<div className="flex flex-col">
							<Link href="." className="flex aspect-[186/40] relative max-w-[150px] mb-4">
								<Image
									src={'../../../images/logo-footer.svg'}
									fill
									style={{ objectFit: 'contain' }}
									alt="3DIconPack"
								/>
							</Link>
							<ul className="grid grid-flow-col gap-7 auto-cols-max">
								{navLinks.map((p: any, index: number) => {
									return (
										<li className="text-white opacity-50" key={index}>
											<Link href={`/posts/${p.url}`} className="">
												{p.name}
											</Link>
										</li>
									)
								})}
							</ul>
						</div>
					</div>
					<div className="basis-1/4">
						<div className="flex flex-col">
							<p className="font-bold mb-4">Connect with us</p>
							<ul className="grid grid-cols-6 gap-1">
								{icons.map((p: string, index: number) => {
									return (
										<li key={index} className="">
											<Link href="." className="w-10 h-10 inline-flex relative aspect-[1/1]">
												<Image src={p} fill style={{ objectFit: 'contain' }} alt={p} />
											</Link>
										</li>
									)
								})}
							</ul>
						</div>
					</div>
				</div>
			</div>
			{/* <button onClick={onScroll}>
				<Image src="/images/Top.svg" alt="top icon" width={60} height={60}></Image>
			</button> */}
			<div className="border-solid border-t border-[#292929] py-10 relative">
				<div className="container mx-auto">
					<p className="opacity-60">© 2020-2023 by 3DICONPACK</p>
				</div>
				<div className="absolute top-1/2 right-[7%] -translate-y-1/2">
					<Link href="." className="flex aspect-[1/1] relative w-[3.75rem] h-[3.7rem]">
						<Image
							src={'../../../images/icon-donate.svg'}
							fill
							style={{ objectFit: 'contain' }}
							alt="3DIconPack"
						/>
					</Link>
				</div>
				<div className="absolute bottom-full right-[7%] translate-y-2">
					<button onClick={() => {}} className="flex aspect-[1/1] relative w-[3.75rem] h-[3.7rem]">
						<Image
							src={'../../../images/icon-donate.svg'}
							fill
							style={{ objectFit: 'contain' }}
							alt="3DIconPack"
						/>
					</button>
				</div>
			</div>
		</footer>
	)
}
