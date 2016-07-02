$(document).ready(function() {

	if (window.matchMedia('(min-width: 1000px)').matches) {
		var headerHeight = 52;
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
	var $menuButton = $('.menu-icon button');
	$menuButton.on('click', function() {
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
	// Parallax sliding - jumbotron section
	//
	var $siteHeader = $('.site-header');
	var $jumbotron = $('.jumbotron');
	var jumboHeight = $jumbotron.outerHeight();

	function parallax() {
			var wScroll = $(document).scrollTop();
			var headerPos;

			// Parallax scrolling		
			if (wScroll >= 0 && wScroll < jumboHeight) {
				var headerPos = (50-(wScroll/1.5)).toFixed(2);
			}
			if (window.matchMedia('(max-width: 1600px)').matches) {
				$jumbotron.css('background-position', '20% '+headerPos+'px');
			} else {
				$jumbotron.css('background-position', '50% '+headerPos+'px');
			}
			// shrink nav
			if (wScroll > 440) {
				$siteHeader.addClass('site-header--js-narrowed');
			} else {
				$siteHeader.removeClass('site-header--js-narrowed');
			}
	};


	var didScroll = false;

	function doThisStuffOnScroll() {
		didScroll = true;
		}
	
	if (window.matchMedia('(min-width: 1000px)').matches) {
		window.onscroll = doThisStuffOnScroll;
		setInterval(function() {
		    if(didScroll) {
		        didScroll = false;
		        parallax();
		    }
		}, 10);
	};

	$( window ).resize(function() {
		if (window.matchMedia('(min-width: 1000px)').matches) {
			jumboHeight = $jumbotron.outerHeight();
			window.onscroll = doThisStuffOnScroll;
			setInterval(function() {
			    if(didScroll) {
			        didScroll = false;
			        parallax();
			    }
			}, 10);

			headerHeight = 52;
		} else {
			window.onscroll = null;
			$jumbotron.css('background-position', '13% 0');

			headerHeight = 0;
		}
	});

	//
	// Presentation Tabbing
	//

	var $middlePane = $('.middlePane');
	var $presBtn1st = $('.presBtn__1st');
	var $presBtn = $('.presBtn__2nd');


	$('.leftPane__presBtn').on('click', function (){
		var wScrollB = $(document).scrollTop();

		$middlePane.slideToggle(900);
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
}); // .ready end






