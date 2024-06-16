export default interface ProductModel {
	id: string
	imageUrl?: string
	name: string
	isPublish: boolean
	categoryId: string
	categoryName: string
	slug: string
	downloadCount: number
}
