export const adminRoutes = [
	{ path: '/admin', name: 'Dashboard', icon: '/images/icon-dashboard.svg' },
	{ path: '/admin/category', name: 'Category', icon: '/images/icon-product.svg' },
	{ path: '/admin/product', name: 'Product', icon: '/images/icon-product.svg' },
	{ path: '/admin/user', name: 'User', icon: '/images/icon-user.svg' },
	{ path: '/admin/file-extension', name: 'File Extension', icon: '/images/icon-setting.svg' },
	{ path: '/setting', name: 'Setting', icon: '/images/icon-setting.svg' },
]

export const userSettingRoutes = [
	{ url: 'profile', name: 'Profile', icon: '/images/icon-profile.svg' },
	{ url: 'change-password', name: 'Security', icon: '/images/icon-security.svg' },
	{ url: 'notification', name: 'Notifications', icon: '/images/icon-notification.svg' },
	{ url: 'delete-account', name: 'Delete account', icon: '/images/icon-delete.svg' },
]
const privateRoutes = [...adminRoutes, ...userSettingRoutes]
export const authRoutes = ['/login']
export const publicRoutes = ['/about', '/']
