import FileUploadRequest from '@/models/files/file-load-request'
import { ApiResult } from '@/models/api-result'
import { httpPost } from '../http-request'

type AwsConfig = {
	bucketName: string
	prefix: string
}

export const uploadService = {
	async upload(data: FormData, awsConfig = {} as AwsConfig) {
		const { bucketName, prefix } = awsConfig
		return await httpPost<ApiResult<any>>(
			`/filestorage/upload?bucketName=${bucketName}&prefix=${prefix}`,
			data,
			{ contentType: 'multipart/form-data' }
		)
	},
}
