export type PaginatedList<T> = {
	items: T[]
	pageIndex: number
	totalPages: number
	hasNextPage: boolean
	hasPreviousPage: boolean
}
