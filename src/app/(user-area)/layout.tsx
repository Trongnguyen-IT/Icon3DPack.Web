import type { Metadata } from 'next'
import Header from '@/_components/header'
import Footer from '@/_components/footer'

export const metadata: Metadata = {
	title: '3DIconPack',
	description: '3DIconPack',
}

export default async function UILayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	)
}
