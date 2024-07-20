import { BaseAuditRequestModel } from '../base-models/base-audit-request-model'
import { ISlug } from '../base-models/slug'
import { TagRequestModel } from '../tags/tag-request-model'

interface CategoryRequestModel extends BaseAuditRequestModel, ISlug {
	imageUrl: string
	name: string
	productAmount: number
	tags: TagRequestModel[]
}
export type { CategoryRequestModel }
