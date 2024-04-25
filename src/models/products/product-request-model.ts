import { TagResponseModel } from '../tags/tag-response-model'
import ProductModel from './product-model'

export default interface ProductRequestModel extends ProductModel {
	categoryName: string
	tagIds: string[]
	tags: TagResponseModel[]
}
