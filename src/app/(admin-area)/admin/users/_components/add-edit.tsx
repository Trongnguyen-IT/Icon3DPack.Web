'use client'

import { ChangeEvent, useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { apiStatus } from '@/configs'
import { UserRequestModel } from '@/models/users/user-request-model'
import { adminCreateOne, adminUpdateOne } from '@/services/user'
import { UserResponseModel } from '@/models/users/user-response-model'
import SwitchButton from '@/app/_components/switch-button'
import SaveButton from '@/app/_components/save-button'

export default function AddOrEditUser({ user }: { user?: UserResponseModel }) {
	const isAddMode = !user
	const router = useRouter()
	const [model, setModel] = useState({
		email: '',
		fullName: '',
		receiveEmailNotification: false,
		...user,
	} as UserRequestModel)

	const [isLoading, setIsLoading] = useState(false)

	const onSubmit = useCallback(async (): Promise<void> => {
		setIsLoading(true)

		const { status } = isAddMode ? await createOne(model) : await updateOne(user.id, model)

		setIsLoading(false)

		if (status === apiStatus.success) {
			router.push('/admin/users')
			router.refresh()
		}
	}, [model])

	async function createOne(data: UserRequestModel) {
		return await adminCreateOne(data)
	}

	async function updateOne(id: string, data: UserRequestModel) {
		return await adminUpdateOne(id, data)
	}

	const handleChangeNotification = useCallback((value: boolean) => {
		setModel((prev) => {
			return {
				...prev,
				receiveEmailNotification: value,
			}
		})
	}, [])

	return (
		<div>
			<div className="grid grid-cols-8 gap-10">
				<div className="col-span-4">
					<div className="mb-4">
						<p className="mb-1 font-bold">Email</p>
						<input
							className="w-full border rounded-lg py-3 px-2 border-[#E7E7E7] outline-none"
							disabled={!isAddMode}
							type="text"
							placeholder="Email..."
							value={model.email}
							onChange={(e: ChangeEvent<HTMLInputElement>) =>
								setModel((prev: UserRequestModel) => ({
									...prev,
									email: e.target.value,
								}))
							}
						/>
					</div>
					<div className="mb-4">
						<p className="mb-1 font-bold">Full Name</p>
						<input
							className="w-full border rounded-lg py-3 px-2 border-[#E7E7E7] outline-none"
							type="text"
							placeholder="User name..."
							value={model.fullName}
							onChange={(e: ChangeEvent<HTMLInputElement>) =>
								setModel((prev: UserRequestModel) => ({
									...prev,
									fullName: e.target.value,
								}))
							}
						/>
					</div>

					<div className="mb-4">
						<p className="mb-1 font-bold">Receive Notification</p>
						<SwitchButton
							initialValue={model.receiveEmailNotification}
							onHandleSwitch={handleChangeNotification}
						/>
					</div>
					<div className="grid grid-cols-4 gap-4 mt-8">
						<Link
							href="/admin/users"
							className="col-span-1 text-center border border-[#E7E7E7] rounded-lg py-3 font-bold"
						>
							Cancel
						</Link>
						<SaveButton isLoading={isLoading} onHandleClick={onSubmit} />
						{/* <button
							onClick={() => onSubmit(model)}
							className="col-span-1 border border-[#46B8E9] rounded-lg bg-[#46B8E9] py-3 font-medium text-white"
						>
							Save Changes
						</button> */}
					</div>
				</div>
			</div>
		</div>
	)
}
