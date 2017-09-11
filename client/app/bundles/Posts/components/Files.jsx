import PropTypes from 'prop-types';
import {isImage} from '../helpers';
import React from 'react';

const Files = ({ files }) => (
	<div className='filesContainer'>
		<label>Successfully Uploaded Files</label>
		<ul id="uploaded-files">
			{files.map((file, i) => {
				let imageFile;
				if(isImage(file)){
					imageFile = (<img src={file} />);
				}
				return (<li key={i} >
					<span className="fileSrc smaller">{file}</span>
					{imageFile}
				</li>);
			})}
		</ul>
	</div>
);

Files.propTypes = {
	files: PropTypes.array
};

export default Files;