'use client'

import { Editor } from '@tinymce/tinymce-react'
import { useRef } from 'react'
export default function Dashboard() {
	const editorRef = useRef({} as any)

	const log = () => {
		if (editorRef.current) {
			console.log(editorRef.current.getContent())
		}
	}

	return (
		<main className="container mx-auto py-24">
			<h1 className="mb-12">Dashboard</h1>
			<Editor
				apiKey="oh15m4h9bzjccdj6ctxstu9epu4v4arxgj0844y64w20sxo6"
				onInit={(evt, editor) => (editorRef.current = editor)}
				initialValue="<p>This is the initial content of the editor.</p>"
				init={{
					height: 500,
					menubar: false,
					plugins: [
						'advlist',
						'autolink',
						'lists',
						'link',
						'image',
						'charmap',
						'preview',
						'anchor',
						'searchreplace',
						'visualblocks',
						'code',
						'fullscreen',
						'insertdatetime',
						'media',
						'table',
						'code',
						'help',
						'wordcount',
					],
					toolbar:
						'undo redo | blocks | ' +
						'bold italic forecolor | alignleft aligncenter ' +
						'alignright alignjustify | bullist numlist outdent indent | ' +
						'removeformat | help',
					content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
				}}
			/>
			<button onClick={log}>Log editor content</button>
		</main>
	)
}
