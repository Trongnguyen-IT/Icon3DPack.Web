import ApiResult from '@/models/api-result'
import { AxiosResponse } from 'axios'
import api from '../http-request'
import ProductResponseModel from '@/models/products/product-response-model'

const getAll = async (
	params: any
): Promise<AxiosResponse<ApiResult<Array<ProductResponseModel>>>> => {
	return await api.get(`/adminproduct`)
}

const getOne = async (params: string): Promise<AxiosResponse<ApiResult<ProductResponseModel>>> => {
	return await api.get(`/adminproduct/${params}`)
}

const createOne = async (
	data: ProductResponseModel
): Promise<AxiosResponse<ApiResult<ProductResponseModel>>> => {
	return await api.post(`/adminproduct`, data)
}

const updateOne = async (
	id: string,
	data: ProductResponseModel
): Promise<AxiosResponse<ApiResult<ProductResponseModel>>> => {
	return await api.put(`/adminproduct/${id}`, data)
}

const deleteOne = async (id: string): Promise<AxiosResponse<ApiResult<ProductResponseModel>>> => {
	return await api.delete(`/adminproduct/${id}`)
}

export { getAll, getOne, createOne, updateOne, deleteOne }
