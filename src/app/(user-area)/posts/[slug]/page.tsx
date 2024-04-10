import { PostService } from '@/services/posts'

export default async function Posts({ params }: { params: { slug: string } }) {
	const postService = new PostService('post')
	const queryObject = {
		slug: 'about',
	}
	//const pathname = usePathname()
	const { slug } = params
	const { succeeded, result } = await postService.getBySlug(slug)

	console.log('usePathname', result)

	// const markup = {
	// 	__html: result[0].content,
	// }

	//const isContact = `/posts/contact` === pathname
	return <div></div>
	// return <div dangerouslySetInnerHTML={markup} />
	// {
	// 	/* (
	// 	<div>
	// 		<h1 className="text-3xl font-bold capitalize mb-5">{params.slug}</h1>
	// 		<div className="flex justify-center mb-12">
	// 			<div className="basis-4/5">
	// 				<p className="mb-5 text-lg font-bold text-center">Leave us a message</p>
	// 				<p className="text-center">
	// 					Feel free to ask us any questions including regarding pricing plans, licenses options or
	// 					products itself. If you looking for custom design please use this contact form.
	// 				</p>
	// 			</div>
	// 		</div>
	// 		<div>
	// 			<div className="grid grid-cols-4 gap-4">
	// 				<input
	// 					className="col-start-2 col-span-2 border rounded-lg py-3 px-2 border-[#E7E7E7] outline-none"
	// 					type="text"
	// 					placeholder="Your name"
	// 				/>
	// 				<input
	// 					className="col-start-2 col-span-2 border rounded-lg py-3 px-2 border-[#E7E7E7] outline-none"
	// 					type="text"
	// 					placeholder="Email"
	// 				/>
	// 				<textarea
	// 					className="col-start-2 col-span-2 border rounded-lg py-3 px-2 border-[#E7E7E7] outline-none"
	// 					placeholder="Tell us all the things"
	// 					rows={5}
	// 				/>
	// 				<button className="col-start-2 col-span-2 border rounded-lg bg-[#46B8E9]p y-3 text-white mt-5">
	// 					Submit
	// 				</button>
	// 			</div>
	// 		</div>
	// 	</div>
	// ) */
	// }
}
