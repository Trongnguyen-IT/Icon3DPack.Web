import { BaseAuditRequestModel } from '../base-models/base-audit-request-model'
import { IOrder } from '../base-models/order'
import { ISlug } from '../base-models/slug'

interface PostRequestModel extends BaseAuditRequestModel, IOrder, ISlug {
	name: string
	content: string
}

export type { PostRequestModel }
