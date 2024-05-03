import { ApiResult } from '@/models/api-result'
import { ChangePasswordModel } from '@/models/users/change-password'
import HttpRequest from '../http-request'
import { UserResponseModel } from '@/models/users/user-response-model'
import { LoginModel } from '@/models/users/login-model'
import { UserRequestModel } from '@/models/users/user-request-model'
import { RegisterModel } from '@/models/users/register-model'
import { VeriryEmail } from '@/models/users/verify-email'

type NewType = VeriryEmail

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

	async register(data: RegisterModel): Promise<ApiResult<UserResponseModel>> {
		return await this.httpRequest.post<ApiResult<UserResponseModel>>(
			`/${this.serviceUrl}/register`,
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

	async confirmEmail(data: VeriryEmail): Promise<ApiResult<any>> {
		return await this.httpRequest.post<ApiResult<any>>(`/${this.serviceUrl}/confirm-email`, data)
	}

	//set cookie on next server
	async auth(data: UserRequestModel) {
		return await this.httpRequest.post<ApiResult<UserResponseModel>>(`/api/auth`, data, {
			baseURL: '/',
		})
	}

	//set cookie on next server
	async updateNotification(id: string, isNotification: boolean) {
		return await this.httpRequest.put<ApiResult<any>>(
			`/${this.serviceUrl}/${id}/update-notification/${isNotification}`
		)
	}

	//set cookie on next server
	async deleteAccount(id: string) {
		return await this.httpRequest.delete<ApiResult<any>>(`/${this.serviceUrl}/${id}/delete-account`)
	}
}

export { AuthService }
