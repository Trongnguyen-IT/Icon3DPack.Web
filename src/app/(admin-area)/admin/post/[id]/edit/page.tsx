import { cookies } from 'next/headers'
import AddOrEditPost from '../../_components/add-edit'
import { adminGetOne } from '@/services/posts'

export default async function PostEditComponent({ params }: { params: { id: string } }) {
	const token = cookies().get('accessToken')
	const { id } = params

	const {
		data: { result: post },
	} = await adminGetOne(id, token?.value)

	return (
		<div>
			<h1 className="font-bold text-[1.875rem] mb-12">Edit Post</h1>
			<AddOrEditPost id={id} post={post} />
		</div>
	)
}
