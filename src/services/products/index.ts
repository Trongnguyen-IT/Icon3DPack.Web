import { ApiResult } from '@/models/api-result'
import { BaseService } from '../base-service'
import ProductRequestModel from '@/models/products/product-request-model'
import ProductResponseModel from '@/models/products/product-response-model'
import { PaginatedList } from '@/models/base-models/paginated-list'

class ProductService extends BaseService<ProductRequestModel, ProductResponseModel> {
	constructor(serviceUrl: string, token?: string) {
		super(serviceUrl, token)
	}

	async productFilter({
		queryObject,
		pageSize = 200,
		pageNumber = 1,
	}: {
		queryObject: any
		pageNumber?: number
		pageSize?: number
	}): Promise<ApiResult<PaginatedList<ProductResponseModel>>> {
		const queryString = Object.keys(queryObject)
			.map((k) => {
				return `${k}=${queryObject[k]}`
			})
			.join('&')

		return await this.httpRequest.post(
			`/${this.serviceUrl}/product-filter?${queryString}&pageSize=${pageSize}&pageNumber=${pageNumber}`
		)
	}
}

export { ProductService }
