import { ApiResult } from '@/models/api-result'
import { TagRequestModel } from '@/models/tags/tag-request-model'
import { TagResponseModel } from '@/models/tags/tag-response-model'
import { httpGet, httpPost, httpPut, httpDelete } from '../http-request'
import { BaseFilter } from '@/models/filter/base-filter'
import { PaginatedList } from '@/models/base-models/paginated-list'

const adminGetAll = async (
	token?: string,
	filter: any = { pageNumber: 1, pageSize: 10 } as BaseFilter
) => {
	return await httpPost<ApiResult<PaginatedList<TagResponseModel>>>('/admintag/tags', filter, {
		token: token,
	})
}

const adminGetOne = async (id: string, token?: string) => {
	return await httpGet<ApiResult<TagResponseModel>>(`/admintag/${id}`, { token: token })
}

const adminCreateOne = async (data: TagRequestModel, token?: string) => {
	return await httpPost<ApiResult<TagResponseModel>>(`/admintag`, data, { token: token })
}

const adminUpdateOne = async (id: string, data: TagRequestModel, token?: string) => {
	return await httpPut<ApiResult<TagResponseModel>>(`/admintag/${id}`, data, { token: token })
}

const adminDeleteOne = async (id: string, token?: string) => {
	return await httpDelete<ApiResult<TagResponseModel>>(`/admintag/${id}`, { token: token })
}

export { adminGetAll, adminGetOne, adminCreateOne, adminUpdateOne, adminDeleteOne }
