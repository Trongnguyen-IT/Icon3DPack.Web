/** @type {import('next').NextConfig} */
const nextConfig = {
	// ...
	images: {
		domains: [
			'd389mmcpzcvxw0.cloudfront.net',
			'icon3dpack-bucket-s3.s3.ap-southeast-1.amazonaws.com',
		],
		formats: ['image/avif', 'image/webp'],
	},
}

module.exports = nextConfig
