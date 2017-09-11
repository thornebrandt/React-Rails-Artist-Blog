import { compose, createStore, combineReducers, applyMiddleware } from 'redux';
import post from '../reducers/PostReducer';
import image_uploader from '../reducers/ImageUploaderReducer';
import rails_props from '../reducers/RailsPropsReducer';
import DevTools from '../containers/DevTools';
import thunk from 'redux-thunk';

const reducers = combineReducers({
	post,
	rails_props,
	image_uploader,
});

export default (props) => {
	return createStore(
		reducers,
		props,
		compose(
			applyMiddleware(thunk),
			DevTools.instrument()
		)
	);
};