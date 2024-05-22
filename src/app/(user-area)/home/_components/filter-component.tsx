'use client'

import SearchInput from '@/app/_components/search-input'
import MyCombobox from './my-combobox'
import SortInput from './sort-input'
import { CategoryResponseModel } from '@/models/categories/category-response-model'
import { useCallback, useEffect, useRef, useState } from 'react'
import ProductList from './product-list'
import debounce from 'lodash.debounce'
import Pagination from '../../_components/pagination'
import ProductResponseModel from '@/models/products/product-response-model'
import { productFilter } from '@/services/products'

export default function FilterComponent({ categories }: { categories: CategoryResponseModel[] }) {
	const [products, setProducts] = useState([] as ProductResponseModel[])

	const [filter, setFilter] = useState({
		pageNumber: 1,
		pageSize: 200,
	})

	const [pagingObject, setPagingObject] = useState(Object.assign({ pageNumber: 1, pageSize: 1 }))

	const [selectedCategory, setSelectedCategory] = useState({
		id: '',
		name: 'All Categories',
	} as CategoryResponseModel)
	const filterRef = useRef<HTMLDivElement>(null)

	const handleSelectedCategory = (selected: any) => {
		//handleScroll()
		setFilter((prev) => {
			return {
				...prev,
				categoryId: selected.id || null,
			}
		})
	}

	const handleScroll = () => {
		setTimeout(
			() => window.scrollTo({ behavior: 'smooth', top: filterRef?.current?.offsetTop || 0 }),
			500
		)
	}

	const handleChangeKeyword = useCallback((keyword: string) => {
		setFilter((prev) => {
			return {
				...prev,
				keyword: keyword,
			}
		})
	}, [])

	const handleChangeSort = useCallback((val: any) => {
		setFilter((prev) => {
			return {
				...prev,
				sortBy: val.sortBy,
				sortDirection: val.sortDirection,
			}
		})
	}, [])

	const handleChangePageSize = useCallback((pageNumber: number) => {
		setFilter((prev) => {
			return {
				...prev,
				pageNumber: pageNumber,
			}
		})
	}, [])

	useEffect(() => {
		const fetchData = async () => {
			const {
				status,
				data: { result: products },
			} = await productFilter(filter)
			status && setProducts(products.items)
			status &&
				setPagingObject((prev: any) => {
					return {
						...prev,
						...products,
					}
				})
		}

		fetchData()
	}, [filter])

	return (
		<div className="product-list " id="product-filter" style={{ scrollBehavior: 'smooth' }}>
			<div className="grid grid-cols-12 gap-4 sticky top-0 z-50">
				<div className="col-span-2">
					<div className="dropdown-list h-full">
						<MyCombobox
							categories={[
								Object.assign({}, { id: '', name: 'All Categories' } as CategoryResponseModel),
								...categories,
							]}
							selectedCategory={selectedCategory}
							onSelectedCategory={handleSelectedCategory}
						></MyCombobox>
					</div>
				</div>
				<div className="col-span-8">
					<SearchInput onChangeKeyword={handleChangeKeyword} />
				</div>
				<div className="col-span-2">
					<SortInput onChangeSort={handleChangeSort} />
				</div>
			</div>
			<ProductList products={products} />
			<Pagination
				filter={filter}
				pagingObject={pagingObject}
				onChangePageSize={handleChangePageSize}
			></Pagination>
		</div>
	)
}
