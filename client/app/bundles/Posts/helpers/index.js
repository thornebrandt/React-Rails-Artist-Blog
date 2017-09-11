export const textToHTML = (body) => {
	body = parseCode(body);
	body = parseParagraphs(body);
	body = parseLineBreaks(body);
	body = parseImages(body);
	body = parseDoubleImages(body);
	body = parseVideos(body);
	//---
	body = addLineBreaksToBreaks(body);
	body = addLineBreaksToParagraphs(body);
	body = addBookends(body);
	body = removeExtraParagraphs(body);
	body = addLineBreaksToCode(body);

	return body;
};

export const HTMLToText = (body) => {
	body = stripVideoTags(body);
	body = stripParagraphTags(body);
	body = stripImageTags(body);
	body = stripDoubleImageTags(body);
	body = stripBreakTags(body);
	body = removeFirstLineBreak(body);
	return body;
};



export const isImage = (image) => {
	if(!isName(image)){
		return false;
	}
	return (/\.(gif|jpg|jpeg|tiff|png)$/i).test(image);
};

export const isName = (name) => {
	const nameArray = name.split(/[\n\s\][]/);
	if(nameArray.length > 1){
		return false;
	} else {
		return true;
	}
};

export const isVideo = (video) => {
	if(!isName(video)){
		return false;
	}
	return (/\.(ogv|mp4|webm)$/i).test(video);
};


export const stripExtension = (fileName) => {
	return fileName.replace(/\.[^/.]+$/, '');
};

const addBookends = (body) => (
	'<p>\n' + body + '\n</p>'
);

const removeExtraParagraphs = (body) => (
	body.split('<p>\n\n</p>').join('')
);


const parseParagraphs = (body) => (
	body.split('\n\n').join('</p><p>')
);

const parseLineBreaksFromCode = (code) => {
	const reg = /\n/g;
	return code.replace(reg, '***BR***');
};

const parseLessThanFromCode = (body) => {
	const reg = /</g;
	return body.replace(reg, '&lt;');
};

const parseGreaterThanFromCode = (body) => {
	const reg = />/g;
	return body.replace(reg, '&gt;');
};

const addLineBreaksToCode = (body) => {
	const reg = /\*\*\*BR\*\*\*/g;
	return body.replace(reg, '\n');
};

const parseLineBreaks = (body) => (
	body.split('\n').join('<br/>')
);

const stripParagraphTags = (body) => {
	const reg = /<p[\s\S]*?>\n?([\s\S]*?)\n?<\/p>/g;
	return body.replace(reg, '\n$1\n');
};

const stripVideoTags = (body) => {
	const regArray = [
		'<video.*>\n',
		'<source src="/videos/(.*)\.webm" type="video/webm">\n',
		'<source src="/videos/.*\.ogv" type="video/ogg">\n',
		'<source src="/videos/.*\.mp4" type="video/mp4">\n',
		'</video>'
	];
	const reg = new RegExp(regArray.join(''), "g");
	return body.replace(reg, "vid[$1]");
};

const stripImageTags = (body) => {
	const imageArray = [
		'<div class="row">\n',
		'<div class="col-lg-12">\n',
		'<img class="preview" src="(.*)"/>\n',
		'</div>\n',
		'</div>\n',
	];
	const markup = "img[$1]";
	const reg = new RegExp(imageArray.join(''), "g");
	return body.replace(reg, markup);
};


const stripDoubleImageTags = (body) => {
	const imageArray = [
		'<div class="row">\n',
		'<div class="col-lg-6">\n',
		'<img class="preview" src="(.*)"/>\n',
		'</div>\n',
		'<div class="col-lg-6">\n',
		'<img class="preview" src="(.*)"/>\n',
		'</div>\n',
		'</div>\n',
	];
	const markup = "img[$1,$2]";
	const reg = new RegExp(imageArray.join(''), "g");
	return body.replace(reg, markup);
};

const stripBreakTags = (body) => (
	body.replace('<br/>', '\n')
);

const parseImages = (body) => {
	const reg = /img\[([^\]]+)\]/g;
	const imageArray = [
		'</p>',
		'<div class="row">\n',
		'<div class="col-lg-12">\n',
		'<img class="preview" src="$1"/>\n',
		'</div>\n',
		'</div>\n',
		'<p>'
	];
	return body.replace(reg, imageArray.join(''));
};

const parseDoubleImages = (body) => {
	const reg = /imgs\[([^,]+),([^\]]+)\]/g;
	const imageArray = [
		'</p>',
		'<div class="row">\n',
		'<div class="col-lg-6">\n',
		'<img class="preview" src="$1"/>\n',
		'</div>\n',
		'<div class="col-lg-6">\n',
		'<img class="preview" src="$2"/>\n',
		'</div>\n',
		'</div>\n',
		'<p>'
	];
	return body.replace(reg, imageArray.join(''));
};

const parseVideos = (body) => {
	const reg = /vid\[([^\]]+)\]/g;
	const bodyArray = [
		'<video controls poster="/images/$1.png">\n',
		'<source src="/videos/$1.webm" type="video/webm">\n',
		'<source src="/videos/$1.ogv" type="video/ogg">\n',
		'<source src="/videos/$1.mp4" type="video/mp4">\n',
		'</video>'
	];
	return body.replace(reg, bodyArray.join(''));
};

const parseInnerCode = (code, innerCode) => {
	innerCode = parseLineBreaksFromCode(innerCode);
	innerCode = parseLessThanFromCode(innerCode);
	innerCode = parseGreaterThanFromCode(innerCode);
	return '<pre><code>'+innerCode+'</code></pre>';
};

const parseCode = (body) => {
	const reg = /```([^```]*)```/g;
	return body.replace(reg, parseInnerCode);
};

const addLineBreaksToBreaks = (body) => {
	return body.split('<br/>').join('\n<br/>\n');
};

const addLineBreaksToParagraphs = (body) => {
	body = body.split('<p>').join('<p>\n');
	body = body.split('</p>').join('\n</p>\n');	
	return body;
};

const removeFirstLineBreak = (body) => (
	body.replace(/^\s+|\s+$/, '')
);


export const getFileSize = (file) => {
	let bytes;
	if(typeof file === 'object'){
		bytes = file.size;
	} else if(typeof file === 'number'){
		bytes = file;
	}
	if      (bytes>=1073741824) {bytes=(bytes/1073741824).toFixed(2)+' GB';}
	else if (bytes>=1048576)    {bytes=(bytes/1048576).toFixed(2)+' MB';}
	else if (bytes>=1024)       {bytes=(bytes/1024).toFixed(2)+' KB';}
	else if (bytes>1)           {bytes=bytes+' bytes';}
	else if (bytes==1)          {bytes=bytes+' byte';}
	else                        {bytes='0 byte';}
	return bytes;
};