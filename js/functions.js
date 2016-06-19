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
// --- Responsive Nav ---
//
$('.menu-icon').on('click', function() {
	$(this).toggleClass('menu-icon--activated');
	$('.nav__ul').toggleClass('nav__ul--activated');
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
	$(".btn-galerie-show").click(function(e){
		$(this).parent().next().slideToggle(600);
	});
});

var $window = $(window);
var windowHeight = $window.height();
var $logo = $('.logo');

// Parallax sliding - header section

var $header = $('.header');

// Parallax sliding - Presentation section vars
var $pres = $('.presentation__content');
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
		var headerPos = 35;
		var bgPosPres = 130;

		// Nav to shrink
		//$(window).resize(function() {
			if ($(window).width() >= 1000) {
				if (wScroll > 250) {
					$('.site-header').addClass('site-header--js-narrowed');
				} else {
					$('.site-header').removeClass('site-header--js-narrowed');
				}
			}
		//});

		/*
		if (wScroll > 0) {
			headerPos = headerPos-(wScroll/3);
		}
		$header.css('background-position', 'center '+headerPos+'%');
		*/
		if (wScroll >= presInView) {
			bgPosPres = bgPosPres-((wScroll-presInView)/8);
		}
		$pres.css('background-position', 'center '+bgPosPres+'%');

		var bgPosAbout = 210;

		if (wScroll >= aboutInView) {
			bgPosAbout = bgPosAbout-((wScroll-aboutInView)/6);
		}
		$about.css('background-position', 'center '+bgPosAbout+'%');
	});

// Presentation Tabbing

var $rightPane = $('.presentation__content ul');
//$rightPane.addClass('rightPane--js-hidden');

var $presBtn1st = $('.presBtn__1st');
var $presBtn = $('.presBtn__2nd'); 



$('.leftPane__presBtn').on('click', function (){

	var wScrollB = $(document).scrollTop();

	$rightPane.slideToggle(1000);
	if ($presBtn.hasClass('presBtn--rotated') == true) {
		$('html, body').animate({scrollTop: wScrollB-604}, 1000)
	}

	$presBtn.toggleClass('presBtn--rotated');
	$presBtn1st.toggleClass('presBtn__1st--rotated');

});
