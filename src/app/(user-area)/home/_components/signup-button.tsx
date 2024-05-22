'use client'

import { showSignupHandlerDispatch } from '@/app/_components/register'
import { useAppContext } from '@/app/app-provider'

export default function SignupButton() {
	const { user } = useAppContext()

	return (
		!user && (
			<button
				onClick={showSignupHandlerDispatch}
				className="w-[23.1875rem] h-[3.75rem] text-white font-bold uppercase bg-[#F04F23] rounded-[10px]"
			>
				Free Sign Up and download
			</button>
		)
	)
}
