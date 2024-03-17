export default function ChangePassword() {
	const active = true

	return (
		<div>
			<p>
				<b>Change password</b>
			</p>
			<div className="grid grid-cols-4 gap-4">
				<input
					className="col-start-2 col-span-2 border rounded-lg py-2.5 px-2 border-[#E7E7E7] outline-none"
					type="text"
					placeholder="Current password..."
				/>
				<input
					className="col-start-2 col-span-2 border rounded-lg py-2.5 px-2 border-[#E7E7E7] outline-none"
					type="text"
					placeholder="New password..."
				/>
				<input
					className="col-start-2 col-span-2 border rounded-lg py-2.5 px-2 border-[#E7E7E7] outline-none"
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
	)
}
