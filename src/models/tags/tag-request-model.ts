import { BaseAuditRequestModel } from '../base-models/base-audit-request-model'

interface TagRequestModel extends BaseAuditRequestModel {
	id: string
	name: string
}

export type { TagRequestModel }
