import { connect } from 'react-redux';
import ImageUploader from '../components/ImageUploader';
import * as actions from '../actions/imageUploaderActions';

const mapStateToProps = (state) => (
	{
		src: state.image_uploader.src,
		error: state.image_uploader.error,
		file: state.image_uploader.file,
		files: state.image_uploader.files,
		isLoading: state.image_uploader.isLoading
	}
);

export default connect(mapStateToProps, actions)(ImageUploader);