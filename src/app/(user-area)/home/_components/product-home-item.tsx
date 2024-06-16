import { ConvertToCloudfontUrl } from '@/helper/cloudfont-helper'
import ProductResponseModel from '@/models/products/product-response-model'
import Image from 'next/image'
import Link from 'next/link'
import { memo } from 'react'

const ProductHomeItem = ({ product }: { product: ProductResponseModel }) => {
	return (
		<Link href={`/product/${product.slug}`}>
			<div className="product-box relative group overflow-hidden border-transparent rounded-[20px] border-solid border-2 hover:border-[#46B8E9] transition duration-300">
				<div className="relative product-image aspect-[217/213] overflow-hidden">
					<Image
						fill
						src={ConvertToCloudfontUrl(product.imageUrl)}
						alt={ConvertToCloudfontUrl(product.imageUrl)}
						className="object-contain"
					/>
				</div>
				<p className="w-full text-center product-name font-medium absolute bottom-4 left-1/2 translate-x-[-50%] opacity-0 group-hover:opacity-100 transition duration-300">
					{product.name}
				</p>
			</div>
		</Link>
	)
}
export default memo(ProductHomeItem)
