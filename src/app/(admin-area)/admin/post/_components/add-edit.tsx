'use client'

import { ChangeEvent, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { PostRequestModel } from '@/models/posts/post-request-model'
import { PostService } from '@/services/posts'
import { Editor } from '@tinymce/tinymce-react'
import { apikey } from '@/configs/tiny'

export default function AddOrEditPost({ id, post }: { id?: string; post?: PostRequestModel }) {
	const isAddMode = !id
	const router = useRouter()
	const editorRef = useRef({} as any)
	const [model, setModel] = useState(Object.assign({ name: '' }, post) as PostRequestModel)
	const postService = new PostService('adminpost')

	const onSubmit = async (data: PostRequestModel): Promise<void> => {
		if (editorRef.current) {
			data.content = editorRef.current.getContent()
		}
		const { succeeded, result } = isAddMode ? await createOne(data) : await updateOne(id, data)

		if (succeeded) {
			router.push('/admin/post')
			router.refresh()
		}
	}

	async function createOne(data: PostRequestModel) {
		return await postService.createOne(data)
	}

	async function updateOne(id: string, data: PostRequestModel) {
		return await postService.updateOne(id, data)
	}

	const updateAvatar = (imageUrl: string): void => {
		setModel((prev) => ({
			...prev,
			imageUrl: imageUrl,
		}))
	}

	return (
		<div>
			<div className="grid grid-cols-1 gap-10">
				<div className="mb-4">
					<p className="mb-1 font-bold">Name</p>
					<input
						className="w-full border rounded-lg py-3 px-2 border-[#E7E7E7] outline-none"
						type="text"
						placeholder="Post name..."
						value={model.name}
						onChange={(e: ChangeEvent<HTMLInputElement>) =>
							setModel((prev: PostRequestModel) => ({
								...prev,
								name: e.target.value,
							}))
						}
					/>
				</div>
				<div className="mb-4">
					<p className="mb-1 font-bold">Content</p>
					<Editor
						apiKey={apikey}
						onInit={(evt, editor) => (editorRef.current = editor)}
						initialValue={model.content}
						init={{
							height: 500,
							menubar: false,
							plugins: [
								'advlist',
								'autolink',
								'lists',
								'link',
								'image',
								'charmap',
								'preview',
								'anchor',
								'searchreplace',
								'visualblocks',
								'code',
								'fullscreen',
								'insertdatetime',
								'media',
								'table',
								'code',
								'help',
								'wordcount',
							],
							toolbar:
								'undo redo | blocks | ' +
								'bold italic forecolor | alignleft aligncenter ' +
								'alignright alignjustify | bullist numlist outdent indent | ' +
								'removeformat | help',
							content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
						}}
					/>
				</div>
				<div className="grid grid-cols-4 gap-4 mt-8">
					<Link
						href="/admin/post"
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
	)
}
