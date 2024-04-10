'use client'

import { PostService } from '@/services/posts'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import ConfirmDialog from './confirm-dialog'

export default function Delete({ props }: { props: { id: string } }) {
	const router = useRouter()
	const { id } = props
	const [isShow, setIsShow] = useState(false)

	const confirmDelete = async (): Promise<void> => {
		const categoryService = new PostService('adminpost')
		const { succeeded } = await categoryService.deleteOne(id)

		if (succeeded) {
			setIsShow(false)
			router.refresh()
		}
	}

	return (
		<div className="col-span-1">
			<button
				onClick={() => setIsShow(true)}
				className="w-full text-white border bg-[#F04F23] border-[#E7E7E7] rounded-xl py-3"
			>
				Delete
			</button>
			<ConfirmDialog
				props={{
					id: id,
					isShow: isShow,
					callBackConfirm: confirmDelete,
					setIsShow: setIsShow,
				}}
			/>
		</div>
	)
}
