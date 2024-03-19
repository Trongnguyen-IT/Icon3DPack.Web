import { Menu } from '@headlessui/react'

export default function Notification() {
	const active = true

	return (
		<div>
			<p>
				<b>Email notifications</b>
			</p>
			<div className="grid grid-cols-4 gap-4">
				<div className="col-start-2 col-span-2 place-content-between mb-12">
					<div className="flex justify-between items-center">
						<strong>Receive new icon updates</strong>
						<label className="inline-flex items-center cursor-pointer">
							<input type="checkbox" value="" className="sr-only peer" />
							<div className=" bg-[#E7E7E7] relative w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-transparent after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600"></div>
						</label>
					</div>
				</div>
				<div className="col-start-2 col-span-2">
					<div className="col-start-4 col-span-6 flex justify-between">
						<div className="grid grid-cols-4 gap-4 w-full">
							<button className="border border-[#E7E7E7] rounded-lg py-3 col-span-1 font-bold">
								Cancel
							</button>
							<button className="border border-[#46B8E9] rounded-lg bg-[#46B8E9] py-3 col-span-3 font-medium text-white">
								Save Changes
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
