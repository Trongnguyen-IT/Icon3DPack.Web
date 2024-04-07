import { BaseAuditRequestModel } from '../base-models/base-audit-request-model'

interface FileExtensionRequestModel extends BaseAuditRequestModel {
	name: string
	imageUrl: string
}

export type { FileExtensionRequestModel }
