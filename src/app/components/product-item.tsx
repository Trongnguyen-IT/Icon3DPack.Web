'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function ProductItem(prop: any) {
	return (
		<Link href={`/product/${prop.product.name}`}>
			<div className="product-box relative group overflow-hidden border-transparent rounded-[20px] border-solid border-2 hover:border-[#46B8E9] transition duration-300">
				<div className="product-image aspect-[217/213] overflow-hidden">
					<Image fill src={prop.product.path} style={{ objectFit: 'cover' }} alt="search-icon" />
				</div>
				<span className="product-name font-medium absolute bottom-4 left-1/2 translate-x-[-50%] text-sm opacity-0 group-hover:opacity-100 transition duration-300">
					{prop.product.name}
				</span>
			</div>
		</Link>
	)
}
