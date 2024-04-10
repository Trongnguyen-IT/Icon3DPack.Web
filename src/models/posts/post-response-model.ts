import { BaseAuditResponseModel } from '../base-models/base-audit-response-model'

interface PostResponseModel extends BaseAuditResponseModel {
	name: string
	content: string
}

export type { PostResponseModel }
