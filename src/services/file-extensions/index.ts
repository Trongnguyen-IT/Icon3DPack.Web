import { FileExtensionRequestModel } from '@/models/file-extensions/file-extenstion-request-model'
import { BaseService } from '../base-service'
import { FileExtensionResponseModel } from '@/models/file-extensions/file-extension-response-model'

class FileExtensionService extends BaseService<
	FileExtensionRequestModel,
	FileExtensionResponseModel
> {
	constructor(serviceUrl: string) {
		super(serviceUrl)
	}
}

export { FileExtensionService }
