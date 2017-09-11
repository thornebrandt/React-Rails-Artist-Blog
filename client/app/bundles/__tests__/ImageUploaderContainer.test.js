import React from 'react';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';
import { mount } from 'enzyme';
import ImageUploader from '../Posts/components/ImageUploader';
import ImageUploaderContainer from '../Posts/containers/ImageUploaderContainer';

describe('ImageUploaderContainer', () => {
	let Component;
	beforeEach(() => {
		const store = createMockStore({
			image_uploader: {
				src: ''
			}
		});
		const wrapper = mount(
			<Provider store={store}>
				<ImageUploaderContainer />
			</Provider>
		);
		Component = wrapper.find(ImageUploaderContainer);
	});

	it('should render', () => {
		expect(Component.length).toBeTruthy();
	});
});