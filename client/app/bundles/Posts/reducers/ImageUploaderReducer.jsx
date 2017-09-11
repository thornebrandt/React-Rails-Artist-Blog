const initialImageState = {
	src: '',
	file: null,
	files: []
};
const ImageUploaderReducer = (state = initialImageState, action) => {
	switch (action.type) {
	case 'LOADING':
		return { ...state, isLoading: action.isLoading };
	case 'SHOW_IMAGE_PREVIEW':
		return { ...state, file: action.file, src: action.src };
	case 'SHOW_FILE_SIZE':
		return { ...state, file: action.file };
	case 'UPLOAD_FILE':
		return { ...state, action };
	case 'ADD_FILE':
		return {
			...state,
			files: [...state.files, action.url],
			src: '',
			file: null
		};
	case 'ERROR':
		return {
			...state,
			error: action.error
		};
	default:
		return state;
	}
};

export default ImageUploaderReducer;