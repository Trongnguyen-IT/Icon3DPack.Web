'use client'

import { useEffect, useState } from 'react'
import { AddOrEditUser } from '@/app/admin/components/users'

export default function EditComponent({ id }: { id: string }) {
	const [user, setUser] = useState(null)

	useEffect(() => {}, [])

	return (
		<div>
			<h1>Edit User</h1>
			{user ? <AddOrEditUser props={user} /> : <h1>add</h1>}
		</div>
	)
}
