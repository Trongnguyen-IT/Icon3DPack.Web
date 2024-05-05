import Image from 'next/image'
import { useState } from 'react'

export default function SearchInput({
	onChangeKeyword,
}: {
	onChangeKeyword: (val: string) => void
}) {
	const [keyword, setKeyword] = useState('')

	const handleSearch = (val: string) => {
		setKeyword(val)
		//onChangeKeyword(val)
	}

	return (
		<div className="flex justify-between relative">
			<input
				onChange={(e) => handleSearch(e.target.value)}
				value={keyword}
				type="text"
				name="account-number"
				id="account-number"
				className="h-[3.125rem] w-full py-3 pl-4 border border-[#E7E7E7] rounded-lg outline-none overflow-hidden"
				placeholder="Search for an 3d icon..."
			/>
			<div className="absolute top-1/2 -translate-y-1/2 right-2">
				<button className="relative aspect-[1/1] " onClick={() => onChangeKeyword(keyword)}>
					<Image
						src={'../../images/search-icon.svg'}
						style={{ objectFit: 'contain' }}
						alt="search-icon"
						width={16}
						height={16}
					/>
				</button>
			</div>
		</div>
	)
}
