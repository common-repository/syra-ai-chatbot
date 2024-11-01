function includeHeader(username){
    if(username.includes(' ')){
        username = username.split(' ')[0];
    }
    var fixedTopHeaderMenu = '<div class="kt-header__top">' +
                            '<div class="kt-container kt-container--fluid ">' +
                                '<div class="kt-header__brand kt-grid__item" id="kt_header_brand"></div>'+
                            
                                '<div class="kt-header-menu-wrapper" id="kt_header_menu_wrapper">'+'</div>' +
                            
                                '<div class="kt-header__topbar" id="kt_header_PopupMessage">' + '</div>' + 
                            '</div>' +
                        '</div>';


    var headerWrapper = '<div id="kt_header_menu" class="kt-header-menu kt-header-menu-mobile kt-header-menu--layout-pill">' +
                            '<ul class="kt-menu__nav">' +
                                '<li class="kt-menu__item kt-menu__item--rel" id="setup_wizard">' +
                                    '<a href="admin.php?page=syraaichatbot_plugin" class="kt-menu__link">' +
                                        '<i class="kt-menu__link-icon pix-png-icon pix-png-wizzard"></i>' +
                                        '<span class="kt-menu__link-text">Setup Wizard</span>' +
                                    '</a>' +
                                '</li>' +
                                // '<li class="kt-menu__item kt-menu__item--rel" id="dashboard">' +
                                //     '<a href="admin.php?page=syra-dashboard" class="kt-menu__link">' +
                                //         '<i class="kt-menu__link-icon pix-png-icon pix-png-speed"></i>' +
                                //         '<span class="kt-menu__link-text">Dashboard</span>' +
                                //     '</a>' +
                                // '</li>' +
                                '<li class="kt-menu__item kt-menu__item--rel" id="analytics">' +
                                    '<a href="admin.php?page=syra-analytics" class="kt-menu__link">' +
                                        '<i class="kt-menu__link-icon pix-png-icon pix-png-chart"></i>' +
                                        '<span class="kt-menu__link-text">Analytics</span>' +
                                    '</a>' +
                                '</li>' +
                                '<li class="kt-menu__item kt-menu__item--rel" id="goals">' +
                                    '<a href="admin.php?page=syra-goals" class="kt-menu__link">' +
                                        '<i class="kt-menu__link-icon pix-png-icon pix-png-target"></i>' +
                                        '<span class="kt-menu__link-text">Goals</span>' +
                                    '</a>' +
                                '</li>' +
                                '<li class="kt-menu__item kt-menu__item--rel" id="customize">' +
                                    '<a href="admin.php?page=syra-customize" class="kt-menu__link">' +
                                        '<i class="kt-menu__link-icon pix-png-icon pix-png-settings"></i>' +
                                        '<span class="kt-menu__link-text">Customize</span>' +
                                    '</a>' +
                                '</li>' +
                                '<li class="kt-menu__item kt-menu__item--rel" id="training">' +
                                    '<a href="admin.php?page=syra-training" class="kt-menu__link">' +
                                        '<i class="kt-menu__link-icon pix-png-icon pix-png-training"></i>' +
                                        '<span class="kt-menu__link-text">Training</span>' +
                                    '</a>' +
                                '</li>' +
                                '<li class="kt-menu__item kt-menu__item--rel" id="publish">' +
                                '<a href="admin.php?page=syra-publish" class="kt-menu__link">' +
                                    '<i class="kt-menu__link-icon pix-png-icon pix-png-publish"></i>' +
                                    '<span class="kt-menu__link-text">Publish</span>' +
                                '</a>' +
                                '</li>' +
                                '<li class="kt-menu__item kt-menu__item--rel" id="settings">' +
                                    '<a href="admin.php?page=syra-settings" class="kt-menu__link">' +
                                        '<i class="kt-menu__link-icon pix-png-icon pix-png-cog"></i>' +
                                        '<span class="kt-menu__link-text">Settings</span>' +
                                    '</a>' +
                                '</li>' +
                            '</ul>' +
                        '</div>' ;


    var fixedHeaderBrand = '<div class="kt-header__brand-logo">' +
                                '<a href="#">' +
                                    '<img alt="Logo" src="'+wp_path+'images/logo.png" class="kt-header__brand-logo-default" />' +
                                    '<img alt="Logo" src="'+wp_path+'images/logo.png" class="kt-header__brand-logo-sticky" />' +
                                '</a>' +
                            '</div>';

    var popupMessages = '<div class="kt-header__topbar-item kt-header__topbar-item--langs">' + 
                            '<div class="kt-header__topbar-wrapper kt_quick_panel_toggler_btn_notifications" data-offset="0px,10px" onclick="openNotificationPane()" data-current="#kt_quick_panel_tab_help" data-target="#kt_quick_panel_tab_notifications">' + 
                                '<span class="kt-header__topbar-icon" id="kt_header_notification_pulse">' + 
                                    '<i class="flaticon-squares"></i>' + 
                                    '<span class="kt-pulse__ring"></span>' + 
                                    '<span class="kt-badge kt-badge--notify kt-badge--light ml-2" id="kt_badge_notify"></span>' + 
                                '</span>' + 
                            '</div>' + 
                            // '<div class="dropdown-menu dropdown-menu-fit dropdown-menu-right dropdown-menu-anim">' + 
                            //     '<div class="kt-notification">' + 
                            //         '<ul class="kt-nav my-0">' + 
                            //             '<li class="kt-nav__item">' + 
                            //                 '<a href="javascript:;" onclick="openNotificationPane()" class="kt-tab-invoker kt-nav__link kt_quick_panel_toggler_btn_notifications" data-current="#kt_quick_panel_tab_help" data-target="#kt_quick_panel_tab_notifications">' + 
                            //                     '<span class="kt-nav__link-text">Notifications</span>' + 
                            //                 '</a>' + 
                            //             '</li>' + 
                            //         '</ul>' + 
                            //     '</div>' + 
                            // '</div>' + 
                        '</div>' ;
    var userSettingItems = 
                            '<div class="kt-header__topbar-item kt-header__topbar-item--user" id="kt_header_user_menus">' +
                                '<div class="dropdown-menu dropdown-menu-fit dropdown-menu-right dropdown-menu-anim dropdown-menu-xl">' + 
                                    '<div class="kt-notification">' + 
                                        '<ul class="kt-nav my-0">' + 
                                            '<li class="kt-nav__item kt-nav__item--active">' + 
                                                '<a href="https://cloudhiti.zendesk.com/hc/en-us/sections/360001453017-AI-Chatbots" target="_blank" class="kt-nav__link">' + 
                                                    '<span class="kt-nav__link-text">Support</span>' + 
                                                '</a>' + 
                                            '</li>' + 
                                            '<li class="kt-nav__item">' + 
                                                '<a href="admin.php?page=syra-settings" class="kt-nav__link">' + 
                                                    '<span class="kt-nav__link-text">Account Settings</span>' + 
                                                '</a>' + 
                                            '</li>' + 
                                            '<li class="kt-nav__item">' + 
                                                '<a href="javascript:;" onclick="openHelpPane()" class="kt-tab-invoker kt-nav__link kt_quick_panel_toggler_btn_help" data-current="#kt_quick_panel_tab_notifications" data-target="#kt_quick_panel_tab_help">' + 
                                                    '<span class="kt-nav__link-text">Help</span>' + 
                                                '</a>' + 
                                            '</li>' + 
                                        '</ul>' +  
                                    '</div>' + 
                                '</div>' +
                            '</div>' ;
    jQuery("#kt_header").append(fixedTopHeaderMenu);
    jQuery("#kt_header_brand").append(fixedHeaderBrand);
    jQuery("#kt_header_menu_wrapper").append(headerWrapper);
    jQuery("#kt_header_PopupMessage").append(popupMessages);
    jQuery("#kt_header_PopupMessage").append(userSettingItems);
    if(username.length > 10){
        username = username.slice(0,10);
    }
    var userWelcomeMessage = '<div class="kt-header__topbar-wrapper" data-toggle="dropdown" data-offset="0px,10px">' + 
                                '<span class="kt-header__topbar-welcome kt-visible-desktop">Hi,</span>' + 
                                '<span class="kt-header__topbar-username kt-visible-desktop">' + username +'</span>' + 
                                '<img alt="Pic" src="'+wp_path+'images/chatbot-icons/icon-09.png" />' + 
                                '<span class="kt-header__topbar-icon kt-bg-brand kt-font-lg kt-font-bold kt-font-light kt-hidden">S</span>' + 
                                '<span class="kt-header__topbar-icon kt-hidden"><i class="flaticon2-user-outline-symbol"></i></span>' + 
                            '</div>' ;

    jQuery("#kt_header_user_menus").append(userWelcomeMessage);
}




