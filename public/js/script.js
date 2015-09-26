$('#menu a').on('click', function(event) {
	//event.preventDefault();
	var anchor = $(this).attr('href');
	$('body, html').animate({
		scrollTop: $(anchor).offset().top
	}, 'slow');

});


$(window).scroll(function() {
	var top = $(window).scrollTop();
	var coords = '50% ' + top / 1.7 + 'px';
	$(".back1").css({
		backgroundPosition: coords
	});

});

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
			if(data.message === 'success'){
				$('.progress-button span').addClass('hide');
				$('.progress-button .fa').addClass('show');
				$('#contact-msg').val('');
				$('#contact-name').val('');
				$('#contact-email').val('');
			}
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});

});