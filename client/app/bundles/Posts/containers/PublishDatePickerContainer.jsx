import { connect } from 'react-redux';
import PublishDatePicker from '../components/PublishDatePicker';
import { updatePublishDate } from '../actions/publishDateActions';

const mapStateToProps = (state) => ({
	publish_date: state.post.publish_date
});

export default connect(mapStateToProps, { updatePublishDate })(PublishDatePicker);