$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
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
// --- Tabs for Gallery ---
//
$(document).ready(function(){
	$("#galerie__menu li").click(function(e){
		if (!$(this).hasClass("active")) {
			var tabNum = $(this).index() + 1;
			$("#galerie__menu li.active").removeClass("active");
			$(this).addClass("active");
			$("#galerie__tabs section.active").removeClass("active");
			$("#galerie__tabs section:nth-child("+tabNum+")").addClass("active");
		}
	});
});

var $window = $(window);
var windowHeight = $window.height();
var $logo = $('.logo');


// Parallax sliding - Presentation section vars
var $pres = $('.presentation');
var presTop = $pres.offset().top;
var presInView = presTop - windowHeight;
var presHeight = $pres.outerHeight();
var presOffView = presTop + presHeight;

// Parallax sliding - About Section vars
var $about = $('.about');
var aboutTop = $about.offset().top;
var jsElHeight = $('.js-el-height').outerHeight() * 4;
var aboutInView =  aboutTop - jsElHeight - windowHeight;
var aboutHeight = $about.outerHeight();
var aboutOffView = aboutTop + aboutHeight;

	$(window).bind('scroll', function(){
		var wScroll = $(document).scrollTop();
		var headerPos = -50;
		var bgPosPres = 150;
		
		/*
		if (offset > 0) {
			headerPos = Math.min(1000,-50+(offset/3.5));
		}
		$logo.css('transform', 'translate(-50%,'+headerPos+'%)');
		*/

		if (wScroll >= presInView) {
			bgPosPres = bgPosPres-((wScroll-presInView)/6);
		}
		$pres.css('background-position', 'center '+bgPosPres+'%');

		var bgPosAbout = 210;

		if (wScroll >= aboutInView) {
			bgPosAbout = bgPosAbout-((wScroll-aboutInView)/6);
		}
		$about.css('background-position', 'center '+bgPosAbout+'%');
	});
