import Image from 'next/image'
import Banner from '@/_components/banner'
import ListCategories from '@/_components/list-categories'
import ProductList from '@/app/(user-area)/home/_components/product-list'
import { CategoryService } from '@/services/categories'
import { cookies } from 'next/headers'

export default async function Home() {
	const cookieStore = cookies()
	const token = cookieStore.get('token')
	const categoryService = new CategoryService('category', token?.value)
	//const { succeeded, result: categories } = await categoryService.getAll()

	return (
		<main className="container mx-auto py-24">
			<Banner />
			{/* <ListCategories props={{ categories }} />
			<ProductList props={{ categories }} /> */}
		</main>
	)
}
