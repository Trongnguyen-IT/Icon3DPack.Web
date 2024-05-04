import AccountSettingSidebar from '../_components/account-setting-sidebar'

export default function SettingLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="bg-[#F9F9F9] py-12 min-h-[60vh]">
			<div className="container mx-auto bg-[#F9F9F9]">
				<h2 className="text-center font-bold mb-5">Account settings</h2>
				<div className="flex flex-row">
					<div className="basis-3/12">
						<AccountSettingSidebar></AccountSettingSidebar>
					</div>
					<div className="basis-9/12 p-8 mx-5 bg-white rounded-[1.25rem]">{children}</div>
				</div>
			</div>
		</div>
	)
}
