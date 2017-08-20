(function ($) {
	"use strict";
	
	//Hide Loading Box (Preloader)
	function handlePreloader() {
		if($('.preloader').length){
			$('.preloader').delay(2000).fadeOut(2000);
		}
	}
	// count down timer function
	function countdownTimer () {
		var countDownContainer = $('.count-down');
		if (countDownContainer.length) {
			countDownContainer.countdown({
				date: "December 31, 2015 23:59:59"
			});
		};
	}
	// sticky header 
	function stickyHeader () {
		var headerScrollPos = $('header').next().offset().top;
		if($(window).scrollTop() > headerScrollPos) {
			$('header').addClass('header-fixed gradient-overlay'); 
		}
		else if($(this).scrollTop() <= headerScrollPos) {
			$('header').removeClass('header-fixed gradient-overlay'); 
		}
	}
	function SmoothMenuScroll () {
		var anchor = $('.scrollToLink');
		if(anchor.length){
			anchor.children('a').bind('click', function (event) {
				var headerH = '95';
				var target = $(this);
				$('html, body').stop().animate({
					scrollTop: $(target.attr('href')).offset().top - headerH + 'px'
				}, 1200, 'easeInOutExpo');
				anchor.removeClass('current');
				target.parent().addClass('current');
				event.preventDefault();
			});
		}
	}
	// adding active class to menu while scroll to section
	function OnePageMenuScroll () {
	    var windscroll = $(window).scrollTop();
	    if (windscroll >= 100) {
	    	$('.mainmenu .scrollToLink').find('a').each(function (){
	    		// grabing section id dynamically
	    		var sections = $(this).attr('href');
		        $(sections).each(function() {
		        	// checking is scroll bar are in section
		            if ($(this).offset().top <= windscroll + 100) {
		            	// grabing the dynamic id of section
		        		var Sectionid = $(sections).attr('id');
		        		// removing current class from others
		        		$('.mainmenu').find('li').removeClass('current');
		        		// adding current class to related navigation
		        		$('.mainmenu').find('a[href=#'+Sectionid+']').parent().addClass('current');
		            }
		        });
	    	});
	    } else {
	        $('.mainmenu li.current').removeClass('current');
	        $('.mainmenu li:first').addClass('current');
	    }
	}
	// gallery fancybox activator 
    function GalleryFancyboxActivator () {
    	var galleryFcb = $('.fancybox');
    	if(galleryFcb.length){
    		galleryFcb.fancybox();
    	}
    }
    // upcoming event filter 
    function upcomingEventFilter () {
    	var upcomingEventFilterContent = $('#upcoming-event .tab-content-wrap');
    	if (upcomingEventFilterContent) {
	    	upcomingEventFilterContent.mixItUp();
    	};
    }
    // testimonial slider 
    function testimonialSlide () {
    	var sliderContainer = $('.testimonial-slide');
    	var customPager = $('.testimonial.custom-pager li[data-slide-index]');
    	if (sliderContainer.length) {
    		var slider = sliderContainer.bxSlider({
    			auto: true,
				autoControls: false,
				controls: false,
				pager: false,
				autoHover: true,
		    	minSlides: 1,
		    	onSlideNext: function () {
		    		var current = slider.getCurrentSlide();		    		
					customPager.each(function () {
						var Slef = $(this);
						var slideIndex = $(this).data('slide-index');
						if (slideIndex === current) {
							customPager.removeClass('active');
							Slef.addClass('active');
						}
					});
		    	}
			});
			customPager.each(function () {
				var slideIndex = $(this).data('slide-index');
				$(this).on('click', function () {
					customPager.removeClass('active');
					$(this).addClass('active');
					slider.goToSlide(slideIndex);
				});
			});
			$('#testimonials .custom-pager li.prev').on('click', function () {
			    var current = slider.getCurrentSlide();
			    slider.goToPrevSlide(current) - 1;
			});
			$('#testimonials .custom-pager li.next').on('click', function () {
			    var current = slider.getCurrentSlide();
			    slider.goToNextSlide(current) + 1;
			});
    	};
    }
    // sponsor logo carosule
    function sponsorLogo () {
    	var sponsorLogoContainer = $('.sponsor-logo');
    	if (sponsorLogoContainer.length) {
    		sponsorLogoContainer.owlCarousel({
			    loop: true,
			    margin: 100,
			    nav: true,
			    dots: false,
			    autoWidth: true,
	            navText: [
	                '<i class="fa fa-angle-left"></i>',
	                '<i class="fa fa-angle-right"></i>'
	            ],
	            autoplay:true,
			    autoplayTimeout:3000,
			    autoplayHoverPause:true,
			    responsive: {
			        0:{
			            items:1
			        },
			        480:{
			            items:2
			        },
			        600:{
			            items:3
			        },
			        1000:{
			            items:4
			        }
			    }
			});
    	}
    }
    // twitter feed widget 
    function twitterFeedWidget () {
    	if ($('.twitter').length) {
    		$.ajax({
	            method: "POST",
	            url: "includes/twitter/tweet-api.php",
	            data: {}
	        })
	        .done(function(msg) {
	            $(".twitter").append(function () {
	            	return msg;
	            });
	        });
    	};
    }
    function CounterNumberChanger () {
		var timer = $('.timer');
		if(timer.length) {
			timer.each(function () {
				$(this).appear(function () {
					var value = $(this).text();
					$(this).countTo({
						from: 1,
						to: value,
						speed: 3000
					});
				});
			});
		}

	}
	function expertizeRoundCircle () {
		var rounderContainer = $('.single-expertize .icon');
		if (rounderContainer.length) {
			rounderContainer.each(function () {
				var Self = $(this);
				var value = Self.data('value');
				var size = Self.parent().width();
				var color = Self.data('fg-color');

				Self.find('span').each(function () {
					var expertCount = $(this);
					expertCount.appear(function () {
						expertCount.countTo({
							from: 1,
							to: value*100,
							speed: 3000
						});
					});

				});
				Self.appear(function () {					
					Self.circleProgress({
						value: value,
						size: size,
						thickness: 20,
						emptyFill: 'rgba(0, 0, 0, .0)',
						animation: {
							duration: 3000
						},
						fill: {
							color: color
						}
					});
				});
			});
		};
	}
	function featureListTab () {
		var tabContent = $('.tab-row');
		if (tabContent.length) {
			tabContent.find('.tab-content-box').hide();
			tabContent.find('.tab-content-box').eq(0).show();
			tabContent.find('.tab-title li span').on('click', function () {
				tabContent.find('.tab-title li span').removeClass('active');
				$(this).addClass('active');
				var tabName = $(this).data('tab-name');
				tabContent.find('.tab-content-box').hide();
				tabContent.find('.tab-content-box.'+ tabName).fadeIn(500);
			});
		};
	}
	function DeadMenuConfig () {
		var deadLink = $('.mainmenu li.deadlink');
		if(deadLink.length) {
			deadLink.each(function () {
				$(this).children('a').on('click', function() {
					return false;
				});
			});
		}
	}
	// revolution slider 
	function revolutionSliderActiver () {
		var banner = $('#banner .banner');
		if (banner.length) {
			banner.revolution({
				delay:5000,
				startwidth:1170,
				startheight:820,
				startWithSlide:0,

				fullScreenAlignForce:"on",
				autoHeight:"off",
				minHeight:"off",

				shuffle:"off",

				onHoverStop:"on",


				hideThumbsOnMobile:"off",
				hideNavDelayOnMobile:1500,
				hideBulletsOnMobile:"off",
				hideArrowsOnMobile:"off",
				hideThumbsUnderResoluition:0,

				hideThumbs:1,
				hideTimerBar:"on",

				keyboardNavigation:"on",

				navigationType:"bullet",
				navigationArrows: "nexttobullets",
				navigationStyle:"preview4",

				navigationHAlign:"center",
				navigationVAlign:"bottom",
				navigationHOffset:30,
				navigationVOffset:30,

				soloArrowLeftHalign:"left",
				soloArrowLeftValign:"center",
				soloArrowLeftHOffset:20,
				soloArrowLeftVOffset:0,

				soloArrowRightHalign:"right",
				soloArrowRightValign:"center",
				soloArrowRightHOffset:20,
				soloArrowRightVOffset:0,


				touchenabled:"on",
				swipe_velocity:"0.7",
				swipe_max_touches:"1",
				swipe_min_touches:"1",
				drag_block_vertical:"false",

				parallax:"mouse",
				parallaxBgFreeze:"on",
				parallaxLevels:[10,7,4,3,2,5,4,3,2,1],
				parallaxDisableOnMobile:"off",

				stopAtSlide:-1,
				stopAfterLoops:-1,
				hideCaptionAtLimit:0,
				hideAllCaptionAtLilmit:0,
				hideSliderAtLimit:0,

				dottedOverlay:"none",

				spinned:"spinner4",

				fullWidth:"on",
				forceFullWidth:"on",
				fullScreen:"off",
				fullScreenOffsetContainer:"#banner",
				fullScreenOffset:"0px",

				panZoomDisableOnMobile:"off",

				simplifyAll:"off",

				shadow:0

			});
		};
	}
	// wow activator 
	function wowActivator () {
		var wow = new WOW ({
    		offset: 0
    	});
    	wow.init();
	}
	// mobile menu config
	function mobileMenuConfig () {
		var menuContainer = $('nav.mainmenu-container');
		if (menuContainer.length) {
			menuContainer.find('ul .dropdown').children('a').append(function () {
				return '<i class="fa fa-bars"></i>';
			});
			menuContainer.find('.fa').on('click', function () {
				$(this).parent().parent().children('ul').slideToggle(300);
				return false;
			});
			menuContainer.find('.nav-toggler').on('click', function () {
				$(this).parent().children('ul').slideToggle();
			});
			menuContainer.find('ul .nav-closer').on('click', function () {
				$(this).parent('ul').slideToggle();
			});
		};
	}
	//Contact Form Validation
	function contactFormValidation () {
		if($('.contact-form').length){
			$('.contact-form').validate({ // initialize the plugin
				rules: {
					name: {
						required: true
					},
					email: {
						required: true,
						email: true
					},
					message: {
						required: true
					},
					subject: {
						required: true
					}
				},
				submitHandler: function (form) { 
					// sending value with ajax request
					$.post($(form).attr('action'), $(form).serialize(), function (response) {
						$(form).parent('div').append(response);
						$(form).find('input[type="text"]').val('');
						$(form).find('input[type="email"]').val('');
						$(form).find('textarea').val('');
					});
					return false;
				}
			});
		}
	}

	// doc ready
	$(document).on('ready', function () {
		countdownTimer();
		SmoothMenuScroll();
		GalleryFancyboxActivator();
		upcomingEventFilter();
		testimonialSlide();
		sponsorLogo();
		twitterFeedWidget();
		CounterNumberChanger();
		expertizeRoundCircle();
		featureListTab();
		DeadMenuConfig();
		revolutionSliderActiver();
		wowActivator();
		mobileMenuConfig();
		contactFormValidation();
	});
	// window load
	$(window).on('load', function () {
		handlePreloader();
	});
	// window scroll
	$(window).on('scroll', function () {
		stickyHeader();
		OnePageMenuScroll();
	});

})(jQuery);