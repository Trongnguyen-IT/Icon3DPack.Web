export default interface ApiResult<T> {
	succeeded: boolean
	result: T
	errors: string
}
