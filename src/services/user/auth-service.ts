import { UserRequestModel } from '@/models/users/user-request-model'
import { BaseService } from '../base-service'
import { UserResponseModel } from '@/models/users/user-response-model'
import http from '../http-request'
import { ApiResult } from '@/models/api-result'
import { ChangePasswordModel } from '@/models/users/change-password'

class AuthService {
	public readonly serviceUrl: string

	constructor(serviceUrl: string) {
		this.serviceUrl = serviceUrl
	}

	async profile(
		token?: string
	): Promise<{ status: number; payload: ApiResult<UserResponseModel> }> {
		return await http.get<ApiResult<UserResponseModel>>(`/${this.serviceUrl}/profile`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
	}

	async updateProfile(
		data: UserRequestModel
	): Promise<{ status: number; payload: ApiResult<UserRequestModel> }> {
		return await http.put<ApiResult<UserRequestModel>>(`/${this.serviceUrl}/update-profile`, data)
	}

	async changePassword(
		id: string,
		data: ChangePasswordModel
	): Promise<{ status: number; payload: ApiResult<UserRequestModel> }> {
		return await http.put<ApiResult<UserRequestModel>>(
			`/${this.serviceUrl}/${id}/change-password`,
			data
		)
	}
}
export { AuthService }
