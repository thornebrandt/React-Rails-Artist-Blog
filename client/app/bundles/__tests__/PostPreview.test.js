import MockDate from 'mockdate';
MockDate.set('1/1/2000');
import React from 'react';
import { connect } from 'react-redux';
import { createMockStore } from 'redux-test-utils';
import { shallow, mount } from 'enzyme';
import PostPreview from '../Posts/components/PostPreview';
import moment from 'moment';

describe('Post form tests', () => {
	describe('body preview component blank', () => {
		let wrapper, initialState;

		beforeEach(() => {
			initialState = {}
			wrapper = mount(<PostPreview { ...initialState} />);
		});

		it('renders', () => {
			const article = wrapper.find('article');
			expect(article.length).toEqual(1);
		});

		it('renders body', () => {
			const bodyEl = wrapper.find('#body');
			expect(bodyEl.length).toEqual(1);
		});

		it('does not render chapterHeading if icon doesn\'t exist', () => {
			const chapterHeading = wrapper.find('.chapterHeading');
			expect(chapterHeading.length).toEqual(0);
		});

		it('does not render subtitle if it does not exist', () => {
			const subTitle = wrapper.find('.subtitle');
			expect(subTitle.length).toEqual(0);
		});

		it('does not render preview if it does not exist', () => {
			const summary = wrapper.find('article.project.summary');
			expect(summary.length).toEqual(0);
		});
	});

	describe('body preview populated state', () => {
		let wrapper, initialState;

		beforeEach(() => {
			initialState = {
				body: '<p>Text Inside HTML</p>',
				icon: 'fakeIcon.png',
				title: 'Fake Title',
				publish_date_moment: moment(),
				type: 'blog',
				subtitle: 'Fake Subtitle',
				summary: '<p>Text Inside Summary</p>'
			}
			wrapper = mount(<PostPreview { ...initialState} />);
		});

		it('renders bodyHTML as HTML', () => {
			const bodyEl = wrapper.find("#body");
			expect(bodyEl.text()).toEqual("Text Inside HTML");
		});

		it('renders title', () => {
			const titleEl = wrapper.find("#title");
			expect(titleEl.text()).toEqual("Fake Title");
		});

		it('renders chapterHeading if icon exists', () => {
			const chapterHeading = wrapper.find('.chapterHeading').first()
			expect(chapterHeading.props().src).toEqual(initialState.icon);
		});

		it('renders subtitle if it exists', () => {
			const subTitle = wrapper.find('.subtitle').first();
			expect(subTitle.length).toEqual(1);
		});

		it('renders summary if it exists', () => {
			const summaryEl = wrapper.find('article.project.summary');
			expect(summaryEl.length).toEqual(1);
		});

		it('renders summary as HTML', () => {
			const summaryEl = wrapper.find('article.project.summary #summary');
			expect(summaryEl.text()).toEqual('Text Inside Summary');
		});

		it('renders formatted date', () => {
			const publishedDateEl = wrapper.find('h4.published_date').first();
			expect(publishedDateEl.text()).toEqual('January 1st, 2000');
		});

		it('does not render published date if type is not blog', () => {
			initialState.type = 'featured';
			wrapper = mount(<PostPreview { ...initialState} />);
			const publishedDateEl = wrapper.find('h4.published_date');
			expect(publishedDateEl.length).toBe(0);
		});
	});
});