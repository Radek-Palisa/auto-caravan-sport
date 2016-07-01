



if (window.matchMedia('(min-width: 1000px)').matches) {
	var headerHeight = 51;
	} else {
		headerHeight = 0;
	}

$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top - headerHeight
        }, 900);
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
// --- Tabs for Gallery ---
//
$(".btn-galerie-show").on('click', function() {
	$(this).parent().next().slideToggle(600);
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
// Parallax Variables
//
var windowHeight = $(window).height();

// Parallax sliding - jumbotron section
var $jumbotron = $('.jumbotron');
var jumboHeight = $jumbotron.outerHeight();

// Parallax sliding - Presentation section vars
var $pres = $('.presentation');
var $upperPane = $('.upperPane');
var $bottomPane = $('.bottomPane');
var bottomPaneTop = $bottomPane.offset().top;
var bottomPaneHeight = $bottomPane.outerHeight();
var bottomPaneOffView = bottomPaneTop + bottomPaneHeight;
var presTop = $pres.offset().top;
var presInView = Math.max((presTop - windowHeight), 0);
var presHeight = $pres.outerHeight();
var presOffView = presTop + presHeight;

// Parallax sliding - About Section vars
var $about = $('.about');
var aboutTop = $about.offset().top;
var aboutInView =  aboutTop - windowHeight;
var aboutHeight = $about.outerHeight();
var aboutOffView = aboutTop + aboutHeight;


function parallax() {
	//$(window).on('scroll', function(){
		var wScroll = $(document).scrollTop();
		var headerPos = 0;
		var bgPosPres;
		var bgPosPresBottom;
		var bgPosAbout = -550;

		// Nav to shrink
		if (wScroll > 350) {
			$('.site-header').addClass('site-header--js-narrowed');
		} else {
			$('.site-header').removeClass('site-header--js-narrowed');
		}

		// Parallax scrolling
		if (wScroll >= 0 && wScroll < jumboHeight) {
			//headerPos = (headerPos+(wScroll/3.5)).toFixed(2);
			headerPos = (wScroll/3.5).toFixed(2);
			//headerPos = (-(headerPos+(wScroll/1.5))).toFixed(2);
			 //var headerPos = (-(wScroll/1.5)).toFixed(2);
		}
		$jumbotron.css('background-position', '50% '+headerPos+'px');

		if (wScroll >= presInView && wScroll < presOffView) {
			bgPosPres = (-449+((wScroll-presInView)/3.5)).toFixed(2);
			bgPosPresBottom = (-902+((wScroll-presInView)/3.5)).toFixed(2);
			//bgPosPres = (200-((wScroll-presInView)/1.5)).toFixed(2);
			//bgPosPresBottom = (200-((wScroll-presInView)/1.5)).toFixed(2);
		}

		$upperPane.css('background-position', 'center '+bgPosPres+'px');
		$bottomPane.css('background-position', 'center '+bgPosPresBottom+'px');

		if (wScroll >= aboutInView && wScroll < aboutOffView) {
			bgPosAbout = (bgPosAbout+((wScroll-aboutInView)/3.5)).toFixed(2);
		}
		$about.css('background-position', '35% '+bgPosAbout+'px');
		
	//});
};

$(document).ready(function() {
	if (window.matchMedia('(min-width: 1000px)').matches) {
		//parallax();
		var didScroll = false;

		window.onscroll = doThisStuffOnScroll;

		function doThisStuffOnScroll() {
		    didScroll = true;
		}

		setInterval(function() {
		    if(didScroll) {
		        didScroll = false;
		        parallax();
		    }
		}, 10);
	};
});

$( window ).resize(function() {
	if (window.matchMedia('(min-width: 1000px)').matches) {
		// updating values in variables on resize
		windowHeight = $(window).height();
		presTop = $pres.offset().top;
		presInView = Math.max((presTop - windowHeight), 0);
		presHeight = $pres.outerHeight();
		presOffView = presTop + presHeight;
		aboutTop = $about.offset().top;
		aboutInView =  aboutTop - windowHeight;
		aboutHeight = $about.outerHeight();
		aboutOffView = aboutTop + aboutHeight;
		// running function
		parallax();
	} else {
		$(window).off('scroll');
	}
});

//
// Presentation Tabbing
//

var $rightPane = $('.rightPane');
var $presBtn1st = $('.presBtn__1st');
var $presBtn = $('.presBtn__2nd');


$('.leftPane__presBtn').on('click', function (){
	var wScrollB = $(document).scrollTop();

	$rightPane.slideToggle(900);
	if ($presBtn.hasClass('presBtn--rotated') == true) {
		$('html, body').animate({scrollTop: wScrollB-604}, 1000)
	}

	$presBtn.toggleClass('presBtn--rotated');
	$presBtn1st.toggleClass('presBtn__1st--rotated');

	setTimeout(
		function() {
			$('.leftPane__presBtn p').text(function(i, text){
				return text === "Zavřít" ? "Více" : "Zavřít";
			});
		}, 800);
	
	if ($presBtn.hasClass('presBtn--rotated') == true) {
		presOffView = presOffView + 630;
		aboutInView = aboutInView + 630;
		aboutOffView = aboutOffView + 630;
	} else {
		presOffView = presOffView - 630;
		aboutInView = aboutInView - 630;
		aboutOffView = aboutOffView - 630
	}
});

$('.leftPane__presBtn').hover(function(){
	if (!$presBtn.hasClass('presBtn--rotated')) {
		$('.bottomPane').dequeue().stop().animate({ marginTop: "5px" });
	}
}, function() {
	$('.bottomPane').animate({ marginTop: "0" }, "normal", "linear");
});




