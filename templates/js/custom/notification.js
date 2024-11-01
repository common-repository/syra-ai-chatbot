function populateNotificationTable(email, access_token){
    jQuery("#notification_panel").html('');
    var form = new FormData();
    form.append("customerId", email);
    var settings =
    {
        "async": true,
        "url": url_resource + "/syraconsumer/fetch-wizard-track",
        "method": "POST",
        headers: {
            'Authorization': 'Bearer '+access_token,
        },
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
    }
    
    jQuery.ajax(settings).done(function (response) 
    {
        response = JSON.parse(response);
        var notificationMessageCount= 0;
        var currentTime = new Date();
        for(var itr=0;itr<response.length;itr++)
        { 
            var each_Notification = {};
            var eachNotificationDateTime = null;
            if(response[itr]["timeStamp"] != null){
                if(response[itr]["timeStamp"].includes('T') && response[itr]["timeStamp"].includes('Z')){
                    eachNotificationDateTime = new Date(new Date(response[itr]["timeStamp"].replace('T',' ').replace('Z','') + " UTC").toUTCString());
                }
                else{
                    eachNotificationDateTime = new Date(new Date(response[itr]["timeStamp"] + " UTC").toUTCString());
                }
                var dateTimeDiff = Math.abs(eachNotificationDateTime.getTime() - currentTime.getTime());
                var hh = Math.floor(dateTimeDiff / 1000 / 60 / 60);
                dateTimeDiff -= hh * 1000 * 60 * 60;
                var mm = Math.floor(dateTimeDiff / 1000 / 60);
                dateTimeDiff -= mm * 1000 * 60;
                var ss = Math.floor(dateTimeDiff / 1000);
                if(hh != 00){
                    if(hh >= 24){
                        var days = parseInt(hh/(24));
                        if(days > 30){
                            var weeks = parseInt(days/(7));
                            if(weeks > 4){
                                var months = parseInt(weeks/4);
                                if(months > 12){
                                    var years = parseInt(weeks/12);
                                    each_Notification.messageTime = years.toString() + " years ago";
                                }
                                else{
                                    each_Notification.messageTime = months.toString() + " months ago";
                                }
                            }
                            else{
                                each_Notification.messageTime = weeks.toString() + " weeks ago";
                            }
                        }
                        else{
                            each_Notification.messageTime = days.toString() + " days ago";
                        }
                    }
                    else{
                        each_Notification.messageTime = hh.toString() + " hours ago";
                    }
                }
                else{
                    if(mm != 00){
                        each_Notification.messageTime = mm.toString() + " minutes ago";
                    }
                    else{
                        each_Notification.messageTime = ss.toString() + " seconds ago";
                    }
                }
            }
            var icon = "";
            var destinationUrl = "";
            if(response[itr]["step"] != null){
                notificationStep = response[itr]["step"];
                switch(notificationStep)
                {
                    case "1":
                        if(response[itr]["actionStatus"] != "Update"){
                            each_Notification.action_Name = "The next step is to" + " setup account";
                            each_Notification.action_status = "Needs to take action";
                            destinationUrl = "admin.php?page=syraaichatbot_plugin";
                            icon = wp_path+"images/notification-icons/pending_icon.png";
                        }
                        else{
                            each_Notification.action_Name = "The next step is to" + " setup account";
                            each_Notification.action_status = "Update";
                            destinationUrl = "admin.php?page=syraaichatbot_plugin";
                            icon = wp_path+"images/notification-icons/complete_icon.png";
                        }
                        break;
                    case "2":
                        each_Notification.action_Name = "Congrats on setting up your account!";
                        each_Notification.action_status = "Update";
                        icon = wp_path+"images/notification-icons/complete_icon.png";
                        destinationUrl = "admin.php?page=syra-customize";
                        break;
                    case "3":
                        if(response[itr]["actionStatus"] != "Update"){
                            each_Notification.action_Name = "Your chatbot customization is initiated!";
                            each_Notification.action_status = "Needs to take action";
                            icon = wp_path+"images/notification-icons/complete_icon.png";
                        }
                        else{
                            each_Notification.action_Name = "Your chatbot customization is updated!";
                            each_Notification.action_status = "Update";
                            icon = wp_path+"images/notification-icons/complete_icon.png";
                        }
                        destinationUrl = "admin.php?page=syraaichatbot_plugin";
                        break;
                    case "4":
                        if(response[itr]["actionStatus"] != "Update"){
                            each_Notification.action_Name = "Now start training your Chatbot!";
                            each_Notification.action_status = "Needs to take action";
                            destinationUrl = "admin.php?page=syra-training";
                            icon = wp_path+"images/notification-icons/complete_icon.png";
                        }
                        else{
                            each_Notification.action_Name = "Chatbot is trained successfully!";
                            each_Notification.action_status = "Update";
                            destinationUrl = "admin.php?page=syra-training";
                            icon = wp_path+"images/notification-icons/complete_icon.png";
                        }
                        break;
                    case "5":
                        if(response[itr]["actionStatus"] != "Update"){
                            each_Notification.action_Name = "You are ready to publish your Chatbot!";
                            each_Notification.action_status = "Needs to take action";
                            icon = wp_path+"images/notification-icons/complete_icon.png";
                        }
                        else{
                            each_Notification.action_Name = "Retraining is complete. Your Chatbot is now ready to be published again!";
                            each_Notification.action_status = "Update";
                            icon = wp_path+"images/notification-icons/complete_icon.png";
                        }
                        destinationUrl = "admin.php?page=syra-publish";
                        
                        break;
                    case "6":
                        each_Notification.action_Name = "Thanks for giving the feedback!";
                        each_Notification.action_status = "Update";
                        destinationUrl = "#";
                        icon = wp_path+"images/notification-icons/complete_icon.png";
                        break;
                }
            }
            
            if(response[itr]["messageSeenStatus"] == "n")
            {
                notificationMessageCount ++;
            }
            var notification_Element_In_Row = '<a href="' + destinationUrl + '" class="kt-notification__item">' + 
                                                '<div class="kt-notification__item-icon">' +
                                                    '<img class="kt-font-brand" src="'+ icon + '"' + ' height=30 width=30>' + 
                                                '</div>' +
                                                '<div class="kt-notification__item-details" style="margin-left:5%">' +
                                                    '<div class="kt-notification__item-title notificationSeenMessage">' +
                                                        each_Notification.action_Name +
                                                    '</div>' +
                                                    '<div class="kt-notification__item-time">' +
                                                        // '<span>' + each_Notification.action_status + '</span>' + 
                                                        '<span style="padding-left:0%">' + each_Notification.messageTime + '</span>' + 
                                                        '<span class="messageSeen" style="color: #df4898; margin-left: 4%; display:none">&#10004</span>' +
                                                    '</div>' +
                                                '</div>' +
                                            '</a>';
            jQuery("#notification_panel").append(notification_Element_In_Row);
        }
        if(notificationMessageCount > 0){
            jQuery("#kt_header_notification_pulse").removeClass("kt-pulse");
            jQuery("#kt_header_notification_pulse").addClass("kt-pulse");
            jQuery("#kt_badge_notify").html(notificationMessageCount);
            jQuery("#kt_badge_notify").addClass('kt-badge--light');
        }
        else{
            jQuery("#kt_badge_notify").removeClass('kt-badge--light');
            jQuery(".notificationSeenMessage").css("color", "#df4898");
            jQuery("#kt_badge_notify").removeClass('kt-badge--light');
            jQuery(".messageSeen").show();
        }
    });
}

