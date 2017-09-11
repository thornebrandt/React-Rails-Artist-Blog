import * as helpers from '../Posts/helpers/';

fdescribe('textToHTML', () => {
	it('parses html', () => {
		const body = 'hey';
		const bodyHTML = '<p>\nhey\n</p>';
		expect(helpers.textToHTML(body)).toEqual(bodyHTML);
	});

	it('removes extraneous paragraphs', () => {
		const body = ''
		const bodyHTML = '';
		expect(helpers.textToHTML(body)).toEqual(bodyHTML);
	});

	it('parses html line breaks', () => {
		const body = 'firstLine\nsecondLine\nthirdLine';
		const bodyHTML = '<p>\nfirstLine\n<br/>\nsecondLine\n<br/>\nthirdLine\n</p>';
		expect(helpers.textToHTML(body)).toEqual(bodyHTML);
	});

	it('converts <p> tags to line breaks', () => {
		const bodyHTML = '<p>\nP tag here\n</p>';
		const body = 'P tag here\n';
		expect(helpers.HTMLToText(bodyHTML)).toEqual(body);
	});

	it('converts <img> markup to img[]', () => {
		const body = 'img[images/fakeImage.jpg]';
		const bodyHTML = '\n<div class="row">\n' +
						'<div class="col-lg-12">\n' +
						'<img class="preview" src="images/fakeImage.jpg"/>\n' +
						'</div>\n' +
						'</div>\n';
		expect(helpers.HTMLToText(bodyHTML)).toEqual(body);
	});

	it('converts double <img> markup to imgs[]', () => {
		const body = 'img[images/fakeImage.jpg,images/fakeImage2.jpg]';
		const bodyHTML = '\n<div class="row">\n' +
						'<div class="col-lg-6">\n' +
						'<img class="preview" src="images/fakeImage.jpg"/>\n' +
						'</div>\n' +
						'<div class="col-lg-6">\n' +
						'<img class="preview" src="images/fakeImage2.jpg"/>\n' +
						'</div>\n' +
						'</div>\n';
		expect(helpers.HTMLToText(bodyHTML)).toEqual(body);
	});

	it('converts double <img> markup to imgs[]', () => {
		const body = 'img[images/fakeImage.jpg,images/fakeImage2.jpg]';
		const bodyHTML = '\n<div class="row">\n' +
						'<div class="col-lg-6">\n' +
						'<img class="preview" src="images/fakeImage.jpg"/>\n' +
						'</div>\n' +
						'<div class="col-lg-6">\n' +
						'<img class="preview" src="images/fakeImage2.jpg"/>\n' +
						'</div>\n' +
						'</div>\n';
		expect(helpers.HTMLToText(bodyHTML)).toEqual(body);
	});

	it('converts <video> markup to vid[]', () => {
		const body = 'vid[fakeVideo]';
		const bodyHTML = [
			'<video controls poster="fakePoster.png">\n',
			'<source src="/videos/fakeVideo.webm" type="video/webm">\n',
			'<source src="/videos/fakeVideo.ogv" type="video/ogg">\n',
			'<source src="/videos/fakeVideo.mp4" type="video/mp4">\n',
			'</video>'
		].join('');
		expect(helpers.HTMLToText(bodyHTML)).toEqual(body);
	});

	it('converts multiple <p> tags to line breaks', () => {
		const bodyHTML = '<p>P tag here</p><p>Second Paragraph</p>';
		const body = 'P tag here\n\nSecond Paragraph\n';
		expect(helpers.HTMLToText(bodyHTML)).toEqual(body);
	});

	it('converts a <p> tag that include a class with line breaks', () => {
		const bodyHTML = '<p class="hey">tag with class</p>';
		const body = 'tag with class\n';
		expect(helpers.HTMLToText(bodyHTML)).toEqual(body);
	});

	it('converts <br> tags with line break', () => {
		const bodyHTML = '<p>FirstLine<br/>SecondLine</p>';
		const body = 'FirstLine\nSecondLine\n';
		expect(helpers.HTMLToText(bodyHTML)).toEqual(body);
	});

	it('parses html double line breaks as paragraphs', () => {
		const body = 'firstParagraph\n\nsecondParagraph';
		const bodyHTML = '<p>\nfirstParagraph\n</p>\n<p>\nsecondParagraph\n</p>';
		expect(helpers.textToHTML(body)).toEqual(bodyHTML);
	});

	it('determines an image', () => {
		expect(helpers.isImage("image.jpg")).toBe(true);
		expect(helpers.isImage("image.png")).toBe(true);
	});

	it('determines a video', () => {
		expect(helpers.isVideo("image.ogv")).toBe(true);
		expect(helpers.isVideo("image.mp4")).toBe(true);
	});

	it('determines if name', () => {
		expect(helpers.isName("oneString")).toBe(true);
		expect(helpers.isName("o String")).toBe(false);
	});

	it('doesnt allow invalid images', () => {
		expect(helpers.isImage("n.onImagejpg")).toBe(false);
		expect(helpers.isImage("i mage.jpg")).toBe(false);
		expect(helpers.isImage("image\nnewline.jpg")).toBe(false);
	});

	it('doesnt allow invalid videos', () => {
		expect(helpers.isImage("videomp4")).toBe(false);
		expect(helpers.isImage("v ideo.mp4")).toBe(false);
		expect(helpers.isImage("vid/coolvid.mp4")).toBe(false);
		expect(helpers.isImage("vid\ncoolvid.mp4")).toBe(false);
	});

	it('parses img tags', () => {
		const body = 'img[images/fakeImage.jpg]';
		const bodyHTML = '\n<div class="row">\n' +
						'<div class="col-lg-12">\n' +
						'<img class="preview" src="images/fakeImage.jpg"/>\n' +
						'</div>\n' +
						'</div>\n';
		expect(helpers.textToHTML(body)).toEqual(bodyHTML);
	});

	it('parses imgs (plural) tags', () => {
		const body = 'imgs[images/fakeImage.jpg,images/fakeImage2.jpg]';
		const bodyHTML = '\n<div class="row">\n' +
						'<div class="col-lg-6">\n' +
						'<img class="preview" src="images/fakeImage.jpg"/>\n' +
						'</div>\n' +
						'<div class="col-lg-6">\n' +
						'<img class="preview" src="images/fakeImage2.jpg"/>\n' +
						'</div>\n' +
						'</div>\n';
		expect(helpers.textToHTML(body)).toEqual(bodyHTML);
	});

	it('parses img tags with text around them', () => {
		const body = 'I am going to show an image. img[images/fakeImage.jpg] after image';
		const bodyHTML = '<p>\nI am going to show an image. \n</p>\n' +
						'<div class="row">\n' +
						'<div class="col-lg-12">\n' +
						'<img class="preview" src="images/fakeImage.jpg"/>\n' +
						'</div>\n' +
						'</div>\n' +
						'<p>\n'+
						' after image\n' +
						'</p>';
		expect(helpers.textToHTML(body)).toEqual(bodyHTML);
	});

	it('parses code tags', () => {
		const body = '```alert("hello");```'
		const bodyHTML = '<p>\n<pre><code>alert("hello");</code></pre>\n</p>';
		expect(helpers.textToHTML(body)).toEqual(bodyHTML);
	});

	it('does not add html line breaks to code tags', () => {
		const body = 'line break after this\n```alert("hello");\nalert("goodbye");\nalert("wait");```'
		const bodyHTML = '<p>\nline break after this\n<br/>\n<pre><code>alert("hello");\nalert("goodbye");\nalert("wait");</code></pre>\n</p>';
		expect(helpers.textToHTML(body)).toEqual(bodyHTML);
	});

	it('adds less than and greater than to html codes', () => {
		const body = '```<p>hello</p>```';
		const bodyHTML = '<p>\n<pre><code>&lt;p&gt;hello&lt;/p&gt;</code></pre>\n</p>';
		expect(helpers.textToHTML(body)).toEqual(bodyHTML);
	});

	it('does not parse incomplete image tags', () => {
		const body = 'img[images/fakeImage.jpg'
		const bodyHTML = '<p>\nimg[images/fakeImage.jpg\n</p>';
		expect(helpers.textToHTML(body)).toEqual(bodyHTML);
	});

	it('strips file extension', () => {
		const fileName = 'fakeExtension.mov';
		const stripped = 'fakeExtension';
		expect(helpers.stripExtension(fileName)).toBe(stripped);
	});

	it('parses video tags', () => {
		const body = 'vid[video]';
		const bodyArray = [
			'<p>\n<video controls poster="/images/video.png">\n',
			'<source src="/videos/video.webm" type="video/webm">\n',
			'<source src="/videos/video.ogv" type="video/ogg">\n',
			'<source src="/videos/video.mp4" type="video/mp4">\n',
			'</video>\n</p>'
		];
		const bodyHTML = bodyArray.join('');
		expect(helpers.textToHTML(body)).toEqual(bodyHTML);
	});
});
