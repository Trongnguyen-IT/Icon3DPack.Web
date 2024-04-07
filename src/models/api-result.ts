interface ApiResult<T = any> {
	succeeded: boolean
	result: T
	errors: string
}

export type { ApiResult }
