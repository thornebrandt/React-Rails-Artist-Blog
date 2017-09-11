/* eslint-disable import/prefer-default-export */
// export const showPreview = (src) => ({
// 	type: 'SHOW_PREVIEW',
// 	src: src
// });


export const showImagePreview = (src, file) => {
	return ({
		type: 'SHOW_IMAGE_PREVIEW',
		src,
		file
	});
};

export const showFileSize = (file) => {
	return ({
		type: 'SHOW_FILE_SIZE',
		file
	});
};

export const loading = (isLoading) => {
	return ({
		type: 'LOADING',
		isLoading
	});
};

export const invalidFile = () => {
	return ({
		type: 'INVALID_FILE',
		valid: false
	});
};

export const throwError = (error) => {
	return ({
		type: 'ERROR',
		error: error
	});	
};


export const addFile = (json) => ({
	type: 'ADD_FILE',
	url: json.url
});

export const thunkTest = () => (dispatch) => {
	return dispatch(invalidFile());
};

export const chooseFile = (target) => dispatch => {
	let file, reader;	
	dispatch(loading(true));
	if(target.files.length){
		file = target.files[target.files.length - 1];
		if(file.type.match(/image.*/)){
			if(window.FileReader) {
				reader = new FileReader();
				reader.addEventListener('load', (e) => {
					dispatch(loading(false));
					return dispatch(showImagePreview(e.target.result, file));
				});
			}
		} else {
			dispatch(loading(false));
			return dispatch(showFileSize(file));
		}
		reader.readAsDataURL(file);
	} else {
		dispatch(loading(false));
		return dispatch(invalidFile);
	}
};

const fetchImage = (fd) => {
	return fetch('/uploader/image', {
		method: 'post',
		body: fd
	});
};

const fetchVideo = (fd) => {
	return fetch('/uploader/video', {
		method: 'post',
		body: fd
	});
};

export const uploadFile = (e, file) => dispatch => {
	e.preventDefault();
	let fetchFile;
	let fd = new FormData();
	if(file.type.match(/image.*/)){
		fetchFile = fetchImage;
		fd.append('image', file);
	} else if(file.type.match(/video.*/)) {
		fetchFile = fetchVideo;
		fd.append('video', file);
	} else {
		return dispatch(throwError('Didn\'t recognize that file type: ' + file.type));
	}
	dispatch(loading(true));
	return fetchFile(fd)
		.then(response => response.json())
		.then((json) => {
			dispatch(loading(false));
			return dispatch(addFile(json));
		})
		.catch((e) => { 
			dispatch(loading(false));
			const errorString = 'There was a problem with uploading the file\n' + e;
			return dispatch(throwError(errorString));
		});
};