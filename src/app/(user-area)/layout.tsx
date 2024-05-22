import type { Metadata } from 'next'
import Header from '@/app/(user-area)/_components/header'
import Footer from '@/app/(user-area)/_components/footer'
import Login from '@/app/_components/login'
import Register from '@/app/_components/register'
import AppProvider from '../app-provider'
import { cookies } from 'next/headers'

export const metadata: Metadata = {
	title: '3DIconPack',
	description: '3DIconPack',
}

export default async function UILayout({ children }: { children: React.ReactNode }) {
	const token = cookies().get('accessToken')
	const isAuthentication = Boolean(token)
	return (
		<>
			<Header isAuthentication={isAuthentication} />
			{children}
			<Footer />
			<Login />
			<Register />
		</>
	)
}
