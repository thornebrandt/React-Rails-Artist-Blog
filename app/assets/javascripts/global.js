document.addEventListener("turbolinks:load", function(e) {
	refreshCodeHighlighting();
	setupMobileMenu();
	setupGoogleAnalytics(e);
});

document.addEventListener("DOMContentLoaded", function() {
	setupMobileMenu();
});

window.addEventListener("resize", function() {
	setupMobileMenu();
});


var mobileMenuHandler = function(e) {
	e.preventDefault();
	var nav = document.getElementById("nav");
	if (nav.classList.contains('opened')) {
	    nav.classList.remove('opened');
	    nav.classList.add('closed');
	} else {
	    nav.classList.remove('closed');
	    nav.classList.add('opened');
	}
}

function setupMobileMenu() {
	var mobile_menu_btn = document.getElementById("mobile_menu");
	if(mobile_menu_btn){	
		mobile_menu_btn.removeEventListener('click', mobileMenuHandler, false);
		mobile_menu_btn.addEventListener('click', mobileMenuHandler, false);
	}
}

function setupGoogleAnalytics(e) {
	if(typeof ga == 'function'){
		ga('set', 'location', e.data.url)
		ga('send', 'pageview', location.pathname + location.search);
	}
}

function refreshCodeHighlighting() {
	if(typeof hljs !== 'undefined'){
		var codeSegments = document.querySelectorAll('pre code');
		for(var i = 0; i < codeSegments.length; i++){
			window.codeSegment = codeSegments[i];
			hljs.initHighlighting.called = false;
			hljs.highlightBlock(codeSegments[i]);
		}
	}
}






