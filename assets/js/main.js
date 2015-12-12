(function ($) {
	"use strict";

	$(document).ready(function(e){
		// Make responsive menu
		var $vu_mobile_menu = $('<div></div>').addClass('vu_mobile-menu'),
			$vu_mobile_menu_list = $('<ul></ul>');

		$('.vu_main-menu .vu_mm-list').each(function(){
			$vu_mobile_menu_list.append( $(this).html() );
		});

		$vu_mobile_menu_list.find('li.vu_wc-menu-item').remove();

		$vu_mobile_menu_list.appendTo( $vu_mobile_menu );
		$vu_mobile_menu.appendTo( $('#all') );
		$vu_mobile_menu.prepend( '<div class="text-right"><a href="#" class="vu_mm-toggle vu_mm-remove"><i class="fa fa-times-circle"></i></a></div>' );

		$(document).on('click', '.vu_mm-toggle', function(e){
			e.preventDefault();

			$('body').toggleClass('vu_no-scroll');
			$('.vu_mobile-menu').fadeToggle();
		});

		// Performs a smooth page scroll to an anchor on the same page
		$(document.body).on('click', '.vu_main-menu a[href*=#]:not([href=#])', function(){
			if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
				if (target.length) {
					$('html,body').stop().animate({
						scrollTop: target.offset().top - parseInt($('#vu_menu-affix .vu_main-menu-container').outerHeight())
					}, 800);
					return false;
				}
			}
		});

		// Generate Custom CSS for VC Rows
		var $vu_vc_rows = $('.vu_color-overlay[data-color-overlay]'),
			vu_vc_rows_style = '';

		$vu_vc_rows.each(function(){
			var vu_vc_custom_class = 'vu_custom_'+ Math.floor((Math.random() * 10000) + 1);
			vu_vc_rows_style += '.'+ vu_vc_custom_class +':before{background-color:'+ $(this).attr('data-color-overlay') +';}';
			$(this).addClass(vu_vc_custom_class);
		});

		$('head').append('<style id="custom_css_for_vc_rows">'+ vu_vc_rows_style +'</style>');
		





		// Comment Form
		var $vu_comment_reply_link = $('#comments a.vu_comment-reply-link');

		$vu_comment_reply_link.on('click', function(e){
			e.preventDefault();

			var id = $(this).data('id'),
				$appendTo = $(this).parents('div#comment-'+ id),
				$comment_form = $('#respond').clone();

			$('#respond').remove();

			$comment_form.addClass('m-t-30 m-b-30').find('a#cancel-comment-reply-link').show();
			$comment_form.find('input#comment_parent').val(id);
			$comment_form.appendTo( $appendTo );
		});

		$(document).on('click', '#respond a#cancel-comment-reply-link', function(e){
			e.preventDefault();

			var $comment_form = $('#respond').clone();

			$('#respond').remove();

			$comment_form.removeClass('m-t-30').removeClass('m-b-30').find('a#cancel-comment-reply-link').hide();
			$comment_form.find('input#comment_parent').val('0');
			$comment_form.appendTo( $('div#comments.blog-post-comments') );
		});



		// Multiselect - http://davidstutz.github.io/bootstrap-multiselect/
		var $vu_multiselect = $('select.vu_multiselect');

		$vu_multiselect.each(function(){
			var $this = $(this);

			try {
				$this.multiselect({
					buttonWidth: ($this.data('width') == undefined) ? '100%' : $this.data('width'),
					maxHeight: ($this.data('height') == undefined) ? 216 : ($this.data('height')).toInteger(),
					numberDisplayed: ($this.data('display') == undefined) ? 5 : ($this.data('display')).toInteger(),
					includeSelectAllOption: ($this.data('width') == undefined) ? true : $this.data('width'),
            		selectAllText: ($this.data('selectalltext') == undefined) ? '' : $this.data('selectalltext'),
					checkboxName: ($this.data('name') == undefined) ? '' : $this.data('name'),
					nonSelectedText: ($this.data('placeholder') == undefined) ? '' : $this.data('placeholder'),
					buttonClass: 'form-control vu_btn-multiselect',
				});
			} catch(err) {}
		});

		// Milestone
		var $vu_milestone = $('.vu_milestone .vu_counter');

		$vu_milestone.each(function(){
			var $this = $(this);

			try {
				$(this).counterUp({
					delay: ($this.data('delay') == undefined) ? 10 : $this.data('delay'),
					time: ($this.data('time') == undefined) ? 1000 : $this.data('time')
				});
			} catch(err) {}
		});

		// Countdown
		var $vu_countdown = $('.countdown');

		$vu_countdown.each(function(){
			var date = $(this).data('date').split('-'),
				format = $(this).data('format');
			try	{
				$(this).countdown({
					until: new Date( parseInt(date[0]), parseInt(date[1]) - 1, parseInt(date[2]) ),
					padZeroes: true,
					format: format
				});
			} catch(err){}
		});

		// Magnific Popup - http://dimsemenov.com/plugins/magnific-popup/
		var $vu_lightbox = $('.vu_lightbox');

		$vu_lightbox.each(function(){
			var $this = $(this);

			if( $this.hasClass('vu_gallery') ){
				try {
					$this.magnificPopup({
						delegate: $this.data('delegate') || 'a',
						type: 'image',
						gallery: {
							enabled: true,
							navigateByImgClick: true,
							preload: [0,1] // Will preload 0 - before current, and 1 after the current image
						}
					});
				} catch(err) {}
			} else {
				try {
					$this.magnificPopup({
						type: ($this.data('type') == undefined) ? 'image' : $this.data('type')
					});
				} catch(err) {}
			}
		});

		
		
		// Add Custom class for default WP Calendar Widget
		$('.sidebar .widget_calendar #calendar_wrap table#wp-calendar').addClass('table table-striped');
		$('.page-footer .widget_calendar #calendar_wrap table#wp-calendar').addClass('table');
		
		// Menu trigger
		$(document).on('click', '#menu-button', function(e) {
			$(this).parents('.page-header').find('#nav-top').stop().slideToggle();
		});
		

		
		// On-scroll animations
		var on_scroll_anims = $('.onscroll-animate');

		on_scroll_anims.each(function(){
			$(this).one('inview', function(event, visible){
				var el = $(this),
					anim = (el.attr("data-animation") !== undefined) ? el.attr("data-animation") : "fadeIn",
					delay = (el.attr("data-delay") !== undefined ) ? el.attr("data-delay") : 200;

				var timer = setTimeout(function() {
					el.removeClass('onscroll-animate').addClass(anim + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
						$(this).removeClass('animated').removeClass(anim);
					});
					clearTimeout(timer);
				}, delay);
			});
		});



		// Equal Height Columns
		$('[data-equal-height-columns="true"]').each(function(){
			$(this).addClass('row-same-height row-full-height');
			$(this).find('[class*="col-"]').addClass('col-md-height col-full-height');
		});

		// Contact Map
		var $map_canvas = $('.vu_map');
		
		$map_canvas.each(function(){
			try {
				google.maps.event.addDomListener(window, 'load', map_initialize($(this)));
			} catch(err) {}
		});

		// ToolTip
		try {
			$('[data-toggle="tooltip"]').tooltip();
		} catch(err) {}
	});
		
	$(window).on('load', function() {
		// Preloader
		try {
			$('body').imagesLoaded(function(){
				$('#vu_preloader').fadeOut();
			});
		} catch(err) {}


		// Menu affix height
		$('.vu_menu-affix-height').height( $('#vu_menu-affix').outerHeight() );

		//Gallery with filter
		var $vu_gallery = $('.vu_gallery.vu_g-filterable');

		$vu_gallery.each(function () {
			var $this = $(this).find('.vu_g-items'),
				options = {
					itemSelector: '.vu_g-item',
					filter: '*',
					layoutMode: 'fitRows'
				},
				$filter = $this.parents('.vu_gallery').find('.vu_g-filters .vu_g-filter');

			try {
				$this.isotope(options);
			} catch(err) {}

			$filter.on('click', function(e){
				e.preventDefault();

				$filter.removeClass('active');
				$(this).addClass('active');

				try {
					$this.isotope({ filter: $(this).data('filter') });
				} catch(err) {}

				return false;
			});
		});

		
	});

	// Top menu switch
	$(window).on('scroll', function(e) {
		var $vu_menu_affix_height = $('.vu_menu-affix-height'),
			$vu_menu_affix = $('#vu_menu-affix');

		if( $vu_menu_affix.hasClass('affix-top') ) {
			$vu_menu_affix_height.height( $vu_menu_affix.outerHeight() );
		}
	});



	// Convert String to Boolean
	String.prototype.toBoolean = function(){
		return (this == "1" || this.toLowerCase() == "true") ? true : false;
	}

	// Convert String to Integer
	String.prototype.toInteger = function(){
		return parseInt(this);
	}
})(jQuery);