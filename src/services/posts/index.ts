import { PostRequestModel } from '@/models/posts/post-request-model'
import { PostResponseModel } from '@/models/posts/post-response-model'
import { BaseService } from '../base-service'
import { ApiResult } from '@/models/api-result'

class PostService extends BaseService<PostRequestModel, PostResponseModel> {
	constructor(serviceUrl: string, token?: string) {
		super(serviceUrl, token)
	}

	async getBySlug(slug: string): Promise<ApiResult<PostResponseModel>> {
		return await this.httpRequest.get<ApiResult<PostResponseModel>>(`/${this.serviceUrl}?${slug}`, {
			headers: {
				Authorization: `Bearer ${this.token}`,
			},
		})
	}

	// async getBySlug(params: any): Promise<ApiResult<PostResponseModel>> {
	// 	const queryString = Object.keys(params)
	// 		.map((k) => {
	// 			return `${k}=${params[k]}`
	// 		})
	// 		.join('&')
	// 	console.log('queryString', queryString)

	// 	return await this.httpRequest.get(`/${this.serviceUrl}?${queryString}`, {
	// 		headers: {
	// 			Authorization: `Bearer ${this.token}`,
	// 		},
	// 	})
	// }
}

export { PostService }
