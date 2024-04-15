import { TagRequestModel } from '@/models/tags/tag-request-model'
import { BaseService } from '../base-service'
import { TagResponseModel } from '@/models/tags/tag-response-model'

class TagService extends BaseService<TagRequestModel, TagResponseModel> {
	constructor(serviceUrl: string, token?: string) {
		super(serviceUrl, token)
	}
}

export { TagService }
