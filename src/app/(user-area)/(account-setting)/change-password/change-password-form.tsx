'use client'

import SaveButton from '@/app/_components/save-button'
import { useAppContext } from '@/app/app-provider'
import { apiStatus } from '@/configs'
import { ChangePasswordModel } from '@/models/users/change-password'
import { UserResponseModel } from '@/models/users/user-response-model'
import { changePassword } from '@/services/user'
import { successNotification } from '@/untils/toast-notification'
import Link from 'next/link'
import { ChangeEvent, useCallback, useState } from 'react'

export default function ChangePasswordForm({
	initialProfile,
}: {
	initialProfile: UserResponseModel
}) {
	const [model, setModel] = useState(
		() =>
			({
				oldPassword: '',
				newPassword: '',
				confirmPassword: '',
			} as ChangePasswordModel)
	)

	const [isLoading, setIsLoading] = useState(false)
	const [isMatchPassword, setIsMatchPassword] = useState(false)

	const handleSubmit = useCallback(async () => {
		if (initialProfile && isMatchPassword) {
			setIsLoading(true)

			const { status } = await changePassword(initialProfile.id, model)

			setIsLoading(false)

			if (status === apiStatus.success) {
				setModel({ oldPassword: '', newPassword: '', confirmPassword: '' } as ChangePasswordModel)
				successNotification()
			}
		}
	}, [model])

	const handleConfirmPasword = (password: string) => {
		setModel((prev) => {
			return {
				...prev,
				confirmPassword: password,
			}
		})

		setIsMatchPassword(model.newPassword === password)
	}

	return (
		<div>
			<p className="mb-5">
				<b>Change password</b>
			</p>
			<div className="grid grid-cols-4 gap-4">
				<input
					className="col-start-2 col-span-2 border rounded-lg py-3 px-2 border-[#E7E7E7] outline-none"
					type="text"
					placeholder="Current password..."
					value={model?.oldPassword}
					onChange={(e) =>
						setModel((prev) => {
							return {
								...prev,
								oldPassword: e.target.value,
							}
						})
					}
				/>
				<input
					className="col-start-2 col-span-2 border rounded-lg py-3 px-2 border-[#E7E7E7] outline-none"
					type="text"
					placeholder="New password..."
					value={model?.newPassword}
					onChange={(e) =>
						setModel((prev) => {
							return {
								...prev,
								newPassword: e.target.value,
							}
						})
					}
				/>
				<input
					className={`col-start-2 col-span-2 border rounded-lg py-3 px-2 border-[#E7E7E7] outline-none ${
						!isMatchPassword ? 'border-red-500' : ''
					}`}
					type="text"
					placeholder="Confirm password..."
					value={model?.confirmPassword}
					onChange={(e) => handleConfirmPasword(e.target.value)}
				/>
				<p className="col-start-2 col-span-2 opacity-50 pt-1 pb-11">
					Enter your new password. 8 characters minimum.
				</p>
				<div className="col-start-2 col-span-2">
					<div className="col-start-4 col-span-6 flex justify-between">
						<div className="grid grid-cols-4 gap-4 w-full">
							<Link
								href="/"
								className=" text-center border border-[#E7E7E7] rounded-lg py-3 col-span-1 font-bold"
							>
								Cancel
							</Link>
							<SaveButton
								classOptions="col-span-3"
								isLoading={isLoading}
								onHandleClick={handleSubmit}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
