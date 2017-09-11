import PropTypes from 'prop-types';
import React from 'react';

const PostPreview = ({ 
	body,
	icon,
	publish_date_moment,
	title,
	type,
	subtitle,
	summary
}) => {
	let chapterHeading, subtitleEl, summaryEl, publishedDateEl;
	let formatted_publish_date;

	const createMarkup = (html) => (
		{__html: html }
	);

	if(icon){
		chapterHeading = (
			<img className="chapterHeading" src={icon} />
		);
	}

	if(subtitle){
		subtitleEl = (
			<h4 className="subtitle">{subtitle}</h4>
		);
	}

	if(type ==='blog'){
		formatted_publish_date = publish_date_moment.format('MMMM Do, YYYY');
		publishedDateEl = (
			<h4 className='published_date'>{formatted_publish_date}</h4>
		);	
	}

	if(summary){
		summaryEl = (
			<article className="project summary">
				{chapterHeading}
				<h2 id="summaryTitle">{title}</h2>
				{subtitleEl}
				{publishedDateEl}
				<div id="summary" dangerouslySetInnerHTML={createMarkup(summary)} />
			</article>
		);
	}

	return (
		<div id="postPreview">
			{summaryEl}
			<article className="project">
				{chapterHeading}
				<h2 id="title">{title}</h2>
				{subtitleEl}
				{publishedDateEl}
				<div id="body" dangerouslySetInnerHTML={createMarkup(body)} />
			</article>
		</div>
	);
};

PostPreview.propTypes = {
	body: PropTypes.string,
	icon: PropTypes.string,
	title: PropTypes.string,
	type: PropTypes.string,
	publish_date_moment: PropTypes.object,
	subtitle: PropTypes.string,
	summary: PropTypes.string
};

export default PostPreview;
