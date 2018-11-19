(function($){
    $(window).load(function(){
        $("a[rel='m_PageScroll2id']").mPageScroll2id({
				    offset:0,
				    highlightClass:"panel__el--active",
				    onComplete:function(){
				    	//$('.header-navs').hide();
				    }
				});
    });
 })(jQuery);

$(document).ready(function () {
	$('.panel__el').on('click', function (e) {
	e.preventDefault();

	$('html, body').animate({
		scrollTop: $($(this).attr('href')).offset().top - 0
	}, 500, 'linear');
});
	//scroll to id

	//scroll to id===end

	//3d effect
	$('.command__el').tilt({
		maxTilt:25,
		perspective:2600
	});
	//3d effect===end

	//tab
	$('.tabs-head__el').click(function(){
		$('.tabs-head__el').removeClass('tabs-head__el--active');
		$(this).addClass('tabs-head__el--active');
		var current = $(this).index();
		$('.tabs-content-wrap').each(function(){
			$(this).index();
			if($(this).index()===current+1){
				$(this).find('.tabs-content').addClass('tabs-content--active');
			}else{
				$(this).find('.tabs-content').removeClass('tabs-content--active');
			}
		})
	});
	//tab===end

	//animate-header
	var shrinkHeader = 50;
	var heightHeader=$('.header-wrap').height();
	$(window).scroll(function() {
		var scroll = $(this).scrollTop();
		if ( scroll >= shrinkHeader ) {
				$('body').css('paddingTop',heightHeader);
				$('.header-wrap').addClass('shrink');
			}
			else {
					$('body').css('paddingTop',0);
					$('.header-wrap').removeClass('shrink');
			}
	});

	$(window).resize(function(){
		heightHeader=$('.header-wrap').height();
	});
	//animate-header===end

	//modals
	var modalState = {
		"isModalShow": false, //state show modal
		"scrollPos": 0
	};
	$('.modal-filter').click(function (event) {
		event.stopPropagation();
		console.log(this);
	});

	var openModal = function () {
		if (!$('.modal-layer').hasClass('modal-layer-show')) {
			$('.modal-layer').addClass('modal-layer-show');
			modalState.scrollPos = $(window).scrollTop();
			$('body').css({
				overflow: 'hidden',
				position: 'fixed',
				overflowY: 'hidden',
				top: -modalState.scrollPos,
				width: '100%'
			});
		}
		modalState.isModalShow = true;
	};

	var closeModal = function () {
		$('.modal-layer').removeClass('modal-layer-show');
		$('body').css({
			overflow: '',
			position: '',
			top: modalState.scrollPos
		});
		$(window).scrollTop(modalState.scrollPos);
		$('.modal').removeClass('modal__show');
		modalState.isModalShow = false;
	};

	var initModal = function (el) {
		openModal();
		$('.modal').each(function () {
			if ($(this).data('modal') === el) {
				$(this).addClass('modal__show')
			} else {
				$(this).removeClass('modal__show')
			}
		});
		var modalHeightCont = $(window).height();
		$('.modal-filter').height(modalHeightCont);

	};

	$('.modal-get').click(function () {
		var currentModal = $(this).data("modal");
		initModal(currentModal);
	});

	$('.modal-filter , .modal-close').click(function () {
		closeModal();
	});
	//modals===end

	var currentSize = $(window).width();
	//mobile slider
	var sliderMobile = function(){
			if( currentSize < 641){
					$('.slider').not('.slick-initialized').slick({
						responsive: [
							{
								breakpoint: 9999,
								settings: "unslick"
							},
							{
								breakpoint: 640,
								settings: {
									slidesToShow: 1,
									slidesToScroll: 1,
									arrows: false,
									dots: true
								}
							}
						]
					});
			}
	};

	sliderMobile();


	$(window).resize(function(){
		var currentSize = $(window).width();
		sliderMobile();
		return currentSize;
	});
	$('.slider-control--right').click(function(){
		$(".slider").slick('slickNext');
	});

	$('.slider-control--left').click(function(){
		$(".slider").slick('slickPrev');
	});
	//mobile slider === end




	function detectIE() {
		var ua = window.navigator.userAgent;

		var msie = ua.indexOf('MSIE ');
		if (msie > 0) {
			// IE 10 or older => return version number
			return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
		}

		var trident = ua.indexOf('Trident/');
		if (trident > 0) {
			// IE 11 => return version number
			var rv = ua.indexOf('rv:');
			return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
		}

		var edge = ua.indexOf('Edge/');
		if (edge > 0) {
			// Edge (IE 12+) => return version number
			return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
		}

		// other browser
		return false;
	}

	if (detectIE() <= 14 && detectIE()) {
		$('body').empty();
		$('body').prepend('' +
			'<div class="old-browser">' +
			'<div class="old-browser-text"> Сайт не поддерживае Браузер Internet Explorer</div><br>' +
			'<div class="old-browser-text"> Установите <br><br> Chrome Firefox Opera </div><br>' +
			'</div>');
	}
	//for init SVG

	//mobile menu
		$('.head-toggle').click(function(event){
			event.stopPropagation();
			$('.head-wrap').toggleClass('head--up');
			$(this).toggleClass('head-toggle--open');
			$('.slide-menu').toggleClass('slide-menu--open');
		});

		$('.slide-menu').on("click", function (event) {
			event.stopPropagation();
		});

		$(document).add('.modal-get').on("click", function () {
				$('.head-wrap').removeClass('head--up');
				$('.head-toggle').removeClass('head-toggle--open');
				$('.slide-menu').removeClass('slide-menu--open');
				console.log(modalState.isModalShow);
				if(modalState.isModalShow == false){
					$('body').removeClass('body-fix')
			}
		});
	//mobile menu===end


	//validate
	$('.validate-form').each(function () {
		var curentForm = $(this);
		$(this).validate({
			highlight: function (element) { //даем родителю класс если есть ошибка
				$(element).parent().addClass("field-error");
			},
			unhighlight: function (element) {
				$(element).parent().removeClass("field-error");
			},
			rules: { //правила для полей
				name: {
					required: true,
				},
				phone: {
					required: true,
					minlength: 5,
					number: true
				},
				adres: {
					required: true,
				},
				agree: {
					required: true
				}
			},
			messages: {
				name: {
					required: 'Обязательное поле',
				},
				phone: {
					required: 'Обязательное поле',
					number: 'Введите правильный номер',
					minlength: 'Номер должен быть длиннее',
				},
				adres: {
					required: 'Обязательное поле',
				},
				agree: {
					required: false,
				}
			},
			submitHandler: function (form) {
				$.ajax({ //отправка ajax
					type: "POST",
					url: "sender.php",
					data: $(form).serialize(),
					timeout: 3000,
				});
				closeModal();
				initModal("truemessage");
				setTimeout(function () {
					closeModal();
					$(':input', '.validate-form') //очитска формы от данных
						.not(':button, :submit, :reset, :hidden')
						.val('')
						.removeAttr('checked')
						.removeAttr('selected')
				}, 2500)

			}
		});
	});
	localStorage.clear();
	sessionStorage.clear();
	$(window).unload(function () {
		localStorage.clear();
	});


})

//cash SVG

;(function (window, document) {
	'use strict';

	var file = 'img/pack.html',
		revision = 1;

	if (!document.createElementNS || !document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect)
		return true;

	var isLocalStorage = 'localStorage' in window && window['localStorage'] !== null,
		request,
		data,
		insertIT = function () {
			document.body.insertAdjacentHTML('afterbegin', data);
		},
		insert = function () {
			if (document.body) insertIT();
			else document.addEventListener('DOMContentLoaded', insertIT);
		};

	if (isLocalStorage && localStorage.getItem('inlineSVGrev') == revision) {
		data = localStorage.getItem('inlineSVGdata');
		if (data) {
			insert();
			return true;
		}
	}

	try {
		request = new XMLHttpRequest();
		request.open('GET', file, true);
		request.onload = function () {
			if (request.status >= 200 && request.status < 400) {
				data = request.responseText;
				insert();
				if (isLocalStorage) {
					localStorage.setItem('inlineSVGdata', data);
					localStorage.setItem('inlineSVGrev', revision);
				}
			}
		}
		request.send();
	}
	catch (e) {
	}

}(window, document));