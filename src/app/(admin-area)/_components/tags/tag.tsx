import React from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'

const Tag = ({
	tag,
	removable,
	onRemove,
}: {
	tag: any
	removable: boolean
	onRemove: Function
}) => {
	const handleRemoveClick = () => {
		if (onRemove) {
			onRemove(tag) // Pass the tag text to the onRemove callback
		}
	}

	return (
		<div className="inline-flex justify-between items-center bg-[#D9D9D9] px-4 h-[1.875rem] col-span-1 border border-transparent rounded-3xl font-medium mr-3 mb-2">
			<span className="mr-2">{tag.name}</span>
			{removable && (
				<button className="" onClick={handleRemoveClick}>
					<Image
						src="/images/close-tag.svg"
						alt="close-tag"
						className="object-contain aspect-square"
						width={18}
						height={18}
					></Image>
				</button>
			)}
		</div>
	)
}

Tag.propTypes = {
	tag: PropTypes.any.isRequired,
	removable: PropTypes.bool,
	onRemove: PropTypes.func,
}

export default Tag
