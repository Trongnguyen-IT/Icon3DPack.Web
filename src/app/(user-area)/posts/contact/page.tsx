import SubmitContact from './_components/submit-contact'

export default function Contact() {
	return (
		<div>
			<h1 className="text-3xl font-bold capitalize mb-5">Contact</h1>
			<div className="flex justify-center mb-12">
				<div className="basis-4/5">
					<p className="mb-5 text-lg font-bold text-center">Leave us a message</p>
					<p className="text-center">
						Feel free to ask us any questions including regarding pricing plans, licenses options or
						products itself. If you looking for custom design please use this contact form.
					</p>
				</div>
			</div>
			<SubmitContact />
		</div>
	)
}
