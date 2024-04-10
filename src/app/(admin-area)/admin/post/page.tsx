import { cookies } from 'next/headers'
import Link from 'next/link'
import Delete from './_components/delete'
import { PostResponseModel } from '@/models/posts/post-response-model'
import { PostService } from '@/services/posts'

export default async function AdminPost() {
	const cookieStore = cookies()
	const token = cookieStore.get('token')

	const postService = new PostService('adminpost', token?.value)

	const { result: dataSource } = await postService.getAll('/adminpost')

	return (
		<div>
			<h1 className="font-bold text-[1.875rem] mb-12">Post</h1>
			<div className="flex justify-end mb-4">
				<Link
					href="/admin/post/add"
					className="flex justify-center items-center w-[7.5rem] h-[3.125rem] bg-[#46B8E9] hover:bg-[#0F9CD9] focus:outline-none rounded-lg font-bold text-white transition-all"
				>
					Add
				</Link>
			</div>
			<table className="text-left w-full table-fixed border-collapse border border-slate-400">
				<thead>
					<tr>
						<th className="border border-slate-300 px-2">Id</th>
						<th className="border border-slate-300 px-2">Name</th>
						<th className="border border-slate-300 px-2">Order</th>
						<th className="border border-slate-300 px-2">Content</th>
						<th className="border border-slate-300 px-2">Actions</th>
					</tr>
				</thead>
				<tbody>
					{dataSource && dataSource.length ? (
						dataSource.map((item: PostResponseModel): JSX.Element => {
							return (
								<tr key={item.id}>
									<td className="border border-slate-300 px-2">{item.id}</td>
									<td className="border border-slate-300 px-2">{item.name}</td>
									<td className="border border-slate-300 px-2">{item.order}</td>
									<td className="border border-slate-300 px-2">
										<p className="truncate ">{item.content}</p>
									</td>

									<td className="border border-slate-300 px-2">
										<div className="flex justify-center">
											<Link
												href={`/admin/post/${item.id}/edit/`}
												className="w-1/2 inline-block border text-center border-[#E7E7E7] rounded-xl py-3"
											>
												Edit
											</Link>
										</div>
									</td>
								</tr>
							)
						})
					) : (
						<tr className="text-center">
							<td colSpan={4}>No Post. Please add new post!</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	)
}
