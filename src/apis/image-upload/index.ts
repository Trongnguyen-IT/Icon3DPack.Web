import ApiResult from '@/app/models/api-result'
import { AxiosResponse } from 'axios'
import api from '../api'
import FileUploadRequest from '@/app/models/users/file-load-model'

export async function upload(data: FileUploadRequest): Promise<AxiosResponse<ApiResult<any>>> {
	return await api.post(
		`/filestorage/upload?bucketName=${data.bucketName}&prefix=${data.prefix}`,
		data.formData
	)
}
