'use client'

import CategoryModel from '@/models/categories/category-model'

function AddOrEditUser({ props }: { props?: CategoryModel }) {
	const user = props
	const isAddMode = !user

	// form validation rules
	// const validationSchema = Yup.object().shape({
	//     firstName: Yup.string()
	//         .required('First Name is required'),
	//     lastName: Yup.string()
	//         .required('Last Name is required'),
	//     username: Yup.string()
	//         .required('Username is required'),
	//     password: Yup.string()
	//         .transform(x => x === '' ? undefined : x)
	//         .concat(isAddMode ? Yup.string().required('Password is required') : null)
	//         .min(6, 'Password must be at least 6 characters')
	// });
	// const formOptions = { resolver: yupResolver(validationSchema) };

	// set default form values if in edit mode
	if (!isAddMode) {
		//formOptions.defaultValues = props.user;
	}

	// get functions to build form with useForm() hook
	//const { register, handleSubmit, reset, formState } = useForm(formOptions);
	//const { errors } = formState

	function onSubmit(data: any) {
		return isAddMode ? createUser(data) : updateUser(user.id, data)
	}

	function createUser(data: any) {
		// return userService.register(data)
		//     .then(() => {
		//         //alertService.success('User added', { keepAfterRouteChange: true });
		//         router.push('.');
		//     })
		//     .catch(alertService.error);
	}

	function updateUser(id: string, data: any) {
		// return userService.update(id, data)
		//     .then(() => {
		//         alertService.success('User updated', { keepAfterRouteChange: true });
		//         router.push('..');
		//     })
		//     .catch(alertService.error);
	}

	return <div>Add or edit</div>
}

export { AddOrEditUser }
