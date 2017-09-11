import React from 'react';
import { shallow } from 'enzyme';
import Body from '../Posts/components/Body';
import reducer from '../Posts/reducers/PostReducer';
import * as actions from '../Posts/actions/bodyActions'

describe('Body input tests', () => {
	describe('body input component', () => {
		let wrapper, initialState;
		let rows, bodyInput, editBodyBtn;

		beforeEach(() => {
			initialState = {
				updateBodyPlain: jest.fn(),
				updateBody: jest.fn(),
				parseBodyHTML: jest.fn(),
				editBodyHTML: jest.fn(),
				cancelBodyHTML: jest.fn(),
				togglePreview: jest.fn()
			}
			wrapper = shallow(<Body { ...initialState} />);
			bodyInput = wrapper.find('textarea#body_readable');
			editBodyBtn = wrapper.find('a#editBodyBtn');
		});


		it('renders body textarea', () => {
			expect(bodyInput.length).toEqual(1);
		});

		it('does not render body HTML textarea by default', () => {
			const bodyHTMLInput = wrapper.find('input#post_body');
			expect(bodyHTMLInput.length).toEqual(0);
		});

		it('calls updateBody', () => {
			bodyInput.simulate('change', { target: {value: 'new body' }});
			expect(initialState.updateBodyPlain.mock.calls.length).toBe(1);
		});

		it('renders edit HTML button', () => {
			expect(editBodyBtn.props().children).toBe('Edit HTML');
		});

		it('calls editBodyHTML', () => {
			editBodyBtn.simulate('click');
			expect(initialState.editBodyHTML).toHaveBeenCalled();
		});

		describe('updating bodyHTML', () => {
			let bodyHTMLInput, cancelBtn;

			beforeEach(() => {
				initialState.editingBodyHTML = true;
				wrapper = shallow(<Body { ...initialState} />);
				bodyHTMLInput = wrapper.find('textarea#post_body');
				cancelBtn = wrapper.find('a#cancelHTML');
			});

			it('shows body html input on edit state', () => {
				expect(bodyHTMLInput.length).toBe(1);
			});

			it('calls updateBodyHTML', () => {
				bodyHTMLInput.simulate('change', { target: { value: '<p>new html body</p>' }});
				expect(initialState.updateBody.mock.calls.length).toBe(1);
			});

			it('renders a cancel HTML button', () => {
				expect(cancelBtn.props().children).toBe('Cancel HTML Edits');
			});

			it('calls cancelBodyHTML', () => {
				cancelBtn.simulate('click');
				expect(initialState.cancelBodyHTML).toHaveBeenCalled();
			});

		});
	});

	describe('body input actions', () => {
		let fakeClickEvent;
		beforeEach(() => {
			fakeClickEvent = {
				preventDefault: jest.fn()
			}
		});

		it('should update body', () => {
			const newBodyPlain = 'I am the new body';
			const newBodyHTML = '<p>\nI am the new body\n</p>';
			const expectedAction = {
				type: "UPDATE_BODY_PLAIN",
				body_plain: newBodyPlain,
				body: newBodyHTML
			};
			expect(actions.updateBodyPlain(newBodyPlain)).toEqual(expectedAction);
		});

		it('should update bodyHTML', () => {
			const newBodyHTML = '<p>newBodyHTML</p>';
			const newBodyPlain = 'newBodyHTML\n';
			const expectedAction = {
				type: 'UPDATE_BODY',
				body: newBodyHTML,
				body_plain: newBodyPlain
			}
			expect(actions.updateBody(newBodyHTML)).toEqual(expectedAction);
		});

		it('should call edit html', () => {
			const expectedAction = {
				type: 'EDIT_BODY_HTML',
				editing: true
			}	
			expect(actions.editBodyHTML(fakeClickEvent)).toEqual(expectedAction);
		});

		it('should cancel editing html', () => {
			const expectedAction = {
				type: 'EDIT_BODY_HTML',
				editing: false
			}
			expect(actions.cancelBodyHTML(fakeClickEvent)).toEqual(expectedAction);
		});

	});

	describe('body reducers', () => {
		let initialState;
		beforeEach(() => {
			initialState = {
				body: '',
				title: ''
			}
		});

		it('handles updateBody', () => {
			const newBody = 'newBody';
			const newBodyHTML = '<p>newBody</p>';
			const expectedState = {
				body_plain: newBody,
				body: newBodyHTML
			};
			const action = {
				type: "UPDATE_BODY_PLAIN",
				body_plain: newBody,
				body: newBodyHTML
			};
			expect(reducer({}, action)).toEqual(expectedState);
		});

		it('handles updateBodyHTML', () => {
			const newBodyHTML = '<p>inside p</p> extra characters';
			const newBodyPlain = '\ninside p\n extra characters';
			const expectedState = {
				body: newBodyHTML,
				body_plain: newBodyPlain
			}
			const action = {
				type: 'UPDATE_BODY',
				body: newBodyHTML,
				body_plain: newBodyPlain
			}
			expect(reducer({}, action)).toEqual(expectedState);
		});

		it('handles editBodyHTML', () => {
			const expectedState = {
				editingBodyHTML: true
			}
			const action = {
				type: 'EDIT_BODY_HTML',
				editing: true
			}
			expect(reducer({}, action)).toEqual(expectedState);
		});

		it('handles cancelBodyHTML', () => {
			const expectedState = {
				editingBodyHTML: false
			}
			const action = {
				type: 'EDIT_BODY_HTML',
				editing: false
			}
			expect(reducer({}, action)).toEqual(expectedState);
		});
	});
});