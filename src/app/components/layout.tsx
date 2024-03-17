import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import Header from './header'
import '../globals.css'
import Footer from './footer'

const inter = Montserrat({ subsets: ['latin'], variable: '--montserrat-font' })

console.log('inter', inter)

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={`${inter.className} bg-white`}>
				ákdfhkasdhf
				<Header />
				{children}
				<Footer />
			</body>
		</html>
	)
}
