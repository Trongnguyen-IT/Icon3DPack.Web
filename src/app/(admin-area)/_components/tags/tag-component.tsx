import Tag from './tag'
import PropTypes from 'prop-types'

const TagComponent = ({ props }: { props: { initialTags: any[]; onChange: Function } }) => {
	const { initialTags, onChange } = props

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

	// const addTag = () => {
	//     if (newTag) {
	//         const updatedTags = [...initialTags, newTag];
	//         if (onChange) {
	//           onChange(updatedTags);
	//         }
	//       }
	// }

	return (
		<div className="tag-container">
			<div className="tags-list">{renderTags()}</div>
			{/* <button onClick={addTag}>Add Tag</button> */}
		</div>
	)
}

TagComponent.propTypes = {
	initialTags: PropTypes.array,
	onChange: PropTypes.func,
}
export default TagComponent
