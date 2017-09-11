import React from 'react';
import { shallow } from 'enzyme';
import Tags from '../Posts/components/Tags';
import reducer from '../Posts/reducers/PostReducer';
import * as actions from '../Posts/actions/tagActions'

describe('Tag test', () => {
	describe('tags component', () => {
		let wrapper, initialState;
		let tagSelect;

		beforeEach(() => {
			initialState = {
				addTag: jest.fn(),
				populateSavedTags: jest.fn(),
				populateAvailableTags: jest.fn(),
				removeTag: jest.fn(),
				post_tags: []
			}

			wrapper = shallow(<Tags { ...initialState} />)
			tagSelect = wrapper.find("Select#tagSelect")
		});

		
		it('renders tag select', () => {
			 expect(tagSelect.length).toEqual(1);
		});
	});


	describe('tag reduction', () => {
		let expectedState, initialState;
		beforeEach(() => {
			initialState = {
				post_tags: [
					{
						name: 'tag1',
						id: 1,
					},
					{
						name: 'tag2',
						id: 2
					}

				],
				available_tags: [
					{
						name: 'new_tag',
						id: 99
					}
				]
			}
		});

		it('does not alter original state', () => {
			const newTag = {
				name: 'tag3',
				id: 3
			};
			expectedState = {
				post_tags: [...initialState.post_tags],
			};
			expectedState.post_tags.push(newTag);
			expect(expectedState).not.toEqual(initialState);
		});

		it('does not break on create post page', () => {
			const tags = [
				{
					name: 'only_tag',
					id: 1
				}
			];
			initialState = {};
			expectedState = {
				available_tags: tags
			};
			expect(reducer(initialState, actions.populateAvailableTags(tags))).toEqual(expectedState);
		});

		it('should add a tag to state', () => {
			const newTag = {
				label: 'tag3',
				id: 3
			};
			expectedState = {
				post_tags: [...initialState.post_tags],
				available_tags: [...initialState.available_tags]
			};
			expectedState.post_tags.push(newTag);
			expect(reducer(initialState, actions.addTag(newTag))).toEqual(expectedState);
		});

		it('should remove a tag from state', () => {
			expectedState = {
				post_tags: [
					{
						name: 'tag1',
						id: 1
					}
				],
				available_tags: [
					{
						name: 'new_tag',
						id: 99
					},
					{
						name: 'tag2',
						id: 2
					}
				]
			}
			expect(reducer(initialState, actions.removeTag(2))).toEqual(expectedState);
		});
	});

});