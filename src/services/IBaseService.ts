import { ApiResult } from '@/models/api-result'

export default interface IBaseService<TRequest, TResponse> {
	getAll: (params: any) => Promise<ApiResult<TResponse[]>>

	getOne: (id: string) => Promise<ApiResult<TResponse>>

	createOne: (data: TRequest) => Promise<ApiResult<TResponse>>

	updateOne: (id: string, data: TRequest) => Promise<ApiResult<TResponse>>

	deleteOne: (id: string) => Promise<ApiResult<TResponse>>
}