function insertNotificationData(step, actionStatus, email){
    var currentDate = new Date();
    var month = 0;
    var date = currentDate.getDate();
    month = currentDate.getMonth() + 1;
    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    var seconds = currentDate.getSeconds();
    if(month< 10){
        month = '0' + month;
    }
    if(hours < 10){
        hours = '0' + hours;
    }
    if(minutes < 10){
        minutes = '0' + minutes;
    }
    if(seconds < 10){
        seconds = '0' + seconds;
    }
    if(date < 10){
        date = '0' + date;
    }
    var timeStamp = currentDate.getFullYear() + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    var innerform = new FormData();
    innerform.append("customerId", email);
    innerform.append("step", step);
    innerform.append("messageSeenStatus", "n");
    innerform.append("timeStamp", timeStamp);
    innerform.append("actionStatus", actionStatus);
    var innersettings = {
        "async": true,
        "url": url_resource + "/syraconsumer/create-wizard-track",
        "method": "POST",
        headers: {
            'Authorization': 'Bearer '+access_token,
        },
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": innerform
    }
    jQuery.ajax(innersettings).done(function (innerresponse) {
        populateNotificationTable(email, access_token);
    })
    .fail(function(innerresponse) 
    {     
        swalWithBootstrapButtons.fire({
            title: "API Error!",
            text: 'create-wizard-track'+' -> '+innerresponse.status+' -> '+innerresponse.statusText,
            icon: "error",
            confirmButtonText: 'Okay'
        });

    });
}

function openSupportPage(){
    var win = window.open(supportLink, '_blank');
    win.focus();
}

setInterval(function() { 
    populateNotificationTable(email, access_token); 
}, 120000);

