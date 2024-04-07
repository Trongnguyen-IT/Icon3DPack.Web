import { BaseAuditResponseModel } from '../base-models/base-audit-response-model'

interface CategoryResponseModel extends BaseAuditResponseModel {
	imageUrl: string
	name: string
	productAmount: number
}

export type { CategoryResponseModel }
