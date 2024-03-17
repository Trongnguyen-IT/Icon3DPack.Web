import Image from 'next/image'
import { showSignupHandlerDispatch } from './register'

export default function Banner() {
	return (
		<div className="banner">
			<div className="grid grid-cols-1 md:grid-cols-2">
				<div className="left-side">
					<h1 className="font-extrabold text-[#1B1B1B] mb-8 text-5xl leading-tight">
						Beautiful graphic sassets for designers and startups
					</h1>
					<p className="opacity-50 text-[1.5rem] font-medium leading-tight mb-7 text-[#1B1B1B]">
						Quality design resources that helps you build best products on market.
					</p>
					<button
						onClick={showSignupHandlerDispatch}
						className="text-white text-xs font-bold uppercase bg-[#F04F23] rounded-[10px] px-12 py-4"
					>
						Free Sign Up and download
					</button>
				</div>
				<div className="left-side">
					<div className="relative w-full h-full aspect-[690/485]">
						<Image
							src="images/banner.svg"
							fill
							style={{ objectFit: 'contain' }}
							className=""
							alt="3DIconPack"
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
