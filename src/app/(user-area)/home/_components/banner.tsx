import Image from 'next/image'
import { memo } from 'react'
import SignupButton from './signup-button'

const Banner = () => {
	return (
		<div className="banner">
			<div className="grid grid-cols-1 md:grid-cols-2">
				<div className="left-side">
					<h1 className="font-extrabold leading-tight text-[#1B1B1B] mb-8 text-6xl">
						Beautiful graphic sassets for designers and startups
					</h1>
					<p className="opacity-50 text-3xl font-medium leading-[2.8125rem] mb-7 text-[#1B1B1B]">
						Quality design resources that helps you build best products on market.
					</p>
					<SignupButton />
				</div>
				<div className="left-side">
					<div className="relative w-full h-full aspect-[690/485]">
						<Image
							src="images/banner.svg"
							fill
							style={{ objectFit: 'contain' }}
							className=""
							alt="banner"
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
export default memo(Banner)
