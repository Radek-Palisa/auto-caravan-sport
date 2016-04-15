// Slogan slide up
$(window).load(function () {
	setTimeout(function () {
		$(".slogan").show("slide", {direction: "down"}, 1500);
	}, 800);
}); 

var $root = $('html, body');

// Smooth scroll to Below Landing Section
$('.arrow-link').click(function() {
	$root.animate({
		scrollTop: $( $.attr(this, 'href') ).offset().top
	}, 600);
	return false;
});

// Hide arrow link
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

// Fallback for non-hover devices
$('.grid__cell').on('click', function(e) {
	//find the current chosen element
	// var currentItem = $(this).siblings('.siblingElements')
	$(this).children().toggleClass('js-slide-in');
});
$(document).on('click', function(event) {
  if (!$(event.target).closest('.grid__container').length) {
	  $('.slide-in').removeClass('js-slide-in');
  }
});
$('.show-slides').on('click', function(e){
	$('.slide-in').toggleClass('js-slide-in');
});

// Debounce function to improve performance on scroll listener
// https://davidwalsh.name/javascript-debounce-function
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

var myEfficientFn = debounce(function() {
	
	// Header disappers with scroll down
	if ($(this).scrollTop()> $('.header__wrapper').height())
	 {
		$('.header__banner').slideUp(500);
	 }
	else
	 {
	  $('.header__banner').slideDown(500);
	 }
}, 200);

window.addEventListener('scroll', myEfficientFn);

// Toggle function for Soucasne k prodeji vs Predchozi prace
$(document).ready(function(){
	$(".nabidka-nav h1").click(function(e){
		if (!$(this).hasClass("active")) {
			$(".header").toggleClass("header--nabidka-bg header--predchoziprace-bg");
			$(".nabidka-nav h1,.nabidka-tabs section").toggleClass("active non-active");
		}
	});
});

// Tabs for Gallery
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