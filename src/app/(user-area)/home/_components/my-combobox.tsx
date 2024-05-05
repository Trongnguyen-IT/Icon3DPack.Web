'use client'

import { Fragment, useRef, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import Image from 'next/image'
import { CheckIcon } from '@heroicons/react/20/solid'
import { CategoryResponseModel } from '@/models/categories/category-response-model'

export default function MyCombobox({
	categories,
	selectedCategory,
	onSelectedCategory,
}: {
	categories: CategoryResponseModel[]
	selectedCategory: CategoryResponseModel
	onSelectedCategory: (val: any) => void
}) {
	const inputRef = useRef<HTMLInputElement>(null)
	const buttonRef = useRef<HTMLButtonElement>(null)

	const [selected, setSelected] = useState(
		selectedCategory ? selectedCategory : { id: null, name: 'All categories' }
	)
	const [query, setQuery] = useState('')

	const filteredCategories =
		query === ''
			? categories
			: categories.filter((category) =>
					category.name
						.toLowerCase()
						.replace(/\s+/g, '')
						.includes(query.toLowerCase().replace(/\s+/g, ''))
			  )

	const handleSelect = (category: any) => {
		setSelected(category)
		onSelectedCategory(category)
	}

	const handleInputClick = () => {
		buttonRef.current?.click()
	}

	return (
		<div className="w-full">
			<Combobox value={selected} onChange={(val) => handleSelect(val)}>
				<div className="relative z-10">
					<div className="relative w-full cursor-default bg-white text-left focus:outline-none">
						<Combobox.Input
							ref={inputRef}
							onClick={() => handleInputClick()}
							className="cursor-pointer w-full h-[3.125rem] overflow-hidden rounded-lg border border-[#E7E7E7] col-start-1 col-span-5 pl-3 pr-10 leading-5 text-gray-900 outline-none"
							displayValue={(category: any) => category.name}
							onChange={(event) => setQuery(event.target.value)}
						/>
						<Combobox.Button
							className="absolute inset-y-0 right-0 flex items-center pr-2"
							ref={buttonRef}
						>
							<Image
								src={'../../images/dropdown-icon.svg'}
								width={16}
								height={16}
								style={{ objectFit: 'contain' }}
								alt="dropdown.svg"
								className="aspect-[1/1]"
							/>
							{/* <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" /> */}
						</Combobox.Button>
					</div>
					<Transition
						as={Fragment}
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
						afterLeave={() => setQuery('')}
					>
						<Combobox.Options className="absolute mt-1 w-full rounded-md bg-white py-1 text-base">
							{filteredCategories.length === 0 && query !== '' ? (
								<div className="relative cursor-default select-none px-4 py-2 text-gray-700">
									Nothing found.
								</div>
							) : (
								filteredCategories.map((category) => (
									<Combobox.Option
										key={category.id}
										className={({ active }) =>
											`relative select-none  ${
												active ? 'bg-[#46B8E9] text-white' : 'text-[#1B1B1B]'
											}`
										}
										value={category}
									>
										{({ selected, active }) => (
											<>
												<button
													className={`flex self-start py-2 pl-10 w-full truncate ${
														selected ? 'font-medium' : 'font-normal'
													}`}
												>
													{category.name}
												</button>
												{selected ? (
													<span
														className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
															active ? 'text-white' : 'text-[#46B8E9]'
														}`}
													>
														<CheckIcon className="h-5 w-5" aria-hidden="true" />
													</span>
												) : null}
											</>
										)}
									</Combobox.Option>
								))
							)}
						</Combobox.Options>
					</Transition>
				</div>
			</Combobox>
		</div>
	)
}
