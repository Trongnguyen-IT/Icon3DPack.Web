'use client'

import { UserResponseModel } from '@/models/users/user-response-model'
import { clientSessionToken } from '@/services/http-request'
import { createContext, useCallback, useContext, useEffect, useState } from 'react'

const AppContext = createContext<{
	user: UserResponseModel | null
	setUser: (user: UserResponseModel | null) => void
}>({
	user: null,
	setUser: () => {},
})

export const useAppContext = () => {
	const context = useContext(AppContext)
	return context
}

export default function AppProvider({
	user: initialUser,
	children,
}: {
	user: UserResponseModel | null
	children: React.ReactNode
}) {
	const [user, setUserState] = useState<UserResponseModel | null>(initialUser)
	const setUser = useCallback(
		(user: UserResponseModel | null) => {
			setUserState(user)
			localStorage.setItem('user', JSON.stringify(user))
		},
		[setUserState]
	)

	useEffect(() => {
		const _user = localStorage.getItem('user')
		setUserState(_user ? JSON.parse(_user) : null)
	}, [setUserState])

	return (
		<AppContext.Provider
			value={{
				user,
				setUser,
			}}
		>
			{children}
		</AppContext.Provider>
	)
}
