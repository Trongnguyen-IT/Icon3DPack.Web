import { BaseAuditRequestModel } from '../base-models/base-audit-request-model'

interface PostRequestModel extends BaseAuditRequestModel {
	name: string
	content: string
}

export type { PostRequestModel }
