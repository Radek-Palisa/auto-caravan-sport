//
// --- Smooth scroll to Below Landing Section ---
//
var $root = $('html, body');

$('.arrow-link').click(function() {
	$root.animate({
		scrollTop: $( $.attr(this, 'href') ).offset().top
	}, 1500, 'easeOutQuart');
	return false;
});

//
// --- Fallback for non-hover devices ---
//
$('.grid__cell').on('click', function(e) {
	//find the current chosen element
	// var currentItem = $(this).siblings('.siblingElements')
	$(this).children().toggleClass('js-slide-in');
	$('.show-slides__txt').text('Ukaž vše');
});
$(document).on('click', function(event) {
  if (!$(event.target).closest('.grid__container').length) {
	  $('.slide-in').removeClass('js-slide-in');
	  $('.show-slides__txt').text('Ukaž vše');
  }
});

//
// --- Button to show/hide all slide-ins ---
//
$('.show-slides').on('click', function(e) {
	if ($('.slide-in').length === $('.js-slide-in').length) {
		$('.slide-in').removeClass('js-slide-in');
		$('.show-slides__txt').text('Ukaž vše');
	}
	else {
		$('.slide-in').addClass('js-slide-in');
		$('.show-slides__txt').text('Nechci číst');
	}
});

//
// --- Debounce function to improve performance on scroll listener
// https://davidwalsh.name/javascript-debounce-function
//
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

//
// --- Hide Header with Scroll Down ---
//
/*
var hideHeader = debounce(function() {
	
	if ($(this).scrollTop()> $('.header__wrapper').height())
	 {
		$('.header__banner').fadeOut(500);
	 }
	else
	 {
	  $('.header__banner').fadeIn(500);
	 }
}, 200);
*/
//
// --- Toggle function for Soucasne k prodeji vs Predchozi prace
$(document).ready(function(){
	$(".nabidka-nav h1").click(function(e){
		if (!$(this).hasClass("active")) {
			$(".header").toggleClass("header--nabidka-bg header--predchoziprace-bg");
			$(".nabidka-nav h1,.nabidka-tabs section").toggleClass("active non-active");
		}
	});
});

//
// --- Tabs for Gallery ---
//
$(document).ready(function(){
	$("#gallery-nav li").click(function(e){
		if (!$(this).hasClass("active")) {
			var tabNum = $(this).index() + 1;
			$("#gallery-nav li.active").removeClass("active");
			$(this).addClass("active");
			$("#tab-wrapper article.active").removeClass("active");
			$("#tab-wrapper article:nth-child("+tabNum+")").addClass("active");
		}
	});
});

var fadeInStart = 0 // 100px scroll or less will equiv to 1 opacity
	,fadeUntil= 500 // 200px scroll or more will equiv to 0 opacity
	,revealing = $('#home-page')
	,fadingStart = 700
	,fadingEnd = 1050;
var $window = $(window);
var windowHalf = $window.height() / 2;
var $jumbotron = $('.jumbotron');
var $logo = $('.logo');
var $belowLanding = $('.below-landing');
var $homepageArticle = $('.homepage-article');
$homepageArticle.css('opacity', '0');

	$(window).bind('scroll', function(){
		var offset = $(document).scrollTop();
		var opacity = 0.6;
		var headerPos = -50;
		
		if (offset > 0) {
			headerPos = Math.min(1000,-50+(offset/3));
		}
		
		if (offset >= fadeUntil) {
			opacity = 0.9;
		} else if (offset <= fadeUntil) {
			opacity = Math.min(0.9, 0.6+offset/fadeUntil);
		}
		$logo.css('transform', 'translate(-50%,'+headerPos+'%)');
		revealing.css('background-color', 'rgba(0,0,0, '+ opacity +'');
		
		if (offset >= windowHalf) {
			$homepageArticle.each(function(index) {
			$(this).delay(200*index).fadeTo(1000, 1);
		});
		}
		/*
		if (offset >= $window.height()) {
			$jumbotron.addClass('jumbotron--undock');
		} else {
			$jumbotron.removeClass('jumbotron--undock');
		}
		*/
	});

function SlideUpOnLoad() {
	$belowLanding.addClass('slide-up');
}
setTimeout(SlideUpOnLoad,1000)