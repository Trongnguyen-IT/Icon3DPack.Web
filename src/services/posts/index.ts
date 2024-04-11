import { PostRequestModel } from '@/models/posts/post-request-model'
import { PostResponseModel } from '@/models/posts/post-response-model'
import { BaseService } from '../base-service'
import { ApiResult } from '@/models/api-result'

class PostService extends BaseService<PostRequestModel, PostResponseModel> {
	constructor(serviceUrl: string, token?: string) {
		super(serviceUrl, token)
	}

	async getBySlug(slug: string): Promise<ApiResult<PostResponseModel>> {
		return await this.httpRequest.get<ApiResult<PostResponseModel>>(`/${this.serviceUrl}/${slug}`, {
			headers: {
				Authorization: `Bearer ${this.token}`,
			},
		})
	}
}

export { PostService }
