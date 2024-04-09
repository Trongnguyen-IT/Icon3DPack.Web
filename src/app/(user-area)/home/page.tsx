import Banner from '@/app/(user-area)/home/_components/banner'
import ListCategories from '@/app/(user-area)/home/_components/list-categories'
import { CategoryService } from '@/services/categories'
import { cookies } from 'next/headers'
import ProductList from './_components/product-list'

export default async function Home() {
	const cookieStore = cookies()
	const token = cookieStore.get('token')
	const categoryService = new CategoryService('category', token?.value)
	const { succeeded, result: categories } = await categoryService.getAll()

	return (
		<main className="container mx-auto py-24">
			<Banner />
			<ListCategories props={{ categories }} />
			<ProductList props={{ categories }} />
		</main>
	)
}
