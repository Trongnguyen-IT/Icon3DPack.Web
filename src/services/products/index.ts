import { BaseService } from '../base-service'
import ProductRequestModel from '@/models/products/product-request-model'
import ProductResponseModel from '@/models/products/product-response-model'

class ProductService extends BaseService<ProductRequestModel, ProductResponseModel> {
	constructor(serviceUrl: string) {
		super(serviceUrl)
	}
}

export { ProductService }
