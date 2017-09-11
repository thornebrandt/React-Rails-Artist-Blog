import PropTypes from 'prop-types';
import React from 'react';
import Files from './Files';
import { getFileSize } from '../helpers';


const ImageUploader = ({
	chooseFile,
	uploadFile,
	error,
	file,
	isLoading,
	files,
	src
}) => {

	let filePreview, confirmImageBtn, filesContainer, inputContainer;
	let errorEl;

	if(src){
		filePreview = (
			<img id="image-preview" src={src} />
		);
	} else {
		if(file){
			filePreview = (
				<span className='fileSize'>This file is: {getFileSize(file)}</span>
			);
		}
	}

	if(file){
		confirmImageBtn = (
			<button
				className="btn"
				id="confirm_image"
				onClick={(e) => uploadFile(e, file)}
			>
				Upload File
			</button>
		);
	}

	if(files && files.length > 0){
		filesContainer = (
			<Files files={files}/>
		);
	}

	if(isLoading){
		inputContainer = (
			<div className='loading' />
		);
	} else {
		inputContainer = (
			<div>
				<label htmlFor="uploader">Upload Image</label>
				<input
					type="file"
					id="upload_image"
					name="upload_image"
					onChange={(e) => chooseFile(e.target) }
				/>
			</div>
		);
	}

	if(error){
		errorEl = <p className='error col-sm-12'>{error}</p>;
	}

	return (
		<div className="col-sm-12" id="uploader-container" >
			{errorEl}
			{inputContainer}
			<div id="file-preview-container">
				{filePreview}
			</div>
			{confirmImageBtn}
			{filesContainer}
		</div>
	);	
};
ImageUploader.propTypes = {
	error: PropTypes.string,
	src: PropTypes.string.isRequired,
	showImagePreview: PropTypes.func.isRequired,
	chooseFile: PropTypes.func.isRequired,
	uploadFile: PropTypes.func.isRequired,
	isLoading: PropTypes.bool,
	file: PropTypes.object,
	files: PropTypes.array
};

export default ImageUploader;