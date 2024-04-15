'use client'

import { ChangeEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { TagRequestModel } from '@/models/tags/tag-request-model'
import { TagService } from '@/services/tag/tag-service'

export default function AddOrEditTag({ id, tag }: { id?: string; tag?: TagRequestModel }) {
	const isAddMode = !id
	const router = useRouter()
	const [model, setModel] = useState(Object.assign({ name: '' }, tag) as TagRequestModel)
	const tagService = new TagService('admintag')

	const onSubmit = async (data: TagRequestModel): Promise<void> => {
		const { succeeded, result } = isAddMode ? await createOne(data) : await updateOne(id, data)

		if (succeeded) {
			router.push('/admin/tag')
			router.refresh()
		}
	}

	async function createOne(data: TagRequestModel) {
		return await tagService.createOne(data)
	}

	async function updateOne(id: string, data: TagRequestModel) {
		return await tagService.updateOne(id, data)
	}

	const updateAvatar = (imageUrl: string): void => {
		setModel((prev) => ({
			...prev,
			imageUrl: imageUrl,
		}))
	}

	return (
		<div>
			<div className="grid grid-cols-8 gap-10">
				<div className="col-span-4">
					<div className="mb-4">
						<p className="mb-1 font-bold">Name</p>
						<input
							className="w-full border rounded-lg py-3 px-2 border-[#E7E7E7] outline-none"
							type="text"
							placeholder="Tag name..."
							value={model.name}
							onChange={(e: ChangeEvent<HTMLInputElement>) =>
								setModel((prev: TagRequestModel) => ({
									...prev,
									name: e.target.value,
								}))
							}
						/>
					</div>
					<div className="grid grid-cols-4 gap-4 mt-8">
						<Link
							href="/admin/tag"
							className="col-span-1 text-center border border-[#E7E7E7] rounded-lg py-3 font-bold"
						>
							Cancel
						</Link>
						<button
							onClick={() => onSubmit(model)}
							className="col-span-1 border border-[#46B8E9] rounded-lg bg-[#46B8E9] py-3 font-medium text-white"
						>
							Save Changes
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
