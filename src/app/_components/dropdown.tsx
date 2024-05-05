import { Fragment, memo, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'

function classNames(...classes: any) {
	return classes.filter(Boolean).join(' ')
}

const Dropdown = ({
	dataSource,
	active,
	onCategoryChange,
}: {
	dataSource: { id: string; name: string }[]
	active: any
	onCategoryChange: (value: any) => void
}) => {
	const [selected, setSelected] = useState(active.id ? active : { id: '', name: 'All categories' })

	const handleSelect = (item: any) => {
		setSelected(item)
		onCategoryChange(item)
	}

	return (
		<Menu as="div" className="relative flex text-left w-full">
			<div className="w-full">
				<Menu.Button className="h-[3.125rem] w-full inline-flex justify-between items-centerw-full border rounded-lg py-3 px-2 border-[#E7E7E7] outline-none">
					<span> {selected.name}</span>
					<div className="h-3 w-3 text-gray-400 relative aspect-[1/1]">
						<Image
							fill
							src={'../../../images/dropdown-icon.svg'}
							alt="dropdown.svg"
							className="object-contain object-center"
						/>
					</div>
					{/* <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" /> */}
				</Menu.Button>
			</div>

			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items className="w-full absolute top-full right-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
					<div className="py-1">
						{dataSource.map((item, index) => {
							return (
								<Menu.Item key={index}>
									{({ active }) => (
										<button
											onClick={() => handleSelect(item)}
											className={classNames(
												active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
												'block px-4 py-2 text-sm'
											)}
										>
											{item.name}
										</button>
									)}
								</Menu.Item>
							)
						})}
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	)
}

export default memo(Dropdown)
