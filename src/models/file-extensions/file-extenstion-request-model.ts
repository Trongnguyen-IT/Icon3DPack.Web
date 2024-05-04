import { BaseAuditRequestModel } from '../base-models/base-audit-request-model'

interface FileExtensionRequestModel extends BaseAuditRequestModel {
	id: string
	name: string
	imageUrl: string
	order: number
}

export type { FileExtensionRequestModel }
