'use client'

import { AuthService } from '@/services/user/auth-service'
import ConfirmDeleteAccountDialog from './confirm-dialog'
import { useState } from 'react'
import { useAppContext } from '@/app/app-provider'

export default function DeleteAccountForm() {
	const { user } = useAppContext()
	const authService = new AuthService('users')
	const [isShow, setIsShow] = useState(false)

	const confirmDelete = async (): Promise<void> => {
		if (user) {
			const { succeeded, result } = await authService.deleteAccount(user.id)

			if (succeeded) {
				setIsShow(false)
				//router.refresh()
			}
		}
	}

	return (
		<div className="basis-9/12 p-8 mx-5 bg-white rounded-[1.25rem]">
			<p className="mb-5">
				<b>Delete account</b>
			</p>
			<div className="flex flex-col">
				<div className="flex flex-row justify-center  items-center mb-12">
					<div className="basis-2/3">
						<p className="text-center opacity-50 mt-6">
							Permanently deleting your account and all data associated with it is a manual process
							performed on our end.
						</p>
					</div>
				</div>
				<div className="flex flex-row justify-center  items-center mb-12">
					<div className="basis-72">
						<ConfirmDeleteAccountDialog
							props={{
								id: user?.id || '',
								isShow: isShow,
								callBackConfirm: confirmDelete,
								setIsShow: setIsShow,
							}}
						/>
						<button
							onClick={() => setIsShow(true)}
							className="border rounded-lg bg-[#F04F23] py-3 col-span-3 font-medium text-white w-full"
						>
							Delete account
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
