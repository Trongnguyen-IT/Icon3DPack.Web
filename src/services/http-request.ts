import { normalizePath } from '@/untils'
import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import { deleteCookie, getCookie, setCookie } from 'cookies-next'
import { RedirectType, redirect, useRouter } from 'next/navigation'
const baseURL = 'http://localhost:5000/api/v1' //process.env.NEXT_PUBLIC_API_URL
class SessionToken {
	private token = ''
	private _expiresAt = new Date().toISOString()
	get value() {
		return this.token
	}
	set value(token: string) {
		// Nếu gọi method này ở server thì sẽ bị lỗi
		if (typeof window === 'undefined') {
			throw new Error('Cannot set token on server side')
		}
		this.token = token
	}
	get expiresAt() {
		return this._expiresAt
	}
	set expiresAt(expiresAt: string) {
		// Nếu gọi method này ở server thì sẽ bị lỗi
		if (typeof window === 'undefined') {
			throw new Error('Cannot set token on server side')
		}
		this._expiresAt = expiresAt
	}
}

export const clientSessionToken = new SessionToken()

// export type CustomOptions = Omit<InternalAxiosRequestConfig<any>, 'method'> & {
// 	serviceName?: string | undefined
// }

const baseHttp = axios.create({
	baseURL,
	headers: {
		accept: 'application/json', // If you receieve JSON response.
	},
})

function getCookieClient(name: string) {
	let matches = document.cookie.match(
		new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
	)
	return matches ? decodeURIComponent(matches[1]) : undefined
}

// Add a request interceptor
baseHttp.interceptors.request.use(
	function (config) {
		// Do something before request is sent
		//const cookieStore = document

		// console.log('consessionTokenfig', cookieStore)

		// if (clientSessionToken?.value) {
		// 	config.headers['Authorization'] = `Bearer ${clientSessionToken?.value}`
		// }

		if (typeof window !== 'undefined') {
			//const cookie = getCookieClient('accessToken')
			const token = localStorage.getItem('accessToken')
			console.log('tokenBase', token)

			config.headers['Authorization'] = `Bearer ${token}`
		}

		return config
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error)
	}
)

// Add a response interceptor
baseHttp.interceptors.response.use(
	function (response) {
		//console.log('response', response)

		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		// if (
		// 	['users/authenticate', 'auth/register'].some(
		// 		(item) => item === normalizePath(response.config.url)
		// 	)
		// ) {
		// 	clientSessionToken.value = response.data.result.token
		// }

		// if (typeof window !== 'undefined') {
		// 	if (['users/authenticate', 'auth/register'].some((item) => item === normalizePath(url))) {
		// 		clientSessionToken.value = (payload as any).token
		// 		clientSessionToken.expiresAt = (payload as any).expiresAt
		// 	} else if ('auth/logout' === normalizePath(url)) {
		// 		clientSessionToken.value = ''
		// 		clientSessionToken.expiresAt = new Date().toISOString()
		// 	}
		// }
		//console.log('response', response)

		return response
	},
	async function (error) {
		if (error.response && error.response.status === 401) {
			if (typeof window !== 'undefined') {
				//console.log('logout client')
				try {
					await httpPost<any>(
						`/api/auth/logout`,
						{ force: true },
						{
							baseURL: '/',
						}
					)
				} catch (error) {
					throw error
				} finally {
					localStorage.removeItem('accessToken')
					localStorage.removeItem('user')
				}
			} else {
				console.log('aaa')

				const accessToken = error.config?.headers?.Authorization?.split('Bearer ')[1]
				redirect(`/logout`)
			}
		}

		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error

		return Promise.reject(error)
	}
)

type CustomOptions = AxiosRequestConfig & {
	token?: string
	baseURL?: string
}

const setOptions = (instance: AxiosInstance, options: CustomOptions) => {
	return {
		...instance.defaults,
		baseURL: options.baseURL ? options.baseURL : instance.defaults.headers.common['baseURL'],
		headers: {
			...instance.defaults.headers,
			Authorization: options.token
				? `Bearer ${options.token}`
				: instance.defaults.headers.common['Authorization'],
		},
	} as AxiosRequestConfig
}

export const httpGet = async <T = any>(url: string, options = {} as CustomOptions) => {
	const config = setOptions(baseHttp, options)
	return await baseHttp.get<T>(url, config)
}

export const httpPost = async <T = any>(url: string, data = {}, options = {} as CustomOptions) => {
	const config = setOptions(baseHttp, options)
	return await baseHttp.post<T>(url, data, config)
}

export const httpPut = async <T = any>(url: string, data = {}, options = {} as CustomOptions) => {
	const config = setOptions(baseHttp, options)

	return await baseHttp.put<T>(url, data, config)
}

export const httpDelete = async <T = any>(url: string, options = {} as CustomOptions) => {
	const config = setOptions(baseHttp, options)

	return await baseHttp.delete<T>(url, config)
}
const http = () => {
	baseHttp
}

export default baseHttp
