import { PostRequestModel } from '@/models/posts/post-request-model'
import { PostResponseModel } from '@/models/posts/post-response-model'
import { BaseService } from '../base-service'

class PostService extends BaseService<PostRequestModel, PostResponseModel> {
	constructor(serviceUrl: string, token?: string) {
		super(serviceUrl, token)
	}
}

export { PostService }
