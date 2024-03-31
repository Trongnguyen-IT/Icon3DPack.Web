'use client'

import Image from 'next/image'
import MyCombobox from './my-combobox'
import SearchInput from './search-input'
import FilterInput from './filter-input'
import ProductItem from './product-item'
import { useState } from 'react'

export default function ProductList() {
	const [products, setProduct] = useState(() => {
		let productsList = []
		for (let index = 0; index < 18; index++) {
			productsList.push({
				name: `product-${index + 1}`,
				path: `../../images/products/product-${index + 1}.svg`,
			})
		}

		return productsList
	})

	return (
		<div className="product-list">
			<div className="product-filter grid grid-cols-12 gap-4">
				<div className="col-span-2">
					<div className="dropdown-list h-full">
						<MyCombobox />
						{/* <select className="border-[#E7E7E7] border-solid appearance-none">
							<option value="1">1</option>
							<option value="2">1</option>
							<option value="3">1</option>
							<option value="4">1</option>
						</select>
						<Image
							src={'../../images/dropdown.svg'}
							fill
							style={{ objectFit: 'cover' }}
							alt="dropdown.svg"
						/> */}
					</div>
				</div>
				<div className="col-span-8">
					<SearchInput />
				</div>
				<div className="col-span-2">
					<FilterInput />
				</div>
			</div>
			<div className="product-items py-12 grid grid-cols-6 gap-4">
				{products.map((item: any, index: number) => {
					return (
						<div key={index} className="col-span-1">
							<ProductItem product={item} />
						</div>
					)
				})}
			</div>
		</div>
	)
}
