import React from 'react';
import { shallow } from 'enzyme';
import ImageUploader from '../Posts/components/ImageUploader';
import reducer from '../Posts/reducers/ImageUploaderReducer';
import * as actions from '../Posts/actions/imageUploaderActions'


global.fetch = require('jest-fetch-mock');

describe('Image Uploader tests', () => {
	const fakeFile = new Blob(['fakeFile'], {type: 'text/plain'});
	describe('image uploader component', () => {
		let wrapper, initialState;
		let uploadFile = jest.fn();
		let fileInput, submitBtn, filePreviewContainer;

		beforeEach(() => {
			initialState = {
				showImagePreview: jest.fn(),
				showPreview: jest.fn(),
				chooseFile: jest.fn(),
				uploadFile: jest.fn(),
				src: '',
				file: null
			}
			wrapper = shallow(<ImageUploader { ...initialState} />);
			fileInput = wrapper.find('input#upload_image');
			filePreviewContainer = wrapper.find('div#file-preview-container');
		});

		it('renders', () => {
			expect(wrapper.find('label').text()).toEqual('Upload Image');
		});

		it('renders an upload form', () => {
			expect(fileInput.length).toEqual(1);
		});

		it('does not render a submit button at first', () => {
			submitBtn = wrapper.find('button.btn#confirm_image');
			expect(submitBtn.length).toEqual(0);
		});

		it('renders a image preview container', () => {
			expect(filePreviewContainer.length).toEqual(1);
		});

		it('calls showPreview on file selection', () => {
			const file = new Blob(['fakeFile'], {type: 'text/plain'});
			fileInput.simulate('change', { target: { files: [file] }});
			expect(initialState.chooseFile.mock.calls.length).toBe(1);
		});

		it('calls uploadFile on submit', () => {
			initialState.file = fakeFile;
			const wrapperWithFile = shallow(<ImageUploader { ...initialState} />);
			submitBtn = wrapperWithFile.find('button.btn#confirm_image');
			submitBtn.simulate('click');
			expect(initialState.uploadFile).toBeCalled();
		});

		it('renders uploaded files', () => {
			initialState.files = ['fakeImage.jpg'];
			const wrapperWithImages = shallow(<ImageUploader { ...initialState} />);
			expect(wrapperWithImages.find('Files').length).toBe(1);
		});

		it('has the loading class if loading is true', () => {
			initialState.isLoading = true;
			expect(wrapper.find('.loading').length).toBe(0);
			const wrapperLoading = shallow(<ImageUploader { ...initialState} />);
			expect(wrapperLoading.find('.loading').length).toBe(1);
		});

		it('shows an error if it exists', () => {
			initialState.error = "There was an error";
			expect(wrapper.find('.error').length).toBe(0);
			const wrapperWithError = shallow(<ImageUploader { ...initialState} />);
			expect(wrapperWithError.find('.error').length).toBe(1);
		});

	});

	describe('ImageUploaderActions', () => {
		//left for documentation.
		// it('dispatch a thunkTest action', () => {
		// 	const call = { thunkVar: 'thunkWorkin' };
		// 	const getState = () => (call);
		// 	const dispatch = jest.fn();
		// 	actions.thunkTest()(dispatch, getState);
		// 	expect(dispatch.mock.calls.length).toBe(1);
		// 	expect(dispatch.mock.calls[0][0]).toEqual(actions.invalidFile());
		// });

		it('handles the choosing of a file', () => {
			const target = {
				files: [
					new Blob(['fakeFile'], {type: 'image/png'})
				]
			}
			const addEventListener = jest.fn();
			const readAsDataURL = jest.fn();
			const dispatch = jest.fn();
			window.FileReader = jest.fn(() => (
				{
					addEventListener,
					readAsDataURL
				}
			));
			actions.chooseFile(target)(dispatch);
			expect(addEventListener).toHaveBeenCalledWith('load', jasmine.any(Function));
			expect(dispatch).toHaveBeenCalledWith(actions.loading(true));
		});

		it('the fetch fails with dispatching an error', async () => {
			expect.assertions(1);
			const fakeEvent = {
				preventDefault: jest.fn(),
			};
			const file = {
				type: 'image/png'
			}
			const dispatch = jest.fn((action) => action);
			const errorString = 'There was a problem with uploading the file\n' + 'SyntaxError: Unexpected end of JSON input';
			await expect(actions.uploadFile(fakeEvent, file)(dispatch)).resolves.toEqual(actions.throwError(errorString));
		});

		it('handles file upload', (done) => {
			let fakePromiseResolve;
			const afterPromises = (done, fn) => {
			  setTimeout(() => {
			    try {
			      fn();
			      done();
			    } catch(e) {
			      done.fail(e);
			    }
			  }, 0);
			}
			const setupPromise = function(){
				return new Promise((resolve, reject) => {
					fakePromiseResolve = resolve;
				});
			}
			const mockResponse = (status, statusText, response) => {
				return new global.Response(response, {
					status: status,
					statusText: statusText,
					headers: {
					  'Content-type': 'application/json'
					}
				});
			};
			const fakePromise = setupPromise();
			const fakePhoto = { url: 'fakePhoto.png' };
			const fakeResponse = mockResponse(200, 'OK', JSON.stringify(fakePhoto));
			global.fetch = jest.fn().mockImplementation(() => fakePromise);
			const dispatch = jest.fn();
			const fakeEvent = {
				preventDefault: jest.fn(),
			};
			const file = {
				type: 'image/png'
			}
			actions.uploadFile(fakeEvent, file)(dispatch);
			fakePromiseResolve(fakeResponse);
			expect(global.fetch).toHaveBeenCalledTimes(1);
			afterPromises(done, () => {
				expect(dispatch.mock.calls[0][0]).toEqual(actions.loading(true));
				expect(dispatch.mock.calls[1][0]).toEqual(actions.loading(false));
				expect(dispatch.mock.calls[2][0]).toEqual(actions.addFile(fakePhoto));
			});
		});

		it('handles showImagePreview', () => {
			const src = 'fakeImage.png';
			const expectedAction = {
				type: 'SHOW_IMAGE_PREVIEW',
				src
			}
			expect(actions.showImagePreview(src)).toEqual(expectedAction);
		});

		it('handles showPreview', () => {
			const file = 'movie.mp4';
			const expectedAction = {
				type: 'SHOW_FILE_SIZE',
				file
			}
			expect(actions.showFileSize(file)).toEqual(expectedAction);
		});

		it('handles adding file', () => {
			const url = 'newVideo.mp4';
			const expectedAction = {
				type: 'ADD_FILE',
				url: url
			}
			expect(actions.addFile({ url: url })).toEqual(expectedAction);
		});

		it('handles loading', () => {
			const expectedAction = {
				type: 'LOADING',
				isLoading: true
			}
			expect(actions.loading(true)).toEqual(expectedAction);
		});

		it('handles throwing an error', () => {
			const fakeError = 'Fake Error';
			const expectedAction = {
				type: 'ERROR',
				error: fakeError
			}
			expect(actions.throwError(fakeError)).toEqual(expectedAction);
		});

	});

	describe('ImageUploaderReducers', () => {
		let expectedState;

		beforeEach(() => {
			expectedState = {
				src: '',
				file: null,
				files: []
			}
		});

		it('should return the initial state', () => {
			expect(reducer(undefined, {})).toEqual(expectedState);
		});

		it('should handle update src', () => {
			const newSrc = 'fakeImage.png';
			const newFile = 'blob';
			expectedState.src = newSrc;
			expectedState.file = newFile;
			const action = {
				type: 'SHOW_IMAGE_PREVIEW',
				src: newSrc,
				file: newFile
			}
			expect(reducer(undefined, action)).toEqual(expectedState);
		});

		it('should handle updating file', () => {
			const newFile = 'blob';
			expectedState.file = newFile;
			const action = {
				type: 'SHOW_FILE_SIZE',
				file: newFile
			}
			expect(reducer(undefined, action)).toEqual(expectedState);
		});

		it('should add an image', () => {
			const newJSON = {
				url: 'fakeImage.png'
			}
			expectedState.files = [
				'fakeImage.png'
			];
			const action = {
				type: 'ADD_FILE',
				url: 'fakeImage.png'
			}
			expect(reducer(undefined, action)).toEqual(expectedState);
		});

		it('should add a file', () => {
			let initialState = {...expectedState};
			initialState.files = [
				'firstMovie.mov'
			]
			const newJSON = {
				url: 'newMovie.mov'
			}
			expectedState.files = [
				'firstMovie.mov',
				'newMovie.mov'
			];
			const action = {
				type: 'ADD_FILE',
				url: 'newMovie.mov'
			}
			expect(reducer(initialState, action)).toEqual(expectedState);
		});

		it('should handle loading', () => {
			expectedState.isLoading = true;
			const action = {
				type: 'LOADING',
				isLoading: true
			}
			expect(reducer(undefined, action)).toEqual(expectedState);
		});

		it('should handle throwing an error', () => {
			const error = 'fakeError';
			expectedState.error = error;
			const action = {
				type: 'ERROR',
				error
			}
			expect(reducer(undefined, action)).toEqual(expectedState);
		});

	});

});