import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Login from '@/components/login'
import Register from '@/components/register'
import './../globals.css'

const inter = Montserrat({ subsets: ['latin'], variable: '--montserrat-font' })

console.log('inter', inter)

export const metadata: Metadata = {
	title: '3DIconPack',
	description: '3DIconPack',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={`${inter.className} bg-white text-[#1B1B1B] font-medium text-base`}>
				<Header />
				{children}
				<Footer />
				<Login />
				<Register />
			</body>
		</html>
	)
}
