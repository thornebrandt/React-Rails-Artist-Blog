import PropTypes from 'prop-types';
import React from 'react';

const Body = ({ 
	body_plain,
	body,
	editingBodyHTML,
	editBodyHTML,
	cancelBodyHTML,
	updateBodyPlain,
	updateBody,
	togglePreview,
	showPreview
}) => {

	let bodyInput, bodyHTMLInput;
	let previewButtonText = showPreview ? 'Hide Preview' : 'Show Preview';
	let previewButtonClass = showPreview ? 'tab green' : 'tab blue';

	if (editingBodyHTML) {
		bodyHTMLInput = (
			<div>
				<div className="col-sm-12">
					<label htmlFor="post_body">Body HTML</label>
					<textarea
						id="post_body"
						className="pink"
						name="post[body]"
						value={ body || '' }
						onChange={(e) => updateBody(e.target.value)}
					/> 
				</div>
				<div className="col-sm-12">
					<a href="#" id="cancelHTML" className="tab" onClick={cancelBodyHTML}>
						Cancel HTML Edits
					</a>
					<a href="#" id="togglePreview" className={previewButtonClass} onClick={(e) => togglePreview(e, showPreview)}>
						{previewButtonText}
					</a>
				</div>
			</div>
		);
	} else {
		bodyInput = (
			<div>
				<div className="col-sm-12">
					<label htmlFor="body_readable">Body (Raw Sext)</label>
					<textarea
						id="body_readable"
						value={ body_plain || '' }
						onChange={(e) => updateBodyPlain(e.target.value)}
					/>
					<textarea
						className='hidden'
						name="post[body]"
						value={ body || '' }
						onChange={(e) => updateBody(e.target.value)}
					/> 
				</div>
				<div className="col-sm-12">
					<a href="#" id="editBodyBtn" className="tab" onClick={editBodyHTML}>
						Edit HTML
					</a>
					<a href="#" id="togglePreview" className={previewButtonClass} onClick={(e) => togglePreview(e, showPreview)}>
						{previewButtonText}
					</a>
				</div>
			</div>
		);
	}

	return (
		<div className="row">
			{bodyInput}
			{bodyHTMLInput}
		</div>
	);
};

Body.propTypes = {
	body_plain: PropTypes.string,
	body: PropTypes.string,
	editBodyHTML: PropTypes.func.isRequired,
	editingBodyHTML: PropTypes.bool,
	showPreview: PropTypes.bool,
	cancelBodyHTML: PropTypes.func.isRequired,
	updateBodyPlain: PropTypes.func.isRequired,
	updateBody: PropTypes.func.isRequired,
	togglePreview: PropTypes.func.isRequired
};

export default Body;
