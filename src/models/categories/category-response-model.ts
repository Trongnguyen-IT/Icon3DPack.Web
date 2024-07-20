import { BaseAuditResponseModel } from '../base-models/base-audit-response-model'
import { ISlug } from '../base-models/slug'

interface CategoryResponseModel extends BaseAuditResponseModel, ISlug {
	imageUrl: string
	name: string
	productAmount: number
}

export type { CategoryResponseModel }
