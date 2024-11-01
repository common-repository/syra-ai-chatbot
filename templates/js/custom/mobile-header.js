function includeMobileHeader(){
    var mobileFixedHeader = '<div class="kt-header-mobile__logo">' +
                            '<a href="#">' +
                                '<img alt="Logo" src="'+wp_path+'images/logo.png" />' +
                            '</a>' +
                        '</div>' +
                        '<div class="kt-header-mobile__toolbar">' +
                            '<button class="kt-header-mobile__toolbar-toggler" id="kt_header_mobile_toggler"><span></span></button>' +
                            '<button class="kt-header-mobile__toolbar-topbar-toggler" id="kt_header_mobile_topbar_toggler">' +
                                '<i class="flaticon-more-1"></i></button>' +
                        '</div>';
    jQuery("#kt_header_mobile").append(mobileFixedHeader);
}
