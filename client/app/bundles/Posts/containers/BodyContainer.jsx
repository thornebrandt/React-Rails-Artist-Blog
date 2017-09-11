// Simple example of a React "smart" component
import { connect } from 'react-redux';
import Body from '../components/Body';
import * as actions from '../actions/bodyActions';
// Which part of the Redux global state does our component want to receive as props?
const mapStateToProps = (state) => (
	{ 
		body_plain: state.post.body_plain,
		body: state.post.body,
		editingBodyHTML: state.post.editingBodyHTML,
		showPreview: state.post.showPreview
	}
);
// Don't forget to actually use connect!
export default connect(mapStateToProps, actions)(Body);
