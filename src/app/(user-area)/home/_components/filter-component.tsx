'use client'

import SearchInput from '@/app/_components/search-input'
import MyCombobox from './my-combobox'
import SortInput from './sort-input'
import { CategoryResponseModel } from '@/models/categories/category-response-model'
import { useRef } from 'react'

export default function FilterComponent({
	props,
}: {
	props: { categories: CategoryResponseModel[]; activeCategory?: CategoryResponseModel }
}) {
	const { categories, activeCategory } = props
	const filterRef = useRef<HTMLDivElement>(null)

	const callBackSelected = (selected: any) => {
		handleScroll()
	}

	const handleScroll = () => {
		setTimeout(
			() => window.scrollTo({ behavior: 'smooth', top: filterRef?.current?.offsetTop || 0 }),
			500
		)
	}

	return (
		<div
			className="product-list sticky top-0 z-50"
			id="product-filter"
			style={{ scrollBehavior: 'smooth' }}
			ref={filterRef}
		>
			<div className="grid grid-cols-12 gap-4">
				<div className="col-span-2">
					<div className="dropdown-list h-full">
						<MyCombobox props={{ categories, activeCategory, callBackSelected }} />
					</div>
				</div>
				<div className="col-span-8">
					<SearchInput />
				</div>
				<div className="col-span-2">
					<SortInput />
				</div>
			</div>
		</div>
	)
}
