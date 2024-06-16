import { getBySlug } from '@/services/posts'

export default async function Posts({ params }: { params: { slug: string } }) {
	const { slug } = params

	const {
		status,
		data: { result },
	} = await getBySlug(slug)

	return (
		<div className="min-h-[55vh]">
			<div dangerouslySetInnerHTML={{ __html: result.content }} />
		</div>
	)
}
