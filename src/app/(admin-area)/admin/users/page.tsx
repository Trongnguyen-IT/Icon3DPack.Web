import { UserResponseModel } from '@/models/users/user-response-model'
import { adminGetAll } from '@/services/user'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Delete from './_components/delete'

export default async function Index() {
	const token = cookies().get('accessToken')
	const {
		status,
		data: { result: dataSource },
	} = await adminGetAll(token?.value)

	return (
		<div>
			<h1 className="font-bold text-[1.875rem] mb-12">User</h1>
			<div className="flex justify-end mb-4">
				<Link
					href="/admin/users/add"
					className="flex justify-center items-center w-[7.5rem] h-[3.125rem] bg-[#46B8E9] hover:bg-[#0F9CD9] focus:outline-none rounded-lg font-bold text-white transition-all"
				>
					Add
				</Link>
			</div>
			<table className="text-left w-full table-auto border-collapse border border-slate-400">
				<thead>
					<tr>
						<th className="border border-slate-300 px-2">Full Name</th>
						<th className="border border-slate-300 px-2">Email</th>
						<th className="border border-slate-300 px-2">phoneNumber</th>
						<th className="border border-slate-300 px-2">receiveEmailNotification</th>
						<th className="border border-slate-300 px-2">Actions</th>
					</tr>
				</thead>
				<tbody>
					{dataSource && dataSource.totalPages ? (
						dataSource.items.map((item: UserResponseModel): JSX.Element => {
							return (
								<tr key={item.id}>
									<td className="border border-slate-300 px-2">{item.fullName}</td>
									<td className="border border-slate-300 px-2">{item.email}</td>
									<td className="border border-slate-300 px-2">{item.phoneNumber}</td>
									<td className="border border-slate-300 px-2">
										{item.receiveEmailNotification ? 'Yes' : 'No'}
									</td>

									<td className="border border-slate-300 px-2 w-[14.75rem]">
										<div className="grid grid-cols-2 gap-2 mx-4">
											<Link
												href={`/admin/users/${item.id}/edit/`}
												className="col-span-1 border text-center border-[#E7E7E7] rounded-xl py-3"
											>
												Edit
											</Link>
											<Delete id={item.id} />
											{/* <button
												onClick={() => onDelete(item.id)}
												className="col-span-1 text-white border bg-[#F04F23] border-[#E7E7E7] rounded-xl py-3"
											>
												Delete
											</button> */}
											{/* <Delete key={item.id} props={{ id: item.id }} /> */}
										</div>
									</td>
								</tr>
							)
						})
					) : (
						<tr className="text-center">
							<td colSpan={4}>No User. Please add new users!</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	)
}
