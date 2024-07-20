import { CategoryResponseModel } from '@/models/categories/category-response-model'
import { CategoryRequestModel } from '@/models/categories/category-request-model'
import { httpDelete, httpGet, httpPost, httpPut } from '../http-request'
import { ApiResult } from '@/models/api-result'

const getBySlug = async (slug: string) => {
	return await httpGet<ApiResult<CategoryResponseModel>>(`/category/${slug}`)
}

const getAll = async (token?: string) => {
	return await httpGet<ApiResult<CategoryResponseModel[]>>('/category', {
		token: token,
	})
}

const getOne = async (id: string, token?: string) => {
	return await httpGet<ApiResult<CategoryResponseModel>>(`/category/${id}`, {
		token: token,
	})
}

const createOne = async (data: CategoryRequestModel, token?: string) => {
	return await httpPost<ApiResult<CategoryResponseModel>>(`/category`, data, {
		token: token,
	})
}

const updateOne = async (id: string, data: CategoryRequestModel, token?: string) => {
	return await httpPut<ApiResult<CategoryResponseModel>>(`/category/${id}`, data, {
		token: token,
	})
}

const deleteOne = async (id: string, token?: string) => {
	return await httpDelete<ApiResult<CategoryResponseModel>>(`/category/${id}`, {
		token: token,
	})
}

export { getAll, getOne, createOne, updateOne, deleteOne, getBySlug }
