import { PostRequestModel } from '@/models/posts/post-request-model'
import { PostResponseModel } from '@/models/posts/post-response-model'
import { ApiResult } from '@/models/api-result'
import { httpDelete, httpGet, httpPost, httpPut } from '../http-request'

const adminGetAll = async (token?: string, params?: any) => {
	return await httpGet<ApiResult<PostResponseModel[]>>('/adminpost', { token: token })
}

const adminGetOne = async (id: string, token?: string) => {
	return await httpGet<ApiResult<PostResponseModel>>(`/adminpost/${id}`, { token: token })
}

const adminCreateOne = async (data: PostRequestModel, token?: string) => {
	return await httpPost<ApiResult<PostResponseModel>>(`/adminpost`, data, { token: token })
}

const adminUpdateOne = async (id: string, data: PostRequestModel, token?: string) => {
	return await httpPut<ApiResult<PostResponseModel>>(`/adminpost/${id}`, data, { token: token })
}

const adminDeleteOne = async (id: string, token?: string) => {
	return await httpDelete<ApiResult<PostResponseModel>>(`/adminpost/${id}`, { token: token })
}

export { adminGetAll, adminGetOne, adminCreateOne, adminUpdateOne, adminDeleteOne }
