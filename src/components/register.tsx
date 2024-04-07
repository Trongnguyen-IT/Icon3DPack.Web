'use client'

import Image from 'next/image'
import { ChangeEvent, Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { showLoginHandlerDispatch } from './login'
import RegisterModel from '../models/users/register-model'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const showSignupHandlerDispatch = () => {
	document.dispatchEvent(new CustomEvent('showSignup'))
}

export const hideSignupHandlerDispatch = () => {
	document.dispatchEvent(new CustomEvent('hideSignup'))
}

export default function Register() {
	let [isOpen, setIsOpen] = useState(false)
	let [registerModel, setRegisterModel] = useState({} as RegisterModel)

	const showSignupHandler = () => setIsOpen(true)
	const hideSignupHandler = () => setIsOpen(false)

	const showLogin = () => {
		setIsOpen(false)
		showLoginHandlerDispatch()
	}

	const submit = async () => {
		const result = await registerApi(registerModel)
		result.data.result && notify()
	}

	const notify = () =>
		toast.success('Update success!', {
			position: 'top-right',
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'light',
		})

	useEffect(() => {
		document.addEventListener('showSignup', showSignupHandler)
		document.addEventListener('hideSignup', hideSignupHandler)

		return () => {
			document.removeEventListener('showSignup', showSignupHandler)
			document.removeEventListener('hideSignup', hideSignupHandler)
		}
	}, [])
	return (
		<>
			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={hideSignupHandler}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-[black/25]" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="w-full max-w-[39.875rem] h-[30.875rem] transform overflow-hidden rounded-2xl pb-6 bg-white text-left align-middle shadow-xl transition-all">
									<div>
										<div className="border-b border-[#E7E7E7]">
											<div className="flex flex-row justify-between items-center py-6 px-12">
												<h3 className="text-xl font-bold">Sign up</h3>
												<button
													className="w-[1.090625rem] aspect-[1/1] relative"
													onClick={hideSignupHandler}
												>
													<Image
														fill
														src="/images/close.svg"
														style={{ objectFit: 'contain' }}
														alt="search-icon"
														className=""
													/>
												</button>
											</div>
										</div>
										<div className="py-6 px-12">
											<p className="text-[#1B1B1B] mb-7">
												Sign up or{' '}
												<button
													onClick={() => showLogin()}
													className="text-[#46B8E9] font-bold outline-none"
												>
													Login
												</button>{' '}
												to an existing your account.
											</p>
											<div className="relative mb-5">
												<div className="absolute top-1/2 -translate-y-1/2 left-4 max-h-[15.53px]">
													<span className="w-[19.41px] h-[15.53px] relative inline-flex opacity-50">
														<Image
															fill
															src="/images/icon-profile.svg"
															style={{ objectFit: 'contain' }}
															alt="icon-profile"
															className=""
														/>
													</span>
												</div>
												<input
													onChange={(e: ChangeEvent<HTMLInputElement>) =>
														setRegisterModel((prev: RegisterModel) => ({
															...prev,
															fullName: e.target.value,
														}))
													}
													type="text"
													placeholder="Full name..."
													className="w-full border rounded-lg py-3 px-2 pl-12 border-[#E7E7E7] outline-none"
												/>
											</div>
											<div className="relative mb-5">
												<div className="absolute top-1/2 -translate-y-1/2 left-4 max-h-5">
													<span className="w-[19.41px] h-[15.53px] relative inline-flex opacity-70">
														<Image
															fill
															src="/images/icon-email.svg"
															style={{ objectFit: 'contain' }}
															alt="email-icon"
															className=""
														/>
													</span>
												</div>
												<input
													onChange={(e: ChangeEvent<HTMLInputElement>) =>
														setRegisterModel((prev: RegisterModel) => ({
															...prev,
															email: e.target.value,
														}))
													}
													type="email"
													placeholder="Enter your email address..."
													className="w-full border rounded-lg py-3 px-2 pl-12 border-[#E7E7E7] outline-none"
												/>
											</div>
											<div className="relative">
												<div className="absolute top-1/2 -translate-y-1/2 left-4 max-h-[20px]">
													<span className="w-[21px] h-[20px] relative inline-flex opacity-50">
														<Image
															fill
															src="/images/icon-key.svg"
															style={{ objectFit: 'contain' }}
															alt="icon-key"
															className=""
														/>
													</span>
												</div>
												<input
													onChange={(e: ChangeEvent<HTMLInputElement>) =>
														setRegisterModel((prev: RegisterModel) => ({
															...prev,
															password: e.target.value,
														}))
													}
													type="password"
													placeholder=" Enter your password..."
													className="w-full border rounded-lg py-3 px-2 pl-12 border-[#E7E7E7] outline-none"
												/>
												<div className="absolute top-1/2 -translate-y-1/2 right-4 max-h-[15.53px]">
													<span className="w-[19.41px] h-[15.53px] relative inline-flex">
														<Image
															fill
															src="/images/show-password.svg"
															style={{ objectFit: 'contain' }}
															alt="show-password"
															className=""
														/>
													</span>
												</div>
											</div>
										</div>
										<div className="flex flex-row justify-between pb-5 pt-3 px-12">
											<button
												onClick={() => submit()}
												className="bg-[#46B8E9] hover:bg-[#0F9CD9] font-bold px-7 py-3 text-white rounded-lg transition-all"
											>
												Sign up
											</button>
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
			<ToastContainer containerId={'registerId'} />
		</>
	)
}
