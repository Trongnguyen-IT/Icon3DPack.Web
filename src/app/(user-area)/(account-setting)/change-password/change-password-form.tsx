'use client'

import { useAppContext } from '@/app/app-provider'
import { ChangePasswordModel } from '@/models/users/change-password'
import { UserResponseModel } from '@/models/users/user-response-model'
import { AuthService } from '@/services/user/auth-service'
import Link from 'next/link'
import { ChangeEvent, useState } from 'react'

export default function ChangePasswordForm({ props }: { props: { user: UserResponseModel } }) {
	const authService = new AuthService('users')
	const { user } = props
	const [model, setModel] = useState({
		oldPassword: '',
		newPassword: '',
		confirmPassword: '',
	} as ChangePasswordModel)

	const submit = async (model: ChangePasswordModel) => {
		const { succeeded } = await authService.changePassword(user.id, model)
		if (succeeded) {
			setModel({ oldPassword: '', newPassword: '', confirmPassword: '' } as ChangePasswordModel)
		}
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
					value={model.oldPassword}
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						setModel((prev: ChangePasswordModel) => ({
							...prev,
							oldPassword: e.target.value,
						}))
					}
				/>
				<input
					className="col-start-2 col-span-2 border rounded-lg py-3 px-2 border-[#E7E7E7] outline-none"
					type="text"
					placeholder="New password..."
					value={model.newPassword}
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						setModel((prev: ChangePasswordModel) => ({
							...prev,
							newPassword: e.target.value,
						}))
					}
				/>
				<input
					className="col-start-2 col-span-2 border rounded-lg py-3 px-2 border-[#E7E7E7] outline-none"
					type="text"
					placeholder="Confirm password..."
					value={model.confirmPassword}
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						setModel((prev: ChangePasswordModel) => ({
							...prev,
							confirmPassword: e.target.value,
						}))
					}
				/>
				<p className="col-start-2 col-span-2 opacity-50 pt-1 pb-11">
					Enter your new password. 8 characters minimum.
				</p>
				<div className="col-start-2 col-span-2">
					<div className="col-start-4 col-span-6 flex justify-between">
						<div className="grid grid-cols-4 gap-4 w-full">
							<Link
								href="/"
								className="border border-[#E7E7E7] rounded-lg py-3 col-span-1 font-bold"
							>
								Cancel
							</Link>
							<button
								onClick={() => submit(model)}
								className="border border-[#46B8E9] rounded-lg bg-[#46B8E9] py-3 col-span-3 font-medium text-white"
							>
								Save Changes
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
