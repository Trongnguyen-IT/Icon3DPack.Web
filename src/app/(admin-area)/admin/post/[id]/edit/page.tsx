import { PostService } from '@/services/posts'
import { cookies } from 'next/headers'
import AddOrEditPost from '../../_components/add-edit'

export default async function PostEditComponent({ params }: { params: { id: string } }) {
	const cookieStore = cookies()
	const token = cookieStore.get('token')

	const postService = new PostService('adminpost', token?.value)
	const { id } = params

	const { result: post } = await postService.getOne(id)

	return (
		<div>
			<h1 className="font-bold text-[1.875rem] mb-12">Edit Post</h1>
			<AddOrEditPost id={id} post={post} />
		</div>
	)
}
