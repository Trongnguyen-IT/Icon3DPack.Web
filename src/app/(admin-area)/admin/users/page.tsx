'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Index() {
	const [users, setUsers] = useState([])

	useEffect(() => {
		//userService.getAll().then((x) => setUsers(x))
	}, [])

	function deleteUser(id: any) {
		// setUsers(users.map(x => {
		//     if (x.id === id) { x.isDeleting = true; }
		//     return x;
		// }));
		// userService.delete(id).then(() => {
		//     setUsers(users => users.filter(x => x.id !== id));
		// });
	}

	return (
		<div>
			<h1>Users</h1>
			<Link href="/admin/users/add" className="btn btn-sm btn-success mb-2">
				Add User
			</Link>
			<table className="table table-striped">
				<thead>
					<tr>
						<th style={{ width: '30%' }}>First Name</th>
						<th style={{ width: '30%' }}>Last Name</th>
						<th style={{ width: '30%' }}>Username</th>
						<th style={{ width: '10%' }}></th>
					</tr>
				</thead>
				{/* <tbody>
					{users &&
						users.map((user) => (
							<tr key={user.id}>
								<td>{user.firstName}</td>
								<td>{user.lastName}</td>
								<td>{user.username}</td>
								<td style={{ whiteSpace: 'nowrap' }}>
									<Link href={`/users/edit/${user.id}`} className="btn btn-sm btn-primary mr-1">
										Edit
									</Link>
									<button
										onClick={() => deleteUser(user.id)}
										className="btn btn-sm btn-danger btn-delete-user"
										disabled={user.isDeleting}
									>
										{user.isDeleting ? (
											<span className="spinner-border spinner-border-sm"></span>
										) : (
											<span>Delete</span>
										)}
									</button>
								</td>
							</tr>
						))}
					{!users && (
						<tr>
							<td colSpan="4">
								<h1>Snipper</h1>
							</td>
						</tr>
					)}
					{users && !users.length && (
						<tr>
							<td colSpan="4" className="text-center">
								<div className="p-2">No Users To Display</div>
							</td>
						</tr>
					)}
				</tbody> */}
			</table>
		</div>
	)
}
