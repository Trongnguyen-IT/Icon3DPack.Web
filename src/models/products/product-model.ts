export default interface ProductModel {
	id: string
	imageUrl: string
	name: string
	description: string
	isShow: boolean
	showType: Array<string>
	categoryId: string
}
