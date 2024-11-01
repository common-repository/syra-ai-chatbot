"use strict";
// Class definition

var KTPixeel = function () {
	// variables
	
	// prevent close on dropdown content click
	var preventCloseOnContentClick = function () {
		jQuery(document).on('click', '.dropdown-prevent-close', function (e) {
			e.stopPropagation();
		});
	};
	
	// custom full width select
	var selectInit = function () {
		jQuery('.kt-custom-select-auto-init').selectpicker();
	};
	
	var avatarInit = function () {
		jQuery('.kt-avatar-auto-init').each(function () {
			var avatar = new KTAvatar(jQuery(this));
		});
	};
	
	var datepickerInit = function () {
		jQuery('.kt-datepicker-auto-init').each(function () {
			var datepicker = jQuery(this).datepicker({
				todayHighlight: true,
				templates: {
					leftArrow: '<i class="la la-angle-left"></i>',
					rightArrow: '<i class="la la-angle-right"></i>',
				},
			});
		});
	};
	
	var formResetInit = function () {
		jQuery('.kt-form [type="reset"]').each(function () {
			var $this = jQuery(this),
				$form = $this.closest('form.kt-form');
			
			$form[0].reset();
		});
	};
	
	var tabsInit = function () {
		jQuery('.kt-menu__nav[role="tablist"]').each(function () {
			var $this = jQuery(this),
				$items = $this.find('> .kt-menu__item'),
				$invokers = $items.find('> a[data-toggle="tab"]');
			
			$invokers.on('show.bs.tab', function (e) {
				$invokers.removeClass('active');
				$items.removeClass('kt-menu__item--here');
				
				jQuery(e.target).parent().addClass('kt-menu__item--here');
				
				if (window.innerWidth <= 992) {
					window.KTLayout.topMenuOffcanvas.hide();
				}
			});
		});
		
		jQuery('.kt-tab-invoker').on('click', function () {
			var $current = jQuery(this).data('current'),
				$target = jQuery(this).data('target'),
				$tabControl = jQuery('a[data-toggle="tab"][data-target="' + $target + '"], a[data-toggle="tab"][href="' + $target + '"]');
			
			// Show tab
			jQuery($current).removeClass('active');
			jQuery($target).tab('show');
			
			// Add class to tab control
			$tabControl.parent().siblings().children('[data-toggle="tab"]').removeClass('active');
			
			if ($tabControl.parent().siblings().hasClass('kt-menu__item--here')) {
				$tabControl.parent().siblings().removeClass('kt-menu__item--here');
				$tabControl.parent().addClass('kt-menu__item--here');
			} else {
				$tabControl.addClass('active');
			}
		});
	};
	
	var controlGroupInit = function () {
		jQuery('.kt-control-group').each(function () {
			var $control = jQuery(this).find('input');
			
			$control.on('change', function () {
				$control.closest('label').removeClass('active');
				
				jQuery(this).closest('label').addClass('active');
			});
		});
	};
	
	return {
		// public functions
		init: function () {
			if (jQuery('.dropdown-prevent-close').length) {
				preventCloseOnContentClick();
			}
			
			if (jQuery('.kt-custom-select-auto-init').length) {
				selectInit();
			}
			
			if (jQuery('.kt-avatar-auto-init').length) {
				avatarInit();
			}
			
			if (jQuery('.kt-datepicker-auto-init').length) {
				datepickerInit();
			}
			
			if (jQuery('.kt-menu__nav[role="tablist"]').length) {
				tabsInit();
			}
			
			if (jQuery('.kt-form [type="reset"]').length) {
				formResetInit();
			}
			
			if (jQuery('.kt-control-group').length) {
				controlGroupInit();
			}
		}
	};
}();

// On document ready
KTUtil.ready(function () {
	KTPixeel.init();
});
	    
