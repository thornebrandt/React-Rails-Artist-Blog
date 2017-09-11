/*global hljs*/

import PropTypes from 'prop-types';
import ImageUploader from '../containers/ImageUploaderContainer';
import Body from '../containers/BodyContainer';
import PostPreview from '../containers/PostPreviewContainer';
import React from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import Tags from '../containers/TagsContainer';

class PostForm extends React.Component {
	constructor(props){
		super(props);
	}

	componentDidUpdate() {
		this.highlightCode();
	}

	componentDidMount() {
		this.allowTabsInTextAreas();
		this.props.populateSavedPost(this.props.saved_post);
	}

	allowTabsInTextAreas(){
		var textareas = document.getElementsByTagName('textarea');
		var count = textareas.length;
		for(var i=0;i<count;i++){
			textareas[i].onkeydown = function(e){
				if(e.keyCode==9 || e.which==9){
					e.preventDefault();
					var s = this.selectionStart;
					this.value = this.value.substring(0,this.selectionStart) +
					'\t' + this.value.substring(this.selectionEnd);
					this.selectionEnd = s+1; 
				}
			};
		}
	}

	highlightCode() {
		if(typeof hljs !== 'undefined'){
			const codeSegments = document.querySelectorAll('pre code');
			for(let i = 0; i < codeSegments.length; i++){
				window.codeSegment = codeSegments[i];
				hljs.initHighlighting.called = false;
				hljs.highlightBlock(codeSegments[i]);
			}
		}
	}

	render() {
		const postTypeOptions = [
			{ value: 'blog', label: 'Blog' },
			{ value: 'featured', label: 'Featured' },
			{ value: 'portfolio', label: 'Portfolio' }
		];
		let portfolioSelect, previewEl;
		if(this.props.post_type === 'portfolio'){
			portfolioSelect = (
				<div className="col-sm-6">
					<label htmlFor="post_portfolio_id">Portfolio</label>
					<Select
						value={this.props.portfolio_id}
						simpleValue
						onChange={this.props.updatePortfolioId}
						options={this.props.portfolios}
						id='portfolioIdSelect'
					/>
					<input
						type="input"
						className="hidden"
						id="post_portfolio_id"
						name="post[portfolio_id]"
						value={this.props.portfolio_id}
						onChange={(e) => this.props.updatePortfolioId(e.target.value)}
					/>
				</div>
			);
		}

		if(this.props.showPreview){
			previewEl = (
				<div className="col-sm-12">
					<PostPreview />
				</div>
			);
		}
		return (
			<div className="row">
				<div className="col-sm-9">
					<div className="row">
						<div className="col-sm-6">
							<label htmlFor="post_type">Post Type</label>
							<Select 
								value={this.props.post_type}
								simpleValue
								onChange={this.props.updateType}
								options = {postTypeOptions}
								id="typeSelect"
							/>
							<input 
								type="text"
								className="hidden"
								id="post_type"
								name="post[post_type]"
								value={this.props.post_type || 'blog'}
								onChange={(e) => this.props.updateType(e.target.value) }
							/>
						</div>
						{portfolioSelect}
					</div>
					<div className="row">
						<div className="col-sm-6">
							<label htmlFor="post_title">Title</label>
							<input
								id="post_title"
								name="post[title]"
								type="text"
								required
								value={this.props.title || ''}
								onChange={(e) => this.props.updateFormElement('UPDATE_TITLE', e.target.value)}
							/>
						</div>
						<div className="col-sm-6">
							<label htmlFor="post_icon">Icon Image Path (Optional)  Example: /headings/vr.png</label>
							<input
								id="post_icon"
								name="post[icon]"
								type="text"
								value={this.props.icon || ''}
								onChange={(e) => this.props.updateFormElement('UPDATE_ICON', e.target.value)}
							/>
						</div>
					</div>
					<div className="row">
						<div className="col-sm-12">
							<label htmlFor="post_subtitle">Subtitle (Optional, show below date for blog posts)</label>
							<input
								id="post_subtitle"
								name="post[subtitle]"
								type="text"
								value={this.props.subtitle || ''}
								onChange={(e) => this.props.updateFormElement('UPDATE_SUBTITLE', e.target.value)}
							/>
						</div>
					</div>
					<Body />
					<div className="row">
						<div className="col-sm-12">
							<label htmlFor="post_summary">Summary <span className="pink">HTML</span> ( Optional - if left blank, body will appear as summary ) </label>
							<textarea
								id="post_summary"
								name="post[summary]"
								type="text"
								value={this.props.summary || ''}
								className="pink"
								onChange={(e) => this.props.updateFormElement('UPDATE_SUMMARY', e.target.value)}
							/>
						</div>
					</div>
					<div className="row">
						<div className="col-sm-3">
							<label htmlFor="post_publish_date">Publish Date</label><br />
							<DatePicker 
								selected={this.props.publish_date_moment}
								onChange={this.props.updatePublishDateMoment}
							/>
							<input
								type="text"
								className="hidden"
								id="post_publish_date"
								name="post[publish_date]"
								value={ this.props.publish_date || this.props.publish_date_moment.format() }
								onChange={(e) => this.props.updateFormElement('UPDATE_PUBLISH_DATE', e.target.value)}
							/>
						</div>
						<div className="col-sm-3">
							<label htmlFor="post_published">Published?</label><br />
							<input
								type='checkbox'
								id='post_published'
								value='post_published'
								name='post[published]'
								checked={!!this.props.published}
								className="checkbox"
								onChange={() => this.props.updatePublished(!!this.props.published)}
							/>
						</div>
						<div className="col-sm-6">
							<label htmlFor="post_url">Display URL: thornebrandt.com/{this.props.post_type}/{this.props.url}</label><br />
							<input
								type='text'
								required
								id='post_url'
								name='post[url]'
								value={this.props.url || ''}
								onChange={(e) => this.props.updateFormElement('UPDATE_URL', e.target.value)}
							/>
						</div>
						<Tags />
					</div>
				</div>
				<div className="col-sm-3">
					<ImageUploader />
				</div>
				{previewEl}
				<div className="col-sm-12">
					<button type="submit" id="createPost">
						Save Post
					</button>
				</div>
			</div>
		);
	}
}

PostForm.propTypes = {
	portfolio_id: PropTypes.number,
	portfolios: PropTypes.array,
	populateSavedPost: PropTypes.func.isRequired,
	post_type: PropTypes.string,
	publish_date: PropTypes.string,
	publish_date_moment: PropTypes.object,
	published: PropTypes.bool,
	updateFormElement: PropTypes.func.isRequired,
	updatePortfolioId: PropTypes.func.isRequired,
	updatePublished: PropTypes.func.isRequired,
	updatePublishDateMoment: PropTypes.func.isRequired,
	updatePublishDate: PropTypes.func.isRequired,
	updateType: PropTypes.func.isRequired,
	title: PropTypes.string,
	bogus: PropTypes.string,
	url: PropTypes.string,
	type: PropTypes.string,
	icon: PropTypes.string,
	showPreview: PropTypes.bool,
	saved_post: PropTypes.object,
	subtitle: PropTypes.string,
	summary: PropTypes.string
};

export default PostForm;
