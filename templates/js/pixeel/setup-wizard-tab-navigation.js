function setupWizardAccount(){
    // jQuery("#badge_text").hide();
    var activeTabContentId = "";
    var activeTabId = "";
    jQuery(".setup-wizard.active").each(function () {
        activeTabContentId = jQuery(this).attr('id');
        jQuery("#" + activeTabContentId).removeClass("active");
        jQuery("#kt_tabs_top_account_setup").addClass("active");
    });

    jQuery(".setup-wizard-li.kt-menu__item--here").each(function () {
        activeTabId = jQuery(this).attr('id');
        jQuery("#" + activeTabId).removeClass("kt-menu__item--here");
        jQuery("#setup-wizard-account-setup").addClass("kt-menu__item--here");
    });
    if(jQuery("#setup-wizard-account-setup").hasClass('disabled')){
        jQuery("#setup-wizard-account-setup").removeClass('disabled');
        jQuery("#setup-wizard-account-setup").addClass('enabled');
    }
}

function setupWizardChatbot(){
    var activeTabContentId = "";
    var activeTabId = "";
    jQuery(".setup-wizard.active").each(function () {
        activeTabContentId = jQuery(this).attr('id');
        jQuery("#" + activeTabContentId).removeClass("active");
        jQuery("#kt_tabs_top_customize").addClass("active");
    });

    jQuery(".setup-wizard-li.kt-menu__item--here").each(function () {
        activeTabId = jQuery(this).attr('id');
        jQuery("#" + activeTabId).removeClass("kt-menu__item--here");
        jQuery("#setup-wizard-chatbot-customize").addClass("kt-menu__item--here");
    });
    if(jQuery("#setup-wizard-chatbot-customize").hasClass('disabled')){
        jQuery("#setup-wizard-chatbot-customize").removeClass('disabled');
        jQuery("#setup-wizard-chatbot-customize").addClass('enabled');
    }
}

function setupWizardPublish(){
    // jQuery("#badge_text").hide();
    var activeTabContentId = "";
    var activeTabId = "";
    jQuery(".setup-wizard.active").each(function () {
        activeTabContentId = jQuery(this).attr('id');
        jQuery("#" + activeTabContentId).removeClass("active");
        jQuery("#kt_tabs_top_publish_or_retrain_ai_model").addClass("active");
    });

    jQuery(".setup-wizard-li.kt-menu__item--here").each(function () {
        activeTabId = jQuery(this).attr('id');
        jQuery("#" + activeTabId).removeClass("kt-menu__item--here");
        jQuery("#setup-wizard-chatbot-publish").addClass("kt-menu__item--here");
    });
    if(jQuery("#setup-wizard-chatbot-publish").hasClass('disabled')){
        jQuery("#setup-wizard-chatbot-publish").removeClass('disabled');
        jQuery("#setup-wizard-chatbot-publish").addClass('enabled');
    }
    if(selectTemplateName[0] == "2"){
        checkSecondTemplateSelection = true;
    }
    jQuery("#publishedMsg").css("display", "block");
    shopifyPublishUnpublishTrack(botDeploymentId, "", "setupWizardShopifyPage");
    
    // if(userExitstingChatbot){
    //     shopifyPublishUnpublishTrack(botDeploymentId, "", "setupWizardShopifyPage");
    // }
}

function setupWizardTrain(){
    // jQuery("#badge_text").hide();
    var activeTabContentId = "";
    var activeTabId = "";
    jQuery(".setup-wizard.active").each(function () {
        activeTabContentId = jQuery(this).attr('id');
        jQuery("#" + activeTabContentId).removeClass("active");
        jQuery("#kt_tabs_top_build_knowledge_base").addClass("active");
    });

    jQuery(".setup-wizard-li.kt-menu__item--here").each(function () {
        activeTabId = jQuery(this).attr('id');
        jQuery("#" + activeTabId).removeClass("kt-menu__item--here");
        jQuery("#setup-wizard-chatbot-train").addClass("kt-menu__item--here");
    });
    if(jQuery("#setup-wizard-chatbot-train").hasClass('disabled')){
        jQuery("#setup-wizard-chatbot-train").removeClass('disabled');
        jQuery("#setup-wizard-chatbot-train").addClass('enabled');
    }
    closeChatbot();
}

function setupWizardScheduleMeeting(){
    // jQuery("#badge_text").hide();
    var activeTabContentId = "";
    var activeTabId = "";
    jQuery(".setup-wizard.active").each(function () {
        activeTabContentId = jQuery(this).attr('id');
        jQuery("#" + activeTabContentId).removeClass("active");
        jQuery("#kt_tabs_top_schedule_ai_model_training").addClass("active");
    });

    jQuery(".setup-wizard-li.kt-menu__item--here").each(function () {
        activeTabId = jQuery(this).attr('id');
        jQuery("#" + activeTabId).removeClass("kt-menu__item--here");
        jQuery("#setup-wizard-schedule-training").addClass("kt-menu__item--here");
    });
    if(jQuery("#setup-wizard-schedule-training").hasClass('disabled')){
        jQuery("#setup-wizard-schedule-training").removeClass('disabled');
        jQuery("#setup-wizard-schedule-training").addClass('enabled');
    }
}