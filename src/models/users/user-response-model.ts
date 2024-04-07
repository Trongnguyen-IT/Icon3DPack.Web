import { BaseAuditResponseModel } from '../base-models/base-audit-response-model'

interface UserResponseModel extends BaseAuditResponseModel {
	fullName?: string
	email: string
	phoneNumber?: string
	imageUrl?: string
	receiveEmailNotification: boolean
	username: string
}

export type { UserResponseModel }
