import { UserRequestModel } from '@/models/users/user-request-model'
import { BaseService } from '../base-service'
import { UserResponseModel } from '@/models/users/user-response-model'
import http from '../http-request'
import { ApiResult } from '@/models/api-result'

class UserService extends BaseService<UserRequestModel, UserResponseModel> {
	constructor(serviceUrl: string) {
		super(serviceUrl)
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
		data: UserRequestModel,
		token?: string
	): Promise<{ status: number; payload: ApiResult<UserResponseModel> }> {
		return await http.put<ApiResult<UserResponseModel>>(
			`/${this.serviceUrl}/update-profile`,
			data,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		)
	}
}

export { UserService }
