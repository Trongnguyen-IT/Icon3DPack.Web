import { BaseAuditRequestModel } from '../base-models/base-audit-request-model'
import { TagResponseModel } from '../tags/tag-response-model'

interface CategoryRequestModel extends BaseAuditRequestModel {
	imageUrl: string
	name: string
	productAmount: number
	tags: TagResponseModel[]
}
export type { CategoryRequestModel }
