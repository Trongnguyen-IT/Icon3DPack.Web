import SearchInput from '@/app/_components/search-input'
import MyCombobox from './my-combobox'
import SortInput from './sort-input'
import { CategoryResponseModel } from '@/models/categories/category-response-model'

export default function FilterComponent({
	props,
}: {
	props: { categories: CategoryResponseModel[]; activeCategory?: CategoryResponseModel }
}) {
	const { categories, activeCategory } = props

	return (
		<div className="product-list" id="product-filter">
			<div className="grid grid-cols-12 gap-4">
				<div className="col-span-2">
					<div className="dropdown-list h-full">
						<MyCombobox props={{ categories, activeCategory }} />
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
