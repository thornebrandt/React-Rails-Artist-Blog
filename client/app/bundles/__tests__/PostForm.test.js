import MockDate from 'mockdate';
MockDate.set('1/1/2000');
import React from 'react';
import { shallow } from 'enzyme';
import PostForm from '../Posts/components/PostForm';
import reducer from '../Posts/reducers/PostReducer';
import moment from 'moment';
import * as actions from '../Posts/actions/postActions'


describe('Post form tests', () => {
	describe('post form component', () => {
		let wrapper, initialState;
		let titleInput, iconInput, subtitleInput, typeSelect, summaryInput;

		beforeEach(() => {
			initialState = {
				title: 'fakeTitle',
				populateSavedPost: jest.fn(),
				publish_date_moment: moment(),
				publish_date: moment().format(),
				summary: 'fakeSummary',
				post_type: 'blog',
				updateFormElement: jest.fn(),
				updateIcon: jest.fn(),
				updateType: jest.fn(),
				updatePortfolioId: jest.fn(),
				updatePublishDate: jest.fn(),
				updatePublishDateMoment: jest.fn(),
				updatePublished: jest.fn(),
				togglePreview: jest.fn()
			}
			wrapper = shallow(<PostForm { ...initialState} />);
			titleInput = wrapper.find('input#post_title');
			iconInput = wrapper.find('input#post_icon');
			subtitleInput = wrapper.find('input#post_subtitle');
			typeSelect = wrapper.find("Select#typeSelect");
			summaryInput = wrapper.find('textarea#post_summary');
		});

		it('renders title input', () => {
			expect(titleInput.length).toEqual(1);
		});

		it('renders icon input', () => {
			expect(iconInput.length).toEqual(1);
		});

		it('renders subtitle input', () => {
			expect(subtitleInput.length).toEqual(1);
		});

		it('renders type select', () => {
			expect(typeSelect.length).toEqual(1);
		});

		it('renders summary', () => {
			expect(summaryInput.length).toEqual(1);
		});

		it('populates summary', () => {
			expect(summaryInput.props().value).toBe(initialState.summary);
		});

		it('renders checkbox', () => {
			const publishedCheckbox = wrapper.find('input#post_published');
			expect(publishedCheckbox.props().checked).toBe(false);
		});

		it('populates type select options', () => {
			const postTypeOptions = [
				{ value: 'blog', label: 'Blog' },
				{ value: 'featured', label: 'Featured' },
				{ value: 'portfolio', label: 'Portfolio' }
			]
			expect(typeSelect.node.props.options).toEqual(postTypeOptions);
		});

		it('updates title with state.title', () => {
			expect(titleInput.props().value).toBe(initialState.title);
		});

		it('responds to title change', () => {
			titleInput.simulate('change', { target: { value: 'new title' }});
			expect(initialState.updateFormElement.mock.calls.length).toBe(1);
		});

		it('responds to icon change', () => {
			iconInput.simulate('change', { target: { value: 'fakeIcon.png' }});
			expect(initialState.updateFormElement.mock.calls.length).toBe(1);
		});

		it('responds to type change', () => {
			typeSelect.simulate('change', { target: { value: 'blog' }});
			expect(initialState.updateType.mock.calls.length).toBe(1);
		});

		it('responds to type change', () => {
			initialState.post_type = 'portfolio';
			wrapper = shallow(<PostForm { ...initialState} />);
			const portfolioSelect = wrapper.find('Select#portfolioIdSelect');
			portfolioSelect.simulate('change', { target: { value: 15 }});
			expect(initialState.updatePortfolioId.mock.calls.length).toBe(1);
		});

		it('displays publish date in hidden field', () => {
			const publishDate = wrapper.find('#post_publish_date');
			expect(publishDate.node.props.value).toEqual(moment().format());
		});

		it('does not render portfolio dropdown if type is not portfolio', () => {
			const portfolioSelect = wrapper.find('Select#portfolioIdSelect');
			expect(portfolioSelect.length).toBe(0);
		});

		it('renders portfolio dropwdown is type is portfolio', () => {
			initialState.post_type = 'portfolio';
			wrapper = shallow(<PostForm { ...initialState} />);
			const portfolioSelect = wrapper.find('Select#portfolioIdSelect');
			expect(portfolioSelect.length).toBe(1);
		});

		it('populates type select options', () => {
			const portfolioOptions = [
				{ value: -1, label: 'NA' },
				{ value: 0, label: 'VR' },
			]
			initialState.portfolios = portfolioOptions;
			initialState.post_type = 'portfolio';
			wrapper = shallow(<PostForm { ...initialState} />);
			const portfolioSelect = wrapper.find('Select#portfolioIdSelect');
			expect(portfolioSelect.node.props.options).toEqual(portfolioOptions);
		});

		it('checks published checkbox if published is true', () => {
			initialState.published = true;
			wrapper = shallow(<PostForm { ...initialState} />);
			const publishedCheckbox = wrapper.find('input#post_published');
			expect(publishedCheckbox.props().checked).toBe(true);
		});

		it('responds to summary update', () => {
			summaryInput.simulate('change', { target: { value: 'newSummary' }});
			expect(initialState.updateFormElement.mock.calls.length).toBe(1);
		});

		it('responds to publish_date update', () => {
			wrapper.find('input#post_publish_date').simulate('change', { target: { value: moment().format() }});
			expect(initialState.updateFormElement.mock.calls.length).toBe(1);
		});

		it('responds to published checkbox click', () => {
			const publishedCheckbox = wrapper.find('input#post_published');
			publishedCheckbox.simulate('change', { target: { value: true }});
			expect(initialState.updatePublished.mock.calls.length).toBe(1);
		});



	});

	describe('post form actions', () => {
		it('should update type', () => {
			const newType = 'featured';
			const expectedAction = {
				type: "UPDATE_TYPE",
				text: newType
			}
			expect(actions.updateType(newType)).toEqual(expectedAction);
		});

		it('should update portfolio id', () => {
			const newPortfolioId = 3;
			const expectedAction = {
				type: "UPDATE_PORTFOLIO_ID",
				id: newPortfolioId
			}
			expect(actions.updatePortfolioId(newPortfolioId)).toEqual(expectedAction);
		});

		it('should update title', () => {
			const newTitle = 'I am the new title';
			const expectedAction = {
				type: "UPDATE_TITLE",
				text: newTitle
			}
			expect(actions.updateFormElement('UPDATE_TITLE', newTitle)).toEqual(expectedAction);
		});

		it('should update icon', () => {
			const newIcon = 'fakeIcon.png';
			const expectedAction = {
				type: "UPDATE_ICON",
				text: newIcon
			}
			expect(actions.updateFormElement("UPDATE_ICON", newIcon)).toEqual(expectedAction);
		});

		it('should update subtitle', () => {
			const newSubtitle = 'I am the new subtitle';
			const expectedAction = {
				type: "UPDATE_SUBTITLE",
				text: newSubtitle
			}
			expect(actions.updateFormElement('UPDATE_SUBTITLE', newSubtitle)).toEqual(expectedAction);
		});

		it('should update summary', () => {
			const newSummary = 'I am the new summary';
			const expectedAction = {
				type: "UPDATE_SUMMARY",
				text: newSummary
			}
			expect(actions.updateFormElement('UPDATE_SUMMARY', newSummary)).toEqual(expectedAction);
		});

		it('should update date published', () => {
			const newDate = moment().format();
			const expectedAction = {
				type: 'UPDATE_PUBLISH_DATE',
				publish_date: newDate
			}
			expect(actions.updatePublishDate(newDate)).toEqual(expectedAction);
		});

		it('should update published', () => {
			const expectedAction = {
				type: 'UPDATE_PUBLISHED',
				published: true
			}
			expect(actions.updatePublished(false)).toEqual(expectedAction);
		});


	});

	describe('update post reducers', () => {
		let expectedState;
		beforeEach(() => {
			expectedState = {
				publish_date_moment: moment(),
				post_type: 'blog',
				title: 'Blog Post'
			}
		});

		it('should return the initial state', () => {
			expect(reducer(undefined, {})).toEqual(expectedState);
		});

		it('should handle type update', () => {
			const newType = 'featured';
			expectedState.post_type = newType;
			const action = {
				type: 'UPDATE_TYPE',
				text: newType
			}
			expect(reducer(undefined, action)).toEqual(expectedState);
		});	

		it('should handle portfolio id updates', () => {
			const newPortfolioId = 15;
			expectedState.portfolio_id = newPortfolioId;
			const action = {
				type: 'UPDATE_PORTFOLIO_ID',
				id: newPortfolioId
			}
			expect(reducer(undefined, action)).toEqual(expectedState);
		});	

		it('should handle title updates', () => {
			const newTitle = 'New Title';
			expectedState.title = newTitle;
			const action = {
				type: 'UPDATE_TITLE',
				text: newTitle
			}
			expect(reducer(undefined, action)).toEqual(expectedState);
		});

		it('should handle icon updates', () => {
			const newIcon = 'fakeIcon.png';
			expectedState.icon = newIcon;
			const action = {
				type: 'UPDATE_ICON',
				text: newIcon
			}
			expect(reducer(undefined, action)).toEqual(expectedState);
		});

		it('should handle subtitle updates', () => {
			const newSubtitle = 'New Subtitle';
			expectedState.subtitle = newSubtitle;
			const action = {
				type: 'UPDATE_SUBTITLE',
				text: newSubtitle
			}
			expect(reducer(undefined, action)).toEqual(expectedState);
		});

		it('should handle summary updates', () => {
			const newSummary = 'New Summary';
			expectedState.summary = newSummary;
			const action = {
				type: 'UPDATE_SUMMARY',
				text: newSummary
			}
			expect(reducer(undefined, action)).toEqual(expectedState);
		});

		it('should handle publish date updates', () => {
			const newDate = moment().format();
			expectedState.publish_date = newDate;
			const newState = reducer(undefined, actions.updateFormElement('UPDATE_PUBLISH_DATE', newDate));
			expect(newState).toEqual(expectedState);
		});

		it('should handle published', () => {
			expectedState.published = true;
			const action = {
				type: 'UPDATE_PUBLISHED',
				published: true
			}
			const newState = reducer(undefined, action);
			expect(newState).toEqual(expectedState);
		});

		it('populates state with saved post', () => {
			const post = {
				title: 'SavedTitle',
				post_type: 'Post Type',
				subtitle: 'SavedSubtitle',
				body: 'SavedBody',
				'editingBodyHTML' : false,
				summary: 'SavedSummary',
				icon: 'SavedIcon',
				url: 'SavedURL',
			}
			const action = {
				type: 'POPULATE_SAVED_POST',
				saved_post: post
			}
			const expectedPopulatedState = {...expectedState, ...post};
			const newState = reducer(undefined, action);
			expect(newState).toEqual(expectedPopulatedState);
		});
	});
});