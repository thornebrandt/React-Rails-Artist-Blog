var vid = document.getElementById('videoel');
var overlay = document.getElementById('overlay');
var overlayCC = overlay.getContext('2d');
let width = 1080;
let height = 810;
//1440 x 1080
//720 x 540
//640 x 480

let hidVidWidth = 200;
let hidVidHeight = 150;
let tracking = false;
var ctrack = new clm.tracker({useWebGL : true});
let startbutton, videobutton;
let gl, gl_canvas, fd, fd2;
let triangleVertexPositionBuffer;
let squareVertexPositionBuffer;
let relativePositions;
let hidden_vid;
let webgl_canvas;
let webgl_vid, webgl_vid2;
let wc1, wc2;
let newcanvas, videocanvas, maskcanvas;
let newCanvasContext, videoCanvasContext, maskCanvasContext;
let maskConverged;
let gotResult = 0;

ctrack.init(pModel);

function enablestart() {
	startVideo();
}

let webGLContext;
let webGLTestCanvas;
let positions;

function startVideo(){
	createFaceDeformers();
	vid.play();
	ctrack.start(hidden_vid);
	drawMaskLoop();
}


let _clown = [[109.36614797199479,146.0803014941178],[113.3112341317163,166.94425891220794],[119.32682383634102,192.44019820073913],[124.47515990999432,218.53135268016848],[135.0368892689739,237.23454650952294],[153.36671158523987,258.3629853084399],[168.01976787749376,267.1929480747351],[187.34754914721543,269.51856452825933],[208.48254316405732,266.3861472887296],[230.56976823385122,254.28150934554446],[252.32258133963728,228.52412987005079],[257.17220298223486,206.3402378962542],[258.9843247454375,180.63104673767828],[258.5753658677024,155.88741971189734],[257.6871064619868,133.44102296893945],[239.22024249496928,123.17900856324786],[224,120],[202,129],[189.52627031367516,133.56374069983377],[117.59908955786086,139.73818792771897],[127.77843006651088,132],[146,132],[165.0607640650076,134.705502740957],[134.51722669161887,148.29207559200646],[147.96374258674177,143.20283557208495],[159.89652431504095,147.63741406437117],[147.93382178127874,150.62855114616417],[147.67029281471235,145.84674383355735],[225.08887297158256,140.49332724817637],[212.08555159755232,136.6637205310945],[200.21673690859785,143.2521211750682],[213.9034386455536,144.79282472393862],[212.73203771018734,139.25493626479908],[176,143],[165.49292248091808,175.6509156918952],[160.65540058230079,186.6760231567915],[167.4207645046435,192.63343628158498],[183.62626379818232,194.71012308507662],[202.3090052424696,190.41115049235611],[205.7195701829814,183.98341450773069],[198.9443408840292,173.11655691739367],[179,161],[168.6247652804272,189.02062856158705],[197.62131595904475,185.9849042391749],[161.0888434079335,217.27870633433994],[167.89330220055228,211.76798622455402],[176.82152484033276,209.28172522414377],[183.58325738122588,209.93117201682657],[188.6427918040954,207.96895641643206],[201.48328507490595,210.3328015524256],[211.42668910649365,215.3776245292422],[203.30344494288195,220.16049923535812],[195.41370867255398,222.10783447010172],[184.76451045872906,223.302321634335],[174.00728023178684,223.32601426202467],[167.71258213035736,222.40688567433176],[169.47713501183063,215.96356939871526],[182.19882029298384,215.73001012850216],[195.89078331130557,214.2982898921548],[195.47929417129663,213.86340931517145],[181.74782145336667,214.95741362077732],[170.31017878122015,216.49178432254084],[182.2762389085891,184.8752450214805],[140.2415047021451,145.7465365446632],[154.42996875366381,143.9197741826849],[154.91393138279884,149.13280654298345],[141.72396129164846,149.9605656535211],[220.08708850976743,138.07761761926741],[205.15146906373715,139.45718896085043],[206.5616880820385,144.52238915689745],[219.4980892099413,143.1427807886423]];
var animationRequest;


function createFaceDeformers() {
	fd = new faceDeformer();
	fd.init(webgl_vid);
	wc1 = webgl_vid.getContext('webgl');
	wc1.clearColor(0,0,0,0);
	fd2 = new faceDeformer();
	fd2.init(webgl_vid2);
	wc2 = webgl_vid2.getContext('webgl');
	wc2.clearColor(0,0,0,0);
	fd2.load(document.getElementById('clown'), _clown, pModel);
}

let loadPoisson = function(){
	videoCanvasContext.drawImage(vid, 0, 0, width, height);
	newCanvasContext.drawImage(webgl_vid, 0,0, width, height);
	Poisson.load(newcanvas, videocanvas, maskcanvas, function(){
		let result = Poisson.blend(15, 0, 0);
		if(gotResult === 30){
			console.log(result);
		}
		gotResult++;
		newCanvasContext.putImageData(result, 0, 0);
		if(relativePositions.length){
			fd.load(newcanvas, relativePositions, pModel);
		}
	});
}

