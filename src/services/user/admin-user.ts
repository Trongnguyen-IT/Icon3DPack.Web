import { PaginatedList } from '@/models/base-models/paginated-list'
import { httpDelete, httpGet, httpPost, httpPut } from '../http-request'
import { BaseFilter } from '@/models/filter/base-filter'
import { ApiResult } from '@/models/api-result'
import { UserRequestModel } from '@/models/users/user-request-model'
import { UserResponseModel } from '@/models/users/user-response-model'

const adminGetAll = async (
	token?: string,
	filter: any = { pageNumber: 1, pageSize: 10 } as BaseFilter
) => {
	return await httpPost<ApiResult<PaginatedList<UserResponseModel>>>('/adminusers/users', filter, {
		token: token,
	})
}

const adminGetOne = async (id: string, token?: string) => {
	return await httpGet<ApiResult<UserResponseModel>>(`/adminusers/${id}`, { token: token })
}

const adminCreateOne = async (data: UserRequestModel, token?: string) => {
	return await httpPost<ApiResult<UserResponseModel>>(`/adminusers`, data, { token: token })
}

const adminUpdateOne = async (id: string, data: UserRequestModel, token?: string) => {
	return await httpPut<ApiResult<UserResponseModel>>(`/adminusers/${id}`, data, { token: token })
}

const adminDeleteOne = async (id: string, token?: string) => {
	return await httpDelete<ApiResult<UserResponseModel>>(`/adminusers/${id}`, { token: token })
}

export { adminGetAll, adminGetOne, adminCreateOne, adminUpdateOne, adminDeleteOne }
