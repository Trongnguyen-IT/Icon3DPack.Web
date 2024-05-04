import { BaseAuditResponseModel } from '../base-models/base-audit-response-model'

interface FileExtensionResponseModel extends BaseAuditResponseModel {
	name: string
	imageUrl: string
	order: number
}
export type { FileExtensionResponseModel }
