// Simple example of a React "smart" component
import { connect } from 'react-redux';
import PostPreview from '../components/PostPreview';
import * as actions from '../actions/postActions';
// Which part of the Redux global state does our component want to receive as props?
const mapStateToProps = (state) => ({ 
	body: state.post.body,
	title: state.post.title,
	icon: state.post.icon,
	type: state.post.type,
	subtitle: state.post.subtitle,
	summary: state.post.summary,
	publish_date_moment: state.post.publish_date_moment
});
// Don't forget to actually use connect!
export default connect(mapStateToProps, actions)(PostPreview);