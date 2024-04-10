import { BaseAuditResponseModel } from '../base-models/base-audit-response-model'
import { IOrder } from '../base-models/order'
import { ISlug } from '../base-models/slug'

interface PostResponseModel extends BaseAuditResponseModel, IOrder, ISlug {
	name: string
	content: string
}

export type { PostResponseModel }
