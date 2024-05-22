import { PostRequestModel } from '@/models/posts/post-request-model'
import { PostResponseModel } from '@/models/posts/post-response-model'
import { ApiResult } from '@/models/api-result'
import { httpDelete, httpGet, httpPost, httpPut } from '../http-request'

const getBySlug = async (slug: string) => {
	return await httpGet<ApiResult<PostResponseModel>>(`/post/${slug}`)
}

const getAll = async (token?: string, params?: any) => {
	return await httpGet<ApiResult<PostResponseModel[]>>('/post', { token: token })
}

const getOne = async (id: string, token?: string) => {
	return await httpGet<ApiResult<PostResponseModel>>(`/post/${id}`, { token: token })
}

const createOne = async (data: PostRequestModel, token?: string) => {
	return await httpPost<ApiResult<PostResponseModel>>(`/post`, data, { token: token })
}

const updateOne = async (id: string, data: PostRequestModel, token?: string) => {
	return await httpPut<ApiResult<PostResponseModel>>(`/post/${id}`, data, { token: token })
}

const deleteOne = async (id: string, token?: string) => {
	return await httpDelete<ApiResult<PostResponseModel>>(`/post/${id}`, { token: token })
}

export { getAll, getOne, createOne, updateOne, deleteOne }
