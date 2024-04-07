import { ApiResult } from '@/models/api-result'

export default interface IBaseService<TRequest, TResponse> {
	getAll: (params: any) => Promise<{ status: number; payload: ApiResult<Array<TResponse>> }>

	getOne: (params: string) => Promise<{ status: number; payload: ApiResult<TResponse> }>

	createOne: (data: TRequest) => Promise<{ status: number; payload: ApiResult<TResponse> }>

	updateOne: (
		id: string,
		data: TRequest
	) => Promise<{ status: number; payload: ApiResult<TResponse> }>

	deleteOne: (id: string) => Promise<{ status: number; payload: ApiResult<TResponse> }>
}
