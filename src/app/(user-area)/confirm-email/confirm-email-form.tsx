'use client'

import { VeriryEmail } from '@/models/users/verify-email'
import { UserService } from '@/services/user'
import { AuthService } from '@/services/user/auth-service'
import { usePathname, useSearchParams, useParams, useRouter } from 'next/navigation'

export default function ConfirmEmailForm({ props }: { props: any }) {
	const encodedBase64Data = encodeURIComponent(props.token)
	const searchParams = new URLSearchParams(`token=${encodedBase64Data}`)
	const binQuery = searchParams.get('token') // 'E+AXQB+A'

	//const { userId, token } = props
	console.log('searchParams', binQuery)
	//const userId= props.searchParams.getAll
	// const router = useRouter()
	const userService = new AuthService('users')
	// const searchParams = useSearchParams()
	// const params = useParams()
	// const userId = searchParams.get('userId')
	// const token = searchParams.get('token')

	// //const res = searchParams.getAll()
	// console.log('searchParams', searchParams)
	// //console.log('query', router)

	// const handleSubmit = async () => {
	// 	const request = {
	// 		userId,
	// 		token,
	// 	} as VeriryEmail

	// 	const { succeeded, result } = await userService.confirmEmail(request)
	// 	console.log('result', result)
	// }

	return (
		<div className="container mx-auto min-h-[50vh] relative">
			<div className="w-full h-full absolute top-0 left-0 flex justify-center items-center flex-col">
				<p className="mb-8">Please click here to verify email!</p>
				<button
					className="border border-[#46B8E9] rounded-lg bg-[#46B8E9] py-3 col-span-3 font-medium text-white px-12"
					//onClick={() => handleSubmit()}
				>
					Verify
				</button>
			</div>
		</div>
	)
}