let createMasking = function(){
	//maskcanvas, positions
	// maybe relativePositions
	if(relativePositions.length){
		maskCanvasContext.fillStyle="#000000";
		maskCanvasContext.fillRect(0, 0, width, height);
		maskCanvasContext.beginPath();

		maskCanvasContext.moveTo(relativePositions[0][0], relativePositions[0][1]);
		for(let i = 1; i < relativePositions.length; i++){
			maskCanvasContext.lineTo(relativePositions[i][0], relativePositions[i][1]);
		}
		maskCanvasContext.lineTo(relativePositions[0][0], relativePositions[0][1]);
		maskCanvasContext.closePath();
		maskCanvasContext.fillStyle="#ffffff";
		maskCanvasContext.fill();
	}
}


let drawNumbersConverted = function(positions){
	relativePositions = [];
	overlayCC.font = "10px Arial";
	for(let i = 0; i < positions.length; i++){
		let floatX = positions[i][0] / hidVidWidth;
		let floatY = positions[i][1] / hidVidHeight;
		let newX = width * floatX;
		let newY = height * floatY;

		if(i === 27 || i === 32 || i === 62 || i === 57){
			//eyes, nose, mouse
			overlayCC.fillStyle = "white";
		} else {
			overlayCC.fillStyle = "black";
		}

		overlayCC.fillText(i, newX, newY);
		//relativePositions.push([newX, newY]);
	}
}

let getRelativePositions = function(positions){
	relativePositions = [];
	overlayCC.font = "10px Arial";
	for(let i = 0; i < positions.length; i++){
		let floatX = positions[i][0] / hidVidWidth;
		let floatY = positions[i][1] / hidVidHeight;
		let newX = width * floatX;
		let newY = height * floatY;
		if(i === 27 || i === 32 || i === 62 || i === 57){
			overlayCC.fillStyle = "white";
		} else {
			overlayCC.fillStyle = "black";
		}
		//overlayCC.fillText(i, newX, newY);
		relativePositions.push([newX, newY]);
	}
	return relativePositions;
}


function drawMaskLoop() {
	positions = ctrack.getCurrentPosition();
	overlayCC.clearRect(0, 0, width, height);
	relativePositions = getRelativePositions(positions);
	let convergence = ctrack.getConvergence();
	if(convergence < .9 && !maskConverged){
		createMasking();
		loadPoisson();
		findFace();
	}
	if (positions && maskConverged) {
		//fd2.draw(relativePositions);
		fd.draw(relativePositions);
	} else {
		ctrack.draw(overlay);
	}
	animationRequest = requestAnimFrame(drawMaskLoop);
}

function findFace(){
	maskConverged = true;
	directions.innerHTML = "Face found, you can press 'Enter' or 'Spacebar' to re-swap face"
}

let createHiddenWebcam = function(){
	let hidden_vid = document.createElement('video');
	hidden_vid.width = hidVidWidth
	hidden_vid.height = hidVidHeight;
	hidden_vid.loop = true;
	hidden_vid.autoPlay = true;
	hidden_vid.style.display = 'none';
	return hidden_vid;
}


const createNewCanvases = function(){
	newcanvas = document.createElement('CANVAS');
	newcanvas.width = width;
	newcanvas.height = height;
	newCanvasContext = newcanvas.getContext('2d');

	videocanvas = document.createElement('CANVAS');
	videocanvas.width = width;
	videocanvas.height = height;
	videoCanvasContext = videocanvas.getContext('2d');

	maskcanvas = document.createElement('CANVAS');
	maskcanvas.width = width;
	maskcanvas.height = height;
	maskCanvasContext = maskcanvas.getContext('2d');
}


const addKeyEvents = function(){
	document.addEventListener("keydown", keyDownHandler, false);
}

const keyDownHandler = function(e){

	if(maskConverged){
		if(e.keyCode === 13){
			createMasking();
			loadPoisson();
		}
	} else {
		directions.innerHTML = "Hold on a second, trying to find a face!"
	}
}


const initialize = function(){
	webgl_vid = document.getElementById('webgl');
	webgl_vid2 = document.getElementById('webgl2');
	vid.width = width;
	vid.height = height;
	overlay.width = width;
	overlay.height = height;
	webgl_vid.width = width;
	webgl_vid.height = height;
	webgl_vid2.width = width;
	webgl_vid2.height = height;
	ctrack.init(pModel);
	hidden_vid = createHiddenWebcam();
	createNewCanvases();
	navigator.mediaDevices.getUserMedia({ video: true, audio: false})
		.then((stream) => {
			if(vid.mozCaptureStream){
				vid.mozSrcObject = stream;
			} else {
				let src = (window.URL && window.URL.createObjectURL(stream)) || stream;
				hidden_vid.src = src;
				vid.src = src;
			}
			hidden_vid.play();
			vid.play();
		}, (error) => {
			alert(error);
		});
	hidden_vid.addEventListener('canplay', enablestart, false);
	addKeyEvents();
}

initialize();