// Simple example of a React "smart" component
import { connect } from 'react-redux';
import PostForm from '../components/PostForm';
import * as actions from '../actions/postActions';
// Which part of the Redux global state does our component want to receive as props?
const mapStateToProps = (state) => (
	{ 
		title: state.post.title,
		icon: state.post.icon,
		subtitle: state.post.subtitle,
		post_type: state.post.post_type,
		portfolios: state.rails_props.portfolios,
		bogus: state.post.bogus,
		body: state.post.body,
		bodyHTML: state.post.bodyHTML,
		saved_post: state.rails_props.post,
		portfolio_id: state.post.portfolio_id,
		summary: state.post.summary,
		url: state.post.url,
		published: state.post.published,
		publish_date: state.post.publish_date,
		publish_date_moment: state.post.publish_date_moment,
		showPreview: state.post.showPreview
	}
);
// Don't forget to actually use connect!
export default connect(mapStateToProps, actions)(PostForm);
