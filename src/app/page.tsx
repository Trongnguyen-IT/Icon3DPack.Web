import Image from 'next/image'
import Banner from './components/banner'
import ListCategories from './components/list-categories'
import ProductList from './components/product-list'

export default function Home() {
	return (
		<main className="container max-w-6xl mx-auto py-20">
			<Banner />
			<ListCategories />
			<ProductList />
		</main>
	)
}
