import { ApiResult } from '@/models/api-result'
import { TagRequestModel } from '@/models/tags/tag-request-model'
import { TagResponseModel } from '@/models/tags/tag-response-model'
import { httpGet, httpPost, httpPut, httpDelete } from '../http-request'

const getAll = async (token?: string, params?: any) => {
	return await httpGet<ApiResult<TagResponseModel[]>>('/tag', { token: token })
}

const getOne = async (id: string, token?: string) => {
	return await httpGet<ApiResult<TagResponseModel>>(`/tag/${id}`, { token: token })
}

const createOne = async (data: TagRequestModel, token?: string) => {
	return await httpPost<ApiResult<TagResponseModel>>(`/tag`, data, { token: token })
}

const updateOne = async (id: string, data: TagRequestModel, token?: string) => {
	return await httpPut<ApiResult<TagResponseModel>>(`/tag/${id}`, data, { token: token })
}

const deleteOne = async (id: string, token?: string) => {
	return await httpDelete<ApiResult<TagResponseModel>>(`/tag/${id}`, { token: token })
}
export { getAll, getOne, createOne, updateOne, deleteOne }
