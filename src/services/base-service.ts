import { ApiResult } from '@/models/api-result'
import http from './http-request'
import IBaseService from './IBaseService'

class BaseService<TRequest, TResponse> implements IBaseService<TRequest, TResponse> {
	public readonly serviceUrl: string

	constructor(serviceUrl: string) {
		this.serviceUrl = serviceUrl
	}

	async getAll(params?: any): Promise<{ status: number; payload: ApiResult<Array<TResponse>> }> {
		return await http.get<ApiResult<Array<TResponse>>>(this.serviceUrl, { cache: 'no-store' })
	}

	async getOne(params: string): Promise<{ status: number; payload: ApiResult<TResponse> }> {
		return await http.get<ApiResult<TResponse>>(`/${this.serviceUrl}/${params}`, {
			cache: 'no-store',
		})
	}

	async createOne(data: TRequest): Promise<{ status: number; payload: ApiResult<TResponse> }> {
		return await http.post<ApiResult<TResponse>>(`/${this.serviceUrl}`, data)
	}

	async updateOne(
		id: string,
		data: TRequest
	): Promise<{ status: number; payload: ApiResult<TResponse> }> {
		return await http.put<ApiResult<TResponse>>(`/${this.serviceUrl}/${id}`, data)
	}

	async deleteOne(id: string): Promise<{ status: number; payload: ApiResult<TResponse> }> {
		return await http.delete<ApiResult<TResponse>>(`/${this.serviceUrl}/${id}`)
	}
}

export { BaseService }
