import { Menu } from '@headlessui/react'

export default function DeleteAccount() {
	const active = true

	return (
		<div className="basis-9/12 p-8 mx-5 bg-white rounded-[1.25rem]">
			<p>
				<b>Delete account</b>
			</p>
			<div className="flex flex-col">
				<div className="flex flex-row justify-center  items-center mb-12">
					<div className="basis-2/3">
						<p className="text-center opacity-50 mt-6">
							Permanently deleting your account and all data associated with it is a manual process
							performed on our end.
						</p>
					</div>
				</div>
				<div className="flex flex-row justify-center  items-center mb-12">
					<div className="basis-72">
						<button className="border rounded-lg bg-[#F04F23] py-2.5 col-span-3 font-medium text-white w-full">
							Delete account
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
