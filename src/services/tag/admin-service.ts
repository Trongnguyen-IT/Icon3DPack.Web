import { ApiResult } from '@/models/api-result'
import { TagRequestModel } from '@/models/tags/tag-request-model'
import { TagResponseModel } from '@/models/tags/tag-response-model'
import { httpGet, httpPost, httpPut, httpDelete } from '../http-request'

const adminGetAll = async (token?: string, params?: any) => {
	return await httpGet<ApiResult<TagResponseModel[]>>('/tag', { token: token })
}

const adminGetOne = async (id: string, token?: string) => {
	return await httpGet<ApiResult<TagResponseModel>>(`/tag/${id}`, { token: token })
}

const adminCreateOne = async (data: TagRequestModel, token?: string) => {
	return await httpPost<ApiResult<TagResponseModel>>(`/tag`, data, { token: token })
}

const adminUpdateOne = async (id: string, data: TagRequestModel, token?: string) => {
	return await httpPut<ApiResult<TagResponseModel>>(`/tag/${id}`, data, { token: token })
}

const adminDeleteOne = async (id: string, token?: string) => {
	return await httpDelete<ApiResult<TagResponseModel>>(`/tag/${id}`, { token: token })
}

export { adminGetAll, adminGetOne, adminCreateOne, adminUpdateOne, adminDeleteOne }
