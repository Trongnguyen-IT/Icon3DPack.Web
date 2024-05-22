'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import ConfirmDialog from './confirm-dialog'
import { apiStatus } from '@/configs'
import { adminDeleteOne } from '@/services/products'

export default function Delete({ props }: { props: { id: string } }) {
	const router = useRouter()
	const { id } = props
	const [isShow, setIsShow] = useState(false)

	const confirmDelete = async (): Promise<void> => {
		const { status } = await adminDeleteOne(id)

		if (status === apiStatus.success) {
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
