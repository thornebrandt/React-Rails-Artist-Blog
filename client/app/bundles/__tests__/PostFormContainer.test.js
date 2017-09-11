import React from 'react';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';
import { mount, shallow } from 'enzyme';
import PostForm from '../Posts/components/PostForm';
import PostFormContainer from '../Posts/containers/PostFormContainer';

describe('PostFormContainer', () => {
	let Component;
	beforeEach(() => {
		const store = createMockStore({
			post: {
			},
			image_uploader: {
				src: ''
			}
		});
		const wrapper = shallow(
			<Provider store={store}>
				<PostFormContainer />
			</Provider>
		);
		Component = wrapper.find(PostFormContainer);
	});

	it('should render', () => {
		expect(Component.length).toBeTruthy();
	});

});