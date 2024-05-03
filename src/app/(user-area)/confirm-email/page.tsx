import ConfirmEmailForm from './confirm-email-form'

export default function ConfirmEmail({
	searchParams,
}: {
	searchParams: { userId: string; token: string }
}) {
	return <ConfirmEmailForm props={searchParams}></ConfirmEmailForm>
}
