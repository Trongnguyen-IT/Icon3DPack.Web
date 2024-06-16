'use client'

import Image from 'next/image'
import Script from 'next/script'
import { memo, useEffect, useRef } from 'react'

const Donate = () => {
	const donateRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		window.addEventListener('scroll', handleScroll, { passive: true })
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	const handleScroll = () => {
		const productFilterRef = document.getElementById('product-filter')
		const triggerHeight = productFilterRef?.offsetTop || 0

		if (productFilterRef && window.scrollY >= triggerHeight) {
			donateRef?.current?.classList.remove('hidden')
		} else {
			donateRef?.current?.classList.add('hidden')
		}
	}

	return (
		<div className="border-solid border-t border-[#292929] py-10 relative">
			<div className="container mx-auto">
				<p className="opacity-60">© 2020-{new Date().getFullYear()} by 3DICONPACK</p>
			</div>
			<div
				className="fixed bottom-0 right-[7%] -translate-y-1/2 z-10 hidden transition duration-300"
				ref={donateRef}
			>
				<button className="flex aspect-[1/1] relative w-[3.75rem] h-[3.7rem]">
					<Image
						src={'../../../images/icon-donate.svg'}
						fill
						style={{ objectFit: 'contain' }}
						alt="3DIconPack"
					/>
					<Script
						type="text/javascript"
						src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
						data-id="3diconpack"
						data-description="Support me on Buy me a coffee!"
						data-message=""
						data-color="#FF813F"
						data-position="Right"
						data-x_margin="18"
						data-y_margin="18"
					/>
				</button>
			</div>
		</div>
	)
}
export default memo(Donate)
