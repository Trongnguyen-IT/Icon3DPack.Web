import { ApiResult } from '@/models/api-result'
import { ChangePasswordModel } from '@/models/users/change-password'
import HttpRequest from '../http-request'
import { UserResponseModel } from '@/models/users/user-response-model'
import { LoginModel } from '@/models/users/login-model'
import { UserRequestModel } from '@/models/users/user-request-model'

class AuthService {
	public readonly token?: string
	public readonly serviceUrl: string
	public readonly httpRequest: HttpRequest

	constructor(serviceUrl: string, token?: string) {
		this.serviceUrl = serviceUrl
		this.httpRequest = new HttpRequest()
		this.token = token
	}

	async login(data: LoginModel): Promise<ApiResult<UserResponseModel>> {
		return await this.httpRequest.post<ApiResult<UserResponseModel>>(
			`/${this.serviceUrl}/authenticate`,
			data
		)
	}

	async profile(): Promise<ApiResult<UserResponseModel>> {
		return await this.httpRequest.get<ApiResult<UserResponseModel>>(`/${this.serviceUrl}/profile`, {
			headers: {
				Authorization: `Bearer ${this.token}`,
			},
		})
	}

	async updateProfile(data: UserRequestModel): Promise<ApiResult<UserResponseModel>> {
		return await this.httpRequest.put<ApiResult<UserResponseModel>>(
			`/${this.serviceUrl}/update-profile`,
			data
		)
	}

	async changePassword(
		id: string,
		data: ChangePasswordModel
	): Promise<ApiResult<UserResponseModel>> {
		return await this.httpRequest.put<ApiResult<UserResponseModel>>(
			`/${this.serviceUrl}/${id}/change-password`,
			data
		)
	}

	async auth(data: UserRequestModel) {
		await this.httpRequest.post<ApiResult<UserResponseModel>>(`/api/auth`, data, {
			baseURL: '/',
		})
	}
}

export { AuthService }
