import moment from 'moment';
import * as helpers from '../helpers/';
/* eslint-disable import/prefer-default-export */

export const updateFormElement = (actionName, text) => {
	return ({
		type: actionName,
		text: text
	});
};

export const updateType = (newType) => {
	return({
		type: 'UPDATE_TYPE',
		text: newType
	});
};

export const updatePortfolioId = (id) => ({
	type: 'UPDATE_PORTFOLIO_ID',
	id
});

export const updatePublishDateMoment = (moment) => {
	const formattedDate = moment.format();
	return({
		type: 'UPDATE_PUBLISH_DATE_MOMENT',
		moment,
		formatted: formattedDate
	});
};

export const updatePublishDate = (publish_date) => {
	return ({
		type: 'UPDATE_PUBLISH_DATE',
		publish_date
	});
};

export const updatePublished = (published) => {
	return ({
		type: 'UPDATE_PUBLISHED',
		published: !published
	});
};

export const populateSavedPost = (saved_post) => {
	if(saved_post){
		saved_post.publish_date_moment = moment(saved_post.publish_date);
		saved_post.body_plain = helpers.HTMLToText(saved_post.body);
	}
	return ({
		type: 'POPULATE_SAVED_POST',
		saved_post
	});
};