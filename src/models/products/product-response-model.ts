import { FileEntity } from '../files/file-entity'
import { TagResponseModel } from '../tags/tag-response-model'
import ProductModel from './product-model'

export default interface ProductResponseModel extends ProductModel {
	categoryName: string
	tags: TagResponseModel[]
	fileEntities: FileEntity[]
}
