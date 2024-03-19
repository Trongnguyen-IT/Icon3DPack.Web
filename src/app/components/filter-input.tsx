// import Image from 'next/image'

// export default function FilterInput() {
// 	return (
// 		<div className="grid grid-cols-6 rounded-lg border place-content-center border-[#E7E7E7] h-full relative">
// 			<input type="text" placeholder="Filter" />
// 			<button className="col-start-6 col-span-1 aspect-[1/1] relative m-w-[1.5rem]">
// 				<Image
// 					src={'../../images/filter-icon.svg'}
// 					style={{ objectFit: 'contain' }}
// 					alt="search-icon"
// 					width={16}
// 					height={16}
// 				/>
// 			</button>
// 		</div>
// 	)
// }

'use client'

import Image from 'next/image'

import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

const people = [
	{ name: 'Wade Cooper' },
	{ name: 'Arlene Mccoy' },
	{ name: 'Devon Webb' },
	{ name: 'Tom Cook' },
	{ name: 'Tanya Fox' },
	{ name: 'Hellen Schmidt' },
]

export default function FilterInput() {
	const [selected, setSelected] = useState(people[0])

	return (
		<Listbox value={selected} onChange={setSelected}>
			<div className="relative w-full z-10">
				<Listbox.Button className="relative h-[3.125rem] w-full cursor-pointer rounded-lg border border-[#E7E7E7] bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300">
					<span className="block truncate">{selected.name}</span>
					<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
						<Image
							src={'../../images/filter-icon.svg'}
							style={{ objectFit: 'contain' }}
							alt="search-icon"
							width={16}
							height={16}
						/>
					</span>
				</Listbox.Button>
				<Transition
					as={Fragment}
					leave="transition ease-in duration-100"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none">
						{people.map((person, personIdx) => (
							<Listbox.Option
								key={personIdx}
								className={({ active }) =>
									`relative cursor-default select-none py-2 pl-10 pr-4 ${
										active ? 'bg-[#46B8E9] text-white' : 'text-[#1B1B1B]'
									}`
								}
								value={person}
							>
								{({ selected }) => (
									<>
										<span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
											{person.name}
										</span>
										{selected ? (
											<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white">
												<CheckIcon className="h-5 w-5" aria-hidden="true" />
											</span>
										) : null}
									</>
								)}
							</Listbox.Option>
						))}
					</Listbox.Options>
				</Transition>
			</div>
		</Listbox>
	)
}
