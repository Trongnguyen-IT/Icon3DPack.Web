import { CategoryResponseModel } from '@/models/categories/category-response-model'
import { CategoryRequestModel } from '@/models/categories/category-request-model'
import { httpDelete, httpGet, httpPost, httpPut } from '../http-request'
import { ApiResult } from '@/models/api-result'
import { BaseFilter } from '@/models/filter/base-filter'
import { PaginatedList } from '@/models/base-models/paginated-list'

const adminGetAll = async (
	token?: string,
	filter: any = { pageNumber: 1, pageSize: 10 } as BaseFilter
) => {
	return await httpPost<ApiResult<PaginatedList<CategoryResponseModel>>>(
		'/admincategory/categories',
		filter,
		{
			token: token,
		}
	)
}

const adminGetOne = async (id: string, token?: string) => {
	return await httpGet<ApiResult<CategoryResponseModel>>(`/admincategory/${id}`, {
		token: token,
	})
}

const adminCreateOne = async (data: CategoryRequestModel, token?: string) => {
	return await httpPost<ApiResult<CategoryResponseModel>>(`/admincategory`, data, {
		token: token,
	})
}

const adminUpdateOne = async (id: string, data: CategoryRequestModel, token?: string) => {
	return await httpPut<ApiResult<CategoryResponseModel>>(`/admincategory/${id}`, data, {
		token: token,
	})
}

const adminDeleteOne = async (id: string, token?: string) => {
	return await httpDelete<ApiResult<CategoryResponseModel>>(`/admincategory/${id}`, {
		token: token,
	})
}

export { adminGetAll, adminGetOne, adminCreateOne, adminUpdateOne, adminDeleteOne }
