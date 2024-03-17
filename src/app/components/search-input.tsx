import Image from 'next/image'

export default function SearchInput() {
	return (
		<div className="ab lb adu bbn flex h-full rounded-lg border border-[#E7E7E7] justify-between overflow-hidden">
			<input
				type="text"
				name="account-number"
				id="account-number"
				className="lu tn adu afa arq atw axv bbt bbx bcf bgd bne bnf bnr cid cif w-11/12 h-full pl-4 outline-none"
				placeholder="Search for an 3d icon..."
			/>

			<div className="u aa as de lx yz auc aspect-[1/1] relative m-2">
				<button>
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
