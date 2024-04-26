import { BaseAuditRequestModel } from '../base-models/base-audit-request-model'
import { TagRequestModel } from '../tags/tag-request-model'

interface CategoryRequestModel extends BaseAuditRequestModel {
	imageUrl: string
	name: string
	productAmount: number
	tags: TagRequestModel[]
}
export type { CategoryRequestModel }
