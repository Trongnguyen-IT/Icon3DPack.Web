import { memo, useState } from 'react'

const SwitchButton = ({
	initialValue,
	onHandleSwitch,
}: {
	initialValue: boolean
	onHandleSwitch: (e: any) => void
}) => {
	const [model, setModel] = useState(initialValue)
	return (
		<label className="inline-flex items-center cursor-pointer">
			<input
				onChange={(e) => onHandleSwitch(e.target.checked)}
				type="checkbox"
				defaultChecked={model}
				className="sr-only peer"
			/>
			<div className=" bg-[#E7E7E7] relative w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-transparent after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600"></div>
		</label>
	)
}

export default memo(SwitchButton)
