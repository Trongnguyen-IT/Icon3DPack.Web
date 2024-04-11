import { ApiResult } from '@/models/api-result'
import IBaseService from './IBaseService'
import HttpRequest from './http-request'

class BaseService<TRequest, TResponse> implements IBaseService<TRequest, TResponse> {
	public readonly token?: string
	public readonly serviceUrl: string
	public readonly httpRequest: HttpRequest

	constructor(serviceUrl: string, token?: string) {
		this.serviceUrl = serviceUrl
		this.httpRequest = new HttpRequest()
		this.token = token
	}

	async getAll(params?: any): Promise<ApiResult<TResponse[]>> {
		return await this.httpRequest.get<ApiResult<TResponse[]>>(this.serviceUrl)
	}

	async getOne(id: string): Promise<ApiResult<TResponse>> {
		return await this.httpRequest.get<ApiResult<TResponse>>(`/${this.serviceUrl}/${id}`)
	}

	async createOne(data: TRequest): Promise<ApiResult<TResponse>> {
		return await this.httpRequest.post<ApiResult<TResponse>>(`/${this.serviceUrl}`, data, {
			headers: {
				Authorization: `Bearer ${this.token}`,
			},
		})
	}

	async updateOne(id: string, data: TRequest): Promise<ApiResult<TResponse>> {
		return await this.httpRequest.put<ApiResult<TResponse>>(`/${this.serviceUrl}/${id}`, data, {
			headers: {
				Authorization: `Bearer ${this.token}`,
			},
		})
	}

	async deleteOne(id: string): Promise<ApiResult<TResponse>> {
		return await this.httpRequest.delete<ApiResult<TResponse>>(`/${this.serviceUrl}/${id}`, {
			headers: {
				Authorization: `Bearer ${this.token}`,
			},
		})
	}
}

export { BaseService }
