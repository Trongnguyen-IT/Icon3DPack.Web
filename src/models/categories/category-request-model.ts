import { BaseAuditRequestModel } from '../base-models/base-audit-request-model'

interface CategoryRequestModel extends BaseAuditRequestModel {
	imageUrl: string
	name: string
	productAmount: number
}
export type { CategoryRequestModel }
