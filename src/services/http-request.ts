import { normalizePath } from '@/untils'
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
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

const axiosIntance = axios.create({
	baseURL,
	headers: {
		accept: 'application/json', // If you receieve JSON response.
	},
})

function getCookie(name: string) {
	let matches = document.cookie.match(
		new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
	)
	return matches ? decodeURIComponent(matches[1]) : undefined
}

// Add a request interceptor
axiosIntance.interceptors.request.use(
	function (config) {
		// Do something before request is sent
		//const cookieStore = document

		// console.log('consessionTokenfig', cookieStore)

		// if (clientSessionToken?.value) {
		// 	config.headers['Authorization'] = `Bearer ${clientSessionToken?.value}`
		// }
		if (typeof window !== 'undefined') {
			const cookie = getCookie('token')
			console.log('tokentoken', cookie)
			config.headers['Authorization'] = `Bearer ${cookie}`
		}

		return config
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error)
	}
)

// Add a response interceptor
axiosIntance.interceptors.response.use(
	function (response) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		if (
			['users/authenticate', 'auth/register'].some(
				(item) => item === normalizePath(response.config.url)
			)
		) {
			clientSessionToken.value = response.data.result.token
		}
		// if (typeof window !== 'undefined') {
		// 	if (['users/authenticate', 'auth/register'].some((item) => item === normalizePath(url))) {
		// 		clientSessionToken.value = (payload as any).token
		// 		clientSessionToken.expiresAt = (payload as any).expiresAt
		// 	} else if ('auth/logout' === normalizePath(url)) {
		// 		clientSessionToken.value = ''
		// 		clientSessionToken.expiresAt = new Date().toISOString()
		// 	}
		// }

		return response
	},
	function (error) {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		return Promise.reject(error)
	}
)

class HttpRequest {
	private readonly axiosIntance: AxiosInstance

	constructor() {
		this.axiosIntance = axiosIntance
	}

	async get<TResponse>(url: string, configs?: AxiosRequestConfig<any>) {
		try {
			const { data: result } = await this.axiosIntance.get<TResponse>(url, configs)
			return result
		} catch (error) {
			throw error
		}
	}

	async post<TResponse>(url: string, data?: any, configs?: AxiosRequestConfig<any>) {
		try {
			const { data: result } = await this.axiosIntance.post<TResponse>(url, data, configs)
			return result
		} catch (error) {
			throw error
		}
	}

	async put<TResponse>(url: string, data?: any, configs?: AxiosRequestConfig<any>) {
		try {
			const { data: result } = await this.axiosIntance.put<TResponse>(url, data, configs)
			return result
		} catch (error) {
			throw error
		}
	}

	async delete<TResponse>(url: string, configs?: AxiosRequestConfig<any>) {
		try {
			const { data: result } = await this.axiosIntance.delete<TResponse>(url, configs)
			return result
		} catch (error) {
			throw error
		}
	}
}

export default HttpRequest
