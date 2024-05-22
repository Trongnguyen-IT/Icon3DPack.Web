// 'use client'
// import { useEffect } from 'react'
// import { useRefreshToken } from './useRefreshToken'
// import { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
// import { axiosAuth } from '../axios'

// const useAxiosAuth = () => {
// 	//const { data: session } = useSession()
// 	const refreshToken = useRefreshToken()

// 	useEffect(() => {
// 		const requestIntercept = axiosAuth.interceptors.request.use(
// 			(config: InternalAxiosRequestConfig<any>) => {
// 				if (!config.headers['Authorization']) {
// 					//config.headers['Authorization'] = `Bearer ${session?.user?.accessToken}`
// 				}
// 				return config
// 			},
// 			(error: any) => Promise.reject(error)
// 		)

// 		const responseIntercept = axiosAuth.interceptors.response.use(
// 			(response: AxiosResponse) => response,
// 			async (error: any) => {
// 				const prevRequest = error?.config
// 				if (error?.response?.status === 401 && !prevRequest?.sent) {
// 					prevRequest.sent = true
// 					await refreshToken()
// 					//prevRequest.headers['Authorization'] = `Bearer ${session?.user.accessToken}`
// 					return axiosAuth(prevRequest)
// 				}
// 				return Promise.reject(error)
// 			}
// 		)

// 		return () => {
// 			axiosAuth.interceptors.request.eject(requestIntercept)
// 			axiosAuth.interceptors.response.eject(responseIntercept)
// 		}
// 	})
// 	//}, [session, refreshToken])

// 	return axiosAuth
// }

// export { useAxiosAuth }
