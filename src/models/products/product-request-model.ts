import { FileEntity } from '../files/file-entity'
import { TagResponseModel } from '../tags/tag-response-model'
import ProductModel from './product-model'

export default interface ProductRequestModel extends ProductModel {
	tags: TagResponseModel[]
	fileEntities: FileEntity[]
}
