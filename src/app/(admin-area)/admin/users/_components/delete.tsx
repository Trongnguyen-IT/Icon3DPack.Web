'use client'

import ConfirmDialog from '@/app/(admin-area)/admin/tag/_components/confirm-dialog'
import { apiStatus } from '@/configs'
import { adminDeleteOne } from '@/services/user'
import { useRouter } from 'next/navigation'
import { memo, useCallback, useState } from 'react'

function Delete({ id }: { id: string }) {
	const router = useRouter()
	const [isShow, setIsShow] = useState(false)

	const confirmDelete = useCallback(async (): Promise<void> => {
		const { status } = await adminDeleteOne(id)

		if (status === apiStatus.success) {
			setIsShow(false)
			router.refresh()
		}
	}, [])

	return (
		<div className="col-span-1">
			<button
				onClick={() => setIsShow(true)}
				className="w-full text-white border bg-[#F04F23] border-[#E7E7E7] rounded-xl py-3"
			>
				Delete
			</button>
			<ConfirmDialog
				id={id}
				isShow={isShow}
				callBackConfirm={confirmDelete}
				setIsShow={setIsShow}
			/>
		</div>
	)
}
export default memo(Delete)
