import moment from 'moment';
const PostReducer = (state = {
	publish_date_moment: moment(),
	post_type: 'blog',
	title: 'Blog Post'
}, action) => {
	switch (action.type) {
	case 'EDIT_BODY_HTML':
		return {
			...state,
			editingBodyHTML: action.editing
		};
	case 'UPDATE_BODY_PLAIN':
		return {
			...state,
			body_plain: action.body_plain,
			body: action.body
		};
	case 'UPDATE_BODY' :
		return {
			...state,
			body_plain: action.body_plain,
			body: action.body
		};
	case 'UPDATE_PORTFOLIO_ID' :
		return {
			...state,
			portfolio_id: action.id
		};
	case 'UPDATE_TITLE' :
		return {
			...state,
			title: action.text
		};
	case 'UPDATE_ICON' :
		return {
			...state,
			icon: action.text
		};
	case 'UPDATE_TYPE' :
		return {
			...state,
			post_type: action.text
		};
	case 'UPDATE_SUBTITLE' :
		return {
			...state,
			subtitle: action.text
		};
	case 'UPDATE_SUMMARY' :
		return {
			...state,
			summary: action.text
		};
	case 'UPDATE_PUBLISH_DATE':
		return {
			...state,
			publish_date: action.text
		};
	case 'UPDATE_PUBLISH_DATE_MOMENT' :
		return {
			...state,
			publish_date_moment: action.moment,
			publish_date: action.formatted
		};
	case 'UPDATE_PUBLISHED' :
		return {
			...state,
			published: action.published
		};
	case 'TOGGLE_PREVIEW' :
		return {
			...state,
			showPreview: action.showPreview
		};
	case 'UPDATE_URL' :
		return {
			...state,
			url: action.text
		};
	case 'UPDATE_BOGUS' :
		return {
			...state,
			bogus: action.text
		};
	case 'POPULATE_SAVED_POST' :
		
		return {
			...state,
			...action.saved_post,
			editingBodyHTML: false
		};
	case 'POPULATE_SAVED_TAGS' :
		return {
			...state,
			post_tags: action.tags,
		};
	case 'POPULATE_AVAILABLE_TAGS':
		return {
			...state,
			available_tags: action.tags.filter((tag) => {
				let unique = true;
				if (state.post_tags) {
					state.post_tags.forEach((post_tag) => {
						if(post_tag.id == tag.id){
							unique = false;
							return;
						}
					});
				}
				return unique;
			})
		};
	case 'ADD_TAG' :
		const post_tags = state.post_tags || [];
		return {
			...state,
			post_tags: [
				...post_tags,
				action.tag
			],
			available_tags: state.available_tags.filter((tag) => {
				return tag.id !== action.tag.id;
			})
		};
	case 'REMOVE_TAG' :
		return {
			...state,
			post_tags: state.post_tags.filter((tag) => { 
				return tag.id !== action.id;
			}),
			available_tags: [
				...state.available_tags,
				...state.post_tags.filter((tag) => {
					return tag.id === action.id;
				})
			]
		};
	default:
		return state;
	}
};

export default PostReducer;