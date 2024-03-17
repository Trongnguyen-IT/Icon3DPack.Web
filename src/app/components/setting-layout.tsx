import { Menu } from '@headlessui/react'

export default function SettingLayout({ children }: { children: React.ReactNode }) {
	const active = true

	return (
		<div className="bg-[#F9F9F9] py-12">
			<div className="container max-w-6xl mx-auto bg-[#F9F9F9]">
				<h2 className="text-center font-bold mb-5">Account settings</h2>
				<div className="flex flex-row text-sm">
					<div className="basis-3/12">
						<ul role="list" className="sidebar">
							<li className=" rounded-lg py-2 px-3 bg-[#E7E7E7]">
								<a href="#" className="flex items-center">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										aria-hidden="true"
										className="bag oc se ur w-[1.5rem] mr-2"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
										></path>
									</svg>
									Profile
								</a>
							</li>
							<li className=" rounded-lg py-2 px-3">
								<a href="#" className="flex">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										aria-hidden="true"
										className="bag oc se ur w-[1.5rem] mr-2"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
										></path>
									</svg>
									Sercurity
								</a>
							</li>
							<li className=" rounded-lg py-2 px-3">
								<a href="#" className="flex">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										aria-hidden="true"
										className="bag oc se ur w-[1.5rem] mr-2"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
										></path>
									</svg>
									Notification
								</a>
							</li>
							<li className=" rounded-lg py-2 px-3">
								<a href="#" className="flex">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										aria-hidden="true"
										className="bag oc se ur w-[1.5rem] mr-2"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
										></path>
									</svg>
									Delete account
								</a>
							</li>
							<li className=" rounded-lg py-2 px-3">
								<a href="#" className="flex">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										aria-hidden="true"
										className="bag oc se ur w-[1.5rem] mr-2"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
										></path>
									</svg>
									Logout
								</a>
							</li>
						</ul>
					</div>
					<div className="basis-9/12 p-8 mx-5 bg-white rounded-[1.25rem]">
						<p>
							<b>Change password</b>
						</p>
						<div className="grid grid-cols-4 gap-4">
							<input
								className="col-start-2 col-span-2 border rounded-lg  py-2.5 px-2 border-[#E7E7E7]"
								type="text"
								placeholder="Current password..."
							/>
							<input
								className="col-start-2 col-span-2 border rounded-lg  py-2.5 px-2 border-[#E7E7E7]"
								type="text"
								placeholder="New password..."
							/>
							<input
								className="col-start-2 col-span-2 border rounded-lg  py-2.5 px-2 border-[#E7E7E7]"
								type="text"
								placeholder="Confirm password..."
							/>
							<p className="col-start-2 col-span-2 opacity-50 pt-1 pb-11">
								Enter your new password. 8 characters minimum.
							</p>
							<div className="col-start-2 col-span-2">
								<div className="col-start-4 col-span-6 flex justify-between">
									<div className="grid grid-cols-4 gap-4 w-full">
										<button className="border rounded-lg border-gray py-2.5 col-span-1 font-bold">
											Cancel
										</button>
										<button className="border rounded-lg bg-[#46B8E9] py-2.5 col-span-3 font-medium text-white">
											Save Changes
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
