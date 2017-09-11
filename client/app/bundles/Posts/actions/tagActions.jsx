export const populateSavedTags = (tags) => {
	return ({
		type: 'POPULATE_SAVED_TAGS',
		tags
	});
};

export const populateAvailableTags = (tags) => {
	return ({
		type: 'POPULATE_AVAILABLE_TAGS',
		tags
	});
};

export const addTag = (tag) => {
	return ({
		type: 'ADD_TAG',
		tag
	});
};

export const removeTag = (id) => {
	return ({
		type: 'REMOVE_TAG',
		id
	});
};







