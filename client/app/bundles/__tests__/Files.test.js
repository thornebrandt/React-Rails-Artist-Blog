import React from 'react';
import { shallow } from 'enzyme';
import Files from '../Posts/components/Files';
import { isImage } from '../Posts/helpers/';

describe('Images component tests', () => {
	let wrapper, initialState;

	beforeEach(() => {
		initialState = {
			files: [
				'fakeImage1.jpg',
				'fakeImage2.jpg',
				'fakeMovie.mp4',
				'fakeImage3.jpg'
			]
		}
		wrapper = shallow(<Files { ...initialState } />);
	});

	it('knows that the first image is an image', () => {
		expect(isImage(initialState.files[0]));
	});

	it('renders', () => {
		expect(wrapper.find('#uploaded-files').length).toBe(1);
	});

	it('has three lis', () => {
		expect(wrapper.find('li').length).toBe(4);
	});

	it('first li has a key of 0', () => {
		expect(wrapper.find('li').nodes[0].key).toBe("0");
	});

	it('has three images', () => {
		expect(wrapper.find('img').length).toBe(3);
	});

	it('has three sources', () => {
		expect(wrapper.find('span.fileSrc').length).toBe(4);
	});

	it('first image has src of first image', () => {
		expect(wrapper.find('img').node.props.src).toBe('fakeImage1.jpg');
	});

	it('first span has path of first image', () => {
		expect(wrapper.find('span.fileSrc').node.props.children).toBe('fakeImage1.jpg');
	});

});