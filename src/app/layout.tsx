import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import AppProvider from '@/app/app-provider'
import { cookies } from 'next/headers'
import { UserService } from '@/services/user'

const inter = Montserrat({ subsets: ['latin'], variable: '--montserrat-font' })

export const metadata: Metadata = {
	title: '3DIconPack',
	description: '3DIconPack',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const cookieStore = cookies()
	const sessionToken = cookieStore.get('sessionToken')
	const userService = new UserService('users')

	let user: any | null = null
	if (sessionToken) {
		const {
			payload: { result },
		} = await userService.profile(sessionToken.value)

		user = result
	}

	return (
		<html lang="en">
			<AppProvider inititalSessionToken={sessionToken?.value} user={user}>
				<body className={`${inter.className} bg-white text-[#1B1B1B] font-medium text-base`}>
					{children}
				</body>
			</AppProvider>
		</html>
	)
}
