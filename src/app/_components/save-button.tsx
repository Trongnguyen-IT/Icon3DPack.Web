import { memo } from 'react'
import Loading from './loading'

const SaveButton = ({
	classOptions,
	title,
	isLoading,
	onHandleClick,
}: {
	classOptions?: string
	title?: string
	isLoading: boolean
	onHandleClick: Function
}) => {
	return (
		<button
			onClick={() => onHandleClick()}
			className={`border border-[#46B8E9] rounded-lg bg-[#46B8E9] h-[3.125rem] font-medium text-white ${
				isLoading ? 'cursor-no-drop' : 'cursor-pointer'
			} ${classOptions}`}
			disabled={isLoading}
		>
			{isLoading ? <Loading /> : <span>{title || 'Save Changes'}</span>}
		</button>
	)
}
export default memo(SaveButton)
