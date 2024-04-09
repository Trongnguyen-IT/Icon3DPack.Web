import Image from 'next/image'
import { showSignupHandlerDispatch } from './register'

export default function Banner() {
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
					<button
						onClick={showSignupHandlerDispatch}
						className="w-[23.1875rem] h-[3.75rem] text-white font-bold uppercase bg-[#F04F23] rounded-[10px]"
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
