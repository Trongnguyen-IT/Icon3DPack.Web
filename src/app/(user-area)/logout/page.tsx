'use client'

import { useAppContext } from '@/app/app-provider'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { logout as logoutPage } from '@/services/user'

export default function Logout() {
	const router = useRouter()
	const { setUser } = useAppContext()

	useEffect(() => {
		const logout = async () => {
			await logoutPage(true)
			setUser(null)
			localStorage.removeItem('accessToken')
			localStorage.removeItem('user')
			router.push(`/home`)
			router.refresh()
		}
		logout()
	}, [])

	return <></>
}
