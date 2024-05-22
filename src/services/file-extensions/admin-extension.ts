import { FileExtensionRequestModel } from '@/models/file-extensions/file-extenstion-request-model'
import { FileExtensionResponseModel } from '@/models/file-extensions/file-extension-response-model'
import { httpDelete, httpGet, httpPost, httpPut } from '../http-request'
import { ApiResult } from '@/models/api-result'

const adminGetAll = async (token?: string, params?: any) => {
	return await httpGet<ApiResult<FileExtensionResponseModel[]>>('/adminfileextension', {
		token: token,
	})
}

const adminGetOne = async (id: string, token?: string) => {
	return await httpGet<ApiResult<FileExtensionResponseModel>>(`/adminfileextension/${id}`)
}

const adminCreateOne = async (data: FileExtensionRequestModel, token?: string) => {
	return await httpPost<ApiResult<FileExtensionResponseModel>>(`/adminfileextension`, data, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
}

const adminUpdateOne = async (id: string, data: FileExtensionRequestModel, token?: string) => {
	return await httpPut<ApiResult<FileExtensionResponseModel>>(`/adminfileextension/${id}`, data, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
}

const adminDeleteOne = async (id: string, token?: string) => {
	return await httpDelete<ApiResult<FileExtensionResponseModel>>(`/adminfileextension/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
}
export { adminGetAll, adminGetOne, adminCreateOne, adminUpdateOne, adminDeleteOne }
