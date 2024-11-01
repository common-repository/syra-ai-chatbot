

var sidePanelFixed =    '<a href="#" class="kt-quick-panel__close" id="kt_quick_panel_close_btn" onclick="closeSidePanel()"><i class="flaticon2-delete"></i></a>' +
                        '<div class="kt-quick-panel__nav">' +
                            '<ul class="nav nav-tabs nav-tabs-line nav-tabs-bold nav-tabs-line-3x nav-tabs-line-brand  kt-notification-item-padding-x" role="tablist">' +
                                '<li class="nav-item active">' +
                                    '<a class="nav-link active" data-toggle="tab" id="notification_panel_nav_link" href="#kt_quick_panel_tab_notifications" role="tab">Notifications</a>' +
                                '</li>' +
                                '<li class="nav-item">' +
                                    '<a class="nav-link" data-toggle="tab" id="help_panel_nav_link" href="#kt_quick_panel_tab_help" role="tab">Help</a>' +
                                '</li>' +
                            '</ul>' +
                        '</div>' +
                        '<div class="kt-quick-panel__content">' + 
                            '<div class="tab-content">' + 
                                '<div class="tab-pane fade show kt-scroll active" id="kt_quick_panel_tab_notifications" role="tabpanel">' +
                                    '<div class="kt-notification" id="notification_panel"> ' +
                                    '</div>' +
                                '</div>' +
                                '<div class="tab-pane fade kt-scroll" id="kt_quick_panel_tab_help" role="tabpanel">' +
                                    '<div class="kt-notification" id="help_panel">' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>';
function includeSidePanel(){
    jQuery("#kt_quick_panel").append(sidePanelFixed);
}


function openHelpPane(){
    jQuery("#notification_panel_nav_link").removeClass("active");
    jQuery("#help_panel_nav_link").addClass("active");
    jQuery("#kt_quick_panel_tab_notifications").removeClass("active show");
    jQuery("#kt_quick_panel_tab_help").addClass("active show")
}

function openNotificationPane(){
    var form = new FormData();
    form.append("customerId", email);
    form.append("step", notificationStep);
    form.append("messageSeenStatus", "y");

    var settings = {
        "async": true,
        "url": url_resource + "/syraconsumer/update-wizard-track",
        "method": "POST",
        "headers": {
            "Authorization": "Bearer " + access_token
        },
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": form
    };

    jQuery.ajax(settings).done(function (response) {
        var jsonResponse = JSON.parse(response);
        if(jsonResponse["status"] == 200){
            jQuery("#help_panel_nav_link").removeClass("active");
            jQuery("#notification_panel_nav_link").addClass("active");
            jQuery("#kt_quick_panel_tab_help").removeClass("active show");
            jQuery("#kt_quick_panel_tab_notifications").addClass("active show");
            jQuery("#kt_header_notification_pulse").removeClass("kt-pulse");
            jQuery("#kt_badge_notify").html("");
            jQuery(".notificationSeenMessage").css("color", "#df4898");
            jQuery("#kt_badge_notify").removeClass('kt-badge--light');
            jQuery(".messageSeen").show();
        }
    });
}

function closeSidePanel(){
    jQuery("#kt_quick_panel").removeClass("kt-quick-panel--on");
}
