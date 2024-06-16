import { ApiResult } from '@/models/api-result'
import { PaginatedList } from '@/models/base-models/paginated-list'
import ProductRequestModel from '@/models/products/product-request-model'
import ProductResponseModel from '@/models/products/product-response-model'
import { httpGet, httpPost, httpPut, httpDelete } from '../http-request'
import { BaseFilter } from '@/models/filter/base-filter'

const adminGetAll = async (
	token?: string,
	filter: any = { pageNumber: 1, pageSize: 10 } as BaseFilter
) => {
	return await httpPost<ApiResult<PaginatedList<ProductResponseModel>>>(
		'/adminproduct/products',
		filter,
		{
			token: token,
		}
	)
}

const adminGetOne = async (id: string, token?: string) => {
	return await httpGet<ApiResult<ProductResponseModel>>(`/adminproduct/${id}`, { token: token })
}

const adminCreateOne = async (data: ProductRequestModel, token?: string) => {
	return await httpPost<ApiResult<ProductResponseModel>>(`/adminproduct`, data, { token: token })
}

const adminUpdateOne = async (id: string, data: ProductRequestModel, token?: string) => {
	return await httpPut<ApiResult<ProductResponseModel>>(`/adminproduct/${id}`, data, {
		token: token,
	})
}

const adminDeleteOne = async (id: string, token?: string) => {
	return await httpDelete<ApiResult<ProductResponseModel>>(`/adminproduct/${id}`, {
		token: token,
	})
}

export { adminGetAll, adminGetOne, adminCreateOne, adminUpdateOne, adminDeleteOne }
