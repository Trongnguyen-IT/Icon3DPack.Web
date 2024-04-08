'use client'

import { UserResponseModel } from '@/models/users/user-response-model'
import { clientSessionToken } from '@/services/http-request'
import { createContext, useContext, useState } from 'react'

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
	children,
	inititalSessionToken = '',
	user: userProp,
}: {
	children: React.ReactNode
	inititalSessionToken?: string
	user: UserResponseModel | null
}) {
	const [user, setUser] = useState<UserResponseModel | null>(userProp)

	useState(() => {
		if (typeof window !== 'undefined') {
			clientSessionToken.value = inititalSessionToken
		}
	})

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
