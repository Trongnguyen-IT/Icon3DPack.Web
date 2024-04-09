import type { Metadata } from 'next'
import Header from '@/app/(user-area)/_components/header'
import Footer from '@/app/(user-area)/_components/footer'
import Login from '@/app/_components/login'
import Register from '@/app/_components/register'

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
			<Login />
			<Register />
		</>
	)
}
