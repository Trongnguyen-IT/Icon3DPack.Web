import { FileExtensionRequestModel } from '@/models/file-extensions/file-extenstion-request-model'
import { FileExtensionResponseModel } from '@/models/file-extensions/file-extension-response-model'
import { httpDelete, httpGet, httpPost, httpPut } from '../http-request'
import { ApiResult } from '@/models/api-result'
import { BaseFilter } from '@/models/filter/base-filter'
import { PaginatedList } from '@/models/base-models/paginated-list'

const adminGetAll = async (
	token?: string,
	filter: any = { pageNumber: 1, pageSize: 10, sortBy: 'Order' } as BaseFilter
) => {
	return await httpPost<ApiResult<PaginatedList<FileExtensionResponseModel>>>(
		'/adminfileextension/extensions',
		filter,
		{
			token: token,
		}
	)
}

const adminGetOne = async (id: string, token?: string) => {
	return await httpGet<ApiResult<FileExtensionResponseModel>>(`/adminfileextension/${id}`, {
		token: token,
	})
}

const adminCreateOne = async (data: FileExtensionRequestModel, token?: string) => {
	return await httpPost<ApiResult<FileExtensionResponseModel>>(`/adminfileextension`, data, {
		token: token,
	})
}

const adminUpdateOne = async (id: string, data: FileExtensionRequestModel, token?: string) => {
	return await httpPut<ApiResult<FileExtensionResponseModel>>(`/adminfileextension/${id}`, data, {
		token: token,
	})
}

const adminDeleteOne = async (id: string, token?: string) => {
	return await httpDelete<ApiResult<FileExtensionResponseModel>>(`/adminfileextension/${id}`, {
		token: token,
	})
}
export { adminGetAll, adminGetOne, adminCreateOne, adminUpdateOne, adminDeleteOne }
