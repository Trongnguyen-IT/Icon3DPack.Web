import { BaseAuditRequestModel } from '../base-models/base-audit-request-model'

interface UserRequestModel extends BaseAuditRequestModel {
	fullName?: string
	email: string
	phoneNumber?: string
	imageUrl?: string
	receiveEmailNotification: boolean
	username: string
}

export type { UserRequestModel }
