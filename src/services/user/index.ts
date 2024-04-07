import { UserRequestModel } from '@/models/users/user-request-model'
import { BaseService } from '../base-service'
import { UserResponseModel } from '@/models/users/user-response-model'

class UserService extends BaseService<UserRequestModel, UserResponseModel> {
	constructor(serviceUrl: string) {
		super(serviceUrl)
	}
}
export { UserService }
