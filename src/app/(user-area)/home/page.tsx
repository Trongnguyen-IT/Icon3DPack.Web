import Banner from '@/app/(user-area)/home/_components/banner'
import ListCategories from '@/app/(user-area)/home/_components/list-categories'
import FilterComponent from './_components/filter-component'
import { getAll } from '@/services/categories'

export default async function Home() {
	const {
		status,
		data: { result: categories },
	} = await getAll()

	return (
		<main className="container mx-auto py-24">
			<Banner />
			<ListCategories categories={status ? categories : []} />
			<FilterComponent categories={status ? categories : []} />
		</main>
	)
}
