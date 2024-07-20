'use client'

import SaveButton from '@/app/_components/save-button'
import { apiStatus } from '@/configs'
import { httpPost } from '@/services/http-request'
import { useState } from 'react'

export default function SubmitContact() {
	const [model, setModel] = useState({ contactName: '', contactEmail: '', description: '' })
	const [isLoading, setIsLoading] = useState(false)

	const handleSubmit = async (): Promise<void> => {
		setIsLoading(true)

		const { status } = await httpPost('/contact', model)
		setIsLoading(false)
	}

	return (
		<div className="grid grid-cols-4 gap-4">
			<input
				className="col-start-2 col-span-2 border rounded-lg py-3 px-2 border-[#E7E7E7] outline-none"
				type="text"
				placeholder="Your name"
				onChange={(e) => setModel((prev) => ({ ...prev, contactName: e.target.value }))}
			/>
			<input
				className="col-start-2 col-span-2 border rounded-lg py-3 px-2 border-[#E7E7E7] outline-none"
				type="text"
				placeholder="Email"
				onChange={(e) => setModel((prev) => ({ ...prev, contactEmail: e.target.value }))}
			/>
			<textarea
				className="col-start-2 col-span-2 border rounded-lg py-3 px-2 border-[#E7E7E7] outline-none"
				placeholder="Tell us all the things"
				rows={5}
				onChange={(e) => setModel((prev) => ({ ...prev, description: e.target.value }))}
			/>
			<SaveButton
				classOptions="col-start-2 col-span-2"
				title="Submit"
				isLoading={isLoading}
				onHandleClick={handleSubmit}
			/>
		</div>
	)
}
