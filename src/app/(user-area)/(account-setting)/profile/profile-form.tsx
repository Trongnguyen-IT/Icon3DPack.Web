'use client'

import ImageUpload from '@/app/_components/image-upload'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { ConvertToCloudfontUrl } from '@/helper/cloudfont-helper'
import { UserResponseModel } from '@/models/users/user-response-model'
import { AuthService } from '@/services/user/auth-service'

export default function ProfileClient({ props }: { props: { user: UserResponseModel } }) {
	const { user } = props
	const authService = new AuthService('users')
	const [profile, setProfile] = useState(user)

	const updateProfile = async (): Promise<void> => {
		const { result } = await authService.updateProfile(profile)
	}

	const updateAvatar = (imageUrl: string): void => {
		setProfile((prev) => ({
			...prev,
			imageUrl: imageUrl,
		}))
	}

	const notify = () =>
		toast.success('Update success!', {
			position: 'top-right',
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'light',
		})

	return (
		<div>
			<div className="mb-4">
				<b className="flex mb-">Avatar</b>
				<div className="flex flex-row">
					<div className="basis-1/2">
						<ImageUpload
							isShowImage={true}
							updateAvatar={updateAvatar}
							imageUrl={ConvertToCloudfontUrl(profile?.imageUrl)}
							bucketName="icon3dpack-bucket-s3"
							prefix="user-profile"
						></ImageUpload>
					</div>
				</div>
			</div>
			<div className="grid grid-cols-12 gap-4 mt-6">
				<div className="col-start-1 col-span-6">
					<b className="color-[#1B1B1B] flex mb-1">Name</b>
					<input
						className="w-full border rounded-lg py-3 px-2 border-[#E7E7E7] outline-none"
						type="text"
						placeholder="Jasy Sam"
						value={profile?.fullName}
						onChange={(e) => setProfile((pre) => ({ ...pre, fullName: e.target.value }))}
					/>
				</div>
				<div className="col-span-6">
					<b className="color-[#1B1B1B] flex mb-1">Email address</b>
					<input
						className="w-full border rounded-lg py-3 px-2 border-[#E7E7E7] outline-none opacity-50"
						type="text"
						placeholder="jasy.design@gmail.com"
						disabled
						value={profile?.email}
					/>
				</div>

				<a className="col-start-1 col-span-6 mt-4 opacity-60" href="">
					What should we call you, friend?
				</a>
				<a className="col-span-6 mt-4 opacity-60" href="">
					Used to sign in, and receive awesome icon updates.
				</a>
				<div className="col-start-4 col-span-6 flex justify-between mt-12">
					<div className="grid grid-cols-4 gap-4 w-full">
						<button className="border border-[#E7E7E7] rounded-lg py-3 col-span-1 font-bold">
							Cancel
						</button>
						<button
							onClick={() => updateProfile()}
							className="border border-[#46B8E9] rounded-lg bg-[#46B8E9] py-3 col-span-3 font-medium text-white"
						>
							Save Changes
						</button>
					</div>
				</div>
			</div>
			{/* <ToastContainer containerId={'profileId'} />
			<ToastContainer /> */}
		</div>
	)
}
