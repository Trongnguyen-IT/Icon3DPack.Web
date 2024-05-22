import { ApiResult } from '@/models/api-result'
import { PaginatedList } from '@/models/base-models/paginated-list'
import ProductRequestModel from '@/models/products/product-request-model'
import ProductResponseModel from '@/models/products/product-response-model'
import { httpGet, httpPost, httpPut, httpDelete } from '../http-request'

const getAll = async (token?: string, params?: any) => {
	return await httpGet<ApiResult<PaginatedList<ProductResponseModel>>>('/product', {
		token: token,
	})
}

const getOne = async (id: string, token?: string) => {
	return await httpGet<ApiResult<ProductResponseModel>>(`/product/${id}`, {
		token: token,
	})
}

const createOne = async (data: ProductRequestModel, token?: string) => {
	return await httpPost<ApiResult<ProductResponseModel>>(`/product`, data, { token: token })
}

const updateOne = async (id: string, data: ProductRequestModel, token?: string) => {
	return await httpPut<ApiResult<ProductResponseModel>>(`/product/${id}`, data, {
		token: token,
	})
}

const deleteOne = async (id: string, token?: string) => {
	return await httpDelete<ApiResult<ProductResponseModel>>(`/product/${id}`, {
		token: token,
	})
}

const productFilter = async (filterObject: any, token?: string) => {
	// const queryString = Object.keys(queryObject)
	// 	.map((k) => {
	// 		return `${k}=${queryObject[k]}`
	// 	})
	// 	.join('&')

	return await httpPost<ApiResult<PaginatedList<ProductResponseModel>>>(
		`product/product-filter`,
		filterObject,
		{ token: token }
	)
}

const downloadFile = async ({
	productId,
	bucketName,
	key,
	token,
}: {
	productId: string
	bucketName: string
	key: string
	token?: string
}) => {
	return await httpPost(
		`/product/${productId}/download-file`,
		{ bucketName, key },
		{
			responseType: 'blob', // Important for binary data
			token: token,
		}
	)
}

export { getAll, getOne, createOne, updateOne, deleteOne, productFilter, downloadFile }
