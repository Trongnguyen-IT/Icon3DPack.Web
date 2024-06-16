import { memo } from 'react'
import Loading from './loading'

const SaveButton = ({
	isLoading,
	onHandleClick,
}: {
	isLoading: boolean
	onHandleClick: Function
}) => {
	return (
		<button
			onClick={() => onHandleClick()}
			className={`border border-[#46B8E9] rounded-lg bg-[#46B8E9] h-[3.125rem] col-span-3 font-medium text-white ${
				isLoading ? 'cursor-no-drop' : 'cursor-pointer'
			}`}
			disabled={isLoading}
		>
			{isLoading ? <Loading /> : <span>Save Changes</span>}
		</button>
	)
}
export default memo(SaveButton)
