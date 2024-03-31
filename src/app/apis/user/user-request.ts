import { AxiosResponse } from 'axios'
import api from '../api'
import ProfileModel from '@/app/models/users/profile-model'
import LoginResponseModel from '@/app/models/users/login-response'
import ApiResult from '@/app/models/api-result'
import BaseResponseModel from '@/app/models/base-response-model'
import ProfileUpdateModel from '@/app/models/users/profile-update-model'
import RegisterModel from '@/app/models/users/register-model'

async function getProfileApi(): Promise<AxiosResponse<ApiResult<ProfileModel>>> {
	return await api.get('/users/profile')
}

async function loginApi(data: any): Promise<AxiosResponse<ApiResult<LoginResponseModel>>> {
	return await api.post('/users/authenticate', data)
}

async function registerApi(
	data: RegisterModel
): Promise<AxiosResponse<ApiResult<BaseResponseModel>>> {
	return await api.post('/users/register', data)
}

async function updateProfileApi(
	data: ProfileUpdateModel
): Promise<AxiosResponse<ApiResult<BaseResponseModel>>> {
	return await api.post('/users/update-profile', data)
}

export { getProfileApi, loginApi, registerApi, updateProfileApi }
