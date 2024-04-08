'use client'

// Import Swiper React components
// import { Swiper, SwiperSlide } from 'swiper/react'
import { Swiper, SwiperSlide } from 'swiper/react'

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'
// import Swiper and modules styles

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

import Image from 'next/image'
import { useRef } from 'react'

export default function ListCategories() {
	const images = [
		'fitness',
		'live',
		'marketing',
		'business',
		'fitness',
		'live',
		'marketing',
		'business',
	].map((p) => ({ name: p, url: `../../images/${p}.svg` }))

	const navPrevButton = useRef<HTMLButtonElement>(null)
	const navNextButton = useRef<HTMLButtonElement>(null)
	const prevRef = useRef(null)
	const nextRef = useRef(null)
	return (
		// <Swiper>
		// 	<SwiperSlide>Slide 1</SwiperSlide>
		// 	<SwiperSlide>Slide 2</SwiperSlide>
		// 	<span slot="container-start">Container Start</span>
		// 	<span slot="container-end">Container End</span>
		// 	<span slot="wrapper-start">Wrapper Start</span>
		// 	<span slot="wrapper-end">Wrapper End</span>
		// </Swiper>

		// <Swiper
		// 	// install Swiper modules
		// 	modules={[Navigation, Pagination, Scrollbar, A11y]}
		// 	spaceBetween={50}
		// 	slidesPerView={1}
		// 	navigation
		// 	pagination={{ clickable: true }}
		// 	scrollbar={{ draggable: true }}
		// 	onSwiper={(swiper) => console.log(swiper)}
		// 	onSlideChange={() => console.log('slide change')}
		// 	onInit={(swiper) => {
		// 		swiper.params.navigation.prevEl = prevRef.current
		// 		swiper.params.navigation.nextEl = nextRef.current
		// 		swiper.navigation.init()
		// 		swiper.navigation.update()
		// 	}}
		// >
		// 	<SwiperSlide className="h-[200px]">Slide 1</SwiperSlide>
		// 	<SwiperSlide className="h-[200px]">Slide 2</SwiperSlide>
		// 	<SwiperSlide className="h-[200px]">Slide 3</SwiperSlide>
		// 	<SwiperSlide className="h-[200px]">Slide 4</SwiperSlide>
		// 	<span slot="container-start">Container Start</span>
		// 	<span slot="container-end">Container End</span>
		// 	<span slot="wrapper-start">Wrapper Start</span>
		// 	<span slot="wrapper-end">Wrapper End</span>

		// 	<div ref={prevRef}>Prev</div>
		// 	<div ref={nextRef}>Next</div>
		// </Swiper>
		<div className="category py-24">
			<Swiper
				modules={[Navigation]}
				spaceBetween={16}
				slidesPerView={4}
				navigation={{
					prevEl: navPrevButton.current,
					nextEl: navNextButton.current,
				}}
				onSlideChange={() => {}}
				onSwiper={(swiper: any) => {}}
			>
				{images.map((p: any, index: number) => {
					return (
						<SwiperSlide key={index} className="min-h-[252px]">
							<Image
								className="aspect-[335/252] static category-img"
								src={p.url}
								fill
								style={{ objectFit: 'cover' }}
								alt={p.name}
							/>
							<div className="text-center pt-4">
								<p className="text-2xl capitalize font-bold mb-1">{p.name}</p>
								<p className="text-[#CDCDCD]">130+ icons</p>
							</div>
						</SwiperSlide>
					)
				})}
				<button
					ref={navPrevButton}
					className="border-[#F7F7F7] absolute top-[calc(50%-37px)] left-0 navigation-button prev aspect-[1/1] w[40px] h-[40px] -translate-y-1/2"
				>
					{/* <Image
						src="images/left-arrow.svg"
						style={{ objectFit: 'contain' }}
						alt="search-icon"
						className="aspect-[1/2] transition duration-300 hover:stroke-cyan-400 hover:translate-x-[-3px] ease-linear stroke-cyan-300"
						width={10}
						height={20}
					/> */}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-[0.625rem h-[1.25rem] transition duration-300 hover:stroke-[#0F9CD9] hover:translate-x-[-3px] ease-linear"
					>
						<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
					</svg>
				</button>
				<button
					ref={navNextButton}
					className="border-[#F7F7F7] absolute top-[calc(50%-37px)] right-0 navigation-button prev aspect-[1/1] w[40px] h-[40px] -translate-y-1/2"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-[0.625rem h-[1.25rem] transition duration-300 hover:stroke-[#0F9CD9] hover:translate-x-[3px] ease-linear"
					>
						<path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
					</svg>
				</button>
			</Swiper>
		</div>
	)
}
