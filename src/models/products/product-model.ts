export default interface ProductModel {
	id: string
	imageUrl?: string
	name: string
	description: string
	isShow: boolean
	showTypes?: Array<string>
	categoryId: string
}
