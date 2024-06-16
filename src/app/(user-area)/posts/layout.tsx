import { getAll } from '@/services/posts'
import PostSideBar from './_components/post-sidebar'

export default async function PostLayout({ children }: { children: React.ReactNode }) {
	const {
		data: {
			result: { items },
		},
	} = await getAll()

	return (
		<section className="bg-[#F9F9F9] py-12">
			<div className="container mx-auto bg-[#F9F9F9]">
				<div className="flex flex-row">
					<div className="basis-3/12">
						<PostSideBar initialPost={items} />
					</div>
					<div className="basis-9/12 p-8 mx-5 bg-white rounded-[1.25rem]">{children}</div>
				</div>
			</div>
		</section>
	)
}
