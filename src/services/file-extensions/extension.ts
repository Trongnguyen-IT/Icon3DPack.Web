import { FileExtensionRequestModel } from '@/models/file-extensions/file-extenstion-request-model'
import { FileExtensionResponseModel } from '@/models/file-extensions/file-extension-response-model'
import { httpDelete, httpGet, httpPost, httpPut } from '../http-request'
import { ApiResult } from '@/models/api-result'
import { BaseFilter } from '@/models/filter/base-filter'
import { PaginatedList } from '@/models/base-models/paginated-list'

const getAll = async (
	token?: string,
	filter: any = { pageNumber: 1, pageSize: 10, sortBy: 'Order' } as BaseFilter
) => {
	return await httpPost<ApiResult<PaginatedList<FileExtensionResponseModel>>>(
		'/fileextension/extensions',
		filter,
		{
			token: token,
		}
	)
}

const getOne = async (id: string, token?: string) => {
	return await httpGet<ApiResult<FileExtensionResponseModel>>(`/fileextension/${id}`)
}

const createOne = async (data: FileExtensionRequestModel, token?: string) => {
	return await httpPost<ApiResult<FileExtensionResponseModel>>(`/fileextension`, data, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
}

const updateOne = async (id: string, data: FileExtensionRequestModel, token?: string) => {
	return await httpPut<ApiResult<FileExtensionResponseModel>>(`/fileextension/${id}`, data, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
}

const deleteOne = async (id: string, token?: string) => {
	return await httpDelete<ApiResult<FileExtensionResponseModel>>(`/fileextension/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
}

export { getAll, getOne, createOne, updateOne, deleteOne }
