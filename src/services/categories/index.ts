import { CategoryResponseModel } from '@/models/categories/category-response-model'
import { CategoryRequestModel } from '@/models/categories/category-request-model'
import { BaseService } from '../base-service'

class CategoryService extends BaseService<CategoryRequestModel, CategoryResponseModel> {
	constructor(serviceUrl: string, token?: string) {
		super(serviceUrl, token)
	}
}

export { CategoryService }
