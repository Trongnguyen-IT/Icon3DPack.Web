'use client'

import ImageUpload from '@/components/image-upload'
import { useEffect, useState } from 'react'
import ProfileModel from '@/models/users/profile-model'
import ProfileUpdateModel from '@/models/users/profile-update-model'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ConvertToCloudfontUrl } from '@/helper/cloudfont-helper'
import { UserResponseModel } from '@/models/users/user-response-model'
import { updateOne } from '@/services/products'
import { UserService } from '@/services/user'
import { UserRequestModel } from '@/models/users/user-request-model'

export default function ProfileClient({ props }: { props: UserResponseModel }) {
	const userService = new UserService('users')
	const [avatarUrl, setAvatarUrl] = useState('')
	const [profile, setProfile] = useState(() => {
		return props
	})

	const updateProfile = async (): Promise<void> => {
		const requestModel = {
			fullName: profile.fullName,
			email: profile.email,
			imageUrl: avatarUrl,
		} as UserRequestModel

		const {
			payload: { result },
		} = await userService.updateProfile(profile.id, requestModel)
		console.log('result', result)
	}

	const updateAvatar = (fileKey: string): void => {
		setAvatarUrl(fileKey)
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

	useEffect(() => {
		// const fetchingData = async () => {
		// 	const result = await getProfileApi()
		// 	if (result.data.succeeded && result.data.result) {
		// 		setProfile(result.data.result)
		// 		result.data.result.imageUrl && setAvatarUrl(result.data.result.imageUrl)
		// 	}
		// }
		// fetchingData()
	}, [])

	return (
		<div>
			<div className="mb-4">
				<b className="flex mb-">Avatar</b>
				<div className="flex flex-row">
					<div className="basis-1/2">
						<ImageUpload
							isShowImage={true}
							updateAvatar={updateAvatar}
							imageUrl={ConvertToCloudfontUrl(avatarUrl)}
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
						value={profile.fullName}
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
						value={profile.email}
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
			<ToastContainer containerId={'profileId'} />
			{/* Same as */}
			<ToastContainer />
		</div>
	)
}
