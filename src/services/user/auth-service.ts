import { ApiResult } from '@/models/api-result'
import { UserResponseModel } from '@/models/users/user-response-model'
import { VeriryEmail } from '@/models/users/verify-email'
import { httpDelete, httpGet, httpPost, httpPut } from '../http-request'
import { LoginModel } from '@/models/users/login-model'
import { RegisterModel } from '@/models/users/register-model'
import { UserRequestModel } from '@/models/users/user-request-model'
import LoginResponseModel from '@/models/users/login-response'
import { ChangePasswordModel } from '@/models/users/change-password'

const login = async (data: LoginModel) => {
	return await httpPost<ApiResult<LoginResponseModel>>('/users/authenticate', data)
}

const register = async (data: RegisterModel) => {
	return await httpPost<ApiResult<UserResponseModel>>(`/users/register`, data)
}

const profile = async (token?: string) => {
	return await httpGet<ApiResult<UserResponseModel>>('/users/profile', { token: token })
}

const updateProfile = async (data: UserRequestModel, token?: string) => {
	return await httpPut<ApiResult<UserResponseModel>>(`/users/update-profile`, data, {
		token: token,
	})
}

const changePassword = async (id: string, data: ChangePasswordModel, token?: string) => {
	return await httpPut<ApiResult<UserResponseModel>>(`/users/${id}/change-password`, data, {
		token: token,
	})
}

const confirmEmail = async (data: VeriryEmail) => {
	return await httpPost<ApiResult<any>>(`/users/confirm-email`, data)
}

//set cookie on next server
const auth = async (data: any) => {
	return httpPost<any>(`/api/auth`, data, { baseURL: '/' })
}

//remove cookie on next server
const logout = async (force: boolean) => {
	return await httpPost<any>(
		`/api/auth/logout`,
		{ force },
		{
			baseURL: '/',
		}
	)
}

const updateNotification = async (id: string, isNotification: boolean, token?: string) => {
	return await httpPut<ApiResult<any>>(`/users/${id}/update-notification/${isNotification}`, {
		token: token,
	})
}

const deleteAccount = async (id: string, token?: string) => {
	return await httpDelete<ApiResult<any>>(`/users/${id}/delete-account`, { token: token })
}

export {
	login,
	register,
	profile,
	updateProfile,
	changePassword,
	confirmEmail,
	auth,
	logout,
	updateNotification,
	deleteAccount,
}
