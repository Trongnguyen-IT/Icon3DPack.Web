'use client'

import Image from 'next/image'
import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { showSignupHandlerDispatch } from './register'
import httpRequest from '@/services/http-request'
import { AuthService } from '@/services/user/auth-service'
import { LoginModel } from '@/models/users/login-model'
import { useRouter } from 'next/navigation'

export const showLoginHandlerDispatch = () => {
	document.dispatchEvent(new CustomEvent('showLogin'))
}

export const hideLoginHandlerDispatch = () => {
	document.dispatchEvent(new CustomEvent('hideLogin'))
}

export default function Login() {
	const authService = new AuthService('users')
	const router = useRouter()

	let [isOpen, setIsOpen] = useState(false)
	let [email, setEmail] = useState('')
	let [password, setPassword] = useState('')
	const showLoginHandler = () => setIsOpen(true)
	const hideLoginHandler = () => setIsOpen(false)

	const showSignup = () => {
		setIsOpen(false)
		showSignupHandlerDispatch()
	}

	const submit = async () => {
		const data = {
			email: email,
			password,
		} as LoginModel

		const { result } = await authService.login(data)
		await authService.auth(result)
		hideLoginHandler()
		router.refresh()
	}

	useEffect(() => {
		document.addEventListener('showLogin', showLoginHandler)
		document.addEventListener('hideLogin', hideLoginHandler)

		return () => {
			document.removeEventListener('showLogin', showLoginHandler)
			document.removeEventListener('hideLogin', hideLoginHandler)
		}
	}, [])

	return (
		<>
			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={hideLoginHandler}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black/25" />
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
								<Dialog.Panel className="w-full max-w-[39.875rem] h-[26.5rem] transform overflow-hidden rounded-2xl pb-6 bg-white text-left align-middle shadow-xl transition-all">
									<div>
										<div className="border-b border-[#E7E7E7]">
											<div className="flex flex-row justify-between items-center py-6 px-12">
												<h3 className="text-xl font-bold">Log in</h3>
												<button
													className="w-[1.090625rem] aspect-[1/1] relative"
													onClick={hideLoginHandler}
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
												Log in or{' '}
												<button
													onClick={() => showSignup()}
													className="text-[#46B8E9] font-bold outline-none"
												>
													Sign up
												</button>{' '}
												if you don&apos;t have an account.
											</p>
											<div className="relative mb-5">
												<div className="absolute top-1/2 -translate-y-1/2 left-4 max-h-[15.53px]">
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
													onChange={(e) => setEmail(e.target.value)}
													type="email"
													placeholder="Enter your email address..."
													className="w-full border rounded-lg py-3 px-2 pl-12 border-[#E7E7E7] outline-none"
												/>
											</div>
											<div className="relative">
												<div className="absolute top-1/2 -translate-y-1/2 left-4 max-h-5">
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
													onChange={(e) => setPassword(e.target.value)}
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
												className="w-[7.5rem] h-[3.125rem] bg-[#46B8E9] hover:bg-[#0F9CD9] font-bold text-white rounded-lg transition-all"
											>
												Log in
											</button>
											<button className="underline opacity-60">Lost your password?</button>
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	)
}
