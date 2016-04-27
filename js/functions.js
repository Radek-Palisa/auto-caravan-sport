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
// --- Hide arrow link ---
//
/* 
$(window).bind('scroll', function() {
	if ($(window).scrollTop() > 200) {
		$('.arrow-link').hide(150);
	}
	else {
		$('.arrow-link').show();
	}
});
*/

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
var hideHeader = debounce(function() {
	
	if ($(this).scrollTop()> $('.header__wrapper').height())
	 {
		$('.header__banner').slideUp(500);
	 }
	else
	 {
	  $('.header__banner').slideDown(500);
	 }
}, 200);

/*
var showArticles = debounce(function(){
	
	if ($(this).scrollTop()> $('.landing-page').height()*0.75)
	 {
		$('.homepage-article').fadeIn(700);
	 }
}, 200);
*/
var $animation_elements = $('.below-landing__content');
var $window = $(window);
var $parent_element = $('.below-landing');
/*
function showArticles() {
	var window_height = $window.height();
	var window_top_position = $window.scrollTop();
	var window_bottom_position = (window_top_position + window_height);
    var $element = $('.below-landing__content');
    var element_height = $element.outerHeight();
    var element_top_position = $element.offset().top;
    var element_bottom_position = (element_top_position + element_height);
	var parent_height = $parent_element.outerHeight();
	var parent_top_position = $parent_element.offset().top;
    var element_bottom_within_parent = parent_top_position + 100 + element_height;
	var element_half_within_parent = parent_top_position + 100 + (element_height/2);
 	/*
	if (element_half_within_parent <= window_bottom_position){
		$(".homepage-article").each(function(index) {
			$(this).delay(200*index).fadeTo(1000, 1);
		});
	}
	*/
	/*
    if ((element_bottom_within_parent <= window_bottom_position) && (parent_top_position + (parent_height*0.9) >= window_bottom_position)) { 	
		$element.css({
			'position': 'fixed',
			'top': 'auto',
			'bottom': '0'})
	} else if (parent_top_position + (parent_height*0.9) < window_bottom_position) {
		$element.css({
			'position': 'absolute',
			'top': 'auto',
			'bottom': '10%'})
	} else {
		$element.removeAttr('style');
	}
	*/
//};

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
var $homepageArticle = $('.homepage-article');

	$(window).bind('scroll', function(){
		var offset = $(document).scrollTop()
			,opacity = 0;
		if (offset >= fadeUntil) {
			opacity = 1;
		} else if (offset <= fadeUntil && offset >= 0) {
			opacity = 0+offset/fadeUntil;
		}
		revealing.css('opacity', opacity);
		$homepageArticle.css('opacity', '0');
		
		if (offset >= windowHalf) {
			$(".homepage-article").each(function(index) {
			$(this).delay(200*index).fadeTo(1000, 1);
		});
		}
	});