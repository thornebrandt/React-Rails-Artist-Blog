import PropTypes from 'prop-types';
import React from 'react';
import Select from 'react-select';

class Tags extends React.Component {
	constructor(props){
		super(props);
	}

	componentDidMount() {
		this.props.populateSavedTags(this.props.saved_tags);
		this.props.populateAvailableTags(this.props.tags);
	}

	render() {
		let post_tags = this.props.post_tags || [];
		const tagList = post_tags.map((tag) => {
			const tag_link = '/tag/' + tag.name;
			return (
				<div key={tag.id} className='tag_container'>
					<a 
						href={tag_link}
						className='tag'
					>
						{tag.name}
					</a>
					<a
						href='#'
						className='icon trash marginRight'
						onClick={(e) => {
							e.preventDefault();
							this.props.removeTag(tag.id);
						}}
					>
					</a>
					<input type='hidden' name="post[tag_ids][]" value={tag.id} multiple />
				</div>
			);
		});

		return (
			<div id='tagsContainer'>
				<div className='col-xs-6'>
					<label>Add Tag</label>
					<Select
						id='tagSelect'
						options={this.props.available_tags}
						onChange={this.props.addTag}
					/>	
				</div>
				<div className='col-xs-6'>
					<label>Edit Tags</label>
					<div className='tags'>
						{tagList}
					</div>
				</div>
			</div>
		);
	}
}

Tags.propTypes = {
	tags: PropTypes.array,
	post_tags: PropTypes.array,
	populateSavedTags: PropTypes.func.isRequired,
	saved_tags: PropTypes.array,
	available_tags: PropTypes.array,
	populateAvailableTags: PropTypes.func.isRequired,
	removeTag: PropTypes.func.isRequired,
	addTag: PropTypes.func.isRequired
};

export default Tags;