import ConfirmEmailForm from './confirm-email-form'

export default function ConfirmEmail({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined }
}) {
	return <ConfirmEmailForm props={searchParams}></ConfirmEmailForm>
}
