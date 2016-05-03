jQuery(document).ready(function($) {
	$('#menu a:not(.external)').on('click', function(event) {
		event.preventDefault();
		var anchor = $(this).attr('href');
		$('body, html').animate({
			scrollTop: $(anchor).offset().top
		}, 1000);

	});

	if (document.body && document.body.offsetWidth) {
		winW = document.body.offsetWidth;
		winH = document.body.offsetHeight;
	} else {
		winW = window.innerWidth;
		winH = window.innerWidth;
	}

	//
	//
	//		Paralax for project page
	//
	//

	$(window).scroll(function() {
		var top = $(window).scrollTop();
		var coords = '50% ' + top / 1.7 + 'px';
		$(".back1").css({
			backgroundPosition: coords
		});
		var offset, position, scroll, elem;
		//We're on a mobile
		if (winW < 480) {

			$('#work figure').each(function(index, el) {
				elem = $(this);
				offset = elem.offset();
				position = offset.top;
				scroll = top + winH / 2;
				if (scroll > position + elem.height() / 2) {
					$('#work figure').removeClass('hovered');
					elem.addClass('hovered');
				}
			});
		}
	});

	//
	//
	//	Waypoints, animation when scrolling
	//
	//
	$('.wp1').waypoint(function() {
		$('.wp1').addClass('fade-in-up');
	}, {
		offset: '85%'
	});

	$('.wp2').waypoint(function() {
		$('.wp2').addClass('fade-in-up');
	}, {
		offset: '85%'
	});

	$('.wp3').waypoint(function() {
		$('.wp3').addClass('fade-in-up');
	}, {
		offset: '85%'
	});
	
	//
	//
	//	Contact form handling
	//
	//

	$('#contact form').on('submit', function(event) {
		event.preventDefault();
		var msg = $('#contact-msg').val();
		var name = $('#contact-name').val();
		var email = $('#contact-email').val();

		$.ajax({
				url: '/contact',
				type: 'POST',
				data: {
					msg: msg,
					email: email,
					name: name
				},
			})
			.done(function(data) {
				if (data.message === 'success') {
					$('.progress-button span').addClass('hide');
					$('.progress-button .fa').addClass('show');
					$('#contact-msg').val('');
					$('#contact-name').val('');
					$('#contact-email').val('');
				}
			});
	});
});