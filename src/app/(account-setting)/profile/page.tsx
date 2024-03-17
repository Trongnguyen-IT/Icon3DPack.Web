import Image from 'next/image'

export default function Profile() {
	const active = true

	return (
		<div>
			<div className="mb-4">
				<b className="flex mb-4">Avatar</b>
				<div className="flex flex-row">
					<div className="basis-1/2">
						<div className="flex items-center justify-between">
							<div className="w-[60px] relative rounded-full overflow-hidden border-red-600 aspect-[1/1]">
								<Image
									fill
									src="images/avatar.svg"
									style={{ objectFit: 'contain' }}
									alt="search-icon"
									className="aspect-[18/18]"
								/>
							</div>
							<input
								type="file"
								className="max-w-[260px] ext-sm text-stone-500 file:mr-5 file:py-1 file:px-3 file:border-[1px] file:text-xs file:font-medium file:bg-stone-50 file:text-stone-700 hover:file:cursor-pointer hover:file:bg-blue-50 hover:file:text-blue-700"
							/>
							<Image src="images/delete.svg" width={18} height={20} alt="Picture of the author" />
						</div>
					</div>
				</div>
			</div>
			<div className="grid grid-cols-12 gap-4">
				<div className="col-start-1 col-span-6">
					<b className="color-[#1B1B1B] flex mb-4">Name</b>
					<input
						className="w-full border rounded-lg py-2.5 px-2 border-[#E7E7E7] outline-none"
						type="text"
						placeholder="Jasy Sam"
					/>
				</div>
				<div className="col-span-6">
					<b className="color-[#1B1B1B] flex mb-4">Email address</b>
					<input
						className="w-full border rounded-lg py-2.5 px-2 border-[#E7E7E7] outline-none"
						type="text"
						placeholder="jasy.design@gmail.com"
					/>
				</div>

				<a className="col-start-1 col-span-6 mt-4 opacity-60" href="">
					What should we call you, friend?
				</a>
				<a className="col-span-6 mt-4 opacity-60" href="">
					Used to sign in, and receive awesome icon updates.
				</a>
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
	)
}
