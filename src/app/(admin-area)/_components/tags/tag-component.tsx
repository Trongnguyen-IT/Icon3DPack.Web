import { memo } from 'react'
import Tag from './tag'
import PropTypes from 'prop-types'
import { TagRequestModel } from '@/models/tags/tag-request-model'

const TagComponent = ({
	initialTags,
	onChange,
}: {
	initialTags: TagRequestModel[]
	onChange: (x: any) => void
}) => {
	const handleTagRemove = (tagToRemove: any) => {
		const updatedTags = initialTags.filter((tag) => tag.id !== tagToRemove.id)
		if (onChange) {
			onChange(updatedTags)
		}
	}

	const renderTags = () => {
		return initialTags?.map((tag, index) => (
			<Tag key={index} tag={tag} removable onRemove={handleTagRemove} />
		))
	}

	return (
		<div className="tag-container">
			<div className="tags-list">{renderTags()}</div>
		</div>
	)
}

TagComponent.propTypes = {
	initialTags: PropTypes.array,
	onChange: PropTypes.func,
}

export default memo(TagComponent)
