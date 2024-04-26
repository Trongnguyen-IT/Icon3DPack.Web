import { ChangeEvent, Fragment, useRef, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

export default function AdminCombobox({
	props,
}: {
	props: { dataSource: any[]; onChange: Function; onChangeInputTag: Function }
}) {
	const buttonRef = useRef<HTMLButtonElement>(null)
	const { dataSource, onChange, onChangeInputTag } = props

	const [selected, setSelected] = useState(dataSource[0])
	const [query, setQuery] = useState('')

	const filteredDataSource =
		query === ''
			? dataSource
			: dataSource.filter((item) =>
					item.name
						.toLowerCase()
						.replace(/\s+/g, '')
						.includes(query.toLowerCase().replace(/\s+/g, ''))
			  )

	const handleChange = (e: any) => {
		setSelected(e)
		onChange(e)
	}

	const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
		setQuery(event.target.value)
		onChangeInputTag(event.target.value)
	}

	return (
		<>
			<Combobox value={selected} onChange={(e) => handleChange(e)}>
				<div className="relative">
					<div className="h-[3.125rem] w-full relative inline-flex justify-between items-center border-none gap-x-1.5 rounded-md bg-white text-left ">
						<Combobox.Input
							onClick={() => buttonRef.current?.click()}
							className="w-full border rounded-lg py-3 px-2 border-[#E7E7E7] outline-none cursor-pointer"
							displayValue={(item: any) => item.name}
							onChange={(event) => handleChangeInput(event)}
						/>
						<Combobox.Button
							className="absolute inset-y-0 right-0 flex items-center pr-2"
							ref={buttonRef}
						>
							<ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
						</Combobox.Button>
					</div>
					<Transition
						as={Fragment}
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
						afterLeave={() => setQuery('')}
					>
						<Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base z-10">
							{filteredDataSource.length === 0 && query !== '' ? (
								<div className="relative cursor-default select-none px-4 py-2 text-gray-700">
									Nothing found.
								</div>
							) : (
								filteredDataSource.map((item, index) => (
									<Combobox.Option
										key={index}
										className={({ active }) =>
											`relative cursor-default select-none py-2 pl-10 pr-4 ${
												active ? 'bg-[#46B8E9] text-white' : 'text-gray-900'
											}`
										}
										value={item}
									>
										{({ selected, active }) => (
											<>
												<span
													className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
												>
													{item.name}
												</span>
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
		</>
	)
}
