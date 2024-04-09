import type { Metadata } from 'next'
import AdminHeader from '@/app/(admin-area)/_components/admin-header'
import AdminSideBar from '../_components/sidebars/client-component'

export const metadata: Metadata = {
	title: '3DIconPack',
	description: '3DIconPack',
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<AdminHeader />
			<main className="px-6 mx-auto py-24 bg-[#232946] text-white min-h-[100vh]">
				<div className="grid grid-cols-8 gap-6">
					<div className="pr-4">
						<AdminSideBar />
					</div>
					<div className="col-span-7 bg-white text-[#1B1B1B] p-5 rounded-[1.25rem] overflow-hidden">
						{children}
					</div>
				</div>
			</main>
		</>
	)
}
