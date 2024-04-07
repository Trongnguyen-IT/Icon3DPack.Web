import { awsS3Configuration } from '../configs'

const ConvertToCloudfontUrl = (imageUrl?: string) =>
	imageUrl ? `${awsS3Configuration.cloudFront}/${imageUrl}` : '/images/default-picture.svg'
export { ConvertToCloudfontUrl }
