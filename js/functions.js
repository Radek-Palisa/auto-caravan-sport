$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top - 51
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

// Parallax sliding - jumbotron section

var $jumbotron = $('.jumbotron');

// Parallax sliding - Presentation section vars
var $pres = $('.presentation');
var $upperPane = $('.upperPane');
var $bottomPane = $('.bottomPane');
var presTop = $pres.offset().top;
var presInView = presTop - windowHeight;
var presHeight = $pres.outerHeight();
var presOffView = presTop + presHeight;

// Parallax sliding - About Section vars
var $about = $('.about');
var aboutTop = $about.offset().top;
var presOpen = $('.rightPane').outerHeight();
var aboutInView =  aboutTop - presOpen - windowHeight;
var aboutHeight = $about.outerHeight();
var aboutOffView = aboutTop + aboutHeight;

	$(window).bind('scroll', function(){
		var wScroll = $(document).scrollTop();
		var headerPos = 0;
		var bgPosPres = -449;
		var bgPosPresBottom = -902;

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

		if (wScroll >= 0) {
			headerPos = headerPos+(wScroll/3);
		}
		$jumbotron.css('background-position', '25% '+headerPos+'px');


		if (wScroll >= presInView) {
			bgPosPres = bgPosPres+((wScroll-presInView)/3);
			bgPosPresBottom = bgPosPresBottom+((wScroll-presInView)/3);
		}

		$upperPane.css('background-position', 'center '+bgPosPres+'px');
		$bottomPane.css('background-position', 'center '+bgPosPresBottom+'px');
		
		var bgPosAbout = 350;
		
		if (wScroll >= aboutInView) {
			bgPosAbout = bgPosAbout+((wScroll-aboutInView)/3);
		}
		$about.css('background-position', '35% '+bgPosAbout+'px');
		
	});

// Presentation Tabbing

var $rightPane = $('.rightPane');
//$rightPane.addClass('rightPane--js-hidden');

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
});

$('.leftPane__presBtn').hover(function(){
	if (!$presBtn.hasClass('presBtn--rotated')) {
		$('.bottomPane').dequeue().stop().animate({ marginTop: "5px" });
	}
}, function() {
	$('.bottomPane').animate({ marginTop: "0" }, "normal", "linear");
});