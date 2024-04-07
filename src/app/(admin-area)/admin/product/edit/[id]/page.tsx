//import { useEffect, useState } from 'react'
import EditProductComponent from './edit'

export default function EditUser({ params }: { params: { id: string } }) {
	const { id } = params
	return <EditProductComponent id={id} />
}

export async function generateStaticParams({ params }: { params: { id: string } }) {
	return [params]
}
