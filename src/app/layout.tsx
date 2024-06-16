import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import AppProvider from '@/app/app-provider'
import { cookies } from 'next/headers'
import { profile } from '@/services/user'
import { UserResponseModel } from '@/models/users/user-response-model'
import { ToastContainer } from 'react-toastify'

const inter = Montserrat({ subsets: ['latin'], variable: '--montserrat-font' })

export const metadata: Metadata = {
	title: '3DIconPack',
	description: '3DIconPack',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const cookieStore = cookies()
	const sessionToken = cookieStore.get('accessToken')

	let user: UserResponseModel | null = null
	if (sessionToken) {
		//try {
		try {
			const {
				status,
				data: { result },
			} = await profile(sessionToken?.value)
			user = result
			//console.log('result', result)
		} catch (error) {
			//console.log('error', error)
		}
	}

	return (
		<html lang="en">
			<body className={`${inter.className} bg-white text-[#1B1B1B] font-medium text-base`}>
				<ToastContainer />
				<AppProvider user={user}>{children}</AppProvider>
			</body>
		</html>
	)
}
