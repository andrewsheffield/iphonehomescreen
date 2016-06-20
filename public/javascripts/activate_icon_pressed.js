/*
* Adds and removes the effect of darkening the icon on click
*/
(function() {
	'use strict';

	$('.iphone').on('mousedown', '.icon-img',function() {
		$(this).addClass('pressed');
	});

	$(window).on('mouseup', function() {
		$('.icon-img').removeClass('pressed');
	});
	
}());