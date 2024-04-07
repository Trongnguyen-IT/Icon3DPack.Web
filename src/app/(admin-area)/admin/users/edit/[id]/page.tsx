//import Edit from './edit'

export async function generateStaticParams({ params }: { params: { id: string } }) {
	return [params]
}

//import { useEffect, useState } from 'react'
import { AddOrEditUser } from '@/app/admin/components/users'
import { getOne } from '@/apis/categories'
import EditComponent from './edit'

export default function EditUser({ params }: { params: { id: string } }) {
	//const [user, setUser] = useState(null)
	const { id } = params

	// useEffect(() => {
	// 	console.log('userid', params)

	// 	// fetch user and set default form values if in edit mode
	// 	// userService
	// 	// 	.getById(id)
	// 	// 	.then((x) => setUser(x))
	// 	// 	.catch(alertService.error)
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [])

	return <div></div>
}

// export default function Page({ params }: { params: { id: string } }) {
// 	const { id } = params
// 	return <Edit params={id}></Edit>
// }
