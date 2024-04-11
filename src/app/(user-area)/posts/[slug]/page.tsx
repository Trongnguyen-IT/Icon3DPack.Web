import { PostService } from '@/services/posts'

export default async function Posts({ params }: { params: { slug: string } }) {
	const { slug } = params

	const postService = new PostService('post')

	const { succeeded, result } = await postService.getBySlug(slug)

	return (
		<div className="min-h-[55vh]">
			<div dangerouslySetInnerHTML={{ __html: result.content }} />
		</div>
	)
}
