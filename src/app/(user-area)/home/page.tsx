import Banner from '@/app/(user-area)/home/_components/banner'
import ListCategories from '@/app/(user-area)/home/_components/list-categories'
import { CategoryService } from '@/services/categories'
import { cookies } from 'next/headers'
import ProductList from './_components/product-list'
import { CategoryResponseModel } from '@/models/categories/category-response-model'
import FilterComponent from './_components/filter-component'
import { ProductService } from '@/services/products'

export default async function Home({ searchParams }: { searchParams: { categoryId: string } }) {
	const { categoryId } = searchParams

	const cookieStore = cookies()
	const token = cookieStore.get('token')
	const categoryService = new CategoryService('category', token?.value)
	const productService = new ProductService('product', token?.value)

	const { result: categories } = await categoryService.getAll()
	const activeCategory = categories.find((p) => p.id == categoryId)

	// const queryObject = {
	// 	categoryId: activeCategory ? activeCategory.id : '',
	// }
	const queryObject = Object.assign({}, activeCategory?.id ? { categoryId: activeCategory.id } : {})

	console.log('queryObject', queryObject)

	const { succeeded, result: products } = await productService.ProductFilter({ queryObject })

	const dropdownOptions = [
		Object.assign({}, { id: '', name: 'All Categories' } as CategoryResponseModel),
		...categories,
	]
	return (
		<main className="container mx-auto py-24">
			<Banner />
			<ListCategories props={{ categories }} />
			<FilterComponent props={{ categories: dropdownOptions, activeCategory }} />
			<ProductList props={{ products }} />
		</main>
	)
}
