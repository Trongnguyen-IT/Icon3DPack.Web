import FileUploadRequest from '@/models/files/file-load-request'
import http from '../http-request'
import { ApiResult } from '@/models/api-result'

export async function upload(
	data: FileUploadRequest
): Promise<{ status: number; payload: ApiResult<any> }> {
	return await http.post<ApiResult<any>>(
		`/filestorage/upload?bucketName=${data.bucketName}&prefix=${data.prefix}`,
		data.formData
	)
}
