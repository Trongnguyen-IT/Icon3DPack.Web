import { toast } from 'react-toastify'

export const successNotification = (
	message: any = 'Success!',
	position: any = 'top-right',
	theme: any = 'light'
) => {
	toast.success(message, {
		position: position,
		autoClose: 1500,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: theme,
	})
}
