'use client'

import Image from 'next/image'

import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

const options = [
	{ name: 'Ascending by date', sortBy: 'CreatedTime', sortDirection: 'asc' },
	{ name: 'Descending by date', sortBy: 'CreatedTime', sortDirection: 'desc' },
	{ name: 'Ascending by downloaded', sortBy: 'DownloadCount', sortDirection: 'asc' },
	{ name: 'Descending by downloaded', sortBy: 'DownloadCount', sortDirection: 'desc' },
]

export default function SortInput({ onChangeSort }: { onChangeSort: (val: any) => void }) {
	const [selected, setSelected] = useState({ name: 'Sort' })
	const handeChangeSort = (val: any) => {
		onChangeSort(val)
	}

	return (
		<Listbox value={selected} onChange={(val) => handeChangeSort(val)}>
			<div className="relative w-full z-10">
				<Listbox.Button className="relative h-[3.125rem] w-full cursor-pointer rounded-lg border border-[#E7E7E7] bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300">
					<span title={selected.name} className="block truncate">
						{selected.name}
					</span>
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
						{options.map((person, personIdx) => (
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
										<span className={`block ${selected ? 'font-medium' : 'font-normal'}`}>
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
