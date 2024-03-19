import Image from 'next/image'
import Banner from './components/banner'
import ListCategories from './components/list-categories'
import ProductList from './components/product-list'

export default function Home() {
	return (
		<main className="container mx-auto py-24">
			<Banner />
			<ListCategories />
			<ProductList />
		</main>
	)
}
