import type { Metadata } from 'next'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Login from '@/components/login'
import Register from '@/components/register'
import { UserResponseModel } from '@/models/users/user-response-model'

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
