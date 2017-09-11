/* eslint-disable import/prefer-default-export */
import * as helpers from '../helpers/';

export const editBodyHTML = (e) => {
	e.preventDefault();
	return({
		type: 'EDIT_BODY_HTML',
		editing: true
	});
};

export const cancelBodyHTML = (e) => {
	e.preventDefault();
	return({
		type: 'EDIT_BODY_HTML',
		editing: false
	});
};

export const updateBodyPlain = body_plain => {
	return ({
		type: 'UPDATE_BODY_PLAIN',
		body_plain,
		body: helpers.textToHTML(body_plain)
	});
};

export const updateBody = body => ({
	type: 'UPDATE_BODY',
	body,
	body_plain: helpers.HTMLToText(body)
});

export const togglePreview = (e, showPreview) => {
	e.preventDefault();
	return ({
		type: 'TOGGLE_PREVIEW',
		showPreview: !showPreview
	});
};