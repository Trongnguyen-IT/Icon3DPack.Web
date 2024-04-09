import FileUploadRequest from '@/models/files/file-load-request'
import { ApiResult } from '@/models/api-result'
import HttpRequest from '../http-request'

class UploadService {
	private readonly bucketName: string
	private readonly prefix: string
	public readonly httpRequest: HttpRequest
	constructor(bucketName: string, prefix: string) {
		this.bucketName = bucketName
		this.prefix = prefix
		this.httpRequest = new HttpRequest()
	}

	async upload(data: FileUploadRequest): Promise<ApiResult<any>> {
		return await this.httpRequest.post<ApiResult<any>>(
			`/filestorage/upload?bucketName=${this.bucketName}&prefix=${this.prefix}`,
			data.formData
		)
	}
}

export { UploadService }
