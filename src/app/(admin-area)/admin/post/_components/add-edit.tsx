'use client'

import { ChangeEvent, useCallback, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { PostRequestModel } from '@/models/posts/post-request-model'
import { Editor } from '@tinymce/tinymce-react'
import { apikey } from '@/configs/tiny'
import slugify from 'slugify'
import { adminCreateOne, adminUpdateOne } from '@/services/posts'
import { apiStatus } from '@/configs'
import SaveButton from '@/app/_components/save-button'

export default function AddOrEditPost({ id, post }: { id?: string; post?: PostRequestModel }) {
	const isAddMode = !id
	const router = useRouter()
	const editorRef = useRef({} as any)
	const [model, setModel] = useState(
		Object.assign({ name: '', order: 0 }, post) as PostRequestModel
	)
	const [isLoading, setIsLoading] = useState(false)

	const handleSubmit = useCallback(async (): Promise<void> => {
		setIsLoading(true)

		if (editorRef.current) {
			model.content = editorRef.current.getContent()
		}
		model.slug = slugify(model.name, { lower: true, strict: true })

		const {
			status,
			data: { result },
		} = isAddMode ? await createOne(model) : await updateOne(id, model)

		setIsLoading(true)

		if (status === apiStatus.success) {
			router.push('/admin/post')
			router.refresh()
		}
	}, [model])

	async function createOne(data: PostRequestModel) {
		return await adminCreateOne(data)
	}

	async function updateOne(id: string, data: PostRequestModel) {
		return await adminUpdateOne(id, data)
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
					<p className="mb-1 font-bold">Order</p>
					<input
						className="w-full border rounded-lg py-3 px-2 border-[#E7E7E7] outline-none"
						type="number"
						placeholder="Order"
						value={model.order}
						onChange={(e: ChangeEvent<HTMLInputElement>) =>
							setModel((prev: PostRequestModel) => ({
								...prev,
								order: +e.target.value,
							}))
						}
					/>
				</div>

				<div className="mb-4">
					<p className="mb-1 font-bold">Content</p>
					<Editor
						id="post-editor"
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
								'undo redo | blocks fontsize | ' +
								'bold italic forecolor | alignleft aligncenter ' +
								'alignright alignjustify | bullist numlist outdent indent | ' +
								'removeformat | help',
							content_style: 'body { font-family: Montserrat; font-size:16px }',
						}}
					/>
				</div>
				<div className="grid grid-cols-8 gap-4 mt-8">
					<Link
						href="/admin/post"
						className="col-span-1 text-center border border-[#E7E7E7] rounded-lg py-3 font-bold"
					>
						Cancel
					</Link>
					<SaveButton isLoading={isLoading} onHandleClick={handleSubmit} />
				</div>
			</div>
		</div>
	)
}
