import { connect } from 'react-redux';
import Tags from '../components/Tags';
import * as actions from '../actions/tagActions';

const mapStateToProps = (state) => (
	{ 
		tags: state.rails_props.tags,
		saved_tags: state.rails_props.post_tags,
		post_tags: state.post.post_tags,
		available_tags: state.post.available_tags
	}
);

export default connect(mapStateToProps, actions)(Tags);