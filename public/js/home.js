$(".slider").glide({
    navigation: false,
    arrows: true,
    arrowLeftText: '&lsaquo;',
    arrowRightText: '&rsaquo;',
    beforeTransition: function() {
		$('#news-slide .caption-wrapper').hide();
	    $('#news-slide .caption-wrapper').eq(-this.currentSlide).removeClass('fadeInRightBig');
	},
	afterTransition: function() {
		$('#news-slide .caption-wrapper').eq(-this.currentSlide+1).addClass('fadeInRightBig');
		$('#news-slide .caption-wrapper').show();
	}
});