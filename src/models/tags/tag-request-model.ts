import { BaseAuditRequestModel } from '../base-models/base-audit-request-model'

interface TagRequestModel extends BaseAuditRequestModel {
	name: string
}

export type { TagRequestModel }
