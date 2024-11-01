userCredentials = null;
var selectedDomainId = null;
var txt_website = "https://syra.ai/";
var chatbotIcon = "";
var userIcon = ""
var txt_key = null;
var domainId_id;
var swalWithBootstrapButtons = Swal.mixin({
    customClass: {
    confirmButton: 'btn btn-warning btn-tall btn-wide kt-font-bold kt-font-transform-u userActivityLog',
    cancelButton: 'btn btn-label-brand btn-label btn-md btn-tall btn-wide kt-font-bold kt-font-transform-u userActivityLog'
    },
    buttonsStyling: false
});
function fetchBot(pageName) {
    var form = new FormData();
    form.append("customerId", email);
    var settings = 
    {
        "async": true,
        "url": url_resource + "/syraconsumer/fetch-botDeploment",
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
        if (response.length > 0) 
        {
            //Modification
            if(pageName == "analyticsPage"){
                for (i = 0; i < response.length; i++) {
                    if (i == 0) {
                        apiKEY = response[i].apiKey;
                        botDeploymentId = response[i].id;
                        domainId_id=response[i].domainId_id;
                        customerId=response[i].customerId_id;
                        deployedBotName=response[i].name;
                        uuid = response[i].uuid;
                    }
                    var chatbotNameText = "Chatbot Name : " + response[i].name;
                    jQuery("#projectArea").html(chatbotNameText);
                }
                
                userCredentials = {apiKey : apiKEY, botDeploymentId : botDeploymentId, domainId : domainId_id, customerId: customerId, deployedBotName : deployedBotName, uuid : uuid}
                loadAnalyticsCharts(userCredentials);
                loadSessionCharts(userCredentials);
                jQuery("#withoutBot").hide();
                jQuery("#withBot").show();
            }

            //Modification in Dashboard page based on dashboard.html
            if(pageName == "dashboardPage"){
                for (i = 0; i < response.length; i++) {
                    if (i == 0) {
                        apiKEY = response[i].apiKey;
                        botDeploymentId = response[i].id;
                        domainId_id=response[i].domainId_id;
                        customerId=response[i].customerId_id;
                        deployedBotName=response[i].name;
                        uuid = response[i].uuid;
                        var chatbotNameText = "Chatbot Name : " + response[i].name;
                        jQuery("#projectArea").html(chatbotNameText);
                        jQuery("#previewTab").attr("onclick","javascript:window.open('https://chatbots.syra.ai/projects/"+response[i].domainId_id+"_"+response[i].uuid+"')");
                        jQuery("#globeDashboardIcon").attr("href","admin.php?page=syra-publish");
                        jQuery("#facebookDashboardIcon").attr("href","admin.php?page=syra-publish");
                        jQuery("#slackDashboardIcon").attr("href","admin.php?page=syra-publish");
                        jQuery("#skypeDashboardIcon").attr("href","admin.php?page=syra-publish");
                        jQuery("#appstoreDashboardIcon").attr("href","admin.php?page=syra-publish");
                    }
                }
                userCredentials = {apiKey : apiKEY, botDeploymentId : botDeploymentId, domainId : domainId_id, customerId: customerId, deployedBotName : deployedBotName, uuid : uuid};
                getLastUserLocation(userCredentials["apiKey"]);
                loadDashboardCharts(userCredentials);

            }

            //Modification done based on goal.html
            if(pageName == "goalConversionPage"){
                for (i = 0; i < response.length; i++) {
                    if (i == 0) {
                        apiKEY = response[i].apiKey;
                        botDeploymentId = response[i].id;
                        domainId_id=response[i].domainId_id;
                        customerId=response[i].customerId_id;
                        deployedBotName=response[i].name;
                        uuid = response[i].uuid;
                    }
                    userCredentials = {apiKey : apiKEY, botDeploymentId : botDeploymentId, domainId : domainId_id, customerId: customerId, deployedBotName : deployedBotName, uuid : uuid};
                    loadGoalConversionDashboard(userCredentials);
                }
            }

            //Modification done based on publish.php
            if(pageName == "publishPage"){
                for (i = 0; i < response.length; i++) 
                {
                    if (i == 0) 
                    {
                        apiKEY = response[i].apiKey;
                        botDeploymentId = response[i].id;
                        domainId_id=response[i].domainId_id;
                        customerId=response[i].customerId_id;
                        deployedBotName=response[i].name;
                        uuid = response[i].uuid;
                        jQuery("#previewTabLink").attr("onclick","javascript:window.open('https://chatbots.syra.ai/projects/"+response[i].domainId_id+"_"+response[i].uuid+"')");
                        embeddedScript = '<script src="' + projectUrl + response[0].domainId_id+"_"+response[0].uuid+ '/syra.js" class="syraScript"></script>';
                        jQuery("#kt_clipboard_publish_any_website").val(embeddedScript);
                        jQuery('#kt_clipboard_publish_copy_script').val(embeddedScript);
                        jQuery("#chatBotName").val(response[i].name);
                        convertToPST(response[i].createdDate);
                        jQuery("#publishBotBtn").attr("value",botDeploymentId);
                        jQuery("#unpublishBotBtn").attr("value",botDeploymentId);
                    }
                }
                wordpressPublishUnpublishTrack(botDeploymentId, embeddedScript);
            }

            //Modification based on customize.html
            if(pageName == "customize"){
                for (i = 0; i < response.length; i++) 
                {
                    if (i == 0) 
                    {
                        apiKEY = response[i].apiKey;
                        botDeploymentId = response[i].id;
                        domainId_id=response[i].domainId_id;
                        customerId=response[i].customerId_id;
                        deployedBotName=response[i].name;
                        uuid = response[i].uuid;
                        userCredentials = {apiKey : apiKEY, botDeploymentId : botDeploymentId, domainId : domainId_id, customerId: customerId, deployedBotName : deployedBotName, uuid : uuid};
                        jQuery("#previewTab").attr("onclick","javascript:window.open('https://chatbots.syra.ai/projects/"+response[i].domainId_id+"_"+response[i].uuid+"')");
                        convertToPST(response[i].createdDate);
                    }
                }
                fetchBotDeploymentById(userCredentials, "customize");
            }

            if(pageName == "settingPage"){
                var option = "";
                for (i = 0; i < response.length; i++) 
                {
                    if (i == 0) 
                    {
                        apiKEY = response[i].apiKey;
                        botDeploymentId = response[i].id;
                        domainId_id=response[i].domainId_id;
                        customerId=response[i].customerId_id;
                        deployedBotName=response[i].name;
                        uuid = response[i].uuid;
                        // getShopifyExistingTemplates(botDeploymentId);
                    }
                }
            }

            if(pageName == "setupWizardPage"){
                for (i = 0; i < response.length; i++) 
                {
                    if (i == 0) 
                    {
                        apiKEY = response[i].apiKey;
                        botDeploymentId = response[i].id;
                        domainId_id=response[i].domainId_id;
                        customerId=response[i].customerId_id;
                        deployedBotName=response[i].name;
                        uuid = response[i].uuid;
                        userCredentials = {apiKey : apiKEY, botDeploymentId : botDeploymentId, domainId : domainId_id, customerId: customerId, deployedBotName : deployedBotName, uuid : uuid}
                        jQuery("#previewTab").attr("onclick","javascript:window.open('https://chatbots.syra.ai/projects/"+response[i].domainId_id+"_"+response[i].uuid+"')");
                        convertToPST(response[i].createdDate);
                        loadResponseAnalysisChart(userCredentials);
                        userExitstingChatbot = true;
                    }
                }
                jQuery("#chatstart").hide();
                fetchBotDeploymentById(userCredentials, "setupWizardPage");
            }

            if(pageName == "trainingPage"){
                for (i = 0; i < response.length; i++) 
                {
                    if (i == 0) 
                    {
                        apiKEY = response[i].apiKey;
                        botDeploymentId = response[i].id;
                        domainId_id=response[i].domainId_id;
                        customerId=response[i].customerId_id;
                        deployedBotName=response[i].name;
                        uuid = response[i].uuid;
                        userCredentials = {apiKey : apiKEY, botDeploymentId : botDeploymentId, domainId : domainId_id, customerId: customerId, deployedBotName : deployedBotName, uuid : uuid}
                        jQuery("#previewTab").attr("onclick","javascript:window.open('https://chatbots.syra.ai/projects/"+response[i].domainId_id+"_"+response[i].uuid+"')");
                        convertToPST(response[i].createdDate);
                        loadResponseAnalysisChart(userCredentials);
                    }
                }
                fetchBotDeploymentById(userCredentials, "trainingPage");
            }
        }
        else 
        {
            if(pageName == "analyticsPage"){
                jQuery("#kt_amchart_number_of_users_per_day").html('No Data Exists');
                jQuery("#kt_amchart_number_of_questions_per_user").html('No Data Exists');
                jQuery("#kt_amchart_most_common_questions").html('No Data Exists');
                jQuery("#kt_amchart_number_of_questions_per_hour").html('No Data Exists');
                jQuery("#kt_amchart_most_common_intents").html('No Data Exists');
                jQuery("#kt_amchart_top_ten_visited_links").html('No Data Exists');
                jQuery("#kt_amchart_unique_countries_users_visited_from").html('No Data Exists');
                jQuery("#kt_amchart_average_sessions_time_per_day").html("No Data Exists");
                jQuery("#kt_amchart_number_of_questions_by_users_per_session").html("No Data Exists");
            }
            if(pageName == "dashboardPage"){
                jQuery("#kt_amchart_number_of_users_per_day").html("No Data Exists");
	            jQuery("#kt_amchart_average_sessions_time_per_day").html("No Data Exists");
	            jQuery("#kt_amchart_unique_countries_users_visited_from").html("No Data Exists");

            }
            if(pageName == "goalConversionPage"){
                jQuery("#withoutBot").show();
                    jQuery("#withBot").hide();
                    jQuery("#tablebody").html('<tr><td colspan="5" style="text-align: center;color:red;">No Goal(s) Defined Yet</td></tr>');
            }
            if(pageName == "publishPage"){
                jQuery("#withoutBot").show();
                        jQuery("#withBot").hide();
                        
                        jQuery('#publishChatbotButton').hide();
                        jQuery('#unpublishChatbotButton').hide();

                        jQuery("#previewTab").removeAttr("data-step");
                        jQuery("#previewTab").removeAttr("data-position");
                        jQuery("#previewTab").removeAttr("data-intro");

                        jQuery("#customizeid").removeAttr("data-step");
                        jQuery("#customizeid").removeAttr("data-position");
                        jQuery("#customizeid").removeAttr("data-intro");

                        jQuery("#metrics").removeAttr("data-step");
                        jQuery("#metrics").removeAttr("data-position");
                        jQuery("#metrics").removeAttr("data-intro");

                        jQuery("#graphs").removeAttr("data-step");
                        jQuery("#graphs").removeAttr("data-position");
                        jQuery("#graphs").removeAttr("data-intro");

                        jQuery("#createAIBotLi").attr("data-step", "1");
                        jQuery("#createAIBotLi").attr("data-position", "right");
                        jQuery("#createAIBotLi").attr("data-intro", "Create Your Bot Here");

                        jQuery("#accountSetUpLi").attr("data-step", "2");
                        jQuery("#accountSetUpLi").attr("data-position", "right");
                        jQuery("#accountSetUpLi").attr("data-intro", "Setup Your Account From Here");

            }
            if(pageName == "settingPage"){
                jQuery("#withoutBot").show();
                jQuery("#withBot").hide();

                jQuery('#publishChatbotButton').hide();
                jQuery('#unpublishChatbotButton').hide();

                jQuery("#previewTab").removeAttr("data-step");
                jQuery("#previewTab").removeAttr("data-position");
                jQuery("#previewTab").removeAttr("data-intro");

                jQuery("#customizeid").removeAttr("data-step");
                jQuery("#customizeid").removeAttr("data-position");
                jQuery("#customizeid").removeAttr("data-intro");

                jQuery("#metrics").removeAttr("data-step");
                jQuery("#metrics").removeAttr("data-position");
                jQuery("#metrics").removeAttr("data-intro");

                jQuery("#graphs").removeAttr("data-step");
                jQuery("#graphs").removeAttr("data-position");
                jQuery("#graphs").removeAttr("data-intro");

                jQuery("#createAIBotLi").attr("data-step", "1");
                jQuery("#createAIBotLi").attr("data-position", "right");
                jQuery("#createAIBotLi").attr("data-intro", "Create Your Bot Here");

                jQuery("#accountSetUpLi").attr("data-step", "2");
                jQuery("#accountSetUpLi").attr("data-position", "right");
                jQuery("#accountSetUpLi").attr("data-intro", "Setup Your Account From Here");
            }

            if(pageName == "setupWizardPage"){
                jQuery("#kt_quick_panel").addClass("kt-quick-panel--on");
                getAPIkeyFromNatura();
                userCredentials = null;
                loadResponseAnalysisChart(userCredentials);
                jQuery("#badgeSelect").prop('checked', true);
                document.getElementById("btnCustomize").onclick = function(){
                    customizeBtnClick = true;
                    deployChatBot();
                }
                jQuery("#ingestedDataQty").html("0");
                jQuery("#btnFetchShopifyData").prop("disabled", true);
                /*var select = document.createElement("select");
                select.setAttribute("onchange", "setBotDomainId(this)");
                select.setAttribute("class", "form-control userActivityLog");
                select.setAttribute("name","chatBotName");
                select.setAttribute("id", "chatBotName");
                select.setAttribute("data-step", "1");
                select.setAttribute("data-position", "right");
                select.setAttribute("data-intro", "List of All Available Chatbots");
                var option = "";
                for (i = 0; i < response.length; i++) 
                {
                    if (i == 0) 
                    {
                        apiKEY = response[i].apiKey;
                        botDeploymentId = response[i].id;
                        domainId_id=response[i].domainId_id;
                        customerId=response[i].customerId_id;
                        deployedBotName=response[i].name;
                        uuid = response[i].uuid;
                        convertToPST(response[i].createdDate);
                    }
                    option = document.createElement("option");
                    option.innerHTML = response[i].name;
                    option.setAttribute("value", response[i].apiKey + "||" + response[i].id+"||"+response[i].domainId_id+"_"+response[i].uuid+"||"+response[i].customerId_id+"||"+response[i].name);
                    select.appendChild(option);
                }
                jQuery('#chatbotNameArea').show();
                jQuery("#projectArea").append(select);
                site = 'http://localhost/Syra-AI-Chatbots/frontend/editbotdeployment.html?botDeploymentId=' + botDeploymentId +'&chatBotPreview=http://chatbots.syra.ai/projects/' + domainId_id + '_' + uuid + '&source=syraIframe';
                document.getElementById('frame2').src = site;*/
            }

            if(pageName == "customize"){
                getAPIkeyFromNatura();
                jQuery("#badgeSelect").prop('checked', true);
                document.getElementById("btnCustomize").onclick = deployChatBot;
            }

            if(pageName == "trainingPage"){
                userCredentials = null;
                loadResponseAnalysisChart(userCredentials);
            }
        }

    })
    .fail(function(response) 
    {           

        swalWithBootstrapButtons.fire
        ({
            text: 'fetch-botDeploment'+' -> '+response.status+' -> '+response.statusText,
            icon: "error",
            confirmButtonText: 'Okay'
        });


    });
}

function fetchBotDeploymentById(userCredentials, pageName)
{
    if(userCredentials != null){
        var botDeploymentId = userCredentials["botDeploymentId"];
        var form = new FormData();
        form.append("botDeploymentId", botDeploymentId);
        
        var settings = 
        {
            "async": true,
            "url": url_resource + "/syraconsumer/fetch-botDeploment-by-id",
            "method": "POST",
            "processData": false,
            "contentType": false,
            "mimeType": "multipart/form-data",
            "data": form,
            headers: {
                'Authorization': 'Bearer '+access_token,
            }
        }

        jQuery.ajax(settings).done(function (response) {
            
            response = JSON.parse(response);
            if (pageName == "customize"){
                if (response.length > 0) 
                {
                    if(selectedDomainId == "10"){
                        if(response[0].chatbotIcon == "")
                        {
                            response[0].chatbotIcon = "icon-40.png";
                        }
                    }
                    else{
                        if(response[0].chatbotIcon == "")
                        {
                            response[0].chatbotIcon = "icon-04.png";
                        }
                    }
                    
                    if(response[0].userIcon == ""){

                        response[0].userIcon = "young-lady.png";
                    }

                    setTimeout(function(){
                        ChatBotChangeAfterFetchBotDeploymentByIdCall(response);
                    },1500);

                    jQuery('#txt_name').val(response[0].name);
                    jQuery('#txt_description').val(response[0].description);
                    jQuery('#txt_wmsg').val(response[0].welcomeMessage);
                    jQuery('#txt_bckcol').val("#" + response[0].backGroundColor);
                    jQuery('#widgetBackgroundColor').val("#" + response[0].widgetBackgroundColor);
                    jQuery('#leadOnBtnBackgroundColor').val("#" + response[0].leadOnBtnBackgroundColor);
                    jQuery('#userQuestionBackgroundColor').val("#" + response[0].userQuestionBackgroundColor);
                    jQuery('#botResponseBackgroundColor').val("#" + response[0].botResponseBackgroundColor);
                    
                    jQuery("#chatbotIconImage").attr("name",response[0].chatbotIcon);
                    jQuery("#chatbotIconImage").attr("src",wp_path+"images/chatbot-icons/"+response[0].chatbotIcon);
                    jQuery("#chatbotIconImg").attr("name",response[0].chatbotIcon);
                    jQuery("#chatbotIconImg").attr("src",wp_path+"images/chatbot-icons/"+response[0].chatbotIcon);

                    jQuery("#userIconImage").attr("name",response[0].userIcon);
                    jQuery("#userIconImage").attr("src",wp_path+"images/user-icon/"+response[0].userIcon);
                    jQuery("#storeVisitorIconImg").attr("src",wp_path+"images/user-icon/"+response[0].userIcon);
                    jQuery("#storeVisitorIconImg").attr("name",response[0].userIcon);
                    
                    jQuery("#"+ response[0].chatbotIcon.split('.')[0]).attr("checked",true);
                    jQuery("#"+ response[0].userIcon.split('.')[0]).attr("checked",true);
                    chatbotIcon = response[0].chatbotIcon;
                    userIcon = response[0].userIcon;
                    jQuery('#contactURL').val(response[0].contactURL);
                    jQuery("#privacyURL").val(response[0].privacyUrl);
                    jQuery('#txt_preview').val(response[0].previewMessage);
                    jQuery('#badgeTextBackgroundColor').val("#" + response[0].previewMessageBackGroundColor);
                    jQuery('#badgeSelect').val(response[0].isPreviewChecked);
                    response[0].isPreviewChecked == 1 ? jQuery("#badgeSelect").attr("checked",true) : jQuery("#badgeSelect").attr("checked",false);
                    fetchdomain();
                    document.getElementById("btnCustomize").onclick = function() { updateBotDeployment(userCredentials, "customize"); } 
                } 
            }
            else if(pageName == "setupWizardPage"){
                if (response.length > 0) 
                {
                    getOpeningQuestions();
                    setTimeout(function(){
                        ChatBotChangeAfterFetchBotDeploymentByIdCall(response);
                    },1500);
                    jQuery('#txt_preview').val(response[0].previewMessage);
                    jQuery('#badgeTextBackgroundColor').val("#" + response[0].previewMessageBackGroundColor);
                    jQuery('#badgeSelect').val(response[0].isPreviewChecked);
                    response[0].isPreviewChecked == 1 ? jQuery("#badgeSelect").attr("checked",true) : jQuery("#badgeSelect").attr("checked",false);

                    jQuery('#txt_name').val(response[0].name);
                    jQuery('#txt_description').val(response[0].description);
                    jQuery('#txt_wmsg').val(response[0].welcomeMessage);
                    jQuery('#txt_bckcol').val("#" + response[0].backGroundColor);
                    jQuery('#widgetBackgroundColor').val("#" + response[0].widgetBackgroundColor);
                    jQuery('#leadOnBtnBackgroundColor').val("#" + response[0].leadOnBtnBackgroundColor);
                    jQuery('#userQuestionBackgroundColor').val("#" + response[0].userQuestionBackgroundColor);
                    jQuery('#botResponseBackgroundColor').val("#" + response[0].botResponseBackgroundColor);
                    
                    jQuery("#chatbotIconImage").attr("name",response[0].chatbotIcon);
                    jQuery("#chatbotIconImage").attr("src",wp_path+"images/chatbot-icons/"+response[0].chatbotIcon);
                    jQuery("#chatbotIconImg").attr("name",response[0].chatbotIcon);
                    jQuery("#chatbotIconImg").attr("src",wp_path+"images/chatbot-icons/"+response[0].chatbotIcon);

                    jQuery("#userIconImage").attr("name",response[0].userIcon);
                    jQuery("#userIconImage").attr("src",wp_path+"images/user-icon/"+response[0].userIcon);
                    jQuery("#storeVisitorIconImg").attr("src",wp_path+"images/user-icon/"+response[0].userIcon);
                    jQuery("#storeVisitorIconImg").attr("name",response[0].userIcon);

                    jQuery("#"+ response[0].chatbotIcon.split('.')[0]).attr("checked",true);
                    jQuery("#"+ response[0].userIcon.split('.')[0]).attr("checked",true);
                    chatbotIcon = response[0].chatbotIcon;
                    userIcon = response[0].userIcon;
                    jQuery('#contactURL').val(response[0].contactURL);
                    jQuery('#txt_q1').val(response[0].question1);
                    jQuery('#txt_display1').val(response[0].displayValueOfQuestion1);
                    jQuery('#txt_answer1').val(response[0].answerUrl1);
                    jQuery('#txt_q2').val(response[0].question2);
                    jQuery('#txt_display2').val(response[0].displayValueOfQuestion2);
                    jQuery('#txt_answer2').val(response[0].answerUrl2);
                    jQuery('#txt_q3').val(response[0].question3);
                    jQuery('#txt_display3').val(response[0].displayValueOfQuestion3);
                    jQuery('#txt_answer3').val(response[0].answerUrl3);
                    jQuery('#txt_q4').val(response[0].question4);
                    jQuery('#txt_display4').val(response[0].displayValueOfQuestion4);
                    jQuery('#txt_answer4').val(response[0].answerUrl4);
                    jQuery('#txt_q5').val(response[0].question5);
                    jQuery('#txt_display5').val(response[0].displayValueOfQuestion5);
                    jQuery('#txt_answer5').val(response[0].answerUrl5);
                    jQuery('#txt_website').val(response[0].website);
                    jQuery('#txt_key').val(response[0].apiKey);

                    if(response[0].question1 != "" || response[0].displayValueOfQuestion1 != "" || response[0].answerUrl1 != "")
                    {
                        var openingQuestionDetails1 = '<li data-repeater-item>' +                                                   
                                                            '<div class="row">' +
                                                                '<div class="col-lg-6">' +
                                                                    '<div class="form-group">' +
                                                                        '<label>Opening Question\'s Text</label>'+
                                                                        '<textarea class="form-control" rows="3" id="txt_ques1" onkeyup="changedemoBotQuestion1()" onkeydown="changedemoBotQuestion1()"></textarea>' +
                                                                    '</div>' +
                                                                '</div>' +
                                                                '<div class="col-lg-6">' +
                                                                    '<div class="form-group mb-lg-0">' +
                                                                        '<label>Opening Question\'s Button Text</label>' +
                                                                        '<textarea class="form-control" rows="3" id="txt_display_value1" onkeyup="changedemoBotQuestion1()" onkeydown="changedemoBotQuestion1()"></textarea>' +
                                                                    '</div>' +
                                                                '</div>' +
                                                                '<div class="col-lg-6">' +
                                                                    '<div class="form-group mb-lg-0">' +
                                                                        '<label>Answer Text or URL</label>' +
                                                                        '<textarea class="form-control" rows="3" id="txt_answer_value1"></textarea>' +
                                                                    '</div>' +
                                                                '</div>' +
                                                                // '<div class="col-lg-6 text-right">' +
                                                                //  '<div class="form-group mb-0">' +
                                                                //      '<a class="kt-link kt-font-bold" href="javascript:;" data-repeater-delete><i class="fas fa-trash-alt" style="color: #472235"></i></a>' +
                                                                //  '</div>' +
                                                                // '</div>' +
                                                            '</div>' +          
                                                            '<div class="kt-separator kt-separator--dashed kt-separator--md"></div>' +
                                                        '</li>';
                            jQuery("#listOfOpeningQuestions").append(openingQuestionDetails1);
                            if(response[0].question1 == "undefined"){
                                response[0].question1 = "";
                            }
                            jQuery('#txt_ques1').val(response[0].question1);
                            jQuery('#txt_display_value1').val(response[0].displayValueOfQuestion1);
                            if(response[0].answerUrl1 == "undefined"){
                                response[0].answerUrl1 = "";
                            }
                            jQuery('#txt_answer_value1').val(response[0].answerUrl1);
                        totalQuestionCount++;
                    }

                    if(response[0].question2 != "" || response[0].displayValueOfQuestion2 != "" || response[0].answerUrl2 != "")
                    {
                        var openingQuestionDetails2 = '<li data-repeater-item>' +                                                   '<div class="row">' +
                                                '<div class="col-lg-6">' +
                                                    '<div class="form-group">' +
                                                        '<label>Opening Question\'s Text</label>'+
                                                        '<textarea class="form-control" rows="3" id="txt_ques2" onkeyup="changedemoBotQuestion2()" onkeydown="changedemoBotQuestion2()"></textarea>' +
                                                    '</div>' +
                                                '</div>' +
                                                '<div class="col-lg-6">' +
                                                    '<div class="form-group mb-lg-0">' +
                                                        '<label>Opening Question\'s Button Text</label>' +
                                                        '<textarea class="form-control" rows="3" id="txt_display_value2" onkeyup="changedemoBotQuestion2()" onkeydown="changedemoBotQuestion2()"></textarea>' +
                                                    '</div>' +
                                                '</div>' +
                                                '<div class="col-lg-6">' +
                                                    '<div class="form-group mb-lg-0">' +
                                                        '<label>Answer Text or URL</label>' +
                                                        '<textarea class="form-control" rows="3" id="txt_answer_value2"></textarea>' +
                                                    '</div>' +
                                                '</div>' +
                                            '</div>' +          
                                            '<div class="kt-separator kt-separator--dashed kt-separator--md"></div>' +
                                        '</li>';
                        jQuery("#listOfOpeningQuestions").append(openingQuestionDetails2);
                        if(response[0].question2 == "undefined"){
                            response[0].question2 = "";
                        }
                        jQuery('#txt_ques2').val(response[0].question2);
                        jQuery('#txt_display_value2').val(response[0].displayValueOfQuestion2);
                        if(response[0].answerUrl2 == "undefined"){
                            response[0].answerUrl2 = "";
                        }
                        jQuery('#txt_answer_value2').val(response[0].answerUrl2);
                        totalQuestionCount++;
                    }

                    if(response[0].question3 != "" || response[0].displayValueOfQuestion3 != "" || response[0].answerUrl3 != "")
                    {
                        var openingQuestionDetails3 = '<li data-repeater-item>' +                                                   
                                            '<div class="row">' +
                                                '<div class="col-lg-6">' +
                                                    '<div class="form-group">' +
                                                        '<label>Opening Question\'s Text</label>'+
                                                        '<textarea class="form-control" rows="3" id="txt_ques3" onkeyup="changedemoBotQuestion3()" onkeydown="changedemoBotQuestion3()"></textarea>' +
                                                    '</div>' +
                                                '</div>' +
                                                '<div class="col-lg-6">' +
                                                    '<div class="form-group mb-lg-0">' +
                                                        '<label>Opening Question\'s Button Text</label>' +
                                                        '<textarea class="form-control" rows="3" id="txt_display_value3" onkeyup="changedemoBotQuestion3()" onkeydown="changedemoBotQuestion3()"></textarea>' +
                                                    '</div>' +
                                                '</div>' +
                                                '<div class="col-lg-6">' +
                                                    '<div class="form-group mb-lg-0">' +
                                                        '<label>Answer Text or URL</label>' +
                                                        '<textarea class="form-control" rows="3" id="txt_answer_value3"></textarea>' +
                                                    '</div>' +
                                                '</div>' +
                                            '</div>' +          
                                            '<div class="kt-separator kt-separator--dashed kt-separator--md"></div>' +
                                        '</li>';
                        jQuery("#listOfOpeningQuestions").append(openingQuestionDetails3);
                        if(response[0].question3 == "undefined"){
                            response[0].question3 = "";
                        }
                        jQuery('#txt_ques3').val(response[0].question3);
                        jQuery('#txt_display_value3').val(response[0].displayValueOfQuestion3);
                        if(response[0].answerUrl3 == "undefined"){
                            response[0].answerUrl3 = "";
                        }
                        jQuery('#txt_answer_value3').val(response[0].answerUrl3);
                        totalQuestionCount++;
                    }

                    if(response[0].question4 != "" || response[0].displayValueOfQuestion4 != "" || response[0].answerUrl4 != "")
                    {
                        var openingQuestionDetails4 = '<li data-repeater-item>' +                                                   '<div class="row">' +
                                                '<div class="col-lg-6">' +
                                                    '<div class="form-group">' +
                                                        '<label>Opening Question\'s Text</label>'+
                                                        '<textarea class="form-control" rows="3" id="txt_ques4" onkeyup="changedemoBotQuestion4()" onkeydown="changedemoBotQuestion4()"></textarea>' +
                                                    '</div>' +
                                                '</div>' +
                                                '<div class="col-lg-6">' +
                                                    '<div class="form-group mb-lg-0">' +
                                                        '<label>Opening Question\'s Button Text</label>' +
                                                        '<textarea class="form-control" rows="3" id="txt_display_value4" onkeyup="changedemoBotQuestion4()" onkeydown="changedemoBotQuestion4()"></textarea>' +
                                                    '</div>' +
                                                '</div>' +
                                                '<div class="col-lg-6">' +
                                                    '<div class="form-group mb-lg-0">' +
                                                        '<label>Answer Text or URL</label>' +
                                                        '<textarea class="form-control" rows="3" id="txt_answer_value4"></textarea>' +
                                                    '</div>' +
                                                '</div>' +
                                            '</div>' +          
                                            '<div class="kt-separator kt-separator--dashed kt-separator--md"></div>' +
                                        '</li>';
                        jQuery("#listOfOpeningQuestions").append(openingQuestionDetails4);
                        if(response[0].question4 == "undefined"){
                            response[0].question4 = "";
                        }
                        jQuery('#txt_ques4').val(response[0].question4);
                        jQuery('#txt_display_value4').val(response[0].displayValueOfQuestion4);
                        if(response[0].answerUrl4 == "undefined"){
                            response[0].answerUrl4 = "";
                        }
                        jQuery('#txt_answer_value4').val(response[0].answerUrl4);
                        totalQuestionCount++;
                    }

                    if(response[0].question5 != "" || response[0].displayValueOfQuestion5 != "" || response[0].answerUrl5 != "")
                    {
                        var openingQuestionDetails5 = '<li data-repeater-item>' +                                                   '<div class="row">' +
                                                '<div class="col-lg-6">' +
                                                    '<div class="form-group">' +
                                                        '<label>Opening Question\'s Text</label>'+
                                                        '<textarea class="form-control" rows="3" id="txt_ques5" onkeyup="changedemoBotQuestion5()" onkeydown="changedemoBotQuestion5()"></textarea>' +
                                                    '</div>' +
                                                '</div>' +
                                                '<div class="col-lg-6">' +
                                                    '<div class="form-group mb-lg-0">' +
                                                        '<label>Opening Question\'s Button Text</label>' +
                                                        '<textarea class="form-control" rows="3" id="txt_display_value5" onkeyup="changedemoBotQuestion5()" onkeydown="changedemoBotQuestion5()"></textarea>' +
                                                    '</div>' +
                                                '</div>' +
                                                '<div class="col-lg-6">' +
                                                    '<div class="form-group mb-lg-0">' +
                                                        '<label>Answer Text or URL</label>' +
                                                        '<textarea class="form-control" rows="3" id="txt_answer_value5"></textarea>' +
                                                    '</div>' +
                                                '</div>' +
                                            '</div>' +          
                                            '<div class="kt-separator kt-separator--dashed kt-separator--md"></div>' +
                                        '</li>';
                        jQuery("#listOfOpeningQuestions").append(openingQuestionDetails5);
                        if(response[0].question5 == "undefined"){
                            response[0].question5 = "";
                        }
                        jQuery('#txt_ques5').val(response[0].question5);
                        jQuery('#txt_display_value5').val(response[0].displayValueOfQuestion5);
                        if(response[0].answerUrl5 == "undefined"){
                            response[0].answerUrl5 = "";
                        }
                        jQuery('#txt_answer_value5').val(response[0].answerUrl5);
                        totalQuestionCount++;
                    }
                    document.getElementById("btnCustomize").onclick = function() 
                    { 
                        customizeBtnClick = true;
                        updateBotDeployment(userCredentials, "setupWizardPage");
                    } 
                }     
                retriveTrainingQuestions(userCredentials, "setupWizardPage");
                retriveTrainingURLs(userCredentials, "setupWizardPage");
            } 
            else if(pageName == "trainingPage"){
                if (response.length > 0) 
                {
                    domainId_id = response[0].domainId_id;
                    if(response[0].question1 != "" || response[0].displayValueOfQuestion1 != "" || response[0].answerUrl1 != ""){
                        var openingQuestionDetails1 = '<li data-repeater-item>' +
                                                                '<div class="row">' +
                                                                    '<div class="col-lg-6">' +
                                                                        '<div class="form-group">' +
                                                                            "<label>Opening Question's Text</label>" +
                                                                            '<textarea class="form-control" id="txt_ques1" rows="3"></textarea>' +
                                                                        '</div>' +
                                                                    '</div>' +
                                                                    '<div class="col-lg-6">' +
                                                                        '<div class="form-group mb-lg-0">' +
                                                                            "<label>Opening Question's Button Text</label>" +
                                                                            '<textarea class="form-control" rows="3" id="txt_display_value1"></textarea>' +
                                                                        '</div>' +
                                                                    '</div>' +
                                                                    '<div class="col-lg-6">' +
                                                                        '<div class="form-group mb-lg-0">' +
                                                                            '<label>Answer Text or URL</label>' +
                                                                            '<textarea class="form-control" rows="3" id="txt_answer_value1"></textarea>' +
                                                                        '</div>' +
                                                                    '</div>' +
                                                                '</div>' +
                                                                '<div class="kt-separator kt-separator--dashed kt-separator--md"></div>' +
                                                            '</li>' ;
                        jQuery("#listOfOpeningQuestions").append(openingQuestionDetails1);
                        jQuery('#txt_ques1').val(response[0].question1);
                        jQuery('#txt_display_value1').val(response[0].displayValueOfQuestion1);
                        jQuery('#txt_answer_value1').val(response[0].answerUrl1);
                        totalQuestionCount++;
                    }
                    
                    if(response[0].question2 != "" || response[0].displayValueOfQuestion2 != "" || response[0].answerUrl2 != ""){
                        var openingQuestionDetails2 = '<li data-repeater-item>' +
                                                                '<div class="row">' +
                                                                    '<div class="col-lg-6">' +
                                                                        '<div class="form-group">' +
                                                                            "<label>Opening Question's Text</label>" +
                                                                            '<textarea class="form-control" id="txt_ques2" rows="3"></textarea>' +
                                                                        '</div>' +
                                                                    '</div>' +
                                                                    '<div class="col-lg-6">' +
                                                                        '<div class="form-group mb-lg-0">' +
                                                                            "<label>Opening Question's Button Text</label>" +
                                                                            '<textarea class="form-control" rows="3" id="txt_display_value2"></textarea>' +
                                                                        '</div>' +
                                                                    '</div>' +
                                                                    '<div class="col-lg-6">' +
                                                                        '<div class="form-group mb-lg-0">' +
                                                                            '<label>Answer Text or URL</label>' +
                                                                            '<textarea class="form-control" rows="3" id="txt_answer_value2"></textarea>' +
                                                                        '</div>' +
                                                                    '</div>' +
                                                                '</div>' +
                                                                '<div class="kt-separator kt-separator--dashed kt-separator--md"></div>' +
                                                            '</li>' ;
                        jQuery("#listOfOpeningQuestions").append(openingQuestionDetails2);
                        jQuery('#txt_ques2').val(response[0].question2);
                        jQuery('#txt_display_value2').val(response[0].displayValueOfQuestion2);
                        jQuery('#txt_answer_value2').val(response[0].answerUrl2);
                        totalQuestionCount++;
                    }
                
                    if(response[0].question3 != "" || response[0].displayValueOfQuestion3 != "" || response[0].answerUrl3 != ""){
                        var openingQuestionDetails3 = '<li data-repeater-item>' +
                                                                '<div class="row">' +
                                                                    '<div class="col-lg-6">' +
                                                                        '<div class="form-group">' +
                                                                            "<label>Opening Question's Text</label>" +
                                                                            '<textarea class="form-control" id="txt_ques3" rows="3"></textarea>' +
                                                                        '</div>' +
                                                                    '</div>' +
                                                                    '<div class="col-lg-6">' +
                                                                        '<div class="form-group mb-lg-0">' +
                                                                            "<label>Opening Question's Button Text</label>" +
                                                                            '<textarea class="form-control" rows="3" id="txt_display_value3"></textarea>' +
                                                                        '</div>' +
                                                                    '</div>' +
                                                                    '<div class="col-lg-6">' +
                                                                        '<div class="form-group mb-lg-0">' +
                                                                            '<label>Answer Text or URL</label>' +
                                                                            '<textarea class="form-control" rows="3" id="txt_answer_value3"></textarea>' +
                                                                        '</div>' +
                                                                    '</div>' +
                                                                '</div>' +
                                                                '<div class="kt-separator kt-separator--dashed kt-separator--md"></div>' +
                                                            '</li>' ;
                        jQuery("#listOfOpeningQuestions").append(openingQuestionDetails3);
                        jQuery('#txt_ques3').val(response[0].question3);
                        jQuery('#txt_display_value3').val(response[0].displayValueOfQuestion3);
                        jQuery('#txt_answer_value3').val(response[0].answerUrl3);
                        totalQuestionCount++;
                    }
                
                    if(response[0].question4 != "" || response[0].displayValueOfQuestion4 != "" || response[0].answerUrl4 != ""){
                        var openingQuestionDetails4 = '<li data-repeater-item>' +
                                                                '<div class="row">' +
                                                                    '<div class="col-lg-6">' +
                                                                        '<div class="form-group">' +
                                                                            "<label>Opening Question's Text</label>" +
                                                                            '<textarea class="form-control" id="txt_ques4" rows="3"></textarea>' +
                                                                        '</div>' +
                                                                    '</div>' +
                                                                    '<div class="col-lg-6">' +
                                                                        '<div class="form-group mb-lg-0">' +
                                                                            "<label>Opening Question's Button Text</label>" +
                                                                            '<textarea class="form-control" rows="3" id="txt_display_value4"></textarea>' +
                                                                        '</div>' +
                                                                    '</div>' +
                                                                    '<div class="col-lg-6">' +
                                                                        '<div class="form-group mb-lg-0">' +
                                                                            '<label>Answer Text or URL</label>' +
                                                                            '<textarea class="form-control" rows="3" id="txt_answer_value4"></textarea>' +
                                                                        '</div>' +
                                                                    '</div>' +
                                                                '</div>' +
                                                                '<div class="kt-separator kt-separator--dashed kt-separator--md"></div>' +
                                                            '</li>' ;
                        jQuery("#listOfOpeningQuestions").append(openingQuestionDetails4);
                        jQuery('#txt_ques4').val(response[0].question4);
                        jQuery('#txt_display_value4').val(response[0].displayValueOfQuestion4);
                        jQuery('#txt_answer_value4').val(response[0].answerUrl4);
                        totalQuestionCount++;
                    }
                
                    if(response[0].question5 != "" || response[0].displayValueOfQuestion5 != "" || response[0].answerUrl5 != ""){
                        var openingQuestionDetails5 = '<li data-repeater-item>' +
                                                                '<div class="row">' +
                                                                    '<div class="col-lg-6">' +
                                                                        '<div class="form-group">' +
                                                                            "<label>Opening Question's Text</label>" +
                                                                            '<textarea class="form-control" id="txt_ques5" rows="3"></textarea>' +
                                                                        '</div>' +
                                                                    '</div>' +
                                                                    '<div class="col-lg-6">' +
                                                                        '<div class="form-group mb-lg-0">' +
                                                                            "<label>Opening Question's Button Text</label>" +
                                                                            '<textarea class="form-control" rows="3" id="txt_display_value5"></textarea>' +
                                                                        '</div>' +
                                                                    '</div>' +
                                                                    '<div class="col-lg-6">' +
                                                                        '<div class="form-group mb-lg-0">' +
                                                                            '<label>Answer Text or URL</label>' +
                                                                            '<textarea class="form-control" rows="3" id="txt_answer_value5"></textarea>' +
                                                                        '</div>' +
                                                                    '</div>' +
                                                                '</div>' +
                                                                '<div class="kt-separator kt-separator--dashed kt-separator--md"></div>' +
                                                            '</li>' ;
                        jQuery("#listOfOpeningQuestions").append(openingQuestionDetails5);
                        jQuery('#txt_ques5').val(response[0].question5);
                        jQuery('#txt_display_value5').val(response[0].displayValueOfQuestion5);
                        jQuery('#txt_answer_value5').val(response[0].answerUrl5);
                        totalQuestionCount++;
                    }
                    
                }
                retriveTrainingQuestions(userCredentials, "trainingPage");
                retriveTrainingURLs(userCredentials, "trainingPage");
                logFilter(7);
                fetchFeedbackLog();
                fetchFeedback();
            }
        })
        .fail(function(response) 
        {           
            swalWithBootstrapButtons.fire
            ({
                text: 'fetch-botDeploment-by-id'+' -> '+response.status+' -> '+response.statusText,
                icon: "error",
                confirmButtonText: 'Okay'
            });   
        });
    }
}

function ChatBotChangeAfterFetchBotDeploymentByIdCall(response)
{
    jQuery('#botName').html(response[0].name);
    jQuery('#description').html(response[0].description);
    jQuery('#welcomeMsg').html(response[0].welcomeMessage);
    jQuery('#badge_text').html(response[0].previewMessage);
    jQuery('#badge_text').css("background","#" + response[0].previewMessageBackGroundColor);
    
    /* Start of Display Questions*/
        
        if (response[0].question1.trim() !== "" && response[0].displayValueOfQuestion1.trim() !== "") 
        {
            jQuery('#questionNo1').html(response[0].displayValueOfQuestion1);
            jQuery('#questionNo1').attr("name", response[0].question1);
        }
        else if (response[0].question1.trim() !== "" && response[0].displayValueOfQuestion1.trim() === "") 
        {
            jQuery('#questionNo1').html(response[0].question1);
            jQuery('#questionNo1').attr("name", response[0].question1);
        }

        if (response[0].question2.trim() !== "" && response[0].displayValueOfQuestion2.trim() !== "") 
        {
            jQuery('#questionNo2').html(response[0].displayValueOfQuestion2);
            jQuery('#questionNo2').attr("name", response[0].question2);
        }
        else if (response[0].question2.trim() !== "" && response[0].displayValueOfQuestion2.trim() === "") 
        {
            jQuery('#questionNo2').html(response[0].question2);
            jQuery('#questionNo2').attr("name", response[0].question2);
        }

        if (response[0].question3.trim() !== "" && response[0].displayValueOfQuestion3.trim() !== "") 
        {
            jQuery('#questionNo3').html(response[0].displayValueOfQuestion3);
            jQuery('#questionNo3').attr("name", response[0].question3);
        }
        else if (response[0].question3.trim() !== "" && response[0].displayValueOfQuestion3.trim() === "") 
        {
            jQuery('#questionNo3').html(response[0].question3);
            jQuery('#questionNo3').attr("name", response[0].question3);
        }

        if (response[0].question4.trim() !== "" && response[0].displayValueOfQuestion4.trim() !== "") 
        {
            jQuery('#questionNo4').html(response[0].displayValueOfQuestion4);
            jQuery('#questionNo4').attr("name", response[0].question4);
        }
        else if (response[0].question4.trim() !== "" && response[0].displayValueOfQuestion4.trim() === "") 
        {
            jQuery('#questionNo4').html(response[0].question4);
            jQuery('#questionNo4').attr("name", response[0].question4);
        }

        if (response[0].question5.trim() !== "" && response[0].displayValueOfQuestion5.trim() !== "") 
        {
            jQuery('#questionNo5').html(response[0].displayValueOfQuestion5);
            jQuery('#questionNo5').attr("name", response[0].question5);
        }
        else if (response[0].question4.trim() !== "" && response[0].displayValueOfQuestion5.trim() === "") 
        {
            jQuery('#questionNo5').html(response[0].question5);
            jQuery('#questionNo5').attr("name", response[0].question5);
        }

    /* End of Display Questions*/


    /* Start of Header Section of the Chatbot*/
        var headerBackgroundColor=response[0].backGroundColor;
        dbotColor = ColorLuminance(headerBackgroundColor, -0.3);
        getbase(dbotColor);
        getdeeperbase(dbotColor);
        jQuery('#botHeader').css("background-color", "#" + headerBackgroundColor);
        jQuery('#a_thumbsup').css("background-color", dbotColor);
        jQuery('#a_thumbsdown').css("background-color", dbotColor);
        jQuery('#a_mail').css("background-color", dbotColor);
        jQuery('#sendBtn').css("background", "url(" + btnimg + ") no-repeat center center #" + headerBackgroundColor);
        jQuery('#sendBtn').css("background-size", "34px auto");

        
        jQuery('#X_img').attr("src", crossimg);
        jQuery('#mail').attr("src", mailimg);
        jQuery('#thumbsup').attr("src", thumbsupimg);
        jQuery('#thumbsdown').attr("src", thumbsdownimg);           
        jQuery('#botName').css("color", textcol);
        jQuery('#description').css("color", textcol);
    /* End of Header Section of the Chatbot*/


    /* Start of widgetBackgroundColor*/
        widgetBackgroundColor="#" +response[0].widgetBackgroundColor;
        jQuery('.automated_syra').css("background",widgetBackgroundColor);
        jQuery('.chatBotIconBorder').css("border",widgetBackgroundColor + ' 6px solid');
        jQuery('#syraChatDiv_syra').css("background",widgetBackgroundColor);
    /* End of widgetBackgroundColor*/


    /* Start of leadOnBtnBackgroundColor*/
        leadOnBtnBackgroundColor="#" +response[0].leadOnBtnBackgroundColor;
        jQuery('.leadOn').css("background",leadOnBtnBackgroundColor);
    /* End of leadOnBtnBackgroundColor*/


    /* Start of botResponseBackgroundColor*/
        botResponseBackgroundColor="#" +response[0].botResponseBackgroundColor;   
        jQuery('.incom_mess_text_syra').css("background",botResponseBackgroundColor);
    /* End of botResponseBackgroundColor*/


    /* Start of userQuestionBackgroundColor*/
         userQuestionBackgroundColor="#" +response[0].userQuestionBackgroundColor;           
         jQuery('.out_mess_text_syra').css("background",userQuestionBackgroundColor);
    /* End of userQuestionBackgroundColor*/

    /*Star of Icon Change*/
        if(response[0].chatbotIcon == "undefined")
        {
            response[0].chatbotIcon = "icon-01.png";
        }
        var image_url= wp_path+'images/chatbot-icons/';
        image_url += response[0].chatbotIcon;
        jQuery("#chatbotIconImage").attr("name",response[0].chatbotIcon);
        jQuery("#chatbotIconImage").attr("src",image_url);
        jQuery("#chatbotIconImage").attr("name",response[0].chatbotIcon);
        jQuery(".clickableChatBotIcon").attr("src",image_url);
        jQuery("#syraIconWithInChatBot").attr("src",image_url);
        jQuery(".SyraChatBotIcon").attr("src",image_url);
        syraIconWithInChatBotLightBase=image_url;
        if(response[0].userIcon == "undefined")
        {
            response[0].userIcon = "young-lady.png";
        }
        userIcon = wp_path+'images/user-icon/'+response[0].userIcon;
        jQuery("#userIconImage").attr("name",response[0].userIcon);
        jQuery("#userIconImage").attr("src",userIcon);
        jQuery("#userIconImage").attr("name",response[0].userIcon);
        
   /*End of Icon Change*/

}

function deployChatBot(){
   /* var selectedId=parseInt(jQuery('#sel_domain').val());
    if(jQuery('#sel_domain').val() == "select one"){
        jQuery('#sel_domain').val("12");
    }*/
    if(selectedDomainId == "10"){
        if(jQuery("#chatbotIconImage").attr("name") == ""){
            jQuery("#chatbotIconImage").attr("name","icon-40.png");
        }
    }
    else{
        if(jQuery("#chatbotIconImage").attr("name") == ""){
            jQuery("#chatbotIconImage").attr("name","icon-04.png");
        }
    }
    if(jQuery("#userIconImage").attr("name") == ""){
        jQuery("#userIconImage").attr("name","young-lady.png");
    }
    jQuery("#btnCustomize").prop("disabled", true);
    var previewMessageCheck = jQuery("#badgeSelect").is(":checked");
    var isPreviewChecked = 0;
    if(previewMessageCheck){    
        isPreviewChecked = 1;
    }
    else{
        isPreviewChecked = 0;
    }
    var form = new FormData();        
    form.append("customerId", email);
    form.append("name", jQuery('#txt_name').val().trim());
    if(selectedDomainId == 10){
        form.append("description", "I am an AI Chatbot and need training before you can use me. Schedule my training by clicking https://chatbots.syra.ai/training.html#scheduletraining");
    }
    else{
        form.append("description", jQuery('#txt_description').val().trim());
    }
    if(jQuery('#txt_preview').val() == ""){
        jQuery('#txt_preview').val("Can I help you?");
    }
    if(jQuery('#contactURL').val() == ""){
        jQuery('#contactURL').val("https://cloudhiti.ai/contact/")
    }
    if(jQuery('#privacyURL').val() == ""){
        jQuery('#privacyURL').val("https://cloudhiti.ai/privacy-policy/");
    }
    form.append("chatbotIcon", jQuery("#chatbotIconImage").attr("name"));
    form.append("userIcon", jQuery("#userIconImage").attr("name"));
    form.append("welcomeMessage", jQuery('#txt_wmsg').val());
    form.append("backGroundColor", jQuery('#txt_bckcol').val().replace('#',''));
    form.append("widgetBackgroundColor", jQuery('#widgetBackgroundColor').val().replace('#',''));
    form.append("botResponseBackgroundColor", jQuery('#botResponseBackgroundColor').val().replace('#',''));
    form.append("userQuestionBackgroundColor", jQuery('#userQuestionBackgroundColor').val().replace('#',''));
    form.append("leadOnBtnBackgroundColor", jQuery('#leadOnBtnBackgroundColor').val().replace('#',''));
    form.append("contactURL", jQuery('#contactURL').val());
    form.append("privacyURL", jQuery('#privacyURL').val());
    form.append("isPlanActive", 1);
    form.append("question1", "");
    form.append("displayValueOfQuestion1", "");
    form.append("answerUrl1", "");
    form.append("question2", "");
    form.append("displayValueOfQuestion2", "");
    form.append("answerUrl2", "");
    form.append("question3", "");
    form.append("displayValueOfQuestion3", "");
    form.append("answerUrl3", "");
    form.append("question4", "");
    form.append("displayValueOfQuestion4", "");
    form.append("answerUrl4", "");
    form.append("question5", "");
    form.append("displayValueOfQuestion5", "");
    form.append("answerUrl5", "");
    form.append("website", txt_website);
    form.append("apiKey", jQuery('#txt_key').val());
    form.append("previewMessage", jQuery('#txt_preview').val());
    form.append("previewMessageBackGroundColor", jQuery('#badgeTextBackgroundColor').val().replace('#',''));
    form.append("isPreviewChecked", isPreviewChecked);

    var botName = jQuery('#txt_name').val().trim();

    var domainId = "12";

    form.append("domainId", domainId);
    
    if(jQuery('#txt_name').val().trim() == ""){
        jQuery("#msgArea").html("<b><font style='color:#5A679E;font-size:9x'>Chatbot Should Have a Name</font></b>");
        return;
    }
    else if((jQuery('#txt_key').val().trim() == "") && selectedDomainId!=10)//For Shopify We
    {
        jQuery("#msgArea").html("<b><font style='color:#5A679E;font-size:9x'>Project API Key Needed From Natura</font></b>");
        return;
    }  
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": url_resource + "/syraconsumer/create-botDeploment",
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

        if(response.status === 201)
        {                       
            deployedURL = url_resource + response.deployedURL;

            jQuery('#txt_website').val("");
            jQuery('#txt_key').val("");
            var botdeploymentId = response.botId;
            var uuid = response.uuid;
            var goalName = jQuery('#txt_goalName').val();
            var goalURL = jQuery('#txt_goalURL').val();
            insertNotificationData("3","Need to take action",email);
            jQuery("#btnCustomize").prop("disabled", false);

            swalWithBootstrapButtons.fire({
                text: "Your Syra AI Chatbot was deployed successfully.",
                icon: "success",
                confirmButtonText: 'Okay'
            });
            // .then((value) => {
            //  if (value) {
            //      window.open(deployedURL, '_blank');
            //      setTimeout(() => { window.location.reload(); }, 2000);
            //  } 
            //  else {
            //      window.location.reload();
            //      setTimeout(() => { window.location.reload(); }, 2000);
            //  }
            // });         
                   
        }
        else
        {
            jQuery("#btnCustomize").prop("disabled", false);
            jQuery("#deployBotMsgArea").html("<b><font style='color:#5A679E;font-size:9x'>"+response.message+"</font></b>");
        }
    })
    .fail(function(response) 
    {          
        jQuery("#deployBotMsgArea").html(response.statusText);
        jQuery("#btnCustomize").prop("disabled", false);
        swalWithBootstrapButtons.fire
        ({
            text: 'create-botDeploment'+' -> '+response.status+' -> '+response.statusText,
            icon: "error",
            confirmButtonText: 'Okay'
        });
        jQuery("#btnFinish").prop("disabled", false);//to enable the finish button
        
    });
}

function updateBotDeployment(userCredentials, pageName){
    if(pageName == "customize"){
        var customizeTabChangeCount = jQuery(".customize_tab_value_changed").length;
        if(customizeTabChangeCount > 0){
            var image_url = "";
            var user_url = "";
            if(selectedDomainId == "10"){
                if(jQuery("#chatbotIconImage").attr("name") == "")
                {
                    jQuery("#chabotIconImage").attr("name", "icon-40.png");
                    image_url = "images/chatbot-icons/" + "icon-40.png";
                    jQuery("#chatbotIconImage").attr("src",image_url);
                }
            }
            else{
                if(jQuery("#chatbotIconImage").attr("name") == "")
                {
                    jQuery("#chabotIconImage").attr("name", "icon-04.png");
                    image_url = "images/chatbot-icons/" + "icon-04.png";
                    jQuery("#chatbotIconImage").attr("src",image_url);
                }
            }
            
            if(jQuery("#userIconImage").attr("name") == ""){
                jQuery("#userIconImage").attr("name", "young-lady.png");
                user_url ="images/user-icon/" + "young-lady.png";
                jQuery("#userIconImage").attr("src",user_url);
            }
            var previewMessageCheck = jQuery("#badgeSelect").is(":checked");
            var isPreviewChecked = 0;
            if(previewMessageCheck){    
                isPreviewChecked = 1;
            }
            else{
                isPreviewChecked = 0;
            }
            var form = new FormData();
            form.append("id", userCredentials["botDeploymentId"]);
            form.append("customerId", email);
            form.append("name", jQuery('#txt_name').val());
            form.append("description", jQuery('#txt_description').val().trim());
            form.append("chatbotIcon", jQuery("#chatbotIconImage").attr("name"));
            form.append("userIcon", jQuery("#userIconImage").attr("name"));
            form.append("welcomeMessage", jQuery('#txt_wmsg').val());
            form.append("backGroundColor", jQuery('#txt_bckcol').val().replace('#',''));
            form.append("widgetBackgroundColor", jQuery('#widgetBackgroundColor').val().replace('#',''));
            form.append("botResponseBackgroundColor", jQuery('#botResponseBackgroundColor').val().replace('#',''));
            form.append("userQuestionBackgroundColor", jQuery('#userQuestionBackgroundColor').val().replace('#',''));
            form.append("leadOnBtnBackgroundColor", jQuery('#leadOnBtnBackgroundColor').val().replace('#',''));
            form.append("contactURL", jQuery('#contactURL').val());
            form.append("privacyURL", jQuery('#privacyURL').val());
            // form.append("domainId", jQuery('#sel_domain').val());
            form.append("domainId", userCredentials["domainId"]);
            form.append("previewMessage", jQuery('#txt_preview').val());
            form.append("previewMessageBackGroundColor", jQuery('#badgeTextBackgroundColor').val().replace('#',''));
            form.append("isPreviewChecked", isPreviewChecked);
            var settings = {
                "async": true,
                "url": url_resource + "/syraconsumer/update-botDeploment",
                "method": "POST",
                "processData": false,
                "contentType": false,
                "mimeType": "multipart/form-data",
                "data": form,
                headers: {
                    'Authorization': 'Bearer '+access_token,
                }
            }

            jQuery.ajax(settings).done(function (response) {
                response = JSON.parse(response);

                if(response.status === 200)
                {
                    insertNotificationData("3", "Update", email);
                    swalWithBootstrapButtons.fire({
                        text: "Your Syra AI Chatbot was modified successfully.",
                        icon: "success",
                        showCancelButton: false,
                        confirmButtonText: "Okay",
                        cancelButtonText: 'No, cancel',
                    })
                    // .then((result) => {
                    //  if (result.value) {
                    //      window.location.href = "customize.html";
                    //  } 
                    // });
                    
                }
                else{
                    jQuery("#msgArea").html("<b><font style='color:#5A679E;font-size:9x'>"+response.message+"</font></b>")
                }
            })
            .fail(function(response) 
            {           
                swalWithBootstrapButtons.fire({
                    text: 'update-botDeploment'+' -> '+response.status+' -> '+response.statusText,
                    icon: "error",
                    confirmButtonText: 'Okay'
                });
            });
            // jQuery("input").removeClass("customize_tab_value_changed");
            // jQuery("textarea").removeClass("customize_tab_value_changed");
            var customizeTabChangesList = document.querySelectorAll('.customize_tab_value_changed');
            for (var i = 0; i < customizeTabChangesList.length; i++) {
                customizeTabChangesList[i].classList.remove('customize_tab_value_changed')
            }
        }
    }
    else if(pageName == "setupWizardPage"){
        var customizeTabChangeCount = jQuery(".customize_tab_value_changed").length;
        if(customizeTabChangeCount > 0){
            if(selectedDomainId == "10"){
                if(jQuery("#chatbotIconImage").attr("name") == "")
                {
                    jQuery("#chatbotIconImage").attr("name","icon-40.png");
                }
            }
            else{
                if(jQuery("#chatbotIconImage").attr("name") == "")
                {
                    jQuery("#chatbotIconImage").attr("name","icon-04.png");
                }
            }
            if(jQuery("#userIconImage").attr("name") == ""){
                jQuery("#userIconImage").attr("name","young-lady.png");
            }
            var previewMessageCheck = jQuery("#badgeSelect").is(":checked");
            var isPreviewChecked = 0;
            if(previewMessageCheck){    
                isPreviewChecked = 1;
            }
            else{
                isPreviewChecked = 0;
            }
            var form = new FormData();
            form.append("id", userCredentials["botDeploymentId"]);
            form.append("customerId", email);
            form.append("name", jQuery('#txt_name').val());
            form.append("description", jQuery('#txt_description').val().trim());
            form.append("chatbotIcon", jQuery("#chatbotIconImage").attr("name"));
            form.append("userIcon", jQuery("#userIconImage").attr("name"));
            form.append("welcomeMessage", jQuery('#txt_wmsg').val());
            form.append("backGroundColor", jQuery('#txt_bckcol').val().replace('#',''));
            form.append("widgetBackgroundColor", jQuery('#widgetBackgroundColor').val().replace('#',''));
            form.append("botResponseBackgroundColor", jQuery('#botResponseBackgroundColor').val().replace('#',''));
            form.append("userQuestionBackgroundColor", jQuery('#userQuestionBackgroundColor').val().replace('#',''));
            form.append("leadOnBtnBackgroundColor", jQuery('#leadOnBtnBackgroundColor').val().replace('#',''));
            form.append("contactURL", jQuery('#contactURL').val());
            form.append("privacyURL", jQuery('#privacyURL').val());
            // form.append("domainId", jQuery('#sel_domain').val());
            form.append("domainId", userCredentials["domainId"]);
            form.append("previewMessage", jQuery('#txt_preview').val());
            form.append("previewMessageBackGroundColor", jQuery('#badgeTextBackgroundColor').val().replace('#',''));
            form.append("isPreviewChecked", isPreviewChecked);

            var settings = {
                "async": true,
                "url": url_resource + "/syraconsumer/update-botDeploment",
                "method": "POST",
                "processData": false,
                "contentType": false,
                "mimeType": "multipart/form-data",
                "data": form,
                headers: {
                    'Authorization': 'Bearer '+access_token,
                }
            }

            jQuery.ajax(settings).done(function (response) {
                response = JSON.parse(response);

                if(response.status === 200)
                {
                    if(selectedDomainId==10)//If the user select the Shopify in the Domain DropDown, then Shopify APi would be called
                    {
                        var form = new FormData();
                        form.append("botdeploymentId", botDeploymentId);
                        form.append("storeName", shopify_store_name);
                        form.append("secretKey", "");
                        form.append("apikey", "");
                        form.append("apiVersion", "");
                        form.append("accessToken", shopify_access_token);

                        var settings = 
                        {
                            "async": true,
                            "url": url_resource + "/syraconsumer/update-shopify-store",
                            "method": "POST",
                            "processData": false,
                            "contentType": false,
                            "mimeType": "multipart/form-data",
                            "data": form,
                            headers: {
                                'Authorization': 'Bearer '+access_token,
                            }
                        }

                        jQuery.ajax(settings).done(function (response) 
                        {
                            response=JSON.parse(response);
                            if(response.status===200)
                            {
                                // jQuery("#msgArea").html("<b><font style='color:#5A679E'>Updation Done</font></b>");
                                swalWithBootstrapButtons.fire({
                                    text: "Your Syra AI Chatbot is successfully modified.",
                                    showCancelButton: true,
                                    confirmButtonText: 'Okay'
                                })
                                // .then((value) => {
                                //  if (value) {
                                //      setTimeout(() => { window.location.reload(); }, 2000);
                                //  } else {
                                //      window.location.reload();
                                //      setTimeout(() => { window.location.reload(); }, 2000);
                                //  }
                                // });    
                            }
                            else
                            {
                                swalWithBootstrapButtons.fire({
                                    text: 'update-shopify-store Response Error!!!',
                                    icon: "error",
                                    confirmButtonText: 'Okay'
                                });
                            }



                        })
                        .fail(function(response) 
                        {           
                            jQuery("#msgArea").html("<b><font style='color:#5A679E'>"+'update-shopify-store'+' -> '+response.status+' -> '+response.statusText+"</font></b>");
                            swalWithBootstrapButtons.fire({
                                text: 'update-shopify-store'+' -> '+response.status+' -> '+response.statusText,
                                icon: "error",
                                confirmButtonText: 'Okay'
                            });
                        
                        });

                    }
                    else
                    {
                        swalWithBootstrapButtons.fire({
                            text: "Your Syra AI Chatbot was modified successfully",
                            icon: 'success',
                            showCancelButton: true,
                            confirmButtonText: 'Okay'
                        })
                    }
                    insertNotificationData("3","Update",email);
                    if(!customizeBtnClick){
                        setupWizardTrain();
                    }
                }
                
                else{
                    jQuery("#msgArea").html("<b><font style='color:#5A679E;font-size:9x'>"+response.message+"</font></b>")
                }
            })
            
            .fail(function(response) 
            {           
                jQuery("#msgArea").html("<b><font style='color:#5A679E'>"+'update-botDeploment'+' -> '+response.status+' -> '+response.statusText+"</font></b>");
                swalWithBootstrapButtons.fire({
                    text: 'update-botDeploment'+' -> '+response.status+' -> '+response.statusText,
                    icon: "error",
                    confirmButtonText: 'Okay'
                });
            });
            // jQuery("input").removeClass("customize_tab_value_changed");
            // jQuery("textarea").removeClass("customize_tab_value_changed");
            var customizeTabChangesList = document.querySelectorAll('.customize_tab_value_changed');
            for (var i = 0; i < customizeTabChangesList.length; i++) {
                customizeTabChangesList[i].classList.remove('customize_tab_value_changed')
            }
        }
        else{
            if(!customizeBtnClick){
                setupWizardTrain();
            }
        }
    }
    
}

function retriveTrainingQuestions(userCredentials, pageName){
    var botDeploymentId=userCredentials["botDeploymentId"];
    var form = new FormData();
    form.append("botdeploymentId", botDeploymentId);
    var settings = {
        "async": true,
        "url": url_resource + "/syraconsumer/knowledge-bank-fetch",
        "method": "POST",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form,
        headers: {
            'Authorization': 'Bearer '+access_token,
        }
    }

    jQuery.ajax(settings).done(function (response) 
    {
        response = JSON.parse(response);
        if(response.status===200)
        {
            if(pageName == "trainingPage"){
                var tablerow = '';
                for(var item = 0; item < response.data.length; item ++)
                {
                    var newTableRow = '<tr data-repeater-item>'+
                            '<td>'+
                                '<textarea class="form-control kt-form-control--transparent kt-form-control--none-resizable" rows="2">' + response.data[item].question + '</textarea>'+
                            '</td>'+
                            '<td>'+
                                '<textarea class="form-control kt-form-control--transparent kt-form-control--none-resizable" rows="2">' + response.data[item].answer + '</textarea>'+
                            '</td>'+
                            '<td class="kt_form_build_knowledge_base_training_questions_date">' + response.data[item].createdDate + '</td>'+
                            '<td class="text-right">'+
                                '<a class="kt-link kt-font-bold" href="javascript:;" onclick="deleteTrainingQuestionsModal(\'' + response.data[item].id + '\')"><i class="fas fa-trash-alt" style="color: #472235"></i></a>' +
                            '</td>'+
                        '</tr>';
                    tablerow = tablerow + newTableRow;
                    
                    // '<tr data-repeater-item><td><textarea class="form-control kt-form-control--transparent kt-form-control--none-resizable" rows="2">'+ response.data[item].question +'</textarea></td><td><textarea class="form-control kt-form-control--transparent kt-form-control--none-resizable" rows="2">'+ response.data[item].answer +'</textarea></td><td class="kt_form_build_knowledge_base_training_questions_date">'+ response.data[item].createdDate +'</td><td class="text-right" style="width:5%;"><a class="kt-link kt-font-bold" href="javascript:;" onclick="deleteTrainingQuestionsModal(\'' + response.data[item].id + '\')"><i class="fas fa-trash-alt" style="color: #472235"></i></a></td></tr>';                   
                }
                jQuery('#tbodyForTrainingQuestion').html(tablerow);
            }
            else if(pageName == "setupWizardPage"){
                var tablerow = '';
                /*if( response.data.length > 0){
                    jQuery("#trainingQuestionTable").show();
                }
                else{
                    jQuery("#trainingQuestionTable").hide();
                }*/
                for(var item = 0; item < response.data.length; item ++){
                    tablerow = tablerow + '<tr data-repeater-item><td><textarea class="form-control kt-form-control--transparent kt-form-control--none-resizable" rows="2">'+ response.data[item].question +'</textarea></td><td><textarea class="form-control kt-form-control--transparent kt-form-control--none-resizable" rows="2">'+ response.data[item].answer +'</textarea></td><td class="kt_form_build_knowledge_base_training_questions_date">'+ response.data[item].createdDate +'</td><td class="text-right" style="width:5%;"><a class="kt-link kt-font-bold" href="javascript:;" onclick="deleteTrainingQuestionsModal(\'' + response.data[item].id + '\')"><i class="fas fa-trash-alt" style="color: #472235"></i></a></td></tr>';                   
                }
                jQuery('#tbodyForTrainingQuestion').html(tablerow);
            }
            
        }

    })
    .fail(function(response) 
    {           
        
        swalWithBootstrapButtons.fire({
            text: 'retrive-knowledge-base'+' -> '+response.status+' -> '+response.statusText,
            icon: "error",
            button: "OK",
        });
    
    
    });
}

function retriveTrainingURLs(userCredentials, pageName){
    var botDeploymentId=userCredentials["botDeploymentId"];
    var form = new FormData();
    form.append("botdeploymentId", botDeploymentId);
    var settings = {
        "async": true,
        "url": url_resource + "/syraconsumer/retrive-knowledge-base",
        "method": "POST",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form,
        headers: {
            'Authorization': 'Bearer '+access_token,
        }
    }

    jQuery.ajax(settings).done(function (response) 
    {
        response = JSON.parse(response);

        if(response.status===200)
        {

            if (pageName == "trainingPage"){
                var tablerow = '';
                
                for(var item = 0; item < response.data.length; item ++)
                {
                    var checkboxRowElement = '';
                    if(response.data[item].recursive == 'y')
                    {
                        checkboxRowElement = '<input type="checkbox" name="urlRecursive" value="' + response.data[item].recursive + '" checked>';
                    }
                    else{
                        checkboxRowElement = '<input type="checkbox" name="urlRecursive" value="' + response.data[item].recursive + '">';
                    }
                    var newTableRow = '<tr data-repeater-item>' +
                                            '<td>' +
                                                '<input class="form-control kt-form-control--transparent" value=' + response.data[item].url + ' type="url">' +
                                            '</td>' +
                                            '<td>' +
                                                '<label class="kt-switch mb-0">' +
                                                    '<span>' +
                                                        checkboxRowElement + 
                                                        '<span></span>' +
                                                    '</span>' +
                                                '</label>' +
                                            '</td>' +
                                            '<td class="kt_form_build_knowledge_base_training_urls_date">' + response.data[item].createdDate + '</td>' +
                                            '<td class="text-right">' +
                                                '<a class="kt-link kt-font-bold" href="javascript:;" onclick="deleteKnowledgeBaseModal(\'' + response.data[item].id + '\')"><i class="fas fa-trash-alt" style="color: #472235"></i></a>' +
                                            '</td>' +
                                        '</tr>' ;
                    tablerow = tablerow + newTableRow;
                    //'<tr data-repeater-item><td><input class="form-control kt-form-control--transparent" value=' + response.data[item].url +' type="url"></td><td><label class="kt-switch mb-0"><span><input type="checkbox"><span></span></span></label></td><td class="kt_form_build_knowledge_base_training_urls_date">'+ response.data[item].createdDate +'</td><td class="text-right" style="width:5%;"><a class="kt-link kt-font-bold" href="javascript:;" onclick="deleteKnowledgeBaseModal(\'' + response.data[item].id + '\')"><i class="fas fa-trash-alt" style="color: #472235"></i></a></td></tr>';
                                        
                }
                jQuery('#tbodyForTrainingURLs').html(tablerow);
            }
            else if(pageName == "setupWizardPage"){
                var tablerow = '';
            
                for(var item = 0; item < response.data.length; item ++){
                    
                    var checkboxRowElement = '';
                    if(response.data[item].recursive == 'y')
                    {
                        checkboxRowElement = '<input type="checkbox" name="urlRecursive" value="' + response.data[item].recursive + '" checked>';
                    }
                    else{
                        checkboxRowElement = '<input type="checkbox" name="urlRecursive" value="' + response.data[item].recursive + '">';
                    }

                    tablerow = tablerow + '<tr data-repeater-item><td><input class="form-control kt-form-control--transparent" value=' + response.data[item].url +' type="url"></td><td><label class="kt-switch mb-0"><span>' + checkboxRowElement +'<span></span></span></label></td><td class="kt_form_build_knowledge_base_training_urls_date">'+ response.data[item].createdDate +'</td><td class="text-right" style="width: 5%;"><a class="kt-link kt-font-bold" href="javascript:;" onclick="deleteKnowledgeBaseModal(\'' + response.data[item].id + '\')"><i class="fas fa-trash-alt" style="color: #472235"></i></a></td></tr>';
                                        
                }
                jQuery('#tbodyForTrainingURLs').html(tablerow);
            }
            
        }
    })
    .fail(function(response) 
    {           
        
        swalWithBootstrapButtons.fire({
            text: 'retrive-knowledge-base'+' -> '+response.status+' -> '+response.statusText,
            icon: "error",
            showCancelButton: true,
            confirmButtonText: 'Okay'
        });
    
    
    });
}

function isUrlValid(url) {
    return /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url);
}

function getTrainingQuestions() {
    document.getElementsByClassName("btnDefault")[0].id = 'submitTrainingQuestion';
    document.getElementsByClassName("btnDefault")[0].setAttribute("name", "createKnowledgeBank");
}

function getOpeningQuestions() {
    document.getElementsByClassName("btnDefault")[0].id = 'submitOpeningQuestion';
    jQuery("#btnPrevious").css("display", "none !important");
    document.getElementsByClassName("btnDefault")[0].setAttribute("name", "knowledgeBaseSetupSubmit");
}

//Add training url ----> notification to 3a
function addTrainingURLs(webURL, recursive)
{
    var botDeploymentId = userCredentials["botDeploymentId"];
    if(webURL=="" || webURL==undefined || webURL==null)
    {
        swalWithBootstrapButtons.fire({
                title: "Error!",
                text: 'Website URL is not valid !!',
                icon: "error",
                button: "OK",
            });
        return;
    }
    else
    {
        if(!isUrlValid(webURL))
        {
                swalWithBootstrapButtons.fire({
                    title: "Error!",
                    text: 'Website URL is not valid. Please enter a valid URL!',
                    icon: "error",
                    button: "OK",
                });
            return;
        }
        else{
            var form = new FormData();
            form.append("botdeploymentId", botDeploymentId);
            form.append("recursive", recursive);
            form.append("url", webURL);

            var settings = {
                "async": true,
                "url": url_resource + "/syraconsumer/create-knowledge-base",
                "method": "POST",
                "processData": false,
                "contentType": false,
                "mimeType": "multipart/form-data",
                "data": form,
                headers: {
                    'Authorization': 'Bearer '+access_token,
                }
            }
            jQuery.ajax(settings).done(function (response) 
            {                
                response=JSON.parse(response);
                if(response.status===200)
                {
                    swalWithBootstrapButtons.fire({
                        text: 'Training URL was added successfully.',
                        icon: "success",
                        showCancelButton: true,
                        confirmButtonText: 'Okay'
                    }).
                    then((result) => {
                        if (result.value) {
                            createWizardForTraining();
                        }
                    });
                }
            })
            .fail(function(response) 
            {           
                swalWithBootstrapButtons.fire({
                    text: 'create-knowledge-base'+' -> '+response.status+' -> '+response.statusText,
                    icon: "error",
                    showCancelButton: true,
                    confirmButtonText: 'Okay'
                });
            });
            
        }
    }
}
//Add training question ----> notification to 3b
function addTrainingQuestion(kbQuestion, kbAnswer){
    var botDeploymentId = userCredentials["botDeploymentId"];
    if(kbQuestion == "" || kbQuestion == undefined || kbQuestion == null)
    {
        swalWithBootstrapButtons.fire({
                title: "Error!",
                text: 'Question is not valid !!',
                icon: "error",
                button: "OK",
            });
        return;
    }
    if(kbQuestion.length < 2)
    {
            swalWithBootstrapButtons.fire({
                title: "Error!",
                text: 'Please enter a valid Question!',
                icon: "error",
                button: "OK",
            });
        return;
    }

    if(kbAnswer.length <= 0)
    {
            swalWithBootstrapButtons.fire({
                title: "Error!",
                text: 'Please enter a valid Answer!',
                icon: "error",
                button: "OK",
            });
        return;
    }

    var form = new FormData();
    form.append("botdeploymentId", botDeploymentId);
    form.append("question", kbQuestion);
    form.append("answer", kbAnswer);

    var settings = {
        "async": true,
        "url": url_resource + "/syraconsumer/knowledge-bank-create",
        "method": "POST",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form,
        headers: {
            'Authorization': 'Bearer '+access_token,
        }
    }
    jQuery.ajax(settings).done(function (response) 
    {                
        response=JSON.parse(response);
        if(response.status===200)
        {
            swalWithBootstrapButtons.fire({
                text: 'Training Question was successfully added.',
                icon: "success",
                confirmButtonText: "Okay",
            })
            .then((result) => {
                if (result.value) {
                    createWizardForTraining();
                }
            });
        }
    })
    .fail(function(response) 
    {           
        swalWithBootstrapButtons.fire({
            title: "API Error!",
            text: 'create-knowledge-base'+' -> '+response.status+' -> '+response.statusText,
            icon: "error",
            button: "OK",
        });
    });

}

function addOpeningQuestions(q1, d1, a1, q2, d2, a2,q3, d3, a3,q4, d4, a4,q5, d5, a5)
{
    var openingValueChangeCount = jQuery(".opening_question_value_changed").length;
    if(openingValueChangeCount>0){
        if(q1 == null || q1 == undefined || q1 == "undefined" || q1 == "" || q1 == "null"){
            q1 = "";
        }
        if(d1 == null || d1 == undefined || d1 == "undefined" || d1 == "" || d1 == "null"){
            d1 = "";
        }
        if(a1 == null || a1 == undefined || a1 == "undefined" || a1 == "" || a1 == "null"){
            a1 = "";
        }

        if(q2 == null || q2 == undefined || q2 == "undefined" || q2 == "" || q2 == "null"){
            q2 = "";
        }
        if(d2 == null || d2 == undefined || d2 == "undefined" || d2 == "" || d2 == "null"){
            d2 = "";
        }
        if(a2 == null || a2 == undefined || a2 == "undefined" || a2 == "" || a2 == "null"){
            a2 = "";
        }

        if(q3 == null || q3 == undefined || q3 == "undefined" || q3 == "" || q3 == "null"){
            q3 = "";
        }
                
        if(d3 == null || d3 == undefined || d3 == "undefined" || d3 == "" || d3 == "null"){
            d3 = "";
        }
        if(a3 == null || a3 == undefined || a3 == "undefined" || a3 == "" || a3 == "null"){
            a3 = "";
        }

        if(q4 == null || q4 == undefined || q4 == "undefined" || q4 == "" || q4 == "null"){
            q4 = "";
        }
        if(d4 == null || d4 == undefined || d4 == "undefined" || d4 == "" || d4 == "null"){
            d4 = "";
        }
        if(a4 == null || a4 == undefined || a4 == "undefined" || a4 == "" || a4 == "null"){
            a4 = "";
        }

        if(q5 == null || q5 == undefined || q5 == "undefined" || q5 == "" || q5 == "null"){
            q5 = "";
        }
        if(d5 == null || d5 == undefined || d5 == "undefined" || d5 == "" || d5 == "null"){
            d5 = "";
        }
        if(a5 == null || a5 == undefined || a5 == "undefined" || a5 == "" || a5 == "null"){
            a5 = "";
        }
        var botDeploymentId = userCredentials["botDeploymentId"];
        var form = new FormData();
        form.append("id", botDeploymentId);
        form.append("customerId", decodeURIComponent(email));
        form.append("domainId", domainId_id);
        form.append("isPlanActive", "1");
        form.append("question1", q1);
        form.append("displayValueOfQuestion1", d1);
        form.append("answerUrl1", a1);
        form.append("question2", q2);
        form.append("displayValueOfQuestion2", d2);
        form.append("answerUrl2", a2);
        form.append("question3", q3);
        form.append("displayValueOfQuestion3", d3);
        form.append("answerUrl3", a3);
        form.append("question4", q4);
        form.append("displayValueOfQuestion4", d4);
        form.append("answerUrl4", a4);
        form.append("question5", q5);
        form.append("displayValueOfQuestion5", d5);
        form.append("answerUrl5", a5);

        var settings = {
            "async": true,
            "url": url_resource + "/syraconsumer/update-botDeploment-trainingPage",
            "method": "POST",
            "processData": false,
            "contentType": false,
            "mimeType": "multipart/form-data",
            "data": form,
            headers: {
                'Authorization': 'Bearer '+access_token,
            }
        }

        jQuery.ajax(settings).done(function (response) {
            response = JSON.parse(response);
            
            if(response.status === 200)
            {
            swalWithBootstrapButtons.fire({
                    title: "Update successful",
                    text: "Opening Questions Added Successfully!",
                    icon: "success",
                    button: "Ok",
                });
            }
            else{
                if(botDeploymentId == ""){
                    swalWithBootstrapButtons.fire({
                        text: "Please setup your Syra AI Chatbot first.",
                        showCancelButton: true,
                        confirmButtonText: 'Okay'
                    })
                }
                else{
                        swalWithBootstrapButtons.fire({
                        title: "Update Unsuccessful",
                        text: "Eror Adding Opening Questions!",
                        icon: "error",
                        button: "Ok",

                    });
                }
            }
        })
        .fail(function(response) 
        {           
            swalWithBootstrapButtons.fire({
                text: 'update-botDeploment-trainingPage'+' -> '+response.status+' -> '+response.statusText,
                icon: "error",
                confirmButtonText: 'Okay'
            });


        });
        jQuery("textarea").removeClass("opening_question_value_changed");
    }
}

function removeQuestion(id)
{
    swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "Question will be deleted permanatly",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#543244',
        cancelButtonColor: '#961d23',
        confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
        if (result.value) {
            var removeElementId = "#openingQuestion_" + id;
            jQuery(removeElementId).remove();
            totalQuestionCount --;
            swalWithBootstrapButtons.fire(
            'Deleted!',
            'Question is deleted successfully',
            'success'
            )
        }
    })
}

function createWizardForTraining(){
    var form = new FormData();
    form.append("customerId", email);
    var settings = 
    {
        "async": true,
        "url": url_resource + "/syraconsumer/fetch-botDeploment",
        "method": "POST",
        headers: {
            'Authorization': 'Bearer '+access_token,
        },
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
    }
    jQuery.ajax(settings).done(function (response) {
        response = JSON.parse(response);
        if (response.length > 0) 
        {
            for (i = 0; i < response.length; i++) 
            {
                if (i == 0) 
                {
                    insertNotificationData("4","Needs to take action", email);
                                
                }
            }
        }
        else
        {
            swalWithBootstrapButtons.fire({
                text: "Please deploy your chatbot first to schedule model training",
                icon: "error",
                confirmButtonText: 'Okay'
            });
        }
    })
    .fail(function(response) 
    {           
        
        swalWithBootstrapButtons.fire
        ({
            text: 'fetch-botDeploment'+' -> '+response.status+' -> '+response.statusText,
            icon: "error",
            confirmButtonText: 'Okay'
        });
    });
}

function setPageId(){
    jQuery("#pageTypeID").val("2");
}

var setTrainingQuesId = 0;
var setTrainingURLId = 0;
var openingQuestionBody = '';
var trainingQuesBody = '';
var trainingURLBody = '';

function getCurrentDateTime(){
    var today = new Date();
    var date = today.getFullYear()+'/'+today.getDate()+'/'+(today.getMonth()+1);
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    return dateTime;
}

function deleteKnowledgeBaseModal(id) 
{
    jQuery('#deleteKnowledgeBaseURLId').val(id);
    jQuery('#deleteModal').modal("toggle");
}

function deleteKnowledgeBaseURL() 
{
    var id = jQuery('#deleteKnowledgeBaseURLId').val();

    var form = new FormData();
    form.append("id", id);

    var settings = 
    {
        "async": true,
        "url": url_resource + "/syraconsumer/delete-knowledge-base",
        "method": "POST",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form,
        headers: {
            'Authorization': 'Bearer '+access_token,
        }
    }
    jQuery.ajax(settings).done(function (response) {               
        response = JSON.parse(response);
        if (response.status === 200) 
        {
            
            retriveTrainingURLs(userCredentials, "setupWizardPage");
        }                        
        else
        {
            swalWithBootstrapButtons.fire
            ({
                title: "Error!",
                text: response.message,
                icon: "error",
                button: "OK",
            });
        }
    })
    .fail(function(response) 
    {                          
        swalWithBootstrapButtons.fire
        ({
            title: "API Error!",
            text: 'delete-knowledge-base'+' -> '+response.status+' -> '+response.statusText,
            icon: "error",
            button: "OK",
        });
    });
}

function deleteTrainingQuestionsModal(id) 
{
    jQuery('#deleteKnowledgeBankId').val(id);
    jQuery('#deleteKBankModal').modal("toggle");
}

function deleteTrainingQuestions() 
{
    var id = jQuery('#deleteKnowledgeBankId').val();

    var form = new FormData();
    form.append("id", id);

    var settings = 
    {
        "async": true,
        "url": url_resource + "/syraconsumer/knowledge-bank-delete",
        "method": "POST",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form,
        headers: {
            'Authorization': 'Bearer '+access_token,
        }
    }
    jQuery.ajax(settings).done(function (response) {               
        response = JSON.parse(response);
        if (response.status === 200) 
        {
            retriveTrainingQuestions(userCredentials, "trainingPage");
        }                        
        else
        {
            swalWithBootstrapButtons.fire
            ({
                title: "Error!",
                text: response.message,
                icon: "error",
                button: "OK",
            });
        }
    })
    .fail(function(response) 
    {                          
        swalWithBootstrapButtons.fire
        ({
            title: "API Error!",
            text: 'knowledge-bank-delete'+' -> '+response.status+' -> '+response.statusText,
            icon: "error",
            button: "OK",
        });
    });
}

function setBtnIdShopifyDataIngestion(){
    document.getElementsByClassName("btnDefault")[0].id = 'defaultButton';
}

// Start of fetching project details using zendesk account
function getZendeskProjectDetailsFromNatura(){
    var form = new FormData();
    form.append("email", "zendesk@thirdeyedata.io");

    var settings = {
        "async": true,
        "url": natura_url_resource + "/natura/fetch-project",
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
        if(response.length>0)
        {
                // For storing API Key in the textbox 
                jQuery("#txt_key").val(response[0].APIkey);
                jQuery('#txt_key').attr("disabled", true);
                //for auto selecting the project name and disabling the dropdown
                var select = document.createElement("select");
                select.setAttribute("onchange", "getAPIkey(this)");
                select.setAttribute("class", "form-control");
                select.setAttribute("id", "projectNameforZendesk");
                for(i = 0; i < response.length; i++)
                {
                    option = document.createElement("option");
                    option.innerHTML = response[i].name;
                    option.setAttribute("value",response[i].APIkey);
                    select.appendChild(option);
                }
                jQuery("#projectName").append(select);
                jQuery('#projectNameforZendesk').attr("disabled", true);
        }
        else
        {
            // swal
            // ({
            //     title: "Error!",
            //     text: 'fetch-project Response error!!!',
            //     icon: "error",
            //     button: "OK",
            // });
        }
        
    })
    .fail(function(response) 
    {           
        swal
        ({
            title: "API Error!",
            text: 'fetch-project'+' -> '+response.status+' -> '+response.statusText,
            icon: "error",
            button: "OK",
        });
    });
}

var iplocs=[];

function editGoalModal(name, url, id, intentBelongs, intentPublicName, goalCount) {
    // if(intentBelongs == ""){
    //     jQuery("#goalIntentEditRow").hide();
    // }
    jQuery('#editGoalId').val(id);
    jQuery('#editGoalName').val(name);
    jQuery('#editGoalUrl').val(url);
    fetchIntent(goalCount, "intentBelongsDiv", intentBelongs);
    
    // checkedVals.forEach(element => {
    //     intentBelongs += element;
    // });
    // jQuery("#intentBelongsDiv").html("");

    //intentBelongs = intentBelongs.split(";");
    // for(var intentObj = 0; intentObj < intentLists.intents.length; intentObj++){
    //     var checkbox = document.createElement('input');
    //     checkbox.type = "checkbox";
    //     checkbox.name = "editGoalIntents";
    //     checkbox.style = "-webkit-appearance: button; !important";
    //     checkbox.value = intentLists.intents[intentObj][1];
    //     if(intentBelongs.includes(intentLists.intents[intentObj][1])){
    //         checkbox.checked = true;
    //     }

    //     var label = document.createElement('label')
    //     label.style = "padding-right: 10px";
    //     label.appendChild(document.createTextNode(intentLists.intents[intentObj][1]+"     "));

    //     jQuery("#intentBelongsDiv").append(checkbox);
    //     jQuery("#intentBelongsDiv").append(label);
    // }
    // jQuery('#editModal').modal("toggle");
}

function deleteModal(id) {
    jQuery('#deleteGoalId').val(id);
    jQuery('#deleteModal').modal("toggle");
}


function updateGoal() {
    jQuery("#goalCreateMessage").html('');
    jQuery("#msgArea").html('<img src="'+wp_path+'"images/syra-spinner.gif" height="35"/>');
    var name = jQuery('#editGoalName').val();
    var url_resource_val = jQuery('#editGoalUrl').val();
    var id = jQuery('#editGoalId').val();

    var intentBelongs = "";
    var labelId = "intentEditLabel_"
    jQuery("input[name='editGoalIntents']:checked").each( function () {
        labelId += this.id.split('_')[1];
        intentBelongs += jQuery(this).val() ;
    });
    var intentPublicNames = jQuery("#" + labelId).text();
    // intentBelongs = intentBelongs.substring(0, intentBelongs.length - 1);

    var form = new FormData();
    form.append("botdeploymentId", botDeploymentId);
    form.append("name", name);
    form.append("url", url_resource_val);
    form.append("id", id);
    form.append("intentBelongs", intentBelongs);
    form.append("intentPublicNames", intentPublicNames);

    var settings = 
    {
        "async": true,
        "url": url_resource + "/syraconsumer/update-goal",
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
        if (response.status === 200) 
        {
            swalWithBootstrapButtons.fire("Message", response.message, "success");
            showGoal(botDeploymentId);
        }                        
        else
        {
            swalWithBootstrapButtons.fire("Error", response.message, "error");
        }

    })
    .fail(function(response) 
    {           

        swalWithBootstrapButtons.fire
        ({
            title: "API Error!",
            text: 'update-goal'+' -> '+response.status+' -> '+response.statusText,
            icon: "error",
            button: "OK",
        });

    });
}

function deleteGoal() {
    jQuery("#goalCreateMessage").html('');
    jQuery("#msgArea").html('<img src="'+wp_path+'"images/syra-spinner.gif" height="35"/>');
    var id = jQuery('#deleteGoalId').val();

    var form = new FormData();
    form.append("id", id);

    var settings = {
        "async": true,
        "url": url_resource + "/syraconsumer/delete-goal",
        "method": "POST",
        headers: {
            'Authorization': 'Bearer '+access_token,
        },
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
    }
    jQuery.ajax(settings).done(function (response) {

        response = JSON.parse(response);
        if (response.status === 200) 
        {
            // showGoal(botDeploymentId);
            window.location = "admin.php?page=syra-goals";
        }                        
        else
        {
            jQuery("#msgArea").css("color","red");
            jQuery("#msgArea").html(response.message);
        }
    })
    .fail(function(response) 
    {           
        // alert('delete-goal'+'\n'+response.status+' -> '+response.statusText);
        swal
        ({
            title: "API Error!",
            text: 'delete-goal'+' -> '+response.status+' -> '+response.statusText,
            icon: "error",
            button: "OK",
        });
    });
}

function createGoal(me){
    jQuery("#msgArea").html('');
    jQuery("#goalCreateMessage").html('<img src="'+wp_path+'"images/syra-spinner.gif" height="35" style="margin-left:45%;margin-bottom:10%;"/>');
    var name = jQuery("#goalName"+me.id).val().trim();
    var url_resource_val = jQuery("#goalUrl"+me.id).val().trim();

    if (name == "" || url_resource_val == "") {
        jQuery("#goalCreateMessage").html("<font style='color: #5A679E'>Both the fields need value</font>")
        return;
    }
    var intentBelongs = "";
    jQuery("input[name='intent"+me.id+"']:checked").each( function () {
        intentBelongs += jQuery(this).val() + ";";
    });

    intentBelongs = intentBelongs.substring(0, intentBelongs.length - 1);

    var form = new FormData();
    form.append("botdeploymentId", botDeploymentId);
    form.append("name", name);
    form.append("url", url_resource_val);
    form.append("intentBelongs", intentBelongs);

    var settings = {
        "async": true,
        "url": url_resource + "/syraconsumer/create-goal",
        "method": "POST",
        headers: {
            'Authorization': 'Bearer '+access_token,
        },
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
    }
    jQuery.ajax(settings).done(function (response) {
        response = JSON.parse(response);
        if (response.status === 200) {
            jQuery("#goalCreateMessage").html("<font style='color: #5A679E'>Goal Created</font>")
            jQuery('#goalName').val("");
            jQuery('#goalUrl').val("");
            showGoal(botDeploymentId);
        }
        else {
            jQuery("#goalCreateMessage").html("<font style='color: #5A679E'>" + response.message + "</font>")
        }
    })
    .fail(function(response) 
    {           
        var APIerrorMsg='<span style="color:red;">create-goal'+' -> '+response.status+' -> '+response.statusText+'</span>';                                                                
        jQuery("#goalCreateMessage").html(APIerrorMsg);    
        swal
        ({
            title: "API Error!",
            text: 'create-goal'+' -> '+response.status+' -> '+response.statusText,
            icon: "error",
            button: "OK",
        });



    });
}

function individualGoal(){
    var form = new FormData();
    form.append("botdeploymentId", botDeploymentId);
    form.append("APIkey", apiKEY);
    api_endpoint="natura-individual-goal-analytics"
    var settings = 
    {
        "async": true,
        "url": url_resource + "/syraconsumer/" + api_endpoint,
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
        var response = JSON.parse(response);
        if(response.status == 200){                    
            for(item = 0; item < response.GoalsAnalytics.length; item++){
                jQuery("#avgQnAskToReachGoal"+item).html(Math.round(response.GoalsAnalytics[item].avgQnAskToReachGoal));
                jQuery("#avgTimeToReachGoal"+item).html(response.GoalsAnalytics[item].timeTakenToConvert);
            }
        }
    });
}

function dashboardGoalsInfo() {
    var form = new FormData();
    form.append("botdeploymentId", botDeploymentId);
    form.append("APIkey", apiKEY);

    var api_endpoint="dashboard-goal-analytics";
    var settings = 
    {
        "async": true,
        "url": url_resource + "/syraconsumer/"+api_endpoint,
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
        var data = JSON.parse(response);
        jQuery("#avgTimeToReachGoal").html(data.averageTimeToReachGoal);
        jQuery("#avgQnAskToReachGoal").html(data.avgQnAskToReachGoal);
        if (data.status === 200 || data.status === 403) 
        {

        }                        
        else
        {
            var APIerrorMsg='<span style="margin-left:5%;margin-bottom:18%;color:red;font-size:10px;line-height:unset;">'+api_endpoint+' - '+response.message+'</span>';                                                                
            // jQuery("#avgTimeToReachGoal").html(APIerrorMsg);
            jQuery("#avgQnAskToReachGoal").html(APIerrorMsg);
            jQuery("#goalsConvertedPerDayInMonth").html(APIerrorMsg); 
        }

    })
    .fail(function(response) 
    {           
        var APIerrorMsg='<span style="margin-left:5%;margin-bottom:18%;color:red;font-size:10px;line-height:unset;">'+api_endpoint+' -> '+response.status+' -> '+response.statusText+'</span>';                                                                
        // jQuery("#avgTimeToReachGoal").html(APIerrorMsg);
        jQuery("#avgQnAskToReachGoal").html(APIerrorMsg);
        jQuery("#goalsConvertedPerDayInMonth").html(APIerrorMsg);       

        swal
        ({
            title: "API Error!",
            text: api_endpoint+' -> '+response.status+' -> '+response.statusText,
            icon: "error",
            button: "OK",
        });

    });
}

function goalCconversionCount() {
    var form = new FormData();
    form.append("APIkey", apiKEY);
    form.append("botdeploymentId", botDeploymentId);
    var api_endpoint="goal-conversion-count";
    var settings = {
        "async": true,
        "url": url_resource + "/syraconsumer/"+api_endpoint,
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
        if (response.status === 200) 
        {
            jQuery("#goalConvertedInMonth").html(response.goalConvertedInMonth);
            jQuery('#goalConversionCount').html(response.goalConvertedInMonth);

            for(item = 0; item < response.individualGoalConvertedInMonth.length; item++){
                for(key in response.individualGoalConvertedInMonth[item]){
                    jQuery("#goalConversionCount"+item).html(response.individualGoalConvertedInMonth[item][key]);
                }
            }


        }                        
        else
        {
            var APIerrorMsg='<span style="margin-left:5%;margin-bottom:18%;color:red;font-size:10px;line-height:unset;">'+api_endpoint+' - '+response.message+'</span>';                                                                              
            jQuery("#goalConvertedInMonth").html(APIerrorMsg);
            jQuery('#goalConversionCount').html(APIerrorMsg);
        }


    })
    .fail(function(response) 
    {           
        var APIerrorMsg='<span style="margin-left:5%;margin-bottom:18%;color:red;font-size:10px;line-height:unset;">'+api_endpoint+' -> '+response.status+' -> '+response.statusText+'</span>';                                                                              
        jQuery("#goalConvertedInMonth").html(APIerrorMsg);
        jQuery('#goalConversionCount').html(APIerrorMsg);

        swal
        ({
            title: "API Error!",
            text: api_endpoint+' -> '+response.status+' -> '+response.statusText,
            icon: "error",
            button: "OK",
        });



    });
}

function goalOneNameOnChange(){
    var textGoal1=jQuery('#goalName1').val();
    jQuery('#goalOneText').html(textGoal1);
    jQuery('#goalDefinedTabText0').html(textGoal1)
}

function goalTwoNameOnChange(){
    var textGoal2=jQuery('#goalName2A').val();
    jQuery('#goalTwoText').html(textGoal2);
    jQuery('#goalDefinedTabText1').html(textGoal2)
}

function goalThreeNameOnChange(){
    var textGoal3=jQuery('#goalName3A').val();
    jQuery('#goalThreeText').html(textGoal3);
    jQuery('#goalDefinedTabText2').html(textGoal3)
}

function goalConversionPercentage(){
    var form = new FormData();
    form.append("botdeploymentId", botDeploymentId);
    form.append("APIkey", apiKEY);
    if(domainId_id===10)//if it is a shopify chatbot then it will call this API
    {
        form.append("customerId", customerId);
        api_endpoint="shopify-dashboard-goal-analytics";
    }
    else // other wise this API will be called
    {
        api_endpoint="natura-goal-conversion-perc-in-last-30-days";
    }
    var settings = 
    {
        "async": true,
        "url": url_resource + "/syraconsumer/"+api_endpoint,
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

        if("Percentage" in response){
            jQuery("#goalConversionPercentageInMonth").html(response.Percentage)                
        }
        else{
            jQuery("#goalConversionPercentageInMonth").html(0)                
        }
    })
    .fail(function(response) 
    {           
        var APIerrorMsg='<span style="margin-left:5%;margin-bottom:18%;color:red;font-size:10px;line-height:unset;">'+api_endpoint+' -> '+response.status+' -> '+response.statusText+'</span>';                                                                              
        jQuery("#goalConversionPercentageInMonth").html(APIerrorMsg);

        swal
        ({
            title: "API Error!",
            text: api_endpoint+' -> '+response.status+' -> '+response.statusText,
            icon: "error",
            button: "OK",
        });



    });
}

function averageQuestionForEachGoalConversion(){
    var form = new FormData();
    form.append("botdeploymentId", botDeploymentId);
    form.append("APIkey", apiKEY);
    if(domainId_id===10)//if it is a shopify chatbot then it will call this API
    {
        form.append("customerId", customerId);
        api_endpoint="shopify-natura-no-of-ques-goal-conv";
    }
    else // other wise this API will be called
    {
        api_endpoint="natura-no-of-questions-goal-conversion";
    }
    var settings = 
    {
        "async": true,
        "url": url_resource + "/syraconsumer/"+api_endpoint,
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
        if(response.status == 200)
        {
            jQuery("#avgQuesForGoalConversion").html(response.result);
        }
        else
        {
            jQuery("#avgQuesForGoalConversion").html(0);
        }

    })
    .fail(function(response) 
    {           
        var APIerrorMsg='<span style="margin-left:5%;margin-bottom:18%;color:red;font-size:10px;line-height:unset;">'+api_endpoint+' -> '+response.status+' -> '+response.statusText+'</span>';                                                                              
        jQuery("#avgQuesForGoalConversion").html(APIerrorMsg);

        swal
        ({
            title: "API Error!",
            text: api_endpoint+' -> '+response.status+' -> '+response.statusText,
            icon: "error",
            button: "OK",
        });



    });
}

//Embedded on slack
function slackEmbedAPIcall() {
    jQuery("#slackEmbedMsg").html('<img src="'+wp_path+'"images/syra-spinner.gif" height="35" style="margin-right:2%;"/>');
    var botAccessToken = jQuery('#botAccessToken').val();
    var botDisplayName = jQuery('#botDisplayName').val();

    if (botAccessToken == "" || botAccessToken == undefined || botAccessToken == null) {
        jQuery("#slackEmbedMsg").css("color", "#951D24");
        jQuery('#slackEmbedMsg').html("Bot Access Token Should not be Empty");
        return;
    }
    else if (botDisplayName == "" || botDisplayName == undefined || botDisplayName == null) {
        jQuery("#slackEmbedMsg").css("color", "#951D24");
        jQuery('#slackEmbedMsg').html("Bot Display Name Should not be Empty");
        return;
    }
    var form = new FormData();
    form.append("botAccessToken", botAccessToken);
    form.append("botDisplayName", botDisplayName);
    form.append("email", customerId);
    form.append("apiKey", apiKEY);
    form.append("projectid", domainId_id+"_"+uuid);
    form.append("chatbotname", deployedBotName);
    form.append("chatboticon", "http://chatbots.syra.ai/images/syra-taxation_512x512.png");

    var settings =
    {
        "async": true,
        "url": natura_url_resource + "/natura/embed-to-slack",
        "method": "POST",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
    }
    jQuery.ajax(settings).done(function (response) {
        response = JSON.parse(response);
        if (response.status === 200) {
            jQuery("#slackEmbedMsg").css("color", "green");
            jQuery("#slackEmbedMsg").html(response.message);
            jQuery('#botAccessToken').val("");
            jQuery('#botDisplayName').val("");
            jQuery('#errorMsg').html('');
        }
        else {
            jQuery("#slackEmbedMsg").css("color", "#951D24");
            jQuery("#slackEmbedMsg").html(response.message);
        }

    })
        .fail(function (response) {
            jQuery("#slackEmbedMsg").css("color", "#951D24");
            jQuery("#slackEmbedMsg").html(response.message);
            swal
                ({
                    title: "API Error!",
                    text: 'embed-to-slack' + ' -> ' + response.status + ' -> ' + response.statusText,
                    icon: "error",
                    button: "OK",
                });

        });

}

//Embedded on facebook
function facebookEmbedAPIcall() {
    jQuery("#facebookEmbedMsg").html('<img src="'+wp_path+'"images/syra-spinner.gif" height="35" style="margin-right:2%;"/>');

    var fbPageAccessToken = jQuery('#fbPageAccessToken').val();
    var pageId = jQuery('#pageId').val();

     if (fbPageAccessToken == "" || fbPageAccessToken == undefined || fbPageAccessToken == null) {
         jQuery("#facebookEmbedMsg").css("color", "#951D24");
         jQuery('#facebookEmbedMsg').html("Page Access Token Should not be Empty");
         return;
     }
     else if (pageId == "" || pageId == undefined || pageId == null) {
         jQuery("#facebookEmbedMsg").css("color", "#951D24");
         jQuery('#facebookEmbedMsg').html("Page ID Should not be Empty");
         return;
     }
     var form = new FormData();
     form.append("fbPageAccessToken", fbPageAccessToken);
     form.append("pageId", pageId);
     form.append("email", customerId);
     form.append("apiKey", apiKEY);
     form.append("projectid", domainId_id+"_"+uuid);
     form.append("chatbotname", deployedBotName);
     var settings =
     {
         "async": true,
         "url": natura_url_resource + "/natura/embed-to-facebook",
         "method": "POST",
         "processData": false,
         "contentType": false,
         "mimeType": "multipart/form-data",
         "data": form
     }
     jQuery.ajax(settings).done(function (response) {
         response = JSON.parse(response);
         if (response.status === 200) {
             jQuery("#facebookEmbedMsg").css("color", "green");
             jQuery("#facebookEmbedMsg").html(response.message);
             jQuery('#fbPageAccessToken').val("");
             jQuery('#pageId').val("");
             jQuery('#errorMsg').html('');
         }
         else {
             jQuery("#facebookEmbedMsg").css("color", "#951D24");
             jQuery("#facebookEmbedMsg").html(response.message);
         }
     })
    .fail(function (response) {
        jQuery("#facebookEmbedMsg").css("color", "#951D24");
        jQuery("#facebookEmbedMsg").html(response.message);
        swal
            ({
                title: "API Error!",
                text: 'embed-to-facebook' + ' -> ' + response.status + ' -> ' + response.statusText,
                icon: "error",
                button: "OK",
            });

    });

}

//Embedded on skype
function skypeEmbedAPIcall() {

    jQuery("#skypeEmbedMsg").html('<img src="'+wp_path+'"images/syra-spinner.gif" height="35" style="margin-right:2%;"/>');

    var skypeClientId = jQuery('#skypeClientId').val();
    var skypeClientSecret = jQuery('#skypeClientSecret').val();

    if (skypeClientId == "" || skypeClientId == undefined || skypeClientId == null) {
        jQuery("#skypeEmbedMsg").css("color", "#951D24");
        jQuery('#skypeEmbedMsg').html("Client Id Should not be Empty");
        return;
    }
    else if (skypeClientSecret == "" || skypeClientSecret == undefined || skypeClientSecret == null) {
        jQuery("#skypeEmbedMsg").css("color", "#951D24");
        jQuery('#skypeEmbedMsg').html("Client Secret Should not be Empty");
        return;
    }
    var form = new FormData();
    form.append("app_id", skypeClientId);
    form.append("app_secret", skypeClientSecret);            
    form.append("email", customerId);
    form.append("apiKey", apiKEY);
    form.append("projectid", domainId_id+"_"+uuid);
    form.append("chatbotname", deployedBotName);

    var settings =
    {
        "async": true,
        "url": natura_url_resource + "/natura/embed-to-skype",
        "method": "POST",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
    }
    jQuery.ajax(settings).done(function (response) {
        response = JSON.parse(response);
        if (response.status === 200) {
            jQuery("#skypeEmbedMsg").css("color", "green");
            jQuery("#skypeEmbedMsg").html(response.message);

            jQuery('#skypeClientId').val("");
            jQuery('#skypeClientSecret').val("");

            jQuery('#errorMsg').html('');
        }
        else {
            jQuery("#skypeEmbedMsg").css("colorwebEmbedModaltutorial", "#951D24");
            jQuery("#skypeEmbedMsg").html(response.message);
        }

    })
        .fail(function (response) {
            jQuery("#skypeEmbedMsg").css("color", "#951D24");
            jQuery("#skypeEmbedMsg").html(response.message);
            swal
                ({
                    title: "API Error!",
                    text: 'embed-to-skype' + ' -> ' + response.status + ' -> ' + response.statusText,
                    icon: "error",
                    button: "OK",
                });

        });

}

//Fetch User details
function fetchUserDetails(){
    var form = new FormData();
    form.append("email", email);

    var settings = 
    {
        "async": true,
        "url": url_resource + "/syraconsumer/customer-fetch",
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
        if(response.length > 0){
            jQuery('#userName').val(response[0].fName+" "+response[0].lName);
        }
    })
    .fail(function (response) 
    {
    });
}

//Embedded in mobile application
function saveMobileAppsInfo(){
    jQuery('#mobileAppsMsg').html("");
    jQuery('#mobileAppsMsg').html('<img src="'+wp_path+'"images/syra-spinner.gif" height="35" style="margin-right:45%;"/>');
    var form = new FormData();
    form.append("customerName", jQuery('#userName').val());
    form.append("customerId", jQuery('#userEmail').val());
    form.append("appPlatform", jQuery('#selPlatform').val());
    form.append("message", jQuery('#appInfotxt').val());
    if(jQuery('#selPlatform').val() == "" || jQuery('#selPlatform').val() == null){
        jQuery('#mobileAppsMsg').html("Please select any application platform first!!!");
        return;
    }
    var settings =
    {
        "async": true,
        "url": url_resource + "/syraconsumer/create-mobile-app-info",
        "method": "POST",
        headers: {
            'Authorization': 'Bearer '+access_token,
        },
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
    }
    jQuery.ajax(settings).done(function (response) {
        jQuery('#mobileAppsModal').modal('hide');
        jQuery('#selPlatform').val("Select Platform");
        jQuery('#appInfotxt').val("");
        jQuery("#mobileAppsMsg").html("");
        response = JSON.parse(response);
        jQuery(".swal2-icon.swal2-success").css("display","block");
        swalWithBootstrapButtons.fire({
            text: "We have noted your request!",
            icon: "success",
            confirmButtonText: 'Okay'
        })
        
    })
    .fail(function (response) {
        jQuery("#mobileAppsMsg").html("<b><font style='color:#5A679E'>Request Failed!!</font></b>");
        jQuery("swal2-icon.swal2-error").css("display","block");
        swalWithBootstrapButtons.fire
        ({
            text: 'create-mobile-app-info'+' -> '+response.status+' -> '+response.statusText,
            icon: "error",
            confirmButtonText: 'Okay'
        });
    });
}

function cardOnMouseOver(ele) {
    ele.style.boxShadow = null;
    ele.style.cursor = "pointer";
}

function cardOnMouseOut(ele) {
    ele.style.backgroundColor = "#fff";
    ele.style.boxShadow = "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)";
}

function openCDMarketplace(){
    url = "https://cloudhiti.ai/marketplace/";
    var win = window.open(url, '_blank');
    win.focus();
}

function openInNewTab() {
    var win = window.open("apis/", '_blank');
    win.focus();
}

/* end of embedBot.html */

function copyToClipBoard() {
    /* Get the text field */
    var copyText = document.getElementById("embeddedScript");

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /*For mobile devices*/

    /* Copy the text inside the text field */
    document.execCommand("copy");

    jQuery("#copy_to_clipboard").html("Copied");
    /* Alert the copied text */
    // alert("Copied the text: " + copyText.value);
}

/* used only on publish.php page */

function deployChatBotToShopifyStore(){
    var shopifyShop = document.cookie.match(new RegExp('(^| )shopify_store_name=([^;]+)'))[2]
    var username = domainId_id + "_" + uuid;
    var form = new FormData();
    form.append("botName", username);
    form.append("accessToken", shopify_access_token);
    form.append("storeName", shopifyShop);
    jQuery("#publishBotBtn").prop("disabled", true);
    var settings = {
        "async": true,
        "url": url_resource+"/syraconsumer/add-script-to-shopify",
        "method": "POST",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
    }

    jQuery.ajax(settings).done(function (response) {
        var jsonResponse = JSON.parse(response);
        if("errors" in jsonResponse){

        }
        else{
            var published = 'y';
            var botDeploymentID = botDeploymentId;
            var shopifypublish_formdata = new FormData();
            shopifypublish_formdata.append("botdeploymentId", botDeploymentID);
            shopifypublish_formdata.append("published", published);
            var shopifypublish_settings = {
                "async": true,
                "url": url_resource+"/syraconsumer/create-shopify-publish-unpublish-track",
                "method": "POST",
                headers: {
                    'Authorization': 'Bearer '+access_token,
                },
                "processData": false,
                "contentType": false,
                "mimeType": "multipart/form-data",
                "data": shopifypublish_formdata
            }

            jQuery.ajax(shopifypublish_settings).done(function (response) {
                jQuery("#publishBotBtn").prop("disabled", false);
                swalWithBootstrapButtons.fire({
                    html: "Your Syra AI Chatbot is published. <br> See it live on your store now!",
                    icon: "success",
                    button: "Okay"
                });
                jQuery('#publishChatbotButton').hide();
                jQuery('#unpublishChatbotButton').show();
            })
            .fail(function(response) 
            {        
                swalWithBootstrapButtons.fire({
                    text: 'create-shopify-publish-unpublish-track'+' -> '+response.status+' -> '+response.statusText,
                    icon: "error",
                    button: "OK",
                });
            });
        }
        
    })
    .fail(function(response) 
    {     
        jQuery("#publishBotBtn").prop("disabled", false);                        
        swalWithBootstrapButtons.fire
        ({
            title: "API Error!",
            text: 'add-script-to-shopify'+' -> '+response.status+' -> '+response.statusText,
            icon: "error",
            button: "OK",
        });
    });

}

function removeChatBotFromShopifyStore(pageName){
    var shopifyShop = document.cookie.match(new RegExp('(^| )shopify_store_name=([^;]+)'))[2];
    var botName = domainId_id + "_" +uuid;
    var form = new FormData();
    form.append("accessToken", shopify_access_token);
    form.append("storeName", shopifyShop);
    form.append("botName", botName);
    jQuery("#unpublishBotBtn").prop("disabled", true);
    var settings = {
        "async": true,
        "url": url_resource+"/syraconsumer/get-shopify-script-id-and-delete-json",
        "method": "POST",
        headers: {
            'Authorization': 'Bearer '+access_token,
        },
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
    }

    jQuery.ajax(settings).done(function (response) {
        var published = 'n';
        var botDeploymentID = botDeploymentId;
        var shopifyunpublish_formdata = new FormData();
        shopifyunpublish_formdata.append("botdeploymentId", botDeploymentID);
        shopifyunpublish_formdata.append("published", published);
        var shopifyunpublish_settings = {
            "async": true,
            "url": url_resource+"/syraconsumer/create-shopify-publish-unpublish-track",
            "method": "POST",
            headers: {
                'Authorization': 'Bearer '+access_token,
            },
            "processData": false,
            "contentType": false,
            "mimeType": "multipart/form-data",
            "data": shopifyunpublish_formdata
        }

        jQuery.ajax(shopifyunpublish_settings).done(function (response) {
            if(pageName == "templatesPage"){
                window.location = "templates.html";
            }
            else{
                jQuery("#unpublishBotBtn").prop("disabled", false);
                swalWithBootstrapButtons.fire({
                    text: "Your Syra AI Chatbot is deactived now!",
                    icon: "success",
                    button: "OK"
                });
                jQuery('#unpublishChatbotButton').hide();
                jQuery('#publishChatbotButton').show();
            }
        })
        .fail(function(response) 
        {                      
            swal
            ({
                title: "API Error!",
                text: 'create-shopify-publish-unpublish-track'+' -> '+response.status+' -> '+response.statusText,
                icon: "error",
                button: "OK",
            });
        });

    })
    .fail(function(response) 
    {    
        jQuery("#unpublishBotBtn").prop("disabled", false);                  
        swal
        ({
            title: "API Error!",
            text: 'get-shopify-script-id-and-delete-json'+' -> '+response.status+' -> '+response.statusText,
            icon: "error",
            button: "OK",
        });
    });
}

function wordpressPublishUnpublishTrack(botDeploymentId, embeddedScript){
    if(publishChatbotButtonFlag == true){
        jQuery("#publishWebsiteTagName").html("Shopify Store");
        jQuery("#shopifyIcon").show();
        jQuery("#globeIcon").hide();
        jQuery('#kt_clipboard_shopify_publish_copy_script').val(embeddedScript);
        var form = new FormData();
        form.append("botdeploymentId", botDeploymentId);
        var settings = {
            "async": true,
            "url": url_resource+"/syraconsumer/get-wordpress-publish-unpublish-track",
            "method": "POST",
            "processData": false,
            "contentType": false,
            "mimeType": "multipart/form-data",
            "data": form
        }
        jQuery.ajax(settings).done(function (response) {
            innerReponse = JSON.parse(response);
            if(innerReponse[0].status == 200){
                if(innerReponse[0]["published"] == 'n'){
                    jQuery('#publishChatbotButton').show();
                    jQuery('#unpublishChatbotButton').hide();
                }
                else if(innerReponse[0]["published"] == 'y'){
                    jQuery('#publishChatbotButton').hide();
                    jQuery('#unpublishChatbotButton').show();
                }
            }
            else{
                jQuery('#publishChatbotButton').show();
                jQuery('#unpublishChatbotButton').hide();
            }
        })
        .fail(function(response) 
        {                      
            swalWithBootstrapButtons.fire({
                title: "API Error!",
                text: 'get-shopify-publish-unpublish-track'+' -> '+response.status+' -> '+response.statusText,
                icon: "error",
                button: "OK",
            });
        });
    }
    if(publishChatbotButtonFlag == false){
        jQuery('#publishChatbotButton').hide();
        jQuery('#unpublishChatbotButton').hide();
        jQuery("#shopifyIcon").hide();
    }

}

function publishChatbot(){
    if (document.cookie.match(new RegExp('(^| )shopify_store_name=([^;]+)')) != null){
    }
    else{
        // do nothing
    }
}

/* end of publish.php */

//Modification based on dashboard page
function convertToPST(date){
    var form = new FormData();
    form.append("date", date);

    var settings = 
    {
        "async": true,
        "url": "https://natura.syra.ai/natura/to-pst-date-time",
        "method": "POST",
        headers: {
            'Authorization': 'Bearer '+access_token,
        },
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
    }
    jQuery.ajax(settings).done(function (response) {
        response = JSON.parse(response);
        if(jQuery("#chatbotCreated").length){
            var tagName = document.getElementById("chatbotCreated").tagName;
            if(tagName == "SMALL" || tagName == "small"){
                var htmltext = "Created On : " + response.pstTime;
                jQuery("#chatbotCreated").html(htmltext);
            }
            else{
                jQuery("#chatbotCreated").val(response.pstTime);
            }
        }
    });
}

/* used only on settings.html page */

function showPassword() {                        
    jQuery('.toggle-password').toggleClass("fa-eye fa-eye-slash");
    var x = document.getElementById("txt_passwd");
    if (x.type === "password") 
    {
        x.type = "text";
    } 
    else 
    {
        x.type = "password";
    }
}

function fetchplan(){
    var settings = 
    {
        "async": true,
        "url": url_resource + "/syraconsumer/plan-fetch",
        "method": "POST",
        headers: 
        {
                'Authorization': 'Bearer '+access_token,
        }
    }
    jQuery.ajax(settings).done(function (response) 
    {

        if(response.length>0)
        {
            var options = '';
            for(var i in response)
            {
                options = options + '<option value="' + response[i].planId + '">' + response[i].planName + '</option>';
            }
            jQuery('#sel_planid').append(options);
        }
        else
        {
            swal
            ({
                title: "Error!",
                text: 'plan-fetch' + ' - ' + response.message,
                icon: "error",
                button: "OK",
            });
        }


    })
    .fail(function(response) 
    {           

        swal({
            title: "API Error!",
            text: 'plan-fetch'+' -> '+response.status+' -> '+response.statusText,
            icon: "error",
            button: "OK",
        });

    });
}

function fetchplandetails(){
    var form = new FormData();
    form.append("planTypeId", jQuery('#sel_planid').val());

    var settings = {
        "async": true,
        "url": url_resource + "/syraconsumer/customer-fetch-plan-by-id",
        "method": "POST",
        headers: {
                'Authorization': 'Bearer '+access_token,
        },
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
    }

    jQuery.ajax(settings).done(function (response) {
        response = JSON.parse(response);
        jQuery("#text_planMeantFor").val(response[0].planTypeDetails.meantFor);
        jQuery("#txt_advanceTraining").val(response[0].advanceTraining);
        jQuery("#txt_allowBotLimit").val(response[0].allowBotLimit);
        jQuery("#txt_contractInMonth").val(response[0].contractInMonth);
        jQuery("#txt_entity").val(response[0].entity);
        jQuery("#txt_facebookEmbedding").val(response[0].facebookEmbedding);
        jQuery("#txt_initialTraining").val(response[0].initialTraining);
        jQuery("#txt_intent").val(response[0].intent);
        jQuery("#txt_kikEmbedding").val(response[0].kikEmbedding);
        jQuery("#txt_knowledgeSpecification").val(response[0].knowledgeSpecification);
        jQuery("#txt_logRetainingDay").val(response[0].logRetainingDay);
        jQuery("#txt_monthlyCharge").val(response[0].monthlyCharge);

        jQuery("#txt_scrapping").val(response[0].scrapping);
        jQuery("#txt_setupFees").val(response[0].setupFees);
        jQuery("#txt_siteSpecification").val(response[0].siteSpecification);
        jQuery("#txt_skypeEmbedding").val(response[0].skypeEmbedding);
        jQuery("#txt_slackEmbedding").val(response[0].slackEmbedding);
        jQuery("#txt_supportDetails").val(response[0].supportDetails.description);
        jQuery("#txt_telegramEmbedding").val(response[0].telegramEmbedding);
        jQuery("#txt_textQueryPermonth").val(response[0].textQueryPermonth);
        jQuery("#txt_websiteEmbedding").val(response[0].websiteEmbedding);
    })
    .fail(function(response) 
    {           
        //alert('customer-fetch-plan-by-id'+'\n'+response.status+' -> '+response.statusText);
        swal({
            title: "API Error!",
            text: 'customer-fetch-plan-by-id'+' -> '+response.status+' -> '+response.statusText,
            icon: "error",
            button: "OK",
        });

    });
}

function updatePersonalDetails(){
    
    var personalDetailsChangeCount = jQuery('.personal_tab_value-changed').length;
    if(personalDetailsChangeCount > 0){
        jQuery("#personalDetailsMsgArea").html("");
        jQuery("#personalDetailsMsgArea").html('<img src="'+wp_path+'"images/syra-spinner.gif" height="35" style="margin-left:45%;"/>');
    
        var form = new FormData();
        form.append("email", email);
        form.append("fName", jQuery("#txt_fname").val());
        form.append("lName", jQuery("#txt_lname").val());
        form.append("password", jQuery("#txt_passwd").val());
        form.append("jobTitle", jQuery("#txt_title").val());
    
        var settings = {
            "async": true,
            "url": url_resource + "/syraconsumer/customer-update-personal-details",
            "method": "POST",
            headers: {
                'Authorization': 'Bearer '+access_token,
            },
            "processData": false,
            "contentType": false,
            "mimeType": "multipart/form-data",
            "data": form
        }
        jQuery.ajax(settings).done(function (response) {
            response = JSON.parse(response);
            if(response.status === 200){
                swalWithBootstrapButtons.fire({
                    text: "Personal details were updated sucessfully.",
                    icon: 'success',
                    showCancelButton: true,
                    confirmButtonText: 'Okay',
                    reverseButtons: true
                })
                jQuery("#personalDetailsMsgArea").html("<font style='color:#5A679E'>Personal details is updated sucessfully</font>");
            }
            else{
                swalWithBootstrapButtons.fire({
                    text: response.message,
                    icon: 'info',
                    showCancelButton: true,
                    confirmButtonText: 'Okay',
                    reverseButtons: true
                })
                jQuery("#personalDetailsMsgArea").html("<b><font style='color:#5A679E'>"+response.message+"</font></b>");
            }
        })
        .fail(function(response) 
        {      
            swalWithBootstrapButtons.fire
            ({
                text: 'customer-update-personal-details'+' -> '+response.status+' -> '+response.statusText,
                icon: "error",
                button: "OK",
            });
        });
        jQuery("input").removeClass("personal_tab_value-changed");
        jQuery("textarea").removeClass("personal_tab_value-changed");
    }

    else{
        // nothing
    }
}

function updateContactDetails(){
    var contactDetailsChangeCount = jQuery('.contact_tab_value_changed').length;
    if(contactDetailsChangeCount > 0){
        var form = new FormData();
        form.append("email", email);
        form.append("address1", jQuery("#txt_add").val());
        form.append("address2", jQuery("#txt_address2").val());
        form.append("city", jQuery("#txt_city").val());
        form.append("country", jQuery("#txt_country").val());
        form.append("zipCode", jQuery("#txt_zip").val());
        form.append("contactNo", jQuery("#txt_contact").val());
    
        var settings = {
            "async": true,
            "url": url_resource + "/syraconsumer/customer-update-contact-details",
            "method": "POST",
            headers: {
                'Authorization': 'Bearer '+access_token,
            },
            "processData": false,
            "contentType": false,
            "mimeType": "multipart/form-data",
            "data": form
        }
        jQuery.ajax(settings).done(function (response) {
            response = JSON.parse(response);
            if(response.status === 200)
            {
                insertNotificationData("2","Update",email);
            }
        })
        .fail(function(response) 
        {           
    
            swalWithBootstrapButtons.fire({
                text: 'customer-update-contact-details'+' -> '+response.status+' -> '+response.statusText,
                icon: "error",
                button: "OK",
            });
    
        });
        jQuery("input").removeClass("contact_tab_value_changed");
        jQuery("textarea").removeClass("contact_tab_value_changed");
    }
    else{
        // nothing
    }
}

function updateCompanyDetails(){
    var companyDetailsChangeCount = jQuery('.company_tab_value_changed').length;
    if(companyDetailsChangeCount > 0){
        jQuery("#companyDetailsMsgArea").html("");
        jQuery("#companyDetailsMsgArea").html('<img src="'+wp_path+'"images/syra-spinner.gif" height="35" style="margin-left:45%;"/>');
        var form = new FormData();
        form.append("email", email);
        form.append("companyName", jQuery("#txt_company").val());
        form.append("websiteURL", jQuery("#txt_web").val());
        form.append("taxInformation", jQuery("#txt_tax").val());
        form.append("fbPageURL", jQuery("#txt_fb").val());
    
        var settings = 
        {
            "async": true,        
            "url": url_resource + "/syraconsumer/company-update",
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
            if(response.status === 200)
            {
                jQuery("#companyDetailsMsgArea").html("<font style='color:#5A679E'>Company details is updated successfully</font>");
                swalWithBootstrapButtons.fire({
                    text: "Company details were updated successfully.",
                    icon: 'success',
                    showCancelButton: true,
                    confirmButtonText: 'Okay'
                })
                // swalWithBootstrapButtons.fire("Update","Company details is updated successfully", "success");
            }
            else
            {
                jQuery("#companyDetailsMsgArea").html("<b><font style='color:#5A679E'>"+response.message+"</font></b>");
                // swalWithBootstrapButtons.fire("Error",response.message, "error");
                swalWithBootstrapButtons.fire({
                    text: response.message,
                    showCancelButton: true,
                    confirmButtonText: 'Okay'
                })
            }
        })
        .fail(function(response) 
        {           
            //alert('company-update'+'\n'+response.status+' -> '+response.statusText);
            swalWithBootstrapButtons.fire({
                text: 'company-update'+' -> '+response.status+' -> '+response.statusText,
                icon: "error",
                button: "OK",
            });
        });
        jQuery("input").removeClass("company_tab_value_changed");
        jQuery("textarea").removeClass("company_tab_value_changed");
    }
    else{
        // nothing
    }
}
    
/* end of settings.html */

/* used only on botdeployment.html page */

function fetchdomain(){
    var settings = 
    {
        "async": true,
        "url": url_resource + "/syraconsumer/botdomain-fetch",
        "method": "POST",
        headers: {
                'Authorization': 'Bearer '+access_token,
        }
    }
    jQuery.ajax(settings).done(function (response) 
    {                       
        if(response.length>0)
        {
            var options = '';            
            for(var i in response)
            {
                // domain Id for zendesk is 11
                if((response[i].id != 2) && (response[i].id != 6) && (response[i].id != 9) && (response[i].id != 10) && (response[i].id != 11) && (response[i].id != 12))
                {                    
                    options = options + '<option value="' + response[i].id + '" disabled>' + response[i].name + '</option>';
                }
                else
                {
                    options = options + '<option value="' + response[i].id + '">' + response[i].name + '</option>';
                }
            }
            jQuery('#sel_domain').append(options);
            selectedDomainId = null;
            if(shopify_access_token != ""){
                selectedDomainId = 10;
            }

            //To select zendesk as a domain for zendesk users
            // if(zendesk_access_token != ""){
            //     jQuery('#sel_domain').val('11');
            //     jQuery('#sel_domain').trigger("change");
            //     jQuery('#sel_domain').attr("disabled", true);


            //     // Setting up default questions for zendesk
            //     jQuery("#txt_q1").val("Create new request");
            //     jQuery('#txt_q1').attr("disabled", true);

            //     jQuery("#txt_display1").val("Create new request");
            //     jQuery('#txt_display1').attr("disabled", true);
            //     //////


            //     //////
            //     jQuery("#txt_q2").val("Comment request");
            //     jQuery('#txt_q2').attr("disabled", true);

            //     jQuery("#txt_display2").val("Comment request");
            //     jQuery('#txt_display2').attr("disabled", true);
            //     //////


            //     //////
            //     jQuery("#txt_q3").val("Search request");
            //     jQuery('#txt_q3').attr("disabled", true);


            //     jQuery("#txt_display3").val("Search request");
            //     jQuery('#txt_display3').attr("disabled", true);


            //     //////
            //     jQuery("#txt_q4").val("Show request");
            //     jQuery('#txt_q4').attr("disabled", true);

            //     jQuery("#txt_display4").val("Show request");
            //     jQuery('#txt_display4').attr("disabled", true);
            //     //////


            //     //////
            //     jQuery("#txt_q5").val("List requests");
            //     jQuery('#txt_q5').attr("disabled", true);


            //     jQuery("#txt_display5").val("List requests");
            //     jQuery('#txt_display5').attr("disabled", true);
            //     //////

            // }
        }
        else
        {
            // swal
            // ({
            //     title: "Error!",
            //     text: 'botdomain-fetch Response Error!!',
            //     icon: "error",
            //     button: "OK",
            // });
        }
    })
    .fail(function(response) 
    {                      
        swal
        ({
            title: "API Error!",
            text: 'botdomain-fetch'+' -> '+response.status+' -> '+response.statusText,
            icon: "error",
            button: "OK",
        });
    });
}


function goalSetForChatBot(botdeploymentId,goalName,goalURL, deployedURL){
    var form = new FormData();

    form.append("botdeploymentId",botdeploymentId);
    form.append("name",goalName);
    form.append("url",goalURL);

    if(goalName != "" && goalURL != "")
    {
        var settings = 
        {
            "async": true,
            "url": url_resource + "/syraconsumer/create-goal",
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

            if(response.status === 200)
            {

                jQuery('#txt_goalName').val("");
                jQuery('#txt_goalURL').val("");
                jQuery("#msgArea").html("<b><font style='color:#5A679E'>New Bot Deployed</font></b>");
                jQuery("#deployedURL").html('<a href="'+deployedURL+'" target="_blank" style="color: #662343">'+deployedURL+'</a>');

                //Bot Deployed Successful 
                swal({
                    title: "Bot Deployed Successful",
                    text: "You can Preview your changes if you want to!",
                    icon: "success",
                    button: "Preview",

                })
                .then((value) => {

                    if (value) {
                        window.open(deployedURL, '_blank');
                    } else {
                        window.location.href = '#';
                    }
                });


            }
            else
            {
                jQuery("#msgArea").html("<b><font style='color:#5A679E;font-size:9x'>New Bot Deployed But "+response.message+"</font></b>");
                jQuery("#deployedURL").html('<a href="'+deployedURL+'" target="_blank" style="color: #662343">'+deployedURL+'</a>');


                //Bot Deployed Successful 
                swal({
                    title: "Bot Deployed Successful",
                    text: "You can Preview your changes if you want to!",
                    icon: "success",
                    button: "Preview",

                })
                .then((value) => {

                    if (value) {
                        window.open(deployedURL, '_blank');
                    } else {
                        window.location.href = '#';
                    }
                });




            }
        })
        .fail(function(response) 
        {           
            jQuery("#msgArea").html('create-goal'+' -> '+response.status+' -> '+response.statusText);
            jQuery("#deployedURL").html('create-goal'+' -> '+response.status+' -> '+response.statusText);
            swal
            ({
                title: "API Error!",
                text: 'create-goal'+' -> '+response.status+' -> '+response.statusText,
                icon: "error",
                button: "OK",
            });


        });
    }
    else
    {
        jQuery("#msgArea").html("<b><font style='color:#5A679E'>New Bot Deployed Without Goal</font></b>");
        jQuery("#deployedURL").html('<a href="'+deployedURL+'" target="_blank" style="color: #662343">'+deployedURL+'</a>');

        //Bot Deployed Successful 
        swal({
            title: "Bot Deployed Successful",
            text: "You can Preview your changes if you want to!",
            icon: "success",
            button: "Preview",

        })
        .then((value) => 
        {

            if (value) {
                window.open(deployedURL, '_blank');
            } else {
                window.location.href = '#';
            }
        });



    }
}

function CreateShopifyUserDatabaseAndPopulate(api_key,api_secret,shop,username,password, deployedURL, writedata)
{
    jQuery("#shopifyDataRefreshStatus").html('<img src="'+wp_path+'"images/syra-spinner.gif" height="35"/>');
    var form = new FormData();
    form.append("api_key", api_key);
    form.append("api_secret",api_secret);
    form.append("shop", shop);
    form.append("username",username);
    form.append("password",password);

    var settings = 
    {
        "async": true,
        "url": url_resource + "/syraconsumer/create-shopify-user-database",
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
        if (response.status_code === 200) {
            /* For Testing -- Need to change*/
            swalWithBootstrapButtons.fire({
                text: "Your customizations were saved successfully.",
                icon: "success",
                button: "Okay",
            })
            // .then((value) => {
            //     if (value) {
            //         window.open(deployedURL, '_blank');
            //         setTimeout(() => { window.location.reload(); }, 2000);
            //     } else {
            //         window.location.reload();
            //         setTimeout(() => { window.location.reload(); }, 2000);
            //     }
            // });
            /* For Testing -- Need to change*/

            //extractShopName = shop.split(".")[0];
            // extractShopName = extractShopName.join(".");
            /*var form2 = new FormData();
            form2.append("api_key", api_key);
            form2.append("api_secret", api_secret);
            form2.append("shop", shop);
            form2.append("username", username);
            form2.append("password", password);
            form2.append("access-token", shopify_access_token);
            form2.append("writedata",writedata);
            var settings =
            {
                "async": true,
                "url": url_resource + "/syraconsumer/populate-shopify-database",
                "method": "POST",
                headers: {
                    'Authorization': 'Bearer '+access_token,
                },
                "processData": false,
                "contentType": false,
                "mimeType": "multipart/form-data",
                "data": form2
            }
            jQuery.ajax(settings).done(function (response1) 
            {

                response1=JSON.parse(response1);
                // if(response1.status_code===200)
                // {
                //     //Bot Deployed Successful 
                //     swalWithBootstrapButtons.fire({
                //         title: "Bot Deployed Successful",
                //         text: "You can Preview your changes if you want to!",
                //         icon: "success",
                //         button: "Preview",

                //     })
                //     .then((value) => {

                //         if (value) {
                //             window.open(deployedURL, '_blank');
                //         } else {
                //             window.location.href = '#';
                //         }
                //     });
                // } 
            })
            .fail(function (response) 
            {                    
                swalWithBootstrapButtons.fire
                ({
                    text: 'populate-shopify-database' + ' -> ' + response.status + ' -> ' + response.statusText,
                    icon: "error",
                    button: "OK",
                });
            });
            getShopifyProductIngestStatus(username);*/
        }
        else 
        {
               swalWithBootstrapButtons.fire
                ({
                    text: 'create-shopify-user-database Response Error!!',
                    icon: "error",
                    button: "OK",
                });
        }

    })
    .fail(function(response) 
    {           
        // alert('create-shopify-user-database'+'\n'+response.status+' -> '+response.statusText);
        swal
        ({
            title: "API Error!",
            text: 'create-shopify-user-database'+' -> '+response.status+' -> '+response.statusText,
            icon: "error",
            button: "OK",
        });


    });

}
var prev_records_fetched = 0;

function checkShopifyPromotionDataExists(username, pageName){
    userPromotionDataExists = false;
    var innerform = new FormData();
    innerform.append("shop", shopify_store_name);
    innerform.append("access-token", shopify_access_token);
    var settings = {
        "url":  url_resource + "/syraconsumer/shopify-store-promotion-checker",
        "method": "POST",
        "timeout": 0,
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": innerform
    };
    jQuery.ajax(settings).done(function (innerResponse) {
        var jsonInnerResponse = JSON.parse(innerResponse);
        if(jsonInnerResponse["isPromotion"] == true){
            if(pageName == "templatesPage"){
                var form = new FormData();
                form.append("username", username);
                var settings =
                {
                    "async": true,
                    "url": url_resource + "/syraconsumer/get-shopify-product-status",
                    "method": "POST",
                    headers: {
                        'Authorization': 'Bearer '+ access_token,
                    },
                    "processData": false,
                    "contentType": false,
                    "mimeType": "multipart/form-data",
                    "data": form
                }
                jQuery.ajax(settings).done(function (response) 
                {
                    var jsonResponse = JSON.parse(response);
                    if(jsonResponse["status"] == 200){
                        if(jsonResponse.progress == 1){
                            userPromotionDataExists = true; 
                            showPromotionDataContent();
                        }
                        else{
                            userPromotionDataExists = false; 
                            jQuery("#promotionCustomizeBtn").attr("disabled",true);
                            swalWithBootstrapButtons.fire({
                                title : "",
                                html : "If you want to show currently running promotions to your site visitors, please import the promotions from your Shopify store first.",
                                showCancelButton: true,
                                cancelButtonText: 'Cancel',
                                confirmButtonText: "Import Promotions from my Shopify Store."
                            })
                            .then((result) => {
                                if (result.value) {
                                    ingestShopifyPromotionData();
                                }
                                else if (result.dismiss === swalWithBootstrapButtons.DismissReason.cancel) {
                                    setupWizardTemplateSelection();
                                }
                            })
                        }
                    }
                })
            }
            else{
                userPromotionExists = true;
                jQuery("#publishBotBtn").prop("disabled",false);
            }
        }
        else{
            if(pageName == "templatesPage"){
                showPromotionDataContent();
            }
            else{
                jQuery("#publishBotBtn").prop("disabled",true);
            }
        }
    })
    
}

function ingestShopifyPromotionData(){
    getPromotionBtnClicked = true;
    jQuery("#spinDataIngection").html('<img src="'+wp_path+'"images/syra-spinner.gif" height="35" style="margin-left:45%;"/><br><div style="border: 1px solid;padding-left: 2%;padding-bottom: 2%;width: 100%;margin-top: 2%; padding-top: 2%; font-size: 16px; font-weight: bold;">Started to import the promotions from your Shopify Store.<br>You will be sent an email when all promotions have been imported.<br>You can also check the Notification Panel.<br>You may leave this page.</div>');
    // jQuery("#promotionCode").prop("disabled", true);
    var innerform = new FormData();
    innerform.append("shop", shopify_store_name);
    innerform.append("access-token", shopify_access_token);
    var settings = {
        "url":  url_resource + "/syraconsumer/shopify-store-promotion-checker",
        "method": "POST",
        "timeout": 0,
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": innerform
    };

    jQuery.ajax(settings).done(function (innerResponse) {
        var jsonInnerResponse = JSON.parse(innerResponse);
        if(jsonInnerResponse["isPromotion"] == true){
            var form = new FormData();
            form.append("dbname", selectedDomainId + "_" + uuid);
            var settings = {
                "url":  url_resource + "/syraconsumer/truncate-store-promtion-data",
                "method": "POST",
                "processData": false,
                "mimeType": "multipart/form-data",
                "contentType": false,
                "data": form
            };

            jQuery.ajax(settings).done(function (response) {
                var jsonResponse = JSON.parse(response);
                if(jsonResponse.status == 200){
                    var form = new FormData();
                    form.append("shop", shopify_store_name);
                    form.append("username", selectedDomainId + "_" + uuid);
                    form.append("access-token", shopify_access_token);
                    var settings = {
                        "url":  url_resource + "/syraconsumer/get-shopify-store-promotions",
                        "method": "POST",
                        "timeout": 0,
                        "headers": {
                            "X-Shopify-Access-Token": shopify_access_token,
                            "Authorization": "Bearer " + access_token
                        },
                        "processData": false,
                        "mimeType": "multipart/form-data",
                        "contentType": false,
                        "data": form
                    };

                    jQuery.ajax(settings).done(function (response) {
                    })
                    .fail(function(response){
                        jQuery("#spinDataIngection").html("");
                        // jQuery("#promotionCode").prop("disabled", false);
                        swalWithBootstrapButtons.fire("","Internal error occurred!", "error");
                    });
                    getShopifyPromotionIngestStatus(selectedDomainId + "_" + uuid);
                }
            })

        }
        if(jsonInnerResponse["isPromotion"] == false){
            jQuery("#spinDataIngection").html("");
            // jQuery("#promotionCode").prop("disabled", false);
            swalWithBootstrapButtons.fire("","Sorry, looks like you have not yet setup any promotions in your Shopify Store. Please set them up and click on this button again.", "info");
        }
        jQuery("#promotionCustomizeBtn").attr("disabled",false);
    })
    .fail(function (innerResponse){
        jQuery("#spinDataIngection").html("");
        // jQuery("#promotionCode").prop("disabled", false);
        jQuery("#promotionCustomizeBtn").attr("disabled",false);
    });

}


function getShopifyPromotionIngestStatus(username){
    var intervalRefreshId = setInterval(function(){
        var form = new FormData();
        form.append("username", username);
        var settings =
        {
            "async": true,
            "url": url_resource + "/syraconsumer/get-shopify-product-status",
            "method": "POST",
            headers: {
                'Authorization': 'Bearer '+ access_token,
            },
            "processData": false,
            "contentType": false,
            "mimeType": "multipart/form-data",
            "data": form
        }
        jQuery.ajax(settings).done(function (response) 
        {
            var jsonResponse = JSON.parse(response);
            if(jsonResponse["status"] == 200){
                 if(jsonResponse.progress == 1){
                    userPromotionDataExists = true; 
                    clearInterval(intervalRefreshId);
                    jQuery("#spinDataIngection").html("");
                    jQuery("#promotionCode").prop("disabled", false);
                    // swalWithBootstrapButtons.fire("","Success! Retrieved all currently running promotions.", "success");
                    insertNotificationData("10","Update",email);
                }
                else{
                    userPromotionDataExists = false; 
                    jQuery("#spinDataIngection").html('<img src="'+wp_path+'"images/syra-spinner.gif" height="35" style="margin-left:45%;"/><br><div style="border: 1px solid;padding-left: 2%;padding-bottom: 2%;width: 100%;margin-top: 2%; padding-top: 2%; font-size: 16px; font-weight: bold;">Started to import the promotions from your Shopify Store.<br>You will be sent an email when all promotions have been imported.<br>You can also check the Notification Panel.<br>You may leave this page.</div>');
                    jQuery("#promotionCode").prop("disabled", true);
                }
            }
            else{
                jQuery("#spinDataIngection").html("");
                // jQuery("#promotionCode").prop("disabled", true);
            }
        })
    },1000);
}


function checkShopifyPromotionIngestStatus(username){
    var intervalRefreshId = setInterval(function(){
        var form = new FormData();
        form.append("username", username);
        var settings =
        {
            "async": true,
            "url": url_resource + "/syraconsumer/get-shopify-product-status",
            "method": "POST",
            headers: {
                'Authorization': 'Bearer '+ access_token,
            },
            "processData": false,
            "contentType": false,
            "mimeType": "multipart/form-data",
            "data": form
        }
        jQuery.ajax(settings).done(function (response) 
        {
            var jsonResponse = JSON.parse(response);
            if(jsonResponse["status"] == 200){
                 if(jsonResponse.progress == 1){
                    userPromotionDataExists = true; 
                    clearInterval(intervalRefreshId);
                    jQuery("#spinDataIngection").html("");
                    jQuery("#promotionCode").prop("disabled", false);
                    // swalWithBootstrapButtons.fire("","Success! Retrieved all currently running promotions.", "success");
                    // insertNotificationData("10","Update",email);
                }
                else{
                    userPromotionDataExists = false; 
                    jQuery("#spinDataIngection").html('<img src="'+wp_path+'"images/syra-spinner.gif" height="35" style="margin-left:45%;"/><br><div style="border: 1px solid;padding-left: 2%;padding-bottom: 2%;width: 100%;margin-top: 2%; padding-top: 2%; font-size: 16px; font-weight: bold;">Started to import the promotions from your Shopify Store.<br>You will be sent an email when all promotions have been imported.<br>You can also check the Notification Panel.<br>You may leave this page.</div>');
                    jQuery("#promotionCode").prop("disabled", true);
                }
            }
            else{
                jQuery("#spinDataIngection").html("");
                // jQuery("#promotionCode").prop("disabled", true);
            }
        })
    },1000);
}

// function activeTemplates(obj)
// {
//     var count = 0;
//     for(var prop in obj)
//     {
//         if(obj[prop]==1){
//             count++;
//         }
//     }
//     return count;
// }

function deactivateTemplateFromBackend(deactiveTemplateFlag, templateId, activetemplates){
    if( deactiveTemplateFlag == 1){
        var form = new FormData();
        form.append("botDeploymentId", botDeploymentId);
        form.append("templateId", templateId);
        var settings = {
            "url":  url_resource + "/syraconsumer/deactive-selected-template",
            "method": "POST",
            "timeout": 0,
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
            if(jsonResponse.status == 200){
                if(templateId == 2){
                    checkSecondTemplateSelection = false;
                }
                if(activetemplates == 1){
                    shopifyPublishUnpublishTrack(botDeploymentId, "", "templatesPage")
                }
                else{
                    window.location = "templates.html";
                }
            }
            
            if(jsonResponse.status == 409){
                swalWithBootstrapButtons.fire("",jsonResponse.message,"info");
            }
        });
    }
}

function deactivateTemplate(templateId){
    var deactiveTemplateFlag = 0;
    var activetemplates = activeTemplates(shopifySelectedTemplateResponse.data[0].templateStatus);
    if(activetemplates == 1){
        swalWithBootstrapButtons.fire({
            html: "You are deactivating the last selected template.<br> This will cause your Syra AI Chatbot to be unpublished <br> Do you wish to continue?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            reverseButtons: true
        })
        .then((result) => {
            if (result.value) {
                    deactiveTemplateFlag = 1;
                    deactivateTemplateFromBackend(deactiveTemplateFlag, templateId, activetemplates);
            } else if (result.dismiss === swalWithBootstrapButtons.DismissReason.cancel) {
                    deactiveTemplateFlag = 0;
                    return;
            }
        });
    }
    else{
        deactiveTemplateFlag = 1;
        deactivateTemplateFromBackend(deactiveTemplateFlag, templateId, activetemplates);
    }
}


function getIngestedDataStatusShopify(username){
        var form = new FormData();
        form.append("username", username);
        var settings =
        {
            "async": true,
            "url": url_resource + "/syraconsumer/get-shopify-product-status",
            "method": "POST",
            headers: {
                'Authorization': 'Bearer '+ access_token,
            },
            "processData": false,
            "contentType": false,
            "mimeType": "multipart/form-data",
            "data": form
        }
        jQuery.ajax(settings).done(function (response) 
        {
            var jsonResponse = JSON.parse(response);
            if(parseInt(jsonResponse.records_fetched) > 0){
                //show message
                
                jQuery("#ingestedDataQty").html(jsonResponse.records_fetched);
                prev_records_fetched = parseInt(jsonResponse.records_fetched);
                if(jsonResponse.progress == 5){

                    if(window.location.href.split('/').slice(-1)[0].split('.')[0] == "training" || url.split('/').slice(-1)[0].split('.')[0] == "setup-wizard"){
                        // jQuery("#spinDataIngection").html("");
                        jQuery("#btnFetchShopifyData").prop("disabled", true);
                    }
                    if(window.location.href.split('/').slice(-1)[0].split('.')[0] == "customize"){
                        // do spinning
                    }
                }
            }
            else{
                jQuery("#shopifyDataRefreshStatus").html("");
                jQuery("#btnCustomize").prop("disabled", false);
            }
            
        });

}

function selectDomainDDChange(sel){
       var selectedItemText=sel.options[sel.selectedIndex].text;
       var selectedItemValue=sel.options[sel.selectedIndex].value;

        if((selectedItemValue==10))
        {
            getStoreCategory();
        }
        else
        {
            jQuery("#txt_key").val("");
            jQuery('#domainDetailsProjectName').show();
            jQuery('#domainDetailsAPIKey').show();

            //jQuery('#shopCategory').hide();
            jQuery('#domainDetailsStoreName').hide();
            jQuery('#domainDetailsStoreSecretKey').hide();
            jQuery('#domainDetailsStoreApiKey').hide();
            jQuery('#domainDetailsAPIVersion').hide();                                                         
        }


}

function fetchProject(){
    var form = new FormData();
    form.append("email", email);

    var settings = 
    {
        "async": true,
        "url": natura_url_resource + "/natura/fetch-project",
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
        if(response.length>0)
        {
            var select = document.createElement("select");
            select.setAttribute("onchange", "getAPIkey(this)");
            var option = document.createElement("option");
            option.innerHTML = "select";
            option.setAttribute("value","select");
            select.setAttribute("class", "form-control");
            select.appendChild(option);
            for(i = 0; i < response.length; i++)
            {
                option = document.createElement("option");
                option.innerHTML = response[i].name;
                option.setAttribute("value",response[i].APIkey);
                select.appendChild(option);
            }
            jQuery("#projectName").append(select);
        }
        /*else
        {
            swal
            ({
                title: "Error!",
                text: 'fetch-project'+' - '+response.message,
                icon: "error",
                button: "OK",
            }); 
        }*/

    })
    .fail(function(response) 
    {           

        swal
        ({
            title: "API Error!",
            text: 'fetch-project'+' -> '+response.status+' -> '+response.statusText,
            icon: "error",
            button: "OK",
        });    
    });
}

function getStoreCategory(){
    var form = new FormData();
    form.append("email", "shopify@thirdeyedata.io");

    var settings = {
        "async": true,
        "url": natura_url_resource + "/natura/fetch-project",
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


        if(response.length>0)
        {
            jQuery("#txt_key").val(response[0].APIkey);
            jQuery('#domainDetailsProjectName').hide();
            jQuery('#domainDetailsAPIKey').hide();
            jQuery('#domainDetailsStoreName').show();
            jQuery('#domainDetailsStoreSecretKey').show();
            jQuery('#domainDetailsStoreApiKey').show();
            jQuery('#domainDetailsAPIVersion').show();
        }

    })
    .fail(function(response) 
    {           

        swal
        ({
            title: "API Error!",
            text: 'fetch-project'+' -> '+response.status+' -> '+response.statusText,
            icon: "error",
            button: "OK",
        });


    });
    }

function getAPIkeyFromNatura(){
    var form = new FormData();
    form.append("email", email);

    var settings = {
        "async": true,
        "url": natura_url_resource + "/natura/fetch-project",
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


        if(response.length>0)
        {
            jQuery("#txt_key").val(response[0].APIkey);
        }

    })
    .fail(function(response) 
    {           

        swalWithBootstrapButtons.fire({
            text: 'fetch-project'+' -> '+response.status+' -> '+response.statusText,
            icon: "error",
            button: "Okay"
        });


    });
}

/* Start of Demo Syra ChatBot Onchange Code  */
function fetchradioButtonData(chatbotIcon){
    var rates = document.getElementsByName('chatbotIconRadioBtnGrp');
    var rate_value;
    for(var i = 0; i < rates.length; i++){
        if(rates[i].checked){
            rate_value = rates[i].value;
        }
    }
    if(chatbotIcon != rate_value){
        jQuery("#chatbotIconImage").addClass("customize_tab_value_changed");
    }
    var image_url=wp_path+"images/chatbot-icons/"+rate_value;
    jQuery("#chatbotIconImage").attr("src",image_url);
    jQuery("#chatbotIconImage").attr("name",rate_value);
    jQuery("#chatbotIconImg").attr("src",image_url);
    jQuery("#chatbotIconImg").attr("name",rate_value);
    // jQuery('#chooseIconModal').modal('hide');
    jQuery(".clickableChatBotIcon").attr("src",image_url);
    jQuery("#syraIconWithInChatBot").attr("src",image_url);
    jQuery(".SyraChatBotIcon").attr("src",image_url);
    syraIconWithInChatBotLightBase=image_url;
}

function fetchradioButtonDataForUser(userIcon){
    var rates = document.getElementsByName('userIconRadioBtnGrp');
    var rate_value;
    for(var i = 0; i < rates.length; i++){
        if(rates[i].checked){
            rate_value = rates[i].value;
        }
    }
    if(userIcon != rate_value){
        jQuery("#userIconImage").addClass("customize_tab_value_changed");
    }
    var image_url=wp_path+"images/user-icon/"+rate_value;
    // alert(rate_value);
    jQuery("#userIconImage").attr("src",image_url);
    jQuery("#userIconImage").attr("name",rate_value);
    jQuery("#storeVisitorIconImg").attr("src",image_url);
    jQuery("#storeVisitorIconImg").attr("name",rate_value);
    // jQuery('#chooseIconModalForUser').modal('hide');
    jQuery(".userIconImg").attr("src",image_url);
    userIcon = image_url;
    /*jQuery('#chooseIconModal').modal('hide');
    jQuery(".clickableChatBotIcon").attr("src",image_url);
    jQuery("#syraIconWithInChatBot").attr("src",image_url);
    jQuery(".userIconImg").attr("src",image_url);
    syraIconWithInChatBotLightBase=image_url;*/
}

function txtBckColorOnChange(){
    var color=jQuery('#txt_bckcol').val();
    chatBotHeadingColorChange(color);            
}

 function chatBotHeadingColorChange(changedcolor)
{
    botColor = changedcolor;
    dbotColor = ColorLuminance(botColor, -0.3);
    getbase(botColor);
    getdeeperbase(dbotColor);
    jQuery('#botHeader').css("background-color", botColor);
    jQuery('#a_thumbsup').css("background-color", dbotColor);
    jQuery('#a_thumbsdown').css("background-color", dbotColor);
    jQuery('#a_mail').css("background-color", dbotColor);

    jQuery('#sendBtn').css("background", "url(" + btnimg + ") no-repeat center center #" + botColor);
    jQuery('#sendBtn').css("background-size", "34px auto");

    jQuery('#X_img').attr("src", crossimg);
    jQuery('#mail').attr("src", mailimg);
    jQuery('#thumbsup').attr("src", thumbsupimg);
    jQuery('#thumbsdown').attr("src", thumbsdownimg);           
    jQuery('#botName').css("color", textcol);
    jQuery('#description').css("color", textcol);

}

function widgetBackgroundColorOnChange(){
    var color=jQuery('#widgetBackgroundColor').val();
    widgetBackgroundColor = color;
    jQuery('.automated_syra').css("background",widgetBackgroundColor);
    jQuery('.chatBotIconBorder').css("border",widgetBackgroundColor + ' 6px solid');
    jQuery('#syraChatDiv_syra').css("background",widgetBackgroundColor);
}

function leadOnBtnBackgroundColorOnChange(){
    var color=jQuery('#leadOnBtnBackgroundColor').val();
    leadOnBtnBackgroundColor = color;

    jQuery('.leadOn').css("background",leadOnBtnBackgroundColor);
}

function botResponseBackgroundColorOnChange(){

    var color=jQuery('#botResponseBackgroundColor').val();
    botResponseBackgroundColor = color;

    jQuery('.incom_mess_text_syra').css("background",botResponseBackgroundColor);

}

function userQuestionBackgroundColorOnChange(){
    var color=jQuery('#userQuestionBackgroundColor').val();
    userQuestionBackgroundColor = color;

    jQuery('.out_mess_text_syra').css("background",userQuestionBackgroundColor);
}

function botBadgeTextBackgroundColorOnChange(){
    var color=jQuery('#badgeTextBackgroundColor').val();
    botBadgeTextBackgroundColor = color;

    jQuery('.badge_taxbot_syra').css("background",botBadgeTextBackgroundColor);
}

function resetColorsIconText(){
    jQuery('#txt_bckcol').val("#8d3052");
    txtBckColorOnChange();

    jQuery('#widgetBackgroundColor').val("#FBF9F9");
    widgetBackgroundColorOnChange();

    jQuery('#botResponseBackgroundColor').val("#f8d3e3");
    botResponseBackgroundColorOnChange();

    jQuery('#userQuestionBackgroundColor').val("#f9f2d8");
    userQuestionBackgroundColorOnChange();

    jQuery('#leadOnBtnBackgroundColor').val("#442262");
    leadOnBtnBackgroundColorOnChange();

    jQuery("#badgeTextBackgroundColor").val("#F6B20E");
    botBadgeTextBackgroundColorOnChange();

    jQuery('#chatbotCounter').html("");
    jQuery('#headerTxtCount').html("");
    jQuery('#welcomeMsgTxtCount').html("");
    jQuery('#counter').html("");
    /*Start of Icon Change*/
    jQuery("#icon-14").attr("checked",true);
    var image_url="images/chatbot-icons/icon-14.png";
    jQuery("#chatbotIconImage").attr("name","icon-14.png");
    jQuery("#chatbotIconImage").attr("src",image_url);
    jQuery("#chatbotIconImg").attr("src",image_url);
    jQuery("#chatbotIconImg").attr("name","icon-14.png");
    jQuery(".clickableChatBotIcon").attr("src",image_url);
    jQuery("#syraIconWithInChatBot").attr("src",image_url);
    jQuery(".SyraChatBotIcon").attr("src",image_url);
    syraIconWithInChatBotLightBase=image_url;

    jQuery("#u-icon").attr("checked",true);
    var user_icon_url = 'images/user-icon/u-icon.png';
    jQuery("#userIconImage").attr("name","u-icon.png");
    // jQuery("#userIconImage").html("u-icon.png");
    jQuery("#storeVisitorIconImg").attr("src",user_icon_url);
    jQuery("#storeVisitorIconImg").attr("name","u-icon.png");
    jQuery("#userIconImage").attr("src",image_url);
    jQuery(".userIconImg").attr("src",image_url);
    userIcon = user_icon_url;
   /*End of Icon Change*/

   if (document.cookie.match(new RegExp('(^| )shopify_store_name=([^;]+)')) != null) {
    setDefaultText();
   }
}

function setDefaultText(){
    var deafultChatbotName = shopify_store_name.split('.myshopify.com')[0];
    if(deafultChatbotName.length > 12){
        deafultChatbotName = deafultChatbotName.slice(0, 11);
    }
    deafultChatbotName = deafultChatbotName + '\'s AI Chatbot';
    jQuery("#txt_name").val(deafultChatbotName);
    jQuery("#txt_description").val("Add some text here to describe your Shopify store.");
    jQuery("#txt_wmsg").val("Add a warm greeting to welcome your store visitors.");
    jQuery("#txt_preview").val("Add a preview message to catch your store visitor’s eyes!");

    jQuery("#botName").html(deafultChatbotName);
    jQuery("#description").html("Add some text here to describe your Shopify store.");
    jQuery("#welcomeMsg").html("Add a warm greeting to welcome your store visitors.");
    jQuery("#badge_text").html("Add a preview message to catch your store visitor’s eyes!");
}

function changedemoBotQuestion1(){
        var question1=jQuery('#txt_ques1').val();
        var displayValueOfQuestion1=jQuery('#txt_display_value1').val();
        if(question1 != previous_txt_ques1_Value) {
            previous_txt_ques1_Value = question1;
            jQuery("#txt_ques1").addClass("opening_question_value_changed");
        }
        if(displayValueOfQuestion1 != previous_txt_display_value1_Value){
            previous_txt_display_value1_Value = displayValueOfQuestion1;
            jQuery("#txt_display_value1").addClass("opening_question_value_changed");
        }
        if (question1.trim() !== "" && displayValueOfQuestion1.trim() !== "") 
        {
            jQuery('#questionNo1').html(displayValueOfQuestion1);
            jQuery('#questionNo1').attr("name",question1);
        }
        else if (question1.trim() !== "" && displayValueOfQuestion1.trim() === "") 
        {
            jQuery('#questionNo1').html(question1);
            jQuery('#questionNo1').attr("name", question1);
        }

}

function changedemoBotAnswerUrl1(){
    var answerValue1 = jQuery("#txt_answer_value1").val();
    if(answerValue1 != previous_txt_answer_value1_Value){
        previous_txt_answer_value1_Value = answerValue1;
        jQuery("#txt_answer_value1").addClass("opening_question_value_changed");
        // if(isUrlValid(answerValue1) == false){
        //     jQuery("#answerUrl_1_Validation").show();
        // }
        // else{
        //     jQuery("#answerUrl_1_Validation").hide();
        // }
    }
}

function changedemoBotAnswerUrl2(){
    var answerValue1 = jQuery("#txt_answer_value2").val();
    if(answerValue1 != previous_txt_answer_value1_Value){
        previous_txt_answer_value1_Value = answerValue1;
        jQuery("#txt_answer_value2").addClass("opening_question_value_changed");
        // if(isUrlValid(answerValue1) == false){
        //     jQuery("#answerUrl_2_Validation").show();
        // }
        // else{
        //     jQuery("#answerUrl_2_Validation").hide();
        // }
    }
}

function changedemoBotAnswerUrl3(){
    var answerValue3 = jQuery("#txt_answer_value3").val();
    if(answerValue3 != previous_txt_answer_value3_Value){
        previous_txt_answer_value3_Value = answerValue3;
        jQuery("#txt_answer_value3").addClass("opening_question_value_changed");
        // if(isUrlValid(answerValue3) == false){
        //     jQuery("#answerUrl_3_Validation").show();
        // }
        // else{
        //     jQuery("#answerUrl_3_Validation").hide();
        // }
    }
}

function changedemoBotAnswerUrl4(){
    var answerValue4 = jQuery("#txt_answer_value4").val();
    if(answerValue4 != previous_txt_answer_value4_Value){
        previous_txt_answer_value4_Value = answerValue4;
        jQuery("#txt_answer_value4").addClass("opening_question_value_changed");
        // if(isUrlValid(answerValue4) == false){
        //     jQuery("#answerUrl_4_Validation").show();
        // }
        // else{
        //     jQuery("#answerUrl_4_Validation").hide();
        // }
    }
}

function changedemoBotAnswerUrl5(){
    var answerValue5 = jQuery("#txt_answer_value5").val();
    if(answerValue5 != previous_txt_answer_value5_Value){
        previous_txt_answer_value5_Value = answerValue5;
        jQuery("#txt_answer_value5").addClass("opening_question_value_changed");
        // if(isUrlValid(answerValue5) == false){
        //     jQuery("#answerUrl_5_Validation").show();
        // }
        // else{
        //     jQuery("#answerUrl_5_Validation").hide();
        // }
    }
}

function changedemoBotQuestion2(){

        var question1=jQuery('#txt_ques2').val();
        var displayValueOfQuestion1=jQuery('#txt_display_value2').val();
        if(question1 != previous_txt_ques2_Value) {
            previous_txt_ques2_Value = question1;
            jQuery("#txt_ques2").addClass("opening_question_value_changed");
        }
        if(displayValueOfQuestion1 != previous_txt_display_value2_Value){
            previous_txt_display_value2_Value = displayValueOfQuestion1;
            jQuery("#txt_display_value2").addClass("opening_question_value_changed");
        }
        
        if (question1.trim() !== "" && displayValueOfQuestion1.trim() !== "") 
        {
            jQuery('#questionNo2').html(displayValueOfQuestion1);
            jQuery('#questionNo2').attr("name",question1);
        }
        else if (question1.trim() !== "" && displayValueOfQuestion1.trim() === "") 
        {
            jQuery('#questionNo2').html(question1);
            jQuery('#questionNo2').attr("name", question1);
        }

}

function changedemoBotQuestion3(){

        var question1=jQuery('#txt_ques3').val();
        var displayValueOfQuestion1=jQuery('#txt_display_value3').val();
        if(question1 != previous_txt_ques3_Value) {
            previous_txt_ques3_Value = question1;
            jQuery("#txt_ques3").addClass("opening_question_value_changed");
        }
        if(displayValueOfQuestion1 != previous_txt_display_value3_Value){
            previous_txt_display_value3_Value = displayValueOfQuestion1;
            jQuery("#txt_display_value3").addClass("opening_question_value_changed");
        }
        
        if (question1.trim() !== "" && displayValueOfQuestion1.trim() !== "") 
        {
            jQuery('#questionNo3').html(displayValueOfQuestion1);
            jQuery('#questionNo3').attr("name",question1);
        }
        else if (question1.trim() !== "" && displayValueOfQuestion1.trim() === "") 
        {
            jQuery('#questionNo3').html(question1);
            jQuery('#questionNo3').attr("name", question1);
        }

}

function changedemoBotQuestion4(){

        var question1=jQuery('#txt_ques4').val();
        var displayValueOfQuestion1=jQuery('#txt_display_value4').val();
        if(question1 != previous_txt_ques4_Value) {
            previous_txt_ques4_Value = question1;
            jQuery("#txt_ques4").addClass("opening_question_value_changed");
        }
        if(displayValueOfQuestion1 != previous_txt_display_value4_Value){
            previous_txt_display_value4_Value = displayValueOfQuestion1;
            jQuery("#txt_display_value4").addClass("opening_question_value_changed");
        }
        
        if (question1.trim() !== "" && displayValueOfQuestion1.trim() !== "") 
        {
            jQuery('#questionNo4').html(displayValueOfQuestion1);
            jQuery('#questionNo4').attr("name",question1);
        }
        else if (question1.trim() !== "" && displayValueOfQuestion1.trim() === "") 
        {
            jQuery('#questionNo4').html(question1);
            jQuery('#questionNo4').attr("name", question1);
        }

}

function changedemoBotQuestion5(){

        var question1=jQuery('#txt_ques5').val();
        var displayValueOfQuestion1=jQuery('#txt_display_value5').val();
        if(question1 != previous_txt_ques5_Value) {
            previous_txt_ques5_Value = question1;
            jQuery("#txt_ques5").addClass("opening_question_value_changed");
        }
        if(displayValueOfQuestion1 != previous_txt_display_value5_Value){
            previous_txt_display_value5_Value = displayValueOfQuestion1;
            jQuery("#txt_display_value5").addClass("opening_question_value_changed");
        }
        if (question1.trim() !== "" && displayValueOfQuestion1.trim() !== "") 
        {
            jQuery('#questionNo5').html(displayValueOfQuestion1);
            jQuery('#questionNo5').attr("name",question1);
        }
        else if (question1.trim() !== "" && displayValueOfQuestion1.trim() === "") 
        {
            jQuery('#questionNo5').html(question1);
            jQuery('#questionNo5').attr("name", question1);
        }

}

function deleteOpeningQuestion(questionId){
    var form = new FormData();
    form.append("questionId", questionId);
    form.append("customerId", email);
    form.append("botDeployementId", botDeploymentId);

    var settings = {
        "url":  url_resource + "/syraconsumer/delete-opening-question",
        "method": "POST",
        "timeout": 0,
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": form
    };

    jQuery.ajax(settings).done(function (response) {
        var jsonResponse = JSON.parse(response);
        if(jsonResponse["status"] == 200){
            swalWithBootstrapButtons.fire("","Opening question is deleteted successfully.","success");
            location.reload(true);
        }
    })
    .fail(function(response){
        swalWithBootstrapButtons.fire("","Internal error occured.","error");
    })
}


function changeBotName(){ 
    jQuery('#botName').html(jQuery('#txt_name').val());
    var textArea = jQuery('#txt_name').val().length;
    var charactersLeft = 25 - textArea;
    var count = document.getElementById('chatbotCounter');
    count.innerHTML = "Characters left: " + charactersLeft;

}

function countSubscribeText(){ 
    var textArea = jQuery('#txt_subscription_btn').val().length;
    var charactersLeft = 25 - textArea;
    var count = document.getElementById('subscriptionCounter');
    count.innerHTML = "Characters left: " + charactersLeft;

}

function countPromotionText(){ 
    var textArea = jQuery('#txt_promotion_btn').val().length;
    var charactersLeft = 25 - textArea;
    var count = document.getElementById('promotionCounter');
    count.innerHTML = "Characters left: " + charactersLeft;

}

function countOrderText(){ 
    var textArea = jQuery('#txt_order_btn').val().length;
    var charactersLeft = 25 - textArea;
    var count = document.getElementById('orderCounter');
    count.innerHTML = "Characters left: " + charactersLeft;

}

function changeBotDescription(){  
    var textArea = jQuery('#txt_description').val().length;
    var charactersLeft = 55 - textArea;
    var count = document.getElementById('headerTxtCount');
    count.innerHTML = "Characters left: " + charactersLeft;
    jQuery('#description').html(jQuery('#txt_description').val());
}

function changeBotWelcomeMsg(){  
    var textArea = jQuery('#txt_wmsg').val().length;
    var charactersLeft = 55 - textArea;
    var count = document.getElementById('welcomeMsgTxtCount');
    count.innerHTML = "Characters left: " + charactersLeft;
    jQuery('#welcomeMsg').html(jQuery('#txt_wmsg').val());
}

function changeBotPreviewMsg(el){  
    jQuery('#badge_text').html(jQuery('#txt_preview').val());
    var currentValue = jQuery('#txt_preview').val();
    if(currentValue != previous_badge_text) {
        previous_badge_text = currentValue;
        jQuery('#txt_preview').addClass("customize_tab_value_changed");
    }
    var textArea = el.value.length;
    var charactersLeft = 80 - textArea;
    var count = document.getElementById('counter');
    count.innerHTML = "Characters left: " + charactersLeft;
}

function ChangeContactUrl(){

    jQuery("#a_mail").attr("href",jQuery("#contactURL").val());
}
 /* End of Demo Syra ChatBot Onchange Code */

/* end of botdeployment.html */

function retriveKnowledgeBase(){
    var form = new FormData();
    form.append("botdeploymentId", botDeploymentId);
    var settings = {
        "async": true,
        "url": url_resource + "/syraconsumer/retrive-knowledge-base",
        "method": "POST",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form,
        headers: {
            'Authorization': 'Bearer '+access_token,
        }
    }

    jQuery.ajax(settings).done(function (response) 
    {
        response = JSON.parse(response);
        if(response.status===200)
        {
            var tablerow = '';
            if(response.data.length > 0){
                jQuery('#plantableForKB').show();
            }
            else if(response.data.length < 0){
                jQuery('#plantableForKB').hide();
            }
            for(var item = 0; item < response.data.length; item ++){
                if(response.data[item].recursive == "y"){
                    tablerow = tablerow + '<tr><td>' + response.data[item].url + '</td><td><div class="checkbox"><label><input type="checkbox" style="-webkit-appearance: checkbox !important; /*Safari/Chrome*/ -moz-appearance: checkbox !important; /*Firefox*/ -ms-appearance: checkbox !important; /*IE*/ -o-appearance: checkbox !important; /*Opera*/ appearance: checkbox !important;" value="checked" checked>&nbsp;Recursive</label></div></td><td>' + response.data[item].createdDate + '</td><td><button class="btn btn-default userActivityLog" name="editKnowledgeBase" onclick="editModal(\'' + response.data[item].url + '\',\'' + response.data[item].recursive + '\',\'' + response.data[item].id + '\')")>Edit</button></td><td><button class="btn userActivityLog" name="deleteKnowledgeBase" style="background-color:#543244; color: white" onclick="deleteModal(\'' + response.data[item].id + '\')">Delete</button></td></tr>';
                }
                else{
                    tablerow = tablerow + '<tr><td>' + response.data[item].url + '</td><td><div class="checkbox"><label><input type="checkbox" style="-webkit-appearance: checkbox !important; /*Safari/Chrome*/ -moz-appearance: checkbox !important; /*Firefox*/ -ms-appearance: checkbox !important; /*IE*/ -o-appearance: checkbox !important; /*Opera*/ appearance: checkbox !important;" value="checked">&nbsp;Recursive</label></div></td><td>' + response.data[item].createdDate + '</td><td><button class="btn btn-default userActivityLog" name="editKnowledgeBase" onclick="editModal(\'' + response.data[item].url + '\',\'' + response.data[item].recursive + '\',\'' + response.data[item].id + '\')")>Edit</button></td><td><button class="btn userActivityLog" name="deleteKnowledgeBase" style="background-color:#543244; color: white" onclick="deleteModal(\'' + response.data[item].id + '\')">Delete</button></td></tr>';
                }                        
            }
            jQuery('#tablebodyForKB').html(tablerow);
        }
        else
        {
            // swal
            // ({
            //     title: "Error!",
            //     text: 'retrive-knowledge-base Response Error!!',
            //     icon: "error",
            //     button: "OK",
            // });
        }
    })
    .fail(function(response) 
    {           

        swal
        ({
            title: "API Error!",
            text: 'retrive-knowledge-base'+' -> '+response.status+' -> '+response.statusText,
            icon: "error",
            button: "OK",
        });


    });
}

function retriveKnowledgeBank(){
    var form = new FormData();
    form.append("botdeploymentId", botDeploymentId);
    var settings = {
        "async": true,
        "url": url_resource + "/syraconsumer/knowledge-bank-fetch",
        "method": "POST",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form,
        headers: {
            'Authorization': 'Bearer '+access_token,
        }
    }

    jQuery.ajax(settings).done(function (response) 
    {
        response = JSON.parse(response);

        if(response.status===200)
        {
            var tablerow = '';
            if( response.data.length > 0){
                jQuery("#kbankView").show();
            }
            else{
                jQuery("#kbankView").hide();
            }
            for(var item = 0; item < response.data.length; item ++){
                tablerow = tablerow + '<tr><td>' + response.data[item].question + '</td><td>' + response.data[item].answer + '</td><td>' + response.data[item].createdDate + '</td><td><button class="btn btn-default userActivityLog" name="editBank" onclick="editKBankModal(\'' + response.data[item].question + '\',\'' + response.data[item].answer + '\',\'' + response.data[item].id + '\')")>Edit</button></td><td><button class="btn userActivityLog" name="deleteBank" style="background-color:#543244; color: white" onclick="deleteKBankModal(\'' + response.data[item].id + '\')">Delete</button></td></tr>';                   
            }
            jQuery('#tablebodyForKBank').html(tablerow);
        }
        else
        {
            // swal
            // ({
            //     title: "Error!",
            //     text: 'retrive-knowledge-base Response Error!!',
            //     icon: "error",
            //     button: "OK",
            // });
        }





    })
    .fail(function(response) 
    {           

        swal
        ({
            title: "API Error!",
            text: 'retrive-knowledge-base'+' -> '+response.status+' -> '+response.statusText,
            icon: "error",
            button: "OK",
        });


    });
}

function deleteKnowledgeBaseURL() {
    var id = jQuery('#deleteKnowledgeBaseURLId').val();

    var form = new FormData();
    form.append("id", id);

    var settings = 
    {
        "async": true,
        "url": url_resource + "/syraconsumer/delete-knowledge-base",
        "method": "POST",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form,
        headers: {
            'Authorization': 'Bearer '+access_token,
        }
    }
    jQuery.ajax(settings).done(function (response) {               
        response = JSON.parse(response);
        if (response.status === 200) 
        {

            retriveKnowledgeBase();
            swalWithBootstrapButtons.fire
            ({
                text: "Training URL is deleted successfully",
                icon: "success",
                button: "OK",
            });
            createWizardForTraining();
        }                        
        else
        {
            swal
            ({
                title: "Error!",
                text: response.message,
                icon: "error",
                button: "OK",
            });
        }
    })
    .fail(function(response) 
    {                          
        swal
        ({
            title: "API Error!",
            text: 'delete-knowledge-base'+' -> '+response.status+' -> '+response.statusText,
            icon: "error",
            button: "OK",
        });
    });
}

function deleteKnowledgeBank() {
    var id = jQuery('#deleteKnowledgeBankId').val();

    var form = new FormData();
    form.append("id", id);

    var settings = 
    {
        "async": true,
        "url": url_resource + "/syraconsumer/knowledge-bank-delete",
        "method": "POST",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form,
        headers: {
            'Authorization': 'Bearer '+access_token,
        }
    }
    jQuery.ajax(settings).done(function (response) {               
        response = JSON.parse(response);
        if (response.status === 200) 
        {
            retriveKnowledgeBank();
            swalWithBootstrapButtons.fire
            ({
                text: "Training Question is deleted successfully.",
                icon: "success",
                button: "OK",
            });
            createWizardForTraining();
        }                        
        else
        {
            swalWithBootstrapButtons.fire
            ({
                text: response.message,
                icon: "error",
                button: "OK",
            });
        }
    })
    .fail(function(response) 
    {                          
        swal
        ({
            title: "API Error!",
            text: 'knowledge-bank-delete'+' -> '+response.status+' -> '+response.statusText,
            icon: "error",
            button: "OK",
        });
    });
}

function updateKBank() {
    var kbQuestion = jQuery("#editKnowledgeBankQuestion").val();
    var kbAnswer = jQuery("#editKnowledgeBankAnswer").val();
    if(kbQuestion=="" || kbQuestion==undefined || kbQuestion==null)
    {
           swalWithBootstrapButtons.fire( "Error!", 'Question is not valid !!', "error");
        return;
    }
    if(kbAnswer=="" || kbAnswer==undefined || kbAnswer==null)
    {
           swalWithBootstrapButtons.fire("Error!", 'Answer is not valid !!',"error");
        return;
    }

    var id = jQuery('#editKnowledgeBankId').val();
    var form = new FormData();
    form.append("botdeploymentId", botDeploymentId);
    form.append("question", kbQuestion);
    form.append("answer", kbAnswer);
    form.append("id", id);

    var settings =
    {
        "async": true,
        "url": url_resource + "/syraconsumer/knowledge-bank-update",
        "method": "POST",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form,
        headers: {
            'Authorization': 'Bearer '+access_token,
        }
    }
    jQuery.ajax(settings).done(function (response) 
    {
        response = JSON.parse(response);
        if (response.status === 200) 
        {
            retriveKnowledgeBank();
            swalWithBootstrapButtons.fire("","Training Question is Updated!", "success");
            createWizardForTraining();
        }
        else 
        {
            swalWithBootstrapButtons.fire("",response.message, "error");
        }
    })
    .fail(function (response)
    {
        swalWithBootstrapButtons.fire("API Error!",'knowledge-base-update' + ' -> ' + response.status + ' -> ' + response.statusText, "error");
    });
}

function editKBankModal(question,answer,id)
{
    jQuery('#editKnowledgeBankQuestion').val(question);
    jQuery('#editKnowledgeBankAnswer').val(answer);
    jQuery('#editKnowledgeBankId').val(id);
    jQuery('#editKBankModal').modal("toggle");
}

function editKnowledgeBaseModal(url,recursive,id)
{
    jQuery('#editKnowledgeBaseURLUrl').val(url);
    if(recursive==="n")
    {
        jQuery('input:checkbox[id=editKnowledgeBaseURLrecursiveBox]').attr('checked',false);
    }
    else
    {
        jQuery('input:checkbox[id=editKnowledgeBaseURLrecursiveBox]').attr('checked',true);
    }
    jQuery('#editKnowledgeBaseURLId').val(id);
    jQuery('#editModal').modal("toggle");
}



/* end of editbotdeployment.html */

/* used only on training.html page */

function deleteUserFeedbackModal(){
    var form = new FormData();
    form.append("customerId", email);

    var settings = 
    {
        "async": true,
        "url": url_resource + "/syraconsumer/delete-user-feedback",
        "method": "POST",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form,
        headers: {
            'Authorization': 'Bearer '+access_token,
        }
    }
    jQuery.ajax(settings).done(function (response) {               
        response = JSON.parse(response);
        if (response.status === 200) 
        {
            retriveKnowledgeBase();
            swalWithBootstrapButtons.fire('Deleted!',response.message, "success");
            // swalWithBootstrapButtons.fire
            // ({
            //     title: "Deleted!",
            //     text: response.message,
            //     icon: "success",
            //     button: "OK",
            // });
            fetchFeedback();
        }                        
        else
        {
            swal
            ({
                title: "Error!",
                text: response.message,
                icon: "error",
                button: "OK",
            });
        }
    })
    .fail(function(response) 
    {                          
        swal
        ({
            title: "API Error!",
            text: 'delete-user-feedback'+' -> '+response.status+' -> '+response.statusText,
            icon: "error",
            button: "OK",
        });
    });
}

function editUserFeedbackModal(){
    jQuery('#feedbackFormInput').prop('disabled', false);
    jQuery('#feedbackFormButton').prop('disabled', false);
}

function submitGenericFeedback(){

    var feedback = jQuery('#feedbackFormInput').val();
    var form = new FormData();
    form.append("customerId", customerId);
    form.append("feedback", feedback);

    var settings = 
    {
        "async": true,
        "url": url_resource + "/syraconsumer/create-user-feedback",
        "method": "POST", 
        headers: {
            'Authorization': 'Bearer '+ access_token,
        },           
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
    }            
    jQuery.ajax(settings).done(function (response) 
    {              
        response = JSON.parse(response);
        if(response.status == 200){
            swalWithBootstrapButtons.fire('','Feedback is submitted successfully!',"success");
            jQuery("#knowledgeBaseDialog").show();
            // swalWithBootstrapButtons.fire
            // ({
            //     title: "Success!",
            //     text: 'Feedback Submitted successfully',
            //     icon: "success",
            //     button: "OK",
            // });
            fetchFeedback();
        }
    })
    .fail(function (response){
        swalWithBootstrapButtons.fire
        ({
            text: 'create-user-feedback'+' -> '+response.status+' -> '+response.statusText,
            icon: "error",
            button: "OK",
        });
    });
}

function fetchFeedback(){
    var form = new FormData();
    form.append("customerId", email);

    var settings = 
    {
        "async": true,
        "url": url_resource + "/syraconsumer/fetch-user-feedback",
        "method": "POST", 
        headers: {
            'Authorization': 'Bearer '+ access_token,
        },           
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
    }            
    jQuery.ajax(settings).done(function (response) 
    {             
        innerResponse = JSON.parse(response);
        if(innerResponse.status != 404){
            if (innerResponse.length > 0 && innerResponse[0].status == 200){
                jQuery('#feedbackFormInput').prop('disabled', true);
                jQuery('#feedbackFormButton').prop('disabled', true);
                jQuery('#feedbackTable').show();
                var tablerow = '';
                for(var item = 0; item < innerResponse.length; item ++){
                    tablerow = tablerow + '<tr><td>' + innerResponse[0].feedback + '</td><td>' + innerResponse[0].createdDate + '</td><td><button class="btn btn-default userActivityLog" name="editUserFeedback" onclick="editUserFeedbackModal()")>Edit</button></td><td><button class="btn userActivityLog" name="deleteUserFeedback" style="background-color:#543244; color: white" onclick="deleteUserFeedbackModal()">Delete</button></td></tr>';
                }
                jQuery('#feedbackTableBody').html(tablerow);
            }
        }
        else{
            jQuery('#feedbackTableBody').html("");
            jQuery("#feedbackFormInput").val("");
            jQuery('#feedbackFormButton').prop('disabled', false);
            jQuery('#feedbackFormInput').prop('disabled', false);
        }
    })
    .fail(function (response){
        swalWithBootstrapButtons.fire
        ({
            text: 'fetch-user-feedback'+' -> '+response.status+' -> '+response.statusText,
            icon: "error",
            button: "OK",
        });
    });
}

function createKnowledgeBase(){            
    var webURL=jQuery("#webURL").val();
    if(webURL=="" || webURL==undefined || webURL==null)
    {
           swalWithBootstrapButtons.fire
            ({
                text: 'Website URL is not valid !!',
                icon: "error",
                button: "OK",
            });
        return;
    }
    if(!isUrlValid(jQuery('#webURL').val()))
    {
            swalWithBootstrapButtons.fire
            ({
                text: 'Website URL is not valid. Please enter a valid URL!',
                icon: "error",
                button: "OK",
            });
         return;
    }


    var recursive = "n";
    if (jQuery('#recursiveBox').is(":checked")){
        recursive = "y";
    }

    jQuery("#createKnowledgeBaseMsgArea").html("");
    jQuery("#createKnowledgeBaseMsgArea").html('<img src="'+wp_path+'"images/syra-spinner.gif" height="35" style="margin-left:45%;"/>');

    var form = new FormData();
    form.append("botdeploymentId", botDeploymentId);
    form.append("recursive", recursive);
    form.append("url", jQuery("#webURL").val());

    var settings = {
        "async": true,
        "url": url_resource + "/syraconsumer/create-knowledge-base",
        "method": "POST",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form,
        headers: {
            'Authorization': 'Bearer '+access_token,
        }
    }
    jQuery.ajax(settings).done(function (response) 
    {                
        response=JSON.parse(response);
        if(response.status===200)
        {
            var innerform = new FormData();
            innerform.append("customerId", email);
            innerform.append("step", "3c");
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
                jQuery("#createKnowledgeBaseMsgArea").html("<b><font style='color:#5A679E'>Training URLs Successfully Added!!</font></b>");
                retriveKnowledgeBase();
                jQuery('#webURL').val('');
                swalWithBootstrapButtons.fire
                ({
                    text: 'Training URLs Successfully Added!!',
                    icon: "success",
                    button: "OK",
                });
            })
            .fail(function(innerresponse) 
            {           

                swalWithBootstrapButtons.fire({
                    text: 'create-wizard-track'+' -> '+innerresponse.status+' -> '+innerresponse.statusText,
                    icon: "error",
                    button: "OK"
                });

            });
        }
        else
        {
            // swal
            // ({
            //     title: "API Error!",
            //     text: 'create-knowledge-base Response Error!!!!',
            //     icon: "error",
            //     button: "OK",
            // });
        }
    })
    .fail(function(response) 
    {           

        swalWithBootstrapButtons.fire
        ({
            text: 'create-knowledge-base'+' -> '+response.status+' -> '+response.statusText,
            icon: "error",
            button: "OK",
        });
    });
}

function createKnowledgeBank(){
    jQuery("#addTrainingQuesMsgArea").html("");
    jQuery("#addTrainingQuesMsgArea").html('<img src="'+wp_path+'"images/syra-spinner.gif" height="35" style="margin-left:45%;"/>');
    var kbQuestion = jQuery("#kbQuestion").val();
    var kbAnswer = jQuery("#kbAnswer").val();
    if(kbQuestion == "" || kbQuestion == undefined || kbQuestion == null)
    {
        jQuery("#addTrainingQuesMsgArea").html("");
           swal
            ({
                title: "Error!",
                text: 'Question is not valid !!',
                icon: "error",
                button: "OK",
            });
        return;
    }
    if(kbQuestion.length < 2)
    {
        jQuery("#addTrainingQuesMsgArea").html("");
            swal
            ({
                title: "Error!",
                text: 'Please enter a valid Question!',
                icon: "error",
                button: "OK",
            });
         return;
    }

    if(kbAnswer.length <= 0)
    {
        jQuery("#addTrainingQuesMsgArea").html("");
            swal
            ({
                title: "Error!",
                text: 'Please enter a valid Answer!',
                icon: "error",
                button: "OK",
            });
         return;
    }

    var form = new FormData();
    form.append("botdeploymentId", botDeploymentId);
    form.append("question", kbQuestion);
    form.append("answer", kbAnswer);

    var settings = {
        "async": true,
        "url": url_resource + "/syraconsumer/knowledge-bank-create",
        "method": "POST",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form,
        headers: {
            'Authorization': 'Bearer '+access_token,
        }
    }
    jQuery.ajax(settings).done(function (response) 
    {                
        response=JSON.parse(response);
        if(response.status===200)
        {
            var innerform = new FormData();
            innerform.append("customerId", email);
            innerform.append("step", "3b");
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
                jQuery("#addTrainingQuesMsgArea").html("<b><font style='color:#5A679E'>Training Questions Successfully Added</font></b>");
                retriveKnowledgeBank();
                jQuery('#kbQuestion').val('');
                jQuery('#kbAnswer').val('');
                swal
                ({
                    title: "Created!",
                    text: 'Training Questions Successfully Added!!',
                    icon: "success",
                    button: "OK",
                });
            })
            .fail(function(innerresponse) 
            {           

                swal({
                    title: "API Error!",
                    text: 'create-wizard-track'+' -> '+innerresponse.status+' -> '+innerresponse.statusText,
                    icon: "error",
                    button: "OK",
                });

            });   
        }
        else
        {
            // swal
            // ({
            //     title: "API Error!",
            //     text: 'create-knowledge-bank Response Error!!!!',
            //     icon: "error",
            //     button: "OK",
            // });
        }
    })
    .fail(function(response) 
    {           

        swal
        ({
            title: "API Error!",
            text: 'create-knowledge-base'+' -> '+response.status+' -> '+response.statusText,
            icon: "error",
            button: "OK",
        });
    });
}

var feedBackLogData = [];
function fetchFeedbackLog(){
    var form = new FormData();
    form.append("botdeploymentId", botDeploymentId);

    var settings = 
    {
        "async": true,
        "url": url_resource + "/syraconsumer/fetch-feedback-log",
        "method": "POST", 
        headers: {
            'Authorization': 'Bearer '+ access_token,
        },           
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
    }            
    jQuery.ajax(settings).done(function (response) 
    {              
        response = JSON.parse(response);
        if(response.status == 200){
            feedBackLogData = response.data;
        }
    });
}

function pagination(me){  
    if(me.name === "prev")
    {               
        if(selectedPage!=firstPageIndex)
        {
            startPosition -= 20;
            selectedPage=selectedPage-1;
        }
    }
    else if(me.name === "next")
    {
        if(selectedPage!=(lastPageIndex-1))
        {
            startPosition += 20;
            selectedPage=selectedPage+1;//
        }
    }
    else
    {
        startPosition = rowCount * me.name;
        selectedPage=me.name;//
    }            
    getLogs();
}

var rowCountResponseAnalysis = 20;
function paginationResponseAnalytics(me){
    if(me.name === "prev")
    {               
        if(selectedPageResponseAnalytics!=firstPageIndexResponseAnalytics)
        {
            startPositionResponseAnalytics -= 20;
            selectedPageResponseAnalytics = selectedPageResponseAnalytics-1;
        }
    }
    else if(me.name === "next")
    {
        if(selectedPageResponseAnalytics!=(lastPageIndexResponseAnalytics-1))
        {
            startPositionResponseAnalytics += 20;
            selectedPageResponseAnalytics = selectedPageResponseAnalytics + 1;//
        }
    }
    else
    {
        startPositionResponseAnalytics = rowCountResponseAnalysis * me.name;
        selectedPageResponseAnalytics=me.name;//
    }    
    switch(responseAnalysisType){
        case "auto":
            retrieveResponseAnalysisLog();
            break;
        case "time":
            timeFilterResponseAnalysisLog(timeperiodResponse);
            break;
        case "answer":
            answerTypeFilterResponseAnalysisLog(responseAnswerType);
            break;
    }
            
}

function writeFeedback(me,page){
    var id = me.id.split("_");
    jQuery("#pageTypeID").val(page);
    //document.getElementById("pageTypeId").value = page;
    if (jQuery("#pageTypeID").val() == "1"){
        if(id[0] === "like")
        {
            if(jQuery("#"+me.id+"_icon").attr('name') === "inactive")
            {
                jQuery("#"+me.id+"_icon").attr('name', 'active');
                jQuery("#dislike_"+id[1]+"_icon").attr('name', 'inactive');
            }
            else
            {
                jQuery("#"+me.id+"_icon").attr('name', 'inactive');
            }
        }
        else{
            if(jQuery("#"+me.id+"_icon").attr('name') === "inactive")
            {
                jQuery("#feedbackAnswer").val("");

                jQuery("#feedbackLogQuestion").val(jQuery("#rightQues_response_analysis_"+id[3]).html());
                jQuery("#feedbackIpAddress").val(jQuery("#ipAddress_response_analysis_"+id[3]).html());
                jQuery("#feedbackDateTime").val(jQuery("#DateTime_response_analysis_"+id[3]).html());

                jQuery("#feedbackBtnId").val(me.id);
                jQuery("#feedbackDeleteBtn").hide();
                jQuery("#feedbackSubmitBtn").show();
                jQuery("#feedbackUpdateBtn").hide();

                jQuery("#pageTypeID").val(page);

                jQuery('#kt_modal_feedback').modal("toggle");
            }
            else
            {
                jQuery("#feedbackLogQuestion").val(jQuery("#rightQues_response_analysis_"+id[3]).html());
                jQuery("#feedbackIpAddress").val(jQuery("#ipAddress_response_analysis_"+id[3]).html());
                jQuery("#feedbackDateTime").val(jQuery("#DateTime_response_analysis_"+id[3]).html());

                jQuery("#feedbackBtnId").val(me.id);
                jQuery("#feedbackAnswer").val(jQuery("#givenFeedback_response_analysis_"+id[3]).html());
                jQuery("#feedbackDeleteBtn").show();
                jQuery("#feedbackUpdateBtn").show();
                jQuery("#feedbackSubmitBtn").hide();

                jQuery("#pageTypeID").val(page);

            }
        }
    }
    if (jQuery("#pageTypeID").val() == "2"){
        if(id[0] === "like"){

            if(jQuery("#"+me.id+"_icon").attr('name') === "inactive"){
                jQuery("#"+me.id+"_icon").attr('name', 'active');
                jQuery("#"+me.id+"_icon").html("<img src='images/icon_like_green_selected.png' class='userActivityLog' name='like' id='like_" + id[1] + "' onclick='writeFeedback(this)' height='30'>");

                jQuery("#dislike_"+id[1]+"_icon").attr('name', 'inactive');
                jQuery("#dislike_"+id[1]+"_icon").html("<img src='images/icon_unlike_red_unselected.png'class='userActivityLog' name='dislike' id='dislike_" + id[1] + "' onclick='writeFeedback(this)' height='30'>");
            }
            else{
                jQuery("#"+me.id+"_icon").attr('name', 'inactive');
                jQuery("#"+me.id+"_icon").html("<img src='images/icon_like_green_unselected.png' class='userActivityLog' name='like' id='like_" + id[1] + "' onclick='writeFeedback(this)' height='30'>");
            }
            //alert(me.id);
        }
        else{
            if(jQuery("#"+me.id+"_icon").attr('name') === "inactive"){
                jQuery("#feedbackAnswer").val("");
                jQuery("#feedbackLogQuestion").val(jQuery("#logQuestion_"+id[1]).html());
                jQuery("#feedbackIpAddress").val(jQuery("#ipAddress_"+id[1]).html());
                jQuery("#feedbackDateTime").val(jQuery("#DateTime_"+id[1]).html());

                jQuery("#feedbackBtnId").val(me.id);
                jQuery("#feedbackDeleteBtn").hide();
                jQuery("#feedbackSubmitBtn").show();
                jQuery("#feedbackUpdateBtn").hide();

                jQuery("#pageTypeID").val(page);

                jQuery('#kt_modal_feedback').modal("toggle");
            }
            else{
                jQuery("#feedbackLogQuestion").val(jQuery("#logQuestion_"+id[1]).html());
                jQuery("#feedbackIpAddress").val(jQuery("#ipAddress_"+id[1]).html());
                jQuery("#feedbackDateTime").val(jQuery("#DateTime_"+id[1]).html());


                jQuery("#feedbackBtnId").val(me.id);
                jQuery("#feedbackAnswer").val(jQuery("#givenFeedback_"+id[1]).html());
                jQuery("#feedbackDeleteBtn").show();
                jQuery("#feedbackUpdateBtn").show();
                jQuery("#feedbackSubmitBtn").hide();

                jQuery("#pageTypeID").val(page);

                jQuery('#kt_modal_feedback').modal("toggle");

            }
        }
    }
}

function createFeedbackWizard(){
    // var currentDate = new Date();
    // var month = 0;
    // var date = currentDate.getDate();
    // month = currentDate.getMonth() + 1;
    // var hours = currentDate.getHours();
    // var minutes = currentDate.getMinutes();
    // var seconds = currentDate.getSeconds();
    // if(month< 10){
    //     month = '0' + month;
    // }
    // if(hours < 10){
    //     hours = '0' + hours;
    // }
    // if(minutes < 10){
    //     minutes = '0' + minutes;
    // }
    // if(seconds < 10){
    //     seconds = '0' + seconds;
    // }
    // if(date < 10){
    //     date = '0' + date;
    // }
    // var timeStamp = currentDate.getFullYear() + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    // var innerform = new FormData();
    // innerform.append("customerId", email);
    // innerform.append("step", "6");
    // innerform.append("messageSeenStatus", "n");
    // innerform.append("actionStatus", "Update");
    // innerform.append("timeStamp",timeStamp);
    // var innersettings = {
    //     "async": true,
    //     "url": url_resource + "/syraconsumer/create-wizard-track",
    //     "method": "POST",
    //     headers: {
    //         'Authorization': 'Bearer '+access_token,
    //     },
    //     "processData": false,
    //     "contentType": false,
    //     "mimeType": "multipart/form-data",
    //     "data": innerform
    // }
    // jQuery.ajax(innersettings).done(function (innerresponse) {
    //     populateNotificationTable(email, access_token);
    //     window.scrollTo(0,0);
    // })
    // .fail(function(innerresponse) 
    // {        
    //     swalWithBootstrapButtons.fire({
    //         text: 'create-wizard-track'+' -> '+innerresponse.status+' -> '+innerresponse.statusText,
    //         icon: "error",
    //         button: "OK",
    //     });

    // });
    insertNotificationData("6", "Update", email);
}

function submitFeedback(){
    var feedbackAnswer = jQuery("#feedbackAnswer").val();

    var pageName = jQuery("#pageTypeID").val();

    if(feedbackAnswer.trim() == ""){
        jQuery("#feedbackMsg").html("Can not be blank");
        return;
    }

    var form = new FormData();
    var feedbackIpAddress = jQuery("#feedbackIpAddress").val().substring(0,10);
    form.append("botdeploymentId", botDeploymentId);
    form.append("question", jQuery("#feedbackLogQuestion").val());
    form.append("ipAddress", feedbackIpAddress);
    form.append("logDateTime",  jQuery("#feedbackDateTime").val());
    form.append("answer", feedbackAnswer);
    form.append("pageType",pageName);

    var settings = {
        "async": true,
        "url": url_resource + "/syraconsumer/create-feedback-log",
        "method": "POST",
        headers: {
            'Authorization': 'Bearer '+access_token,
        },
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
    }

    jQuery.ajax(settings).done(function (response) {
        response = JSON.parse(response);

        var match = document.cookie.match(new RegExp('(^| )email=([^;]+)'));
        email = match[2];
        match = document.cookie.match(new RegExp('(^| )access_token=([^;]+)'));
        access_token = match[2];

        if(response.status == 200){
            swalWithBootstrapButtons.fire({
                text: "User feedback is submitted successfully.",
                icon: 'success',
                showCancelButton: false,
                confirmButtonText: 'Okay'
                }).then((result) => {
                if (result.value) {
                    jQuery("#knowledgeBaseDialog").modal("toggle");
                }
            });
            // swalWithBootstrapButtons.fire("Feedback Message", "User feedback is submitted successfully", "success");
            // jQuery("#knowledgeBaseDialog").show();
            fetchFeedbackLog();
            // createFeedbackWizard();
            if(jQuery("#pageTypeID").val() == "1"){
                jQuery('#feedBackModal').modal("toggle");
                var id = jQuery("#feedbackBtnId").val().split("_");
                jQuery("#"+jQuery("#feedbackBtnId").val()+"_icon").attr('name', 'active');
                jQuery("#givenFeedback_response_analysis_"+id[3]).html(feedbackAnswer);
                jQuery("#givenFeedback_response_analysis_"+id[3]).attr("name", response.fbLogId);
                //<i class="far fa-thumbs-down"></i>
                jQuery("#"+jQuery("#feedbackBtnId").val()+"_icon").find('i').removeClass('flaticon-like').addClass('far fa-thumbs-down');
            }
            if(jQuery("#pageTypeID").val() == "2"){
                jQuery('#feedBackModal').modal("toggle");
                var id = jQuery("#feedbackBtnId").val().split("_");
                jQuery("#"+jQuery("#feedbackBtnId").val()+"_icon").attr('name', 'active');
                jQuery("#"+jQuery("#feedbackBtnId").val()+"_icon").find('i').removeClass('flaticon-like').addClass('far fa-thumbs-down');
                jQuery("#givenFeedback_"+id[1]).html(feedbackAnswer);
                jQuery("#givenFeedback_"+id[1]).attr("name", response.fbLogId);
            }
        }
    });

}

function deleteFeedback(){
    if(jQuery("#pageTypeID").val() == "1"){
        var id = jQuery("#feedbackBtnId").val().split("_");
        var form = new FormData();
        form.append("id", jQuery("#givenFeedback_response_analysis_"+id[3]).attr('name'));

        var settings = {
            "async": true,
            "url": url_resource + "/syraconsumer/delete-feedback-log",
            "method": "POST",
            headers: {
                'Authorization': 'Bearer '+access_token,
            },
            "processData": false,
            "contentType": false,
            "mimeType": "multipart/form-data",
            "data": form
        }


        jQuery.ajax(settings).done(function (response) {
            swalWithBootstrapButtons.fire("Feedback Message", "User feedback is deleted successfully", "success");
            createFeedbackWizard();
            fetchFeedbackLog();
            jQuery("#feedbackAnswer").val("");
            jQuery('#feedBackModal').modal("toggle");
            jQuery("#"+jQuery("#feedbackBtnId").val()+"_icon").attr('name', 'inactive');
            jQuery("#"+jQuery("#feedbackBtnId").val()+"_icon").find('i').removeClass('far fa-thumbs-down').addClass('flaticon-like');  
        });
    }
    if(jQuery("#pageTypeID").val() == "2"){
        var id = jQuery("#feedbackBtnId").val().split("_");
        var form = new FormData();
        form.append("id", jQuery("#givenFeedback_"+id[1]).attr('name'));

        var settings = {
            "async": true,
            "url": url_resource + "/syraconsumer/delete-feedback-log",
            "method": "POST",
            headers: {
                'Authorization': 'Bearer '+access_token,
            },
            "processData": false,
            "contentType": false,
            "mimeType": "multipart/form-data",
            "data": form
        }


        jQuery.ajax(settings).done(function (response) {
            swalWithBootstrapButtons.fire("Feedback Message", "User feedback is deleted successfully", "success");
            createFeedbackWizard();
            fetchFeedbackLog();
            jQuery("#feedbackAnswer").val("");
            jQuery('#feedBackModal').modal("toggle");
            jQuery("#"+jQuery("#feedbackBtnId").val()+"_icon").attr('name', 'inactive');
            jQuery("#"+jQuery("#feedbackBtnId").val()+"_icon").find('i').removeClass('far fa-thumbs-down').addClass('flaticon-like');
            fetchFeedbackLog();
        });
    }
    
}

function updateFeedback(){
    if(jQuery("#pageTypeID").val() == "1"){
        var feedbackAnswer = jQuery("#feedbackAnswer").val();
        var id = jQuery("#feedbackBtnId").val().split("_");
        if(feedbackAnswer.trim() == ""){
            jQuery("#feedbackMsg").html("Can not be blank");
            return;
        }
        var feedbackIpAddress = jQuery("#feedbackIpAddress").val().substring(0,10);
        var form = new FormData();
        form.append("id", jQuery("#givenFeedback_response_analysis_"+id[3]).attr('name'));
        form.append("botdeploymentId", botDeploymentId);
        form.append("ipAddress", feedbackIpAddress);
        form.append("logDateTime",  jQuery("#feedbackDateTime").val());
        form.append("answer", feedbackAnswer);

        var settings = {
            "async": true,
            "url": url_resource + "/syraconsumer/update-feedback-log",
            "method": "POST",
            headers: {
                'Authorization': 'Bearer '+access_token,
            },
            "processData": false,
            "contentType": false,
            "mimeType": "multipart/form-data",
            "data": form
        }

        jQuery.ajax(settings).done(function (response) {
            swalWithBootstrapButtons.fire({
                text: "User feedback is submitted successfully",
                icon: 'success',
                showCancelButton: false,
                confirmButtonText: 'Okay'
                }).then((result) => {
                if (result.value) {
                    jQuery("#knowledgeBaseDialog").modal("toggle");
                }
            });
            // swalWithBootstrapButtons.fire("Feedback Message", "User feedback is updated successfully", "success");
            // jQuery("#knowledgeBaseDialog").show();
            // createFeedbackWizard();
            fetchFeedbackLog();
            jQuery("#feedbackAnswer").val("");
            jQuery("#givenFeedback_response_analysis_"+id[3]).html(feedbackAnswer);
            jQuery('#feedBackModal').modal("toggle");
        });
    }
    if(jQuery("#pageTypeID").val() == "2"){
        var feedbackAnswer = jQuery("#feedbackAnswer").val();
        var id = jQuery("#feedbackBtnId").val().split("_");
        if(feedbackAnswer.trim() == ""){
            jQuery("#feedbackMsg").html("Can not be blank");
            return;
        }
        var feedbackIpAddress = jQuery("#feedbackIpAddress").val().substring(0,10);
        var form = new FormData();
        form.append("id", jQuery("#givenFeedback_"+id[1]).attr('name'));
        form.append("botdeploymentId", botDeploymentId);
        form.append("ipAddress", feedbackIpAddress);
        form.append("logDateTime",  jQuery("#feedbackDateTime").val());
        form.append("answer", feedbackAnswer);

        var settings = {
            "async": true,
            "url": url_resource + "/syraconsumer/update-feedback-log",
            "method": "POST",
            headers: {
                'Authorization': 'Bearer '+access_token,
            },
            "processData": false,
            "contentType": false,
            "mimeType": "multipart/form-data",
            "data": form
        }

        jQuery.ajax(settings).done(function (response) {
            swalWithBootstrapButtons.fire({
                text: "User feedback is submitted successfully",
                icon: 'success',
                showCancelButton: false,
                confirmButtonText: 'Okay'
                }).then((result) => {
                if (result.value) {
                    jQuery("#knowledgeBaseDialog").modal("toggle");
                }
            });
            // swalWithBootstrapButtons.fire("Feedback Message", "User feedback is updated successfully", "success");
            // jQuery("#knowledgeBaseDialog").show();
            // createFeedbackWizard();
            fetchFeedbackLog();
            jQuery("#feedbackAnswer").val("");
            jQuery("#givenFeedback_"+id[1]).html(feedbackAnswer);
            jQuery('#feedBackModal').modal("toggle");
            fetchFeedbackLog();
        });
    }
    
}

function sortLogDataSet(){                
    if(OrderBy=="D")
    {   
        //Sorting it on DESCENDING order          
        logDataSet.sort(function (a, b) 
        {
            var DateTimeA = a.DateTime.toLowerCase();
            var DateTimeB = b.DateTime.toLowerCase();
            if (DateTimeA > DateTimeB) return -1;
            if (DateTimeA < DateTimeB) return 1;
            return 0;
        });
        OrderBy="A";//So that next time it will print it on ASCENDING order
    }
    else if(OrderBy=="A")
    {      
        //Sorting it on ASCENDING order          
        logDataSet.sort(function (a, b) 
        {
            var DateTimeA = a.DateTime.toLowerCase();
            var DateTimeB = b.DateTime.toLowerCase();
            if (DateTimeA < DateTimeB) return -1;
            if (DateTimeA > DateTimeB) return 1;
            return 0;
        });
        OrderBy="D";//So that next time it will print it on DESCENDING order
    }

    jQuery("#logBody").html('<img src="'+wp_path+'"images/syra-spinner.gif" height="35" style="margin-bottom:20px;"/>');
    for(var itr = 0; itr < logDataSet.length; itr ++){
        var row = '<tr data-repeater-item>' +
                    '<td>' +
                        '<textarea class="form-control kt-form-control--transparent kt-form-control--none-resizable" rows="4" disabled>'+logDataSet[itr].Questions+'</textarea>' +
                    '</td>' +
                    '<td>' +
                    '<textarea class="form-control kt-form-control--transparent kt-form-control--none-resizable" rows="4" disabled>'+logDataSet[itr].Answers+'</textarea>' +
                    '</td>' +
                    '<td>'+logDataSet[itr].IpAddress+'</td>' +
                    '<td class="kt_repeater_schedule_ai_model_training_logs_analysis_date">'+ logDataSet[itr].DateTime +'</td>' +
                    '<td class="text-center">' +
                    '<button type="button" class="btn btn-outline-brand btn-elevate btn-circle btn-icon active" data-toggle="modal" data-target="#kt_modal_feedback">' +
                    '<i class="flaticon-like"></i>' +
                    '</button>' +
                    '</td>' +
                    '<td class="text-right">' +
                    '<a class="kt-link kt-font-bold" href="javascript:;" data-repeater-delete>Remove</a>' +
                    '</td>' +
                    '</tr>';
        jQuery("#logBody").append(row);
    }
}

var startPosition = 0;
var rowCount = 20;
var logDataSet = [];
var OrderBy = "D";//this variable is to make sure that the log data should be in DESC
var selectedPage = 0;
var upperBoundResponseAnalytics = 8;
var upperBound=8;
var lastPageIndex=0;//  To track the last page index.
var firstPageIndex=0;// To track the first page index.

function setFeedBackValue(pageId, me,feedbackAnswer){
    jQuery("#feedbackAnswer").val(feedbackAnswer);
    jQuery("#feedbackSubmitBtn").hide();
    jQuery("#feedbackDeleteBtn").show();
    jQuery("#feedbackUpdateBtn").show();
    jQuery("#feedbackBtnId").val(me.id);
    var id= me.id.split('_');
    jQuery("#feedbackDateTime").val(jQuery("#DateTime_"+id[1]).html());
    jQuery("#feedbackIpAddress").val(jQuery("#ipAddress_"+id[1]).html());
    jQuery("#givenFeedback_"+id[1]).attr('name');
    jQuery("#pageTypeID").val(pageId);
}

function getLogs(){
    var start_date = (jQuery("#fromDate").val().split("/"));
    var end_date = (jQuery("#toDate").val().split("/"));
    if(start_date == "" || end_date == ""){
        swalWithBootstrapButtons.fire("Message","Please select the proper date range!", "info");
        return;
    }
    
    start_date = start_date[2] + "-" + start_date[0] + "-" + start_date[1] + " 00:00:00";
    end_date = end_date[2] + "-" + end_date[0] + "-" + end_date[1] + " 23:59:59";
    var form = new FormData();
    var api_endpoint="";
    if(typeof(apiKEY) == "undefined"){
        swalWithBootstrapButtons.fire("Message","Please deploy your chatbot first!", "info");
        return;
    }
    form.append("APIkey", apiKEY);
    form.append("start_date", start_date);
    form.append("end_date", end_date);
    form.append("start_position", startPosition);
    form.append("row_count", rowCount);

    api_endpoint="export-logs-date-range-pagination";
    
    var settings = 
    {
        "async": true,
        "url": natura_url_resource + "/natura/"+api_endpoint,
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
        if (response.status === 200) 
        {
            if(response.total_count == 0){
                jQuery("#logBody").html('No Logs yet…');  
                jQuery("#paginationDiv").html("");
            }
            else{
                totalRow = response.total_count;
                var innerForm = new FormData();
                innerForm.append("logsData", response.content);
                var innerApiEndPoint="retrieve-location-for-logs";
                var innerSettings = {
                    "async": true,
                    "url": url_resource+ "/syraconsumer/" + innerApiEndPoint,
                    "method": "POST", 
                    headers: {
                        'Authorization': 'Bearer '+access_token,
                    },           
                    "processData": false,
                    "contentType": false,
                    "mimeType": "multipart/form-data",
                    "data": innerForm
                }
                jQuery.ajax(innerSettings).done(function(innerResponse){
                    var jsonResponse = JSON.parse(innerResponse);
                    logDataSet = jsonResponse;
                    //Sorting it on DESCENDING order          
                    // logDataSet.sort(function (a, b) {
                    //     var DateTimeA = a.DateTime.toLowerCase();
                    //     var DateTimeB = b.DateTime.toLowerCase();
                    //     if (DateTimeA > DateTimeB) return -1;
                    //     if (DateTimeA < DateTimeB) return 1;
                    //     return 0;
                    // });
                    //OrderBy = "A";//So that next time it will print it on ASCENDING order
                    //this section will not effect pagination, cause all data are coming from API
                    jQuery("#logBody").html("");
                    var found = false;
                    for (var itr = 0; itr < jsonResponse["data"].length; itr++) {
                        found = false;
                        for(var fbLogItem = 0; fbLogItem < feedBackLogData.length; fbLogItem++){
                            logDateTime = feedBackLogData[fbLogItem].logDateTime.replace("T", " ").replace("Z","");
                            if(logDateTime == jsonResponse["data"][itr].DateTime && feedBackLogData[fbLogItem].pageName != "Response")
                            {
                                var row = '<tr data-repeater-item>' +
                                            '<td style="word-wrap: break-word;max-width: 200px;" id="logQuestion_' + itr + '">' +
                                                logDataSet["data"][itr].Questions +
                                                // '<textarea class="form-control kt-form-control--transparent kt-form-control--none-resizable" rows="4" disabled>'+logDataSet[itr].Questions+'</textarea>' +
                                            '</td>' +
                                            '<td style="word-wrap: break-word;max-width: 200px;">' +
                                                logDataSet["data"][itr].Answers +
                                                // '<textarea class="form-control kt-form-control--transparent kt-form-control--none-resizable" rows="4" disabled>'+logDataSet[itr].Answers+'</textarea>' +
                                            '</td>' +
                                            '<td style="word-wrap: break-word;max-width: 200px;" id="ipAddress_' + itr + '">' + logDataSet["data"][itr].IpAddress+'</td>' +
                                            '<td class="kt_repeater_schedule_ai_model_training_logs_analysis_date" id="DateTime_' + itr + '">' + logDataSet["data"][itr].DateTime +'</td>' +
                                            "<td style='display:none' id='givenFeedback_"+itr+"' name='"+feedBackLogData[fbLogItem].id+"'>"+ feedBackLogData[fbLogItem].answer +"</td>" +
                                            '<td class="text-center">' +
                                                "<button type='button' class='btn btn-outline-brand btn-elevate btn-circle btn-icon active userActivityLog'" +  'onclick="setFeedBackValue(2,this, ' + "'" + feedBackLogData[fbLogItem]["answer"] + "'" +  ')" id="logFeedback_' + itr + '" data-toggle="modal" data-target="#kt_modal_feedback">' +
                                                    '<i class="far fa-thumbs-down"></i>' +
                                                '</button>' +
                                            '</td>' +
                                            '<td class="text-right">' +
                                                '<a class="kt-link kt-font-bold" href="javascript:;" data-repeater-delete>Remove</a>' +
                                            '</td>' +
                                        '</tr>';
                                jQuery("#logBody").append(row);
                                found = true;
                                break;
                            }
                        }
                        if(!found){
                            var row = "<tr>" +
                                "<td style='word-wrap: break-word;max-width: 200px;' id='logQuestion_"+itr+"'>" + jsonResponse["data"][itr].Questions + "</td>" +
                                "<td style='word-wrap: break-word;max-width: 200px;'>" + jsonResponse["data"][itr].Answers + "</td>" +
                                "<td style='word-wrap: break-word;max-width: 200px;' id='ipAddress_"+itr+"'>" + jsonResponse["data"][itr].IpAddress + "</td>" +
                                "<td style='word-wrap: break-word;max-width: 200px;' id='DateTime_"+itr+"'>" + jsonResponse["data"][itr].DateTime + "</td>" +
                                "<td style='display:none' id='givenFeedback_"+itr+"' name=''></td>" +
                                "<td><div style='display: flex'>&nbsp; &nbsp; &nbsp; <span style='cursor:pointer' id='dislike_"+itr+"_icon' name='inactive'><button type='button' id='dislike_" + itr + "' onclick='writeFeedback(this,2)' class='btn btn-outline-brand btn-elevate btn-circle btn-icon active userActivityLog' data-toggle='modal' data-target='#kt_modal_feedback'><i class='flaticon-like'></i></button></span></div></td>" +
                            "</tr>";
                            jQuery("#logBody").append(row);
                        }
        
                    }
                    //this is to define the pagination
                    if (jsonResponse["data"].length > 0) {
                        var tmp = totalRow / 20;//dividing total rows by page size(20)
                        var numberOfPages = Math.ceil(tmp);
                        lastPageIndex = numberOfPages;
        
                        if (numberOfPages <= 6)//dotdot button will not come here 
                        {
                            var paginationHTML = '<ul class="pagination pull-right">';
                            paginationHTML += '<li class="page-item"><a class="page-link" name="prev" onclick="pagination(this)" href="javascript:void(0)">Previous</a></li>';
                            var itr = 0;
        
                            var startLoopAt = 0;
                            selectedPage = parseInt(selectedPage);
                            startLoopAt = 0;
                            upperBound = numberOfPages;
        
                            for (itr = startLoopAt; itr < upperBound; itr++) {
                                pageNo = itr + 1;
                                if (itr < upperBound) {
                                    if (itr == startPosition / 20) {
                                        paginationHTML += '<li class="page-item active"><a class="page-link " name="' + itr + '" onclick="pagination(this)" href="javascript:void(0)">' + pageNo + '</a></li>';
                                    }
                                    else {
                                        paginationHTML += '<li class="page-item"><a class="page-link " name="' + itr + '" onclick="pagination(this)" href="javascript:void(0)">' + pageNo + '</a></li>';
                                    }
                                }
                            }
                            paginationHTML += '<li class="page-item"><a class="page-link " name="next" onclick="pagination(this)" href="javascript:void(0)">Next</a></li>';
                            paginationHTML += '</ul>';
                        }
                        else//dotdot button will come here 
                        {
                            var paginationHTML = '<ul class="pagination pull-right">';
                            paginationHTML += '<li class="page-item"><a class="page-link " name="prev"  onclick="pagination(this)" href="javascript:void(0)">Previous</a></li>';
                            var itr = 0;
                            var dotdotBtn = true;
                            var startLoopAt = 0;
                            selectedPage = parseInt(selectedPage);
                            //This selection will helps to make pagination work properly
                            if (selectedPage < 6) {
                                startLoopAt = 0;
                                upperBound = 8;
        
                            }
                            else if (selectedPage => 6)//if you click on 7 or more
                            {
                                startLoopAt = selectedPage - 1;
        
                                var NthValue = Math.ceil(totalRow / 20);
                                var diffBetween2 = NthValue - (selectedPage + 1);
                                if (diffBetween2 < 3) {
                                    upperBound = NthValue;
                                    dotdotBtn = false;
                                }
                                else if (diffBetween2 => 3) {
                                    upperBound = selectedPage + 2;
                                    dotdotBtn = true;
                                }
                            }
                            if (!dotdotBtn) {
                                paginationHTML += '<li class="page-item"><a class="page-link " name="0" onclick="pagination(this)" href="javascript:void(0)">1</a></li>';
                                paginationHTML += '<li class="page-item"><a class="page-link" href="javascript:void(0)">....</a></li>';
                            }
                            for (itr = startLoopAt; itr < totalRow / 20; itr++) {
                                pageNo = itr + 1;
                                if (itr < upperBound) {
                                    if (itr == startPosition / 20) {
                                        paginationHTML += '<li class="page-item active"><a class="page-link" name="' + itr + '" onclick="pagination(this)" href="javascript:void(0)">' + pageNo + '</a></li>';
                                    }
                                    else {
                                        paginationHTML += '<li class="page-item"><a class="page-link" name="' + itr + '" onclick="pagination(this)" href="javascript:void(0)">' + pageNo + '</a></li>';
                                    }
                                }
                            }
                            if (dotdotBtn) {
                                itr -= 1;
                                paginationHTML += '<li class="page-item"><a class="page-link" href="javascript:void(0)">....</a></li>';
                                if (itr == startPosition / 20) {
                                    paginationHTML += '<li class="page-item active"><a class="page-link" name="' + itr + '" onclick="pagination(this)" href="javascript:void(0)">' + pageNo + '</a></li>';
                                }
                                else {
                                    paginationHTML += '<li class="page-item"><a class="page-link" name="' + itr + '" onclick="pagination(this)" href="javascript:void(0)">' + pageNo + '</a></li>';
                                }
                                paginationHTML += '<li class="page-item"><a class="page-link " name="next"  onclick="pagination(this)" href="javascript:void(0)">Next</a></li>';
                            }
                            paginationHTML += '</ul>';
                        }
                        jQuery("#paginationDiv").html(paginationHTML);
                        jQuery(".main-content-inner").css("overflow-x", "scroll");
                    }
                })
                
            }
        }
        else 
        {
            // jQuery("#logBody").html('<tr><td colspan="5" style="text-align: center;">'+api_endpoint+' '+response.message+'</td></tr>');
            jQuery("#logBody").html('No Logs yet…');
            jQuery("#paginationDiv").html("");
        }                       
    })
    .fail(function(response) 
    {   

        var APIerrorMsg='<tr><td colspan="5" style="text-align: center;margin-left:5%;margin-bottom:18%;font-size:12px;line-height:unset;">'+api_endpoint+' -> '+response.status+' -> '+response.statusText+'</td></tr>';                                                                
        jQuery("#logBody").html("No Logs yet…");
        jQuery("#paginationDiv").html("");
        swal
        ({
            title: "API Error!",
            text: api_endpoint+' -> '+response.status+' -> '+response.statusText,
            icon: "error",
            button: "OK",
        });               
    });

}

function logFilter(duration){
    jQuery( "#fromDate" ).datepicker();
    jQuery( "#toDate" ).datepicker();

    var d = new Date();
    var year = String(d.getFullYear());
    var month = String(d.getMonth() + 1);
    if(month.length < 2){
        month = "0"+month;
    }
    var day = String(d.getDate());
    if(day.length < 2){
        day = "0"+day;
    }
    var todayDate = String(month) + "/" + String(day) + "/" + String(year);
    jQuery("#toDate").val(todayDate);

    var d = new Date()
    d.setDate(d.getDate() - duration)
    var year = String(d.getFullYear());
    var month = String(d.getMonth() + 1);
    if(month.length < 2){
        month = "0"+month;
    }
    var day = String(d.getDate());
    if(day.length < 2){
        day = "0"+day;
    }
    var todayDateMinusSeven = String(month) + "/" + String(day) + "/" + String(year);

    jQuery("#fromDate").val(todayDateMinusSeven);

    getLogs();
}

function retrieveResponseAnalysisLog(){
    responseAnalysisType = "auto";
    var name = jQuery( "#responseFilter option:selected" ).text();
    var filterDays = jQuery(".responseTime.active").attr("name");
    try {
        var form = new FormData();
        form.append("APIkey", apiKEY);
        api_endpoint="dashboard-response-log-analytics";
        
        var settings = {
            "async": true,
            "url": natura_url_resource + "/natura/" + api_endpoint,
            "method": "POST",
            "processData": false,
            "contentType": false,
            "mimeType": "multipart/form-data",
            "data": form
        }
        jQuery.ajax(settings).done(function (response) 
        {
            response = JSON.parse(response);
            if(response.status===200)
            {
                if(response.message != "No Records Found!"){
                    jQuery("#showLoadGif").show();
                    if(name == 'Right')
                    {
                        var innerform = new FormData();
                        innerform.append("botResponse", JSON.stringify(response["rightQuestionsData"]));
                        innerform.append("filterDays", filterDays)
                        innerform.append("questionKey","Right_Questions");
                        innerform.append("answerKey", "Right_Answers");
                        innerform.append("rowCount",rowCountResponseAnalysis);
                        innerform.append("startPosition",startPositionResponseAnalytics);
                        var innerSettings = {
                            "url": url_resource + "/syraconsumer/fetch-bot-response-with-time",
                            "method": "POST",
                            "timeout": 0,
                            "headers": {
                                "Authorization": "Bearer " + access_token
                            },
                            "processData": false,
                            "mimeType": "multipart/form-data",
                            "contentType": false,
                            "data": innerform
                        };
        
                        jQuery.ajax(innerSettings).done(function (innerResponse) {
                            var jsonResponse = JSON.parse(innerResponse);
                            innerResponse = JSON.parse(innerResponse);
                            if(innerResponse["status"] === 200){
                                var totalResponseCount = jsonResponse["totalCount"];
                                jQuery("#tablebodyForQuestions").html("");
                                if(innerResponse.data.length == 0)
                                {
                                    jQuery("#tablebodyForQuestions").html("No Responses yet…");
                                }
                                else
                                {
                                    jQuery("#tablebodyForQuestions").show();
                                    var raFound = false;
                                    for (var itr = 0; itr < innerResponse.data.length; itr++) 
                                    {
                                        innerResponse.data[itr]["dateTime"] = innerResponse.data[itr]["dateTime"].replace("T", " ").replace("Z","");
                                        if(innerResponse.data[itr]["answer"].length > 100){
                                            innerResponse.data[itr]["answer"] = innerResponse.data[itr]["answer"].substring(0,99) + "....";
                                        }
                                        raFound = false;
                                        for(var raLogItem = 0; raLogItem < feedBackLogData.length; raLogItem++){
                                            raLogDateTime = feedBackLogData[raLogItem].logDateTime.replace("T", " ").replace("Z","");
                                            if(raLogDateTime == innerResponse.data[itr]["dateTime"] && feedBackLogData[raLogItem].pageName == "Response"){
                                                var row = "<tr>" +
                                                "<td style='word-wrap: break-word;max-width: 200px;' id='rightQues_response_analysis_"+itr+"'>" + innerResponse.data[itr]["question"] + "</td>" +
                                                "<td style='word-wrap: break-word;max-width: 200px;' id='rightAnswr_response_analysis_"+itr+"'>" + innerResponse.data[itr]["answer"] + "</td>" +
                                                "<td style='word-wrap: break-word;max-width: 200px;' id='ipAddress_response_analysis_"+itr+"'>" + innerResponse.data[itr]["ipAddress"] + "</td>" +
                                                "<td style='word-wrap: break-word;max-width: 200px;' id='DateTime_response_analysis_"+itr+"'>" + innerResponse.data[itr]["dateTime"] + "</td>" +
                                                "<td style='display:none' id='givenFeedback_response_analysis_"+itr+"' name='"+feedBackLogData[raLogItem].id+"'>"+ feedBackLogData[raLogItem].answer +"</td>" +
                                                "<td><div style='display: flex'>&nbsp; &nbsp; &nbsp; <span style='cursor:pointer' id='dislike_response_analysis_"+itr+"_icon' name='active'><button type='button' class='btn btn-outline-brand btn-elevate btn-circle btn-icon active userActivityLog' name='dislike' id='dislike_response_analysis_" + itr + "' onclick='writeFeedback(this,1)' data-toggle='modal' data-target='#kt_modal_feedback'><i class='far fa-thumbs-down'></i></button></span></div></td>" +
                                                "</tr>";
                                                jQuery("#tablebodyForQuestions").append(row);
                                                raFound = true;
                                                break;
                                            }
                                        }
            
                                        if(!raFound){
                                            var row = "<tr>" +
                                            "<td style='word-wrap: break-word;max-width: 200px;' id='rightQues_response_analysis_"+itr+"'>" + innerResponse.data[itr]["question"] + "</td>" +
                                            "<td style='word-wrap: break-word;max-width: 200px;' id='rightAnswr_response_analysis_"+itr+"'>" + innerResponse.data[itr]["answer"] + "</td>" +
                                            "<td style='word-wrap: break-word;max-width: 200px;' id='ipAddress_response_analysis_"+itr+"'>" + innerResponse.data[itr]["ipAddress"] + "</td>" +
                                            "<td style='word-wrap: break-word;max-width: 200px;' id='DateTime_response_analysis_"+itr+"'>" + innerResponse.data[itr]["dateTime"] + "</td>" +
                                            "<td style='display:none' id='givenFeedback_response_analysis_"+itr+"' name='response'></td>" +
                                            "<td><div style='display: flex'>&nbsp; &nbsp; &nbsp; <span style='cursor:pointer' id='dislike_response_analysis_"+itr+"_icon' name='inactive'><button type='button' class='btn btn-outline-brand btn-elevate btn-circle btn-icon active userActivityLog' name='dislike' id='dislike_response_analysis_" + itr + "' onclick='writeFeedback(this,1)' data-toggle='modal' data-target='#kt_modal_feedback'><i class='flaticon-like'></i></button></span></div></td>" +
                                            "</tr>";
                                            jQuery("#tablebodyForQuestions").append(row);
                                        }
                                    } 
                                    responseAnalysisPagination(jsonResponse.data, totalResponseCount);
                                }
                                jQuery("#showLoadGif").hide();    
                            }
                            else{
                                jQuery("#showLoadGif").hide();    
                                jQuery("#tablebodyForQuestions").html("No Responses yet…");
                            }
                            
                        })
                        .fail(function(innerResponse){
                            swalWithBootstrapButtons.fire
                            ({
                                text: api_endpoint+' -> '+ innerResponse.status+' -> '+ innerResponse.statusText,
                                icon: "error",
                                confirmButtonText: 'Okay'
                            });
                            jQuery("#showLoadGif").hide();
                        })
                    }
                    if(name == 'Wrong')
                    {
                        var innerform = new FormData();
                        innerform.append("botResponse", JSON.stringify(response["wrongQuestionsData"]));
                        innerform.append("filterDays", filterDays);
                        innerform.append("questionKey","Wrong_Questions");
                        innerform.append("answerKey", "Wrong_Answers");
                        innerform.append("rowCount",rowCountResponseAnalysis);
                        innerform.append("startPosition",startPositionResponseAnalytics);
                        var innerSettings = {
                            "url": url_resource + "/syraconsumer/fetch-bot-response-with-time",
                            "method": "POST",
                            "timeout": 0,
                            "headers": {
                                "Authorization": "Bearer " + access_token
                            },
                            "processData": false,
                            "mimeType": "multipart/form-data",
                            "contentType": false,
                            "data": innerform
                        };
                        jQuery.ajax(innerSettings).done(function (innerResponse) {
                            var jsonResponse = JSON.parse(innerResponse);
                            innerResponse = JSON.parse(innerResponse);
                            if(innerResponse["status"] == 200){
                                var totalResponseCount = jsonResponse["totalCount"];
                                jQuery("#tablebodyForQuestions").html("");
                                if(innerResponse.data.length == 0)
                                {
                                    jQuery("#tablebodyForQuestions").hide();
                                    jQuery("#answerPercentageLogs").hide();
                                    jQuery("#noRecord").show();
                                }
                                else{
                                    jQuery("#noRecord").hide();
                                    jQuery("#tablebodyForQuestions").show();
                                    jQuery("#answerPercentageLogs").show();
                                    var waFound = false;
                                    for (var itr = 0; itr < innerResponse.data.length; itr++) 
                                    {
                                        innerResponse.data[itr]["dateTime"] = innerResponse.data[itr]["dateTime"].replace("T", " ").replace("Z","");
                                        if(innerResponse.data[itr]["answer"].length > 100){
                                            innerResponse.data[itr]["answer"] = innerResponse.data[itr]["answer"].substring(0,99) + "....";
                                        }
                                        waFound = false;
                                        for(var waLogItem = 0; waLogItem < feedBackLogData.length; waLogItem++){
                                            waLogDateTime = feedBackLogData[waLogItem].logDateTime.replace("T", " ").replace("Z","");
                                            if(waLogDateTime == innerResponse.data[itr]["dateTime"] && feedBackLogData[waLogItem].pageName == "Response"){
                                                var row = "<tr>" +
                                                    "<td id='rightQues_response_analysis_"+itr+"'>" + innerResponse.data[itr]["question"] + "</td>" +
                                                    "<td id='rightAnswr_response_analysis_"+itr+"'>" + innerResponse.data[itr]["answer"] + "</td>" +
                                                    "<td id='ipAddress_response_analysis_"+itr+"'>" + innerResponse.data[itr]["ipAddress"] + "</td>" +
                                                    "<td id='DateTime_response_analysis_"+itr+"'>" + innerResponse.data[itr]["dateTime"] + "</td>" +
                                                    "<td style='display:none' id='givenFeedback_response_analysis_"+itr+"' name='"+feedBackLogData[waLogItem].id+"'>"+ feedBackLogData[waLogItem].answer +"</td>" +
                                                    "<td><div style='display: flex'>&nbsp; &nbsp; &nbsp; <span style='cursor:pointer' id='dislike_response_analysis_"+itr+"_icon' name='active'><button type='button' class='btn btn-outline-brand btn-elevate btn-circle btn-icon active userActivityLog' name='dislike' id='dislike_response_analysis_" + itr + "' onclick='writeFeedback(this,1)' data-toggle='modal' data-target='#kt_modal_feedback'><i class='far fa-thumbs-down'></i></button></span></div></td>" +
                                                "</tr>";
                                                jQuery("#tablebodyForQuestions").append(row);
                                                waFound = true;
                                                break;
                                            }
                                        }
            
                                        if(!waFound){
                                            var row = "<tr>" +
                                                "<td id='rightQues_response_analysis_"+itr+"'>" + innerResponse.data[itr]["question"] + "</td>" +
                                                "<td id='rightAnswr_response_analysis_"+itr+"'>" + innerResponse.data[itr]["answer"] + "</td>" +
                                                "<td id='ipAddress_response_analysis_"+itr+"'>" + innerResponse.data[itr]["ipAddress"] + "</td>" +
                                                "<td id='DateTime_response_analysis_"+itr+"'>" + innerResponse.data[itr]["dateTime"] + "</td>" +
                                                "<td style='display:none' id='givenFeedback_response_analysis_"+itr+"' name='response'></td>" +
                                                "<td><div style='display: flex'>&nbsp; &nbsp; &nbsp; <span style='cursor:pointer' id='dislike_response_analysis_"+itr+"_icon' name='inactive'><button type='button' class='btn btn-outline-brand btn-elevate btn-circle btn-icon active userActivityLog' name='dislike' id='dislike_response_analysis_" + itr + "' onclick='writeFeedback(this,1)' data-toggle='modal' data-target='#kt_modal_feedback'><i class='flaticon-like'></i></button></span></div></td>" +
                                            "</tr>";
                                            jQuery("#tablebodyForQuestions").append(row);
                                        }
                                    }
                                    responseAnalysisPagination(jsonResponse.data, totalResponseCount);
                                }
                                jQuery("#showLoadGif").hide();
                            }
                            else{
                                jQuery("#showLoadGif").hide();
                                jQuery("#tablebodyForQuestions").html("No Responses yet…"); 
                            }
                            
                        })
                        .fail(function(innerResponse){
                            swalWithBootstrapButtons.fire
                            ({
                                text: api_endpoint+' -> '+ innerResponse.status+' -> '+ innerResponse.statusText,
                                icon: "error",
                                confirmButtonText: 'Okay'
                            });
                            jQuery("#showLoadGif").hide();
                        })
                        
                    }
                }
                else{
                    jQuery("#showLoadGif").hide();
                }
            }
        })
        .fail(function(response) 
        {           
            var APIerrorMsg='<span style="margin-left:5%;margin-bottom:18%;color:red;font-size:12px;">'+api_endpoint+' -> '+response.status + ' -> </span>';  
    
            jQuery("#showLoadGif").html(APIerrorMsg);
    
            swalWithBootstrapButtons.fire
            ({
                text: api_endpoint+' -> '+response.status+' -> '+response.statusText,
                icon: "error",
                confirmButtonText: 'Okay'
            });
        jQuery("#showLoadGif").hide();
    
        });
    } 
    catch (error) {
        jQuery("#tablebodyForQuestions").html("No Responses yet…");
    }
    
}

function timeFilterResponseAnalysisLog(timeperiod){
    timeperiodResponse = timeperiod
    responseAnalysisType = "time";
    var name = jQuery( "#responseFilter option:selected" ).text();
    var filterDays = timeperiod;
    var form = new FormData();
    form.append("APIkey", apiKEY);
    api_endpoint="dashboard-response-log-analytics";
    jQuery("#showLoadGif").show();
    var settings = {
        "async": true,
        "url": natura_url_resource + "/natura/" + api_endpoint,
        "method": "POST",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
    }

    jQuery.ajax(settings).done(function (response) 
    {
        response = JSON.parse(response);
        if(response.status===200)
        {
            if(response.message != "No Records Found!"){
                if(name == 'Right')
                {
                    var innerform = new FormData();
                    innerform.append("botResponse", JSON.stringify(response["rightQuestionsData"]));
                    innerform.append("filterDays", filterDays)
                    innerform.append("questionKey","Right_Questions");
                    innerform.append("answerKey", "Right_Answers");
                    innerform.append("rowCount",rowCountResponseAnalysis);
                    innerform.append("startPosition",startPositionResponseAnalytics);
                    var innerSettings = {
                    "url": url_resource + "/syraconsumer/fetch-bot-response-with-time",
                    "method": "POST",
                    "timeout": 0,
                    "headers": {
                        "Authorization": "Bearer " + access_token
                    },
                    "processData": false,
                    "mimeType": "multipart/form-data",
                    "contentType": false,
                    "data": innerform
                    };
    
                    jQuery.ajax(innerSettings).done(function (innerResponse) {
                        var jsonResponse = JSON.parse(innerResponse);
                        innerResponse = JSON.parse(innerResponse);
                        if(innerResponse["status"] == 200){
                            var totalResponseCount = jsonResponse["totalCount"];
                            jQuery("#tablebodyForQuestions").html("");
                            if(innerResponse.data.length == 0)
                            {
                                jQuery("#tablebodyForQuestions").hide();
                                jQuery("#answerPercentageLogs").hide();
                                jQuery("#noRecord").show();
                            }
                            else{
                                jQuery("#noRecord").hide();
                                jQuery("#tablebodyForQuestions").show();
                                jQuery("#answerPercentageLogs").show();
        
                                var raFound = false;
                                for (var itr = 0; itr < innerResponse.data.length; itr++) 
                                {
                                    innerResponse.data[itr]["dateTime"] = innerResponse.data[itr]["dateTime"].replace("T", " ").replace("Z","");
                                    if(innerResponse.data[itr]["answer"].length > 100){
                                            innerResponse.data[itr]["answer"] = innerResponse.data[itr]["answer"].substring(0,99) + "....";
                                        }
                                    raFound = false;
                                    for(var raLogItem = 0; raLogItem < feedBackLogData.length; raLogItem++){
                                        raLogDateTime = feedBackLogData[raLogItem].logDateTime.replace("T", " ").replace("Z","");
                                        if(raLogDateTime == innerResponse.data[itr]["dateTime"] && feedBackLogData[raLogItem].pageName == "Response"){
                                            var row = "<tr>" +
                                            "<td style='word-wrap: break-word;max-width: 200px;' id='rightQues_response_analysis_"+itr+"'>" + innerResponse.data[itr]["question"] + "</td>" +
                                            "<td style='word-wrap: break-word;max-width: 200px;' id='rightAnswr_response_analysis_"+itr+"'>" + innerResponse.data[itr]["answer"] + "</td>" +
                                            "<td style='word-wrap: break-word;max-width: 200px;' id='ipAddress_response_analysis_"+itr+"'>" + innerResponse.data[itr]["ipAddress"] + "</td>" +
                                            "<td style='word-wrap: break-word;max-width: 200px;' id='DateTime_response_analysis_"+itr+"'>" + innerResponse.data[itr]["dateTime"] + "</td>" +
                                            "<td style='display:none' id='givenFeedback_response_analysis_"+itr+"' name='"+feedBackLogData[raLogItem].id+"'>"+ feedBackLogData[raLogItem].answer +"</td>" +
                                            "<td><div style='display: flex'>&nbsp; &nbsp; &nbsp; <span style='cursor:pointer' id='dislike_response_analysis_"+itr+"_icon' name='active'><button type='button' class='btn btn-outline-brand btn-elevate btn-circle btn-icon active userActivityLog' name='dislike' id='dislike_response_analysis_" + itr + "' onclick='writeFeedback(this,1)' data-toggle='modal' data-target='#kt_modal_feedback'><i class='far fa-thumbs-down'></i></button></span></div></td>" +
                                            "</tr>";
                                            jQuery("#tablebodyForQuestions").append(row);
                                            raFound = true;
                                            break;
                                        }
                                    }
        
                                    if(!raFound){
                                        var row = "<tr>" +
                                        "<td style='word-wrap: break-word;max-width: 200px;' id='rightQues_response_analysis_"+itr+"'>" + innerResponse.data[itr]["question"] + "</td>" +
                                        "<td style='word-wrap: break-word;max-width: 200px;' id='rightAnswr_response_analysis_"+itr+"'>" + innerResponse.data[itr]["answer"] + "</td>" +
                                        "<td style='word-wrap: break-word;max-width: 200px;' id='ipAddress_response_analysis_"+itr+"'>" + innerResponse.data[itr]["ipAddress"] + "</td>" +
                                        "<td style='word-wrap: break-word;max-width: 200px;' id='DateTime_response_analysis_"+itr+"'>" + innerResponse.data[itr]["dateTime"] + "</td>" +
                                        "<td style='display:none' id='givenFeedback_response_analysis_"+itr+"' name='response'></td>" +
                                        "<td><div style='display: flex'>&nbsp; &nbsp; &nbsp; <span style='cursor:pointer' id='dislike_response_analysis_"+itr+"_icon' name='inactive'><button type='button' class='btn btn-outline-brand btn-elevate btn-circle btn-icon active userActivityLog' name='dislike' id='dislike_response_analysis_" + itr + "' onclick='writeFeedback(this,1)' data-target='#kt_modal_feedback'><i class='flaticon-like'></i></button></span></div></td>" +
                                        "</tr>";
                                        jQuery("#tablebodyForQuestions").append(row);
                                    }
                                } 
                                responseAnalysisPagination(jsonResponse.data, totalResponseCount);
                            }
                            jQuery("#showLoadGif").hide(); 
                        }
                        else{
                            jQuery("#tablebodyForQuestions").html("No Responses yet…");
                            jQuery("#showLoadGif").hide(); 
                        }
                           
                    })
                    .fail(function(innerResponse){
                        swalWithBootstrapButtons.fire
                        ({
                            text: api_endpoint+' -> '+ innerResponse.status+' -> '+ innerResponse.statusText,
                            icon: "error",
                            confirmButtonText: 'Okay'
                        });
                    jQuery("#showLoadGif").hide();
    
                    })
                }
                if(name == 'Wrong')
                {
                    var innerform = new FormData();
                    innerform.append("botResponse", JSON.stringify(response["wrongQuestionsData"]));
                    innerform.append("filterDays", filterDays);
                    innerform.append("questionKey","Wrong_Questions");
                    innerform.append("answerKey", "Wrong_Answers");
                    innerform.append("rowCount",rowCountResponseAnalysis);
                    innerform.append("startPosition",startPositionResponseAnalytics);
                    var innerSettings = {
                        "url": url_resource + "/syraconsumer/fetch-bot-response-with-time",
                        "method": "POST",
                        "timeout": 0,
                        "headers": {
                            "Authorization": "Bearer " + access_token
                        },
                        "processData": false,
                        "mimeType": "multipart/form-data",
                        "contentType": false,
                        "data": innerform
                    };
                    jQuery.ajax(innerSettings).done(function (innerResponse) {
                        var jsonResponse = JSON.parse(innerResponse);
                        innerResponse = JSON.parse(innerResponse);
                        if(innerResponse["status"] == 200){
                            var totalResponseCount = jsonResponse["totalCount"];
                            jQuery("#tablebodyForQuestions").html("");
                            if(innerResponse.data.length == 0)
                            {
                                jQuery("#tablebodyForQuestions").hide();
                                jQuery("#answerPercentageLogs").hide();
                                jQuery("#noRecord").show();
                            }
                            else{
                                jQuery("#noRecord").hide();
                                jQuery("#tablebodyForQuestions").show();
                                jQuery("#answerPercentageLogs").show();
                                var waFound = false;
                                for (var itr = 0; itr < innerResponse.data.length; itr++) 
                                {
                                    innerResponse.data[itr]["dateTime"] = innerResponse.data[itr]["dateTime"].replace("T", " ").replace("Z","");
                                    if(innerResponse.data[itr]["answer"].length > 100){
                                            innerResponse.data[itr]["answer"] = innerResponse.data[itr]["answer"].substring(0,99) + "....";
                                        }
                                    waFound = false;
                                    for(var waLogItem = 0; waLogItem < feedBackLogData.length; waLogItem++){
                                        waLogDateTime = feedBackLogData[waLogItem].logDateTime.replace("T", " ").replace("Z","");
                                        if(waLogDateTime == innerResponse.data[itr]["dateTime"] && feedBackLogData[waLogItem].pageName == "Response"){
                                            var row = "<tr>" +
                                                "<td id='rightQues_response_analysis_"+itr+"'>" + innerResponse.data[itr]["question"] + "</td>" +
                                                "<td id='rightAnswr_response_analysis_"+itr+"'>" + innerResponse.data[itr]["answer"] + "</td>" +
                                                "<td id='ipAddress_response_analysis_"+itr+"'>" + innerResponse.data[itr]["ipAddress"] + "</td>" +
                                                "<td id='DateTime_response_analysis_"+itr+"'>" + innerResponse.data[itr]["dateTime"] + "</td>" +
                                                "<td style='display:none' id='givenFeedback_response_analysis_"+itr+"' name='"+feedBackLogData[waLogItem].id+"'>"+ feedBackLogData[waLogItem].answer +"</td>" +
                                                "<td><div style='display: flex'>&nbsp; &nbsp; &nbsp; <span style='cursor:pointer' id='dislike_response_analysis_"+itr+"_icon' name='active'><button type='button' class='btn btn-outline-brand btn-elevate btn-circle btn-icon active userActivityLog' name='dislike' id='dislike_response_analysis_" + itr + "' onclick='writeFeedback(this,1)' data-toggle='modal' data-target='#kt_modal_feedback'><i class='far fa-thumbs-down'></i></button></span></div></td>" +
                                            "</tr>";
                                            jQuery("#tablebodyForQuestions").append(row);
                                            waFound = true;
                                            break;
                                        }
                                    }
        
                                    if(!waFound){
                                        var row = "<tr>" +
                                            "<td id='rightQues_response_analysis_"+itr+"'>" + innerResponse.data[itr]["question"] + "</td>" +
                                            "<td id='rightAnswr_response_analysis_"+itr+"'>" + innerResponse.data[itr]["answer"] + "</td>" +
                                            "<td id='ipAddress_response_analysis_"+itr+"'>" + innerResponse.data[itr]["ipAddress"] + "</td>" +
                                            "<td id='DateTime_response_analysis_"+itr+"'>" + innerResponse.data[itr]["dateTime"] + "</td>" +
                                            "<td style='display:none' id='givenFeedback_response_analysis_"+itr+"' name='response'></td>" +
                                            "<td><div style='display: flex'>&nbsp; &nbsp; &nbsp; <span style='cursor:pointer' id='dislike_response_analysis_"+itr+"_icon' name='inactive'><button type='button' class='btn btn-outline-brand btn-elevate btn-circle btn-icon active userActivityLog' name='dislike' id='dislike_response_analysis_" + itr + "' onclick='writeFeedback(this,1)' data-toggle='modal' data-target='#kt_modal_feedback'><i class='flaticon-like'></i></button></span></div></td>" +
                                        "</tr>";
                                        jQuery("#tablebodyForQuestions").append(row);
                                    }
                                }
                                responseAnalysisPagination(jsonResponse.data, totalResponseCount);
                            }
                            jQuery("#showLoadGif").hide();
                        }
                        else{
                            jQuery("#tablebodyForQuestions").html("No Responses yet…");
                            jQuery("#showLoadGif").hide();
                        }
                    })
                    .fail(function(innerResponse){
                        swalWithBootstrapButtons.fire
                        ({
                            text: api_endpoint+' -> '+ innerResponse.status+' -> '+ innerResponse.statusText,
                            icon: "error",
                            confirmButtonText: 'Okay'
                        });
                        jQuery("#showLoadGif").hide();
                    })
                }
            }
            else{
                jQuery("#showLoadGif").hide();
            }
        }
    })
    .fail(function(response) 
    {           
        var APIerrorMsg='<span style="margin-left:5%;margin-bottom:18%;color:red;font-size:12px;">'+api_endpoint+' -> '+response.status + ' -> </span>';  

		jQuery("#showLoadGif").html(APIerrorMsg);

        swalWithBootstrapButtons.fire
        ({
            text: api_endpoint+' -> '+response.status+' -> '+response.statusText,
            icon: "error",
            confirmButtonText: 'Okay'
        });
	    jQuery("#showLoadGif").hide();
    });
}

function answerTypeFilterResponseAnalysisLog(name){
    responseAnswerType = name
    responseAnalysisType = "answer";
    if(name == "Right Answers"){
        jQuery(".filter-option-inner-inner").html("Right");
        var optionValue = 'Right';
        jQuery("#responseFilter").val(optionValue).find("option[value=" + optionValue +"]").attr('selected', true);
    }
    else if(name == "Wrong Answers"){
        jQuery(".filter-option-inner-inner").html("Wrong");
        var optionValue = 'Wrong';
        jQuery("#responseFilter").val(optionValue).find("option[value=" + optionValue +"]").attr('selected', true);
    }
    var filterDays = jQuery(".responseTime.active").attr("name");
    var form = new FormData();
    form.append("APIkey", apiKEY);
    api_endpoint="dashboard-response-log-analytics";
    jQuery("#showLoadGif").show();
    var settings = {
        "async": true,
        "url": natura_url_resource + "/natura/" + api_endpoint,
        "method": "POST",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
    }

    jQuery.ajax(settings).done(function (response) 
    {
        response = JSON.parse(response);
        if(response.status===200)
        {
            if(response.message != "No Records Found!"){
                if(name == "Right Answers")
                {
                    var innerform = new FormData();
                    innerform.append("botResponse", JSON.stringify(response["rightQuestionsData"]));
                    innerform.append("filterDays", filterDays)
                    innerform.append("questionKey","Right_Questions");
                    innerform.append("answerKey", "Right_Answers");
                    innerform.append("rowCount",rowCountResponseAnalysis);
                    innerform.append("startPosition",startPositionResponseAnalytics);
                    var innerSettings = {
                    "url": url_resource + "/syraconsumer/fetch-bot-response-with-time",
                    "method": "POST",
                    "timeout": 0,
                    "headers": {
                        "Authorization": "Bearer " + access_token
                    },
                    "processData": false,
                    "mimeType": "multipart/form-data",
                    "contentType": false,
                    "data": innerform
                    };
    
                    jQuery.ajax(innerSettings).done(function (innerResponse) {
                        var jsonResponse = JSON.parse(innerResponse);
                        innerResponse = JSON.parse(innerResponse);
                        if(innerResponse["status"] == 200){
                            var totalResponseCount = jsonResponse["totalCount"];
                            jQuery("#tablebodyForQuestions").html("");
                            if(innerResponse.data.length == 0)
                            {
                                jQuery("#tablebodyForQuestions").hide();
                                jQuery("#answerPercentageLogs").hide();
                                jQuery("#noRecord").show();
                            }
                            else{
                                jQuery("#noRecord").hide();
                                jQuery("#tablebodyForQuestions").show();
                                jQuery("#answerPercentageLogs").show();
        
                                var raFound = false;
                                for (var itr = 0; itr < innerResponse.data.length; itr++) 
                                {
                                    innerResponse.data[itr]["dateTime"] = innerResponse.data[itr]["dateTime"].replace("T", " ").replace("Z","");
                                    if(innerResponse.data[itr]["answer"].length > 100){
                                            innerResponse.data[itr]["answer"] = innerResponse.data[itr]["answer"].substring(0,99) + "....";
                                        }
                                    raFound = false;
                                    for(var raLogItem = 0; raLogItem < feedBackLogData.length; raLogItem++){
                                        raLogDateTime = feedBackLogData[raLogItem].logDateTime.replace("T", " ").replace("Z","");
                                        if(raLogDateTime == innerResponse.data[itr]["dateTime"] && feedBackLogData[raLogItem].pageName == "Response"){
                                            var row = "<tr>" +
                                            "<td style='word-wrap: break-word;max-width: 200px;' id='rightQues_response_analysis_"+itr+"'>" + innerResponse.data[itr]["question"] + "</td>" +
                                            "<td style='word-wrap: break-word;max-width: 200px;' id='rightAnswr_response_analysis_"+itr+"'>" + innerResponse.data[itr]["answer"] + "</td>" +
                                            "<td style='word-wrap: break-word;max-width: 200px;' id='ipAddress_response_analysis_"+itr+"'>" + innerResponse.data[itr]["ipAddress"] + "</td>" +
                                            "<td style='word-wrap: break-word;max-width: 200px;' id='DateTime_response_analysis_"+itr+"'>" + innerResponse.data[itr]["dateTime"] + "</td>" +
                                            "<td style='display:none' id='givenFeedback_response_analysis_"+itr+"' name='"+feedBackLogData[raLogItem].id+"'>"+ feedBackLogData[raLogItem].answer +"</td>" +
                                            "<td><div style='display: flex'>&nbsp; &nbsp; &nbsp; <span style='cursor:pointer' id='dislike_response_analysis_"+itr+"_icon' name='active'><button type='button' class='btn btn-outline-brand btn-elevate btn-circle btn-icon active userActivityLog' name='dislike' id='dislike_response_analysis_" + itr + "' onclick='writeFeedback(this,1)' data-toggle='modal' data-target='#kt_modal_feedback'><i class='far fa-thumbs-down'></i></button></span></div></td>" +
                                            "</tr>";
                                            jQuery("#tablebodyForQuestions").append(row);
                                            raFound = true;
                                            break;
                                        }
                                    }
        
                                    if(!raFound){
                                        var row = "<tr>" +
                                        "<td style='word-wrap: break-word;max-width: 200px;' id='rightQues_response_analysis_"+itr+"'>" + innerResponse.data[itr]["question"] + "</td>" +
                                        "<td style='word-wrap: break-word;max-width: 200px;' id='rightAnswr_response_analysis_"+itr+"'>" + innerResponse.data[itr]["answer"] + "</td>" +
                                        "<td style='word-wrap: break-word;max-width: 200px;' id='ipAddress_response_analysis_"+itr+"'>" + innerResponse.data[itr]["ipAddress"] + "</td>" +
                                        "<td style='word-wrap: break-word;max-width: 200px;' id='DateTime_response_analysis_"+itr+"'>" + innerResponse.data[itr]["dateTime"] + "</td>" +
                                        "<td style='display:none' id='givenFeedback_response_analysis_"+itr+"' name='response'></td>" +
                                        "<td><div style='display: flex'>&nbsp; &nbsp; &nbsp; <span style='cursor:pointer' id='dislike_response_analysis_"+itr+"_icon' name='inactive'><button type='button' class='btn btn-outline-brand btn-elevate btn-circle btn-icon active userActivityLog' name='dislike' id='dislike_response_analysis_" + itr + "' onclick='writeFeedback(this,1)' data-toggle='modal' data-target='#kt_modal_feedback'><i class='flaticon-like'></i></button></span></div></td>" +
                                        "</tr>";
                                        jQuery("#tablebodyForQuestions").append(row);
                                    }
                                } 
                                responseAnalysisPagination(jsonResponse.data, totalResponseCount);
                            }
                            jQuery("#showLoadGif").hide();
                        }
                        else{
                            jQuery("#tablebodyForQuestions").html("No Responses yet…");
                            jQuery("#showLoadGif").hide();
                        }
                    })
                    .fail(function(innerResponse){
                        swalWithBootstrapButtons.fire
                        ({
                            text: api_endpoint+' -> '+ innerResponse.status+' -> '+ innerResponse.statusText,
                            icon: "error",
                            confirmButtonText: 'Okay'
                        });
                        jQuery("#showLoadGif").hide();
                    })
                }
                if(name == "Wrong Answers")
                {
                    var innerform = new FormData();
                    innerform.append("botResponse", JSON.stringify(response["wrongQuestionsData"]));
                    innerform.append("filterDays", filterDays);
                    innerform.append("questionKey","Wrong_Questions");
                    innerform.append("answerKey", "Wrong_Answers");
                    innerform.append("rowCount",rowCountResponseAnalysis);
                    innerform.append("startPosition",startPositionResponseAnalytics);
                    var innerSettings = {
                        "url": url_resource + "/syraconsumer/fetch-bot-response-with-time",
                        "method": "POST",
                        "timeout": 0,
                        "headers": {
                            "Authorization": "Bearer " + access_token
                        },
                        "processData": false,
                        "mimeType": "multipart/form-data",
                        "contentType": false,
                        "data": innerform
                    };
                    jQuery.ajax(innerSettings).done(function (innerResponse) {
                        var jsonResponse = JSON.parse(innerResponse);
                        innerResponse = JSON.parse(innerResponse);
                        if(innerResponse["status"] == 200){
                            jQuery("#tablebodyForQuestions").html("");
                            if(innerResponse.data.length == 0)
                            {
                                jQuery("#tablebodyForQuestions").hide();
                                jQuery("#answerPercentageLogs").hide();
                                jQuery("#noRecord").show();
                            }
                            else{
                                jQuery("#noRecord").hide();
                                jQuery("#tablebodyForQuestions").show();
                                jQuery("#answerPercentageLogs").show();
                                var waFound = false;
                                for (var itr = 0; itr < innerResponse.data.length; itr++) 
                                {
                                    innerResponse.data[itr]["dateTime"] = innerResponse.data[itr]["dateTime"].replace("T", " ").replace("Z","");
                                    if(innerResponse.data[itr]["answer"].length > 100){
                                            innerResponse.data[itr]["answer"] = innerResponse.data[itr]["answer"].substring(0,99) + "....";
                                        }
                                    waFound = false;
                                    for(var waLogItem = 0; waLogItem < feedBackLogData.length; waLogItem++){
                                        waLogDateTime = feedBackLogData[waLogItem].logDateTime.replace("T", " ").replace("Z","");
                                        if(waLogDateTime == innerResponse.data[itr]["dateTime"] && feedBackLogData[waLogItem].pageName == "Response"){
                                            var row = "<tr>" +
                                                "<td id='rightQues_response_analysis_"+itr+"'>" + innerResponse.data[itr]["question"] + "</td>" +
                                                "<td id='rightAnswr_response_analysis_"+itr+"'>" + innerResponse.data[itr]["answer"] + "</td>" +
                                                "<td id='ipAddress_response_analysis_"+itr+"'>" + innerResponse.data[itr]["ipAddress"] + "</td>" +
                                                "<td id='DateTime_response_analysis_"+itr+"'>" + innerResponse.data[itr]["dateTime"] + "</td>" +
                                                "<td style='display:none' id='givenFeedback_response_analysis_"+itr+"' name='"+feedBackLogData[waLogItem].id+"'>"+ feedBackLogData[waLogItem].answer +"</td>" +
                                                "<td><div style='display: flex'>&nbsp; &nbsp; &nbsp; <span style='cursor:pointer' id='dislike_response_analysis_"+itr+"_icon' name='active'><button type='button' class='btn btn-outline-brand btn-elevate btn-circle btn-icon active userActivityLog' name='dislike' id='dislike_response_analysis_" + itr + "' onclick='writeFeedback(this,1)' data-toggle='modal' data-target='#kt_modal_feedback'><i class='far fa-thumbs-down'></i></button></span></div></td>" +
                                            "</tr>";
                                            jQuery("#tablebodyForQuestions").append(row);
                                            waFound = true;
                                            break;
                                        }
                                    }
        
                                    if(!waFound){
                                        var row = "<tr>" +
                                            "<td id='rightQues_response_analysis_"+itr+"'>" + innerResponse.data[itr]["question"] + "</td>" +
                                            "<td id='rightAnswr_response_analysis_"+itr+"'>" + innerResponse.data[itr]["answer"] + "</td>" +
                                            "<td id='ipAddress_response_analysis_"+itr+"'>" + innerResponse.data[itr]["ipAddress"] + "</td>" +
                                            "<td id='DateTime_response_analysis_"+itr+"'>" + innerResponse.data[itr]["dateTime"] + "</td>" +
                                            "<td style='display:none' id='givenFeedback_response_analysis_"+itr+"' name='response'></td>" +
                                            "<td><div style='display: flex'>&nbsp; &nbsp; &nbsp; <span style='cursor:pointer' id='dislike_response_analysis_"+itr+"_icon' name='inactive'><button type='button' class='btn btn-outline-brand btn-elevate btn-circle btn-icon active userActivityLog' name='dislike' id='dislike_response_analysis_" + itr + "' onclick='writeFeedback(this,1)' data-toggle='modal' data-target='#kt_modal_feedback'><i class='flaticon-like'></i></button></span></div></td>" +
                                        "</tr>";
                                        jQuery("#tablebodyForQuestions").append(row);
                                    }
                                }
                                responseAnalysisPagination(jsonResponse.data, totalResponseCount);
                            }
                            jQuery("#showLoadGif").hide();
                        }
                        else{
                            jQuery("#tablebodyForQuestions").html("No Responses yet…");  
                            jQuery("#showLoadGif").hide();                  
                        }
                        
                    })
                    .fail(function(innerResponse){
                        swalWithBootstrapButtons.fire
                        ({
                            text: api_endpoint+' -> '+ innerResponse.status+' -> '+ innerResponse.statusText,
                            icon: "error",
                            confirmButtonText: 'Okay'
                        });
                        jQuery("#showLoadGif").hide();
                    })
                    
                }
            }
            else{
                jQuery("#showLoadGif").hide();
            }
        }
    })
    .fail(function(response) 
    {           
        var APIerrorMsg='<span style="margin-left:5%;margin-bottom:18%;color:red;font-size:12px;">'+api_endpoint+' -> '+response.status + ' -> </span>';  

		jQuery("#showLoadGif").html(APIerrorMsg);

        swalWithBootstrapButtons.fire
        ({
            text: api_endpoint+' -> '+response.status+' -> '+response.statusText,
            icon: "error",
            confirmButtonText: 'Okay'
        });
	jQuery("#showLoadGif").hide();
    });
}

function updateKBaseURL() {
    var webURL=jQuery("#editKnowledgeBaseURLUrl").val();
    if(webURL=="" || webURL==undefined || webURL==null)
    {
           swalWithBootstrapButtons.fire
            ({
                title: "Error!",
                text: 'Website URL is not valid !!',
                icon: "error",
                button: "OK",
            });
        return;
    }
    if(!isUrlValid(jQuery('#editKnowledgeBaseURLUrl').val()))
    {
            swalWithBootstrapButtons.fire
            ({
                title: "Error!",
                text: 'Website URL is not valid. Please enter a valid URL!',
                icon: "error",
                button: "OK",
            });
         return;
    }



    var recursive='n';
    var url=jQuery('#editKnowledgeBaseURLUrl').val();
    var id = jQuery('#editKnowledgeBaseURLId').val();
    var recursiveBoxisChecked=jQuery('input:checkbox[id=editKnowledgeBaseURLrecursiveBox]').is(':checked');

    if(recursiveBoxisChecked)
    {
        recursive='y';
    }
    else
    {
        recursive='n';
    }

    var form = new FormData();
    form.append("botdeploymentId", botDeploymentId);
    form.append("recursive", recursive);
    form.append("url", url);
    form.append("id", id);

    var settings =
    {
        "async": true,
        "url": url_resource + "/syraconsumer/update-knowledge-base",
        "method": "POST",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form,
        headers: {
            'Authorization': 'Bearer '+access_token,
        }
    }
    jQuery.ajax(settings).done(function (response) 
    {
        response = JSON.parse(response);
        if (response.status === 200) 
        {
            retriveKnowledgeBase();
            swalWithBootstrapButtons.fire("Updated!", "Training URL is Updated!", "success");
        }
        else 
        {
            swalWithBootstrapButtons.fire("Error!", response.message, "error");
        }
    })
    .fail(function (response)
    {
        swalWithBootstrapButtons.fire("API Error!", 'update-knowledge-base' + ' -> ' + response.status + ' -> ' + response.statusText, "error");
    });
}

function saveBotDeployment(){
    jQuery("#msgArea").html('<img src="'+wp_path+'"images/syra-spinner.gif" height="35" style="margin-left:25%;"/>');
    jQuery("#deployBotMsgArea").html("");
    jQuery("#deployBotMsgArea").html('<img src="'+wp_path+'"images/syra-spinner.gif" height="35" style="margin-left:45%;"/>');
    var form = new FormData();
    form.append("id", botDeploymentId);
    form.append("customerId", email);
    form.append("domainId", domainId_id);
    form.append("isPlanActive", "1");
    form.append("question1", jQuery('#txt_q1').val());
    form.append("displayValueOfQuestion1", jQuery('#txt_display1').val());
    form.append("answerUrl1", jQuery('#txt_answer1').val());
    form.append("question2", jQuery('#txt_q2').val());
    form.append("displayValueOfQuestion2", jQuery('#txt_display2').val());
    form.append("answerUrl2", jQuery('#txt_answer2').val());
    form.append("question3", jQuery('#txt_q3').val());
    form.append("displayValueOfQuestion3", jQuery('#txt_display3').val());
    form.append("answerUrl3", jQuery('#txt_answer3').val());
    form.append("question4", jQuery('#txt_q4').val());
    form.append("displayValueOfQuestion4", jQuery('#txt_display4').val());
    form.append("answerUrl4", jQuery('#txt_answer5').val());
    form.append("question5", jQuery('#txt_q5').val());
    form.append("displayValueOfQuestion5", jQuery('#txt_display5').val());
    form.append("answerUrl5", jQuery('#txt_answer5').val());

    var settings = {
        "async": true,
        "url": url_resource + "/syraconsumer/update-botDeploment-trainingPage",
        "method": "POST",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form,
        headers: {
            'Authorization': 'Bearer '+access_token,
        }
    }

    jQuery.ajax(settings).done(function (response) {
        response = JSON.parse(response);

        if(response.status === 200)
        {
            var innerform = new FormData();
            innerform.append("customerId", email);
            innerform.append("step", "3a");
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
                jQuery("#msgArea").html("<b><font style='color:#5A679E'>Updation Done</font></b>");
                jQuery("#deployBotMsgArea").html("<b><font style='color:#5A679E'>Updation Done</font></b>");
                swal({
                    title: "Update successful",
                    text: "You can Preview your changes if you want to!",
                    icon: "success",
                    button: "Ok",

                })
            })
            .fail(function(innerresponse) 
            {           

                swal({
                    title: "API Error!",
                    text: 'create-wizard-track'+' -> '+innerresponse.status+' -> '+innerresponse.statusText,
                    icon: "error",
                    button: "OK",
                });

            });

        }
        else{
            jQuery("#msgArea").html("<b><font style='color:#5A679E;font-size:9x'>"+response.message+"</font></b>")
        }
    })
    .fail(function(response) 
    {           
        jQuery("#deployBotMsgArea").html("<b><font style='color:#5A679E'>"+response.status+"</font></b>");
        jQuery("#msgArea").html("<b><font style='color:#5A679E'>"+'update-botDeploment'+' -> '+response.status+' -> '+response.statusText+"</font></b>");
        swal
        ({
            title: "API Error!",
            text: 'update-botDeploment-trainingPage'+' -> '+response.status+' -> '+response.statusText,
            icon: "error",
            button: "OK",
        });


    });
}


var selectedPageResponseAnalytics = 0;
var startPositionResponseAnalytics = 0;
var upperBoundResponseAnalytics = 8;
var lastPageIndexResponseAnalytics=0;//  To track the last page index.
var firstPageIndexResponseAnalytics=0;// To track the first page index.

function responseAnalysisPagination(data, totalRowResponseAnalytics){
    jQuery("#paginationResponseAnalyticsDiv").html('');
    if (data.length > 0) {
        var tmp = totalRowResponseAnalytics / 20;//dividing total rows by page size(20)
        var numberOfPagesResponseAnalytics = Math.ceil(tmp);
        lastPageIndexResponseAnalytics = numberOfPagesResponseAnalytics;

        if (numberOfPagesResponseAnalytics <= 6)//dotdot button will not come here 
        {
            var paginationHTML = '<ul class="pagination pull-right">';
            paginationHTML += '<li class="page-item"><a class="page-link" name="prev" onclick="paginationResponseAnalytics(this)" href="javascript:void(0)">Previous</a></li>';
            var itr = 0;

            var startLoopAt = 0;
            selectedPageResponseAnalytics = parseInt(selectedPageResponseAnalytics);
            startLoopAt = 0;
            upperBoundResponseAnalytics = numberOfPagesResponseAnalytics;

            for (var itr = startLoopAt; itr < upperBoundResponseAnalytics; itr++) {
                pageNoResponseAnalytics = itr + 1;
                if (itr < upperBoundResponseAnalytics) {
                    if (itr == startPositionResponseAnalytics / 20) {
                        paginationHTML += '<li class="page-item active"><a class="page-link " name="' + itr + '" onclick="paginationResponseAnalytics(this)" href="javascript:void(0)">' + pageNoResponseAnalytics + '</a></li>';
                    }
                    else {
                        paginationHTML += '<li class="page-item"><a class="page-link " name="' + itr + '" onclick="paginationResponseAnalytics(this)" href="javascript:void(0)">' + pageNoResponseAnalytics + '</a></li>';
                    }
                }
            }
            paginationHTML += '<li class="page-item"><a class="page-link " name="next" onclick="paginationResponseAnalytics(this)" href="javascript:void(0)">Next</a></li>';
            paginationHTML += '</ul>';
        }
        else//dotdot button will come here 
        {
            var paginationHTML = '<ul class="pagination pull-right">';
            paginationHTML += '<li class="page-item"><a class="page-link " name="prev"  onclick="paginationResponseAnalytics(this)" href="javascript:void(0)">Previous</a></li>';
            var itr = 0;
            var dotdotBtn = true;
            var startLoopAt = 0;
            selectedPageResponseAnalytics = parseInt(selectedPageResponseAnalytics);
            //This selection will helps to make pagination work properly
            if (selectedPageResponseAnalytics < 6) {
                startLoopAt = 0;
                upperBoundResponseAnalytics = 8;

            }
            else if (selectedPageResponseAnalytics => 6)//if you click on 7 or more
            {
                startLoopAt = selectedPageResponseAnalytics - 1;

                var NthValue = Math.ceil(totalRow / 20);
                var diffBetween2 = NthValue - (selectedPageResponseAnalytics + 1);
                if (diffBetween2 < 3) {
                    upperBoundResponseAnalytics = NthValue;
                    dotdotBtn = false;
                }
                else if (diffBetween2 => 3) {
                    upperBoundResponseAnalytics = selectedPageResponseAnalytics + 2;
                    dotdotBtn = true;
                }
            }
            if (!dotdotBtn) {
                paginationHTML += '<li class="page-item"><a class="page-link " name="0" onclick="paginationResponseAnalytics(this)" href="javascript:void(0)">1</a></li>';
                paginationHTML += '<li class="page-item"><a class="page-link" href="javascript:void(0)">....</a></li>';
            }
            for (var itr = startLoopAt; itr < totalRowResponseAnalytics / 20; itr++) {
                pageNoResponseAnalytics = itr + 1;
                if (itr < upperBoundResponseAnalytics) {
                    if (itr == startPositionResponseAnalytics / 20) {
                        paginationHTML += '<li class="page-item active"><a class="page-link" name="' + itr + '" onclick="paginationResponseAnalytics(this)" href="javascript:void(0)">' + pageNoResponseAnalytics + '</a></li>';
                    }
                    else {
                        paginationHTML += '<li class="page-item"><a class="page-link" name="' + itr + '" onclick="paginationResponseAnalytics(this)" href="javascript:void(0)">' + pageNoResponseAnalytics + '</a></li>';
                    }
                }
            }
            if (dotdotBtn) {
                itr -= 1;
                paginationHTML += '<li class="page-item"><a class="page-link" href="javascript:void(0)">....</a></li>';
                if (itr == startPositionResponseAnalytics / 20) {
                    paginationHTML += '<li class="page-item active"><a class="page-link" name="' + itr + '" onclick="paginationResponseAnalytics(this)" href="javascript:void(0)">' + pageNoResponseAnalytics + '</a></li>';
                }
                else {
                    paginationHTML += '<li class="page-item"><a class="page-link" name="' + itr + '" onclick="paginationResponseAnalytics(this)" href="javascript:void(0)">' + pageNoResponseAnalytics + '</a></li>';
                }
                paginationHTML += '<li class="page-item"><a class="page-link " name="next"  onclick="paginationResponseAnalytics(this)" href="javascript:void(0)">Next</a></li>';
            }
            paginationHTML += '</ul>';
        }
        jQuery("#paginationResponseAnalyticsDiv").html(paginationHTML);
        jQuery(".main-content-inner").css("overflow-x", "scroll");
    }
}

/* training.html */


/* used only on settings.html and setup-wizard.html page */
function customerFetch(){
    var form = new FormData();
    form.append("email", email);

    var settings = 
    {
        "async": true,
        "url": url_resource + "/syraconsumer/customer-fetch",
        "method": "POST",
        headers: {
            'Authorization': 'Bearer '+access_token,
        },
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
    }
    jQuery.ajax(settings).done(function (response) {

        response = JSON.parse(response);
        if (response.length > 0)                 
        {
            /* 1st tab data */
            if(response[0].fName.includes(" ")){
                response[0].fName = response[0].fName.split(' ')[0];
            }
            jQuery("#txt_fname").val(response[0].fName);
            jQuery("#txt_lname").val(response[0].lName);
            jQuery("#txt_email").val(response[0].email);
            jQuery("#txt_title").val(response[0].jobTitle);
            /* 2nd tab data */
            var address = "";
            if(response[0].address1 == "undefined"){
                response[0].address1 = "";
                //address = response[0].address2;
            }
            if(response[0].address2 == "undefined"){
                response[0].address2 = "";
                //address = response[0].address1;
            }
            // else if(response[0].address1 != "undefined" && response[0].address2 != "undefined")
            // {
            //     address = response[0].address1 + " " + response[0].address2;
            // }
            jQuery("#txt_add").val(response[0].address1);
            jQuery("#txt_address2").val(response[0].address2);
            jQuery("#txt_city").val(response[0].city);
            if(response[0].country == "null" || response[0].country == "undefined")
            {
                response[0].country = "";
            }
            jQuery("#txt_country").val(response[0].country);
            jQuery("#txt_zip").val(response[0].zipCode);
            jQuery("#txt_title").val(response[0].jobTitle);
            jQuery("#txt_contact").val(response[0].contactNo);
            /* 3rd tab data */
            if(response[0].company.length > 0){
                jQuery("#txt_company").val(response[0].company[0].companyName);
                jQuery("#txt_web").val(response[0].company[0].websiteURL);
                jQuery("#txt_fb").val(response[0].company[0].fbPageURL);
                jQuery("#txt_tax").val(response[0].company[0].taxInformation);
            }
            else{
                jQuery("#txt_company").val("");
                jQuery("#txt_web").val("");
                jQuery("#txt_fb").val("");
            }
            
            /* All hidden fields */
            jQuery("#txt_passwd").val(response[0].password);
            jQuery("#txt_add2").val(response[0].address2);
            jQuery('#sel_planid option[value="' + response[0].plan[0].planType[0].id + '"]').attr("selected", "selected");
            jQuery("#text_planMeantFor").val(response[0].plan[0].planType[0].meantFor);
            jQuery("#txt_advanceTraining").val(response[0].plan[0].advanceTraining);
            jQuery("#txt_allowBotLimit").val(response[0].plan[0].allowBotLimit);
            jQuery("#txt_contractInMonth").val(response[0].plan[0].contractInMonth);
            jQuery("#txt_entity").val(response[0].plan[0].entity);
            jQuery("#txt_facebookEmbedding").val(response[0].plan[0].facebookEmbedding);
            jQuery("#txt_initialTraining").val(response[0].plan[0].initialTraining);
            jQuery("#txt_intent").val(response[0].plan[0].intent);
            jQuery("#txt_kikEmbedding").val(response[0].plan[0].kikEmbedding);
            jQuery("#txt_knowledgeSpecification").val(response[0].plan[0].knowledgeSpecification);
            jQuery("#txt_logRetainingDay").val(response[0].plan[0].logRetainingDay);
            jQuery("#txt_monthlyCharge").val(response[0].plan[0].monthlyCharge);
            jQuery("#txt_scrapping").val(response[0].plan[0].scrapping);
            jQuery("#txt_setupFees").val(response[0].plan[0].setupFees);
            jQuery("#txt_siteSpecification").val(response[0].plan[0].siteSpecification);
            jQuery("#txt_skypeEmbedding").val(response[0].plan[0].skypeEmbedding);
            jQuery("#txt_slackEmbedding").val(response[0].plan[0].slackEmbedding);
            jQuery("#txt_supportDetails").val(response[0].plan[0].supportAvailability[0].description);
            jQuery("#txt_telegramEmbedding").val(response[0].plan[0].telegramEmbedding);
            jQuery("#txt_textQueryPermonth").val(response[0].plan[0].textQueryPermonth);
            jQuery("#txt_websiteEmbedding").val(response[0].plan[0].websiteEmbedding);
        
        }
        else 
        {
            swalWithBootstrapButtons.fire
            ({
                text: 'customer-fetch' + ' - ' + response.message,
                icon: "error",
                confirmButtonText: 'Okay'
                
            });

        }

    })
    .fail(function(response) 
    {           
        
        swalWithBootstrapButtons.fire({
            text: 'customer-fetch'+' -> '+response.status+' -> '+response.statusText,
            icon: "error",
            confirmButtonText: 'Okay'
        });
    });
}
/* End */
function ingestRestData(api_key,api_secret,shop,username,password, comingFromRefreshIcon)
{
    var form2 = new FormData();
    form2.append("api_key", api_key);
    form2.append("api_secret", api_secret);
    form2.append("shop", shop);
    form2.append("username", username);
    form2.append("password", password);
    form2.append("access-token", shopify_access_token);
    form2.append("comingFromRefreshIcon",comingFromRefreshIcon);
    var settings =
    {
        "async": true,
        "url": url_resource + "/syraconsumer/populate-full-data-to-shopify-database",
        "method": "POST",
        headers: {
            'Authorization': 'Bearer '+access_token,
        },
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form2
    }
    jQuery.ajax(settings).done(function (response1) 
    {

        response1=JSON.parse(response1);
        // getShopifyProductIngestStatus(username);
        
    })
    .fail(function (response) 
    {                    
        swalWithBootstrapButtons.fire
        ({
            text: 'populate-shopify-database' + ' -> ' + response.status + ' -> ' + response.statusText,
            icon: "error",
            confirmButtonText: 'Okay'
        });
    });
    

}

function ingestAllData(){
    jQuery("#spinDataIngection").html('<img src="'+wp_path+'"images/syra-spinner.gif" height="35"/>');   
    jQuery("#btnFetchShopifyData").prop("disabled", true);
    jQuery('#popupCautionModal').modal("toggle");
    var api_key = "";
    var api_secret = "";
    var shop = shopify_store_name;
    var username = userCredentials["domainId"] + "_" + userCredentials["uuid"];
    var password="";
    var comingFromRefreshIcon = 1;
    if(typeof userCredentials["domainId"] !== "undefined" && typeof userCredentials["uuid"] !== "undefined"){
        ingestRestData(api_key,api_secret,shop,username,password,comingFromRefreshIcon);
    }
   
}

function template(data) {
    var html = '<ul>';
    $.each(data, function(index, item){
        html += '<li>'+ item +'</li>';
    });
    html += '</ul>';
    return html;
}

function log(content) {
  window.console && console.log(content);
}

function getShopifyStorePromotion(){
    var innerform = new FormData();
    innerform.append("shop", shopify_store_name);
    innerform.append("access-token", shopify_access_token);
    var settings = {
        "url":  url_resource + "/syraconsumer/shopify-store-promotion-checker",
        "method": "POST",
        "timeout": 0,
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": innerform
    };
    jQuery.ajax(settings).done(function (innerResponse) {
        var jsonInnerResponse = JSON.parse(innerResponse);
        if(jsonInnerResponse["isPromotion"] == true){
            var dbname = selectedDomainId + "_" + uuid;
            var form = new FormData();
            form.append("dbname", dbname);
            var settings =
            {
                "async": true,
                "url": url_resource + "/syraconsumer/get-shopify-promtion-table-data",
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

                response=JSON.parse(response);
                if(response.status===200)
                {   
                    var tablerow = '';
                    var promotionStatus = '';
                    for(var item = 0; item < response.data.length; item ++)
                    {
                        if(response.data[item].ends_at == null){
                            promotionStatus = "NA";
                        }
                        else{
                            promotionStatus = response.data[item].ends_at;
                            // promotionEndDate = new Date(response.data[item].ends_at);
                            // promotionStartDate = new Date(response.data[item].starts_at);
                            // if(diff_minutes(promotionEndDate, promotionStartDate)<=0){
                            //     promotionStatus = "Expired";
                            // }
                            // else{
                            //     promotionStatus = "Active";
                            // }
                        }
                        var newTableRow = '<tr>'+
                                '<td>'+
                                    '<textarea class="form-control kt-form-control--transparent kt-form-control--none-resizable" rows="2" readonly>' + response.data[item].product_name + '</textarea>'+
                                '</td>'+
                                '<td>'+
                                    '<textarea class="form-control kt-form-control--transparent kt-form-control--none-resizable" rows="2" readonly>' + response.data[item].product_variants + '</textarea>'+
                                '</td>'+
                                '<td>'+
                                    '<textarea class="form-control kt-form-control--transparent kt-form-control--none-resizable" rows="2" readonly>' + response.data[item].price + '</textarea>'+
                                '</td>'+
                                '<td>'+
                                    '<textarea class="form-control kt-form-control--transparent kt-form-control--none-resizable" rows="2" readonly>' + response.data[item].title + '</textarea>'+
                                '</td>'+
                                '<td class="kt_form_build_knowledge_base_training_questions_date">' + promotionStatus + '</td>'+
                            '</tr>';
                        tablerow = tablerow + newTableRow;
                        
                        // '<tr data-repeater-item><td><textarea class="form-control kt-form-control--transparent kt-form-control--none-resizable" rows="2">'+ response.data[item].question +'</textarea></td><td><textarea class="form-control kt-form-control--transparent kt-form-control--none-resizable" rows="2">'+ response.data[item].answer +'</textarea></td><td class="kt_form_build_knowledge_base_training_questions_date">'+ response.data[item].createdDate +'</td><td class="text-right" style="width:5%;"><a class="kt-link kt-font-bold" href="javascript:;" onclick="deleteTrainingQuestionsModal(\'' + response.data[item].id + '\')"><i class="fas fa-trash-alt" style="color: #472235"></i></a></td></tr>';                   
                    }
                    jQuery('#listedPromotionData').html(tablerow);
                }
                jQuery('#promotionDataTable').DataTable({
                    "pagingType": "simple_numbers",
                    stateSave: false,
                    "bDestroy": true
                });
            })
            .fail(function (response) 
            {                    
                swalWithBootstrapButtons.fire
                ({
                    text: 'fetch-shopify-store-promotion-data' + ' -> ' + response.status + ' -> ' + response.statusText,
                    icon: "error",
                    confirmButtonText: 'Okay'
                });
            });  
        }
        if(jsonInnerResponse["isPromotion"] == false){
            var truncateStoreForm = new FormData();
            truncateStoreForm.append("dbname", selectedDomainId + "_" + uuid);
            var settings = {
                "url":  url_resource + "/syraconsumer/truncate-store-promtion-data",
                "method": "POST",
                "processData": false,
                "mimeType": "multipart/form-data",
                "contentType": false,
                "data": truncateStoreForm
            };
            jQuery.ajax(settings).done(function (trncateStoreResponse) {
                var truncateStoreJsonResponse = JSON.parse(trncateStoreResponse);
                if(truncateStoreJsonResponse.status == 200){
                    
                }
            })
        }
    })
}

function diff_minutes(dt2, dt1) 
{

  var diff =(dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60;
  return (Math.round(diff));
  
}

function getExistingFBEmbedding(){
    var form = new FormData();
    form.append("email", email);

    var settings = {
    "url": url_resource + "/syraconsumer/fb-embedding-info",
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
        jQuery("#existingFBEmbed").remove();
        var jsonResponse = JSON.parse(response);
        var existingFbEmbedRow = '<div id="existingFBEmbed" class="row"></div>';
        
        jQuery("#embedFBList").append(existingFbEmbedRow);
        
        if(jsonResponse["data"].length != 0){
            jsonResponse["data"].forEach(element => {
                var append_New_Row = '<div class="col-lg-4">' +
                                        '<div class="form-group">' +
                                            '<label>Page Access Token</label>' +
                                            '<input type="text" class="form-control" value = "' + element["fbAccessToken"] + '">' +
                                        '</div>' +
                                    '</div>' + 
                                    '<div class="col-lg-4">' + 
                                        '<div class="form-group">' + 
                                            '<label>Page ID</label>' + 
                                            '<input id="pageId" type="text" class="form-control" value = "' + element["pageId"] + '">' + 
                                        '</div>' +
                                    '</div>' +
                                    '<div class="col-lg-4">' + 
                                        '<div class="form-group">' + 
                                            '<label>Chatbot Name</label>' + 
                                            '<input id="pageId" type="text" class="form-control" value = "' + element["chatbotName"] + '">' + 
                                        '</div>' +
                                    '</div>' ;
                jQuery("#existingFBEmbed").append(append_New_Row);
            });
        }
    })
    .fail(function(response){
        var APIerrorMsg='<span style="margin-left:5%;margin-bottom:18%;color:red;font-size:12px;">' + response.status + ' -> ' + response.statusText+'</span>';  
        jQuery("#existingFBEmbed").html(APIerrorMsg);
    })
}

function getExistingSlackEmbedding(){
    var form = new FormData();
    form.append("email", email);

    var settings = {
    "url": url_resource + "/syraconsumer/slack-embedding-info",
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
        jQuery("#existingSlackEmbed").remove();
        var jsonResponse = JSON.parse(response);
        var existingFbEmbedRow = '<div id="existingSlackEmbed" class="row"></div>';
        jQuery("#embedSlackList").append(existingFbEmbedRow);
        
        if(jsonResponse["data"].length != 0){
            jsonResponse["data"].forEach(element => {
                var append_New_Row = '<div class="col-lg-4">' +
                                        '<div class="form-group">' +
                                            '<label>Bot User OAuth access token</label>' +
                                            '<input type="text" class="form-control" value = "' + element["botAccessToken"] + '">' +
                                        '</div>' + 
                                    '</div>' +
                                    '<div class="col-lg-4">' +
                                        '<div class="form-group">' +
                                            '<label>Display Name</label>' +
                                            '<input type="text" class="form-control" value = "' + element["botDisplayName"] + '">' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="col-lg-4">' + 
                                        '<div class="form-group">' + 
                                            '<label>Chatbot Name</label>' + 
                                            '<input id="pageId" type="text" class="form-control" value = "' + element["chatbotname"] + '">' + 
                                        '</div>' +
                                    '</div>' ;
                jQuery("#existingSlackEmbed").append(append_New_Row);
            });
        }
    })
    .fail(function(response){
        var APIerrorMsg='<span style="margin-left:5%;margin-bottom:18%;color:red;font-size:12px;">' + response.status + ' -> ' + response.statusText+'</span>';  
        jQuery("#existingSlackEmbed").html(APIerrorMsg);
    })
}


function getFirstFiveProducts(limit, handle, title){
    // if(limit == ''){
    //     limit = '5';
    // }
    var form = new FormData();
    form.append("shop", shopify_store_name);
    form.append("access_token", shopify_access_token);
    form.append("title", title);
    form.append("handle", handle);
    form.append("limit", limit);
    form.append("dbname", (selectedDomainId + "_" + uuid));
    var datatableData = [];
    var settings = {
        "url":  url_resource + "/syraconsumer/get-shopify-recommended-product",
        "method": "POST",
        "timeout": 0,
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": form
    };

    jQuery.ajax(settings).done(function (response) {
        var jsonResponse = JSON.parse(response);
        if(jsonResponse["status"] == 200){
            if(jsonResponse["data"].length > 0){
                totalDisplayedProducts = jsonResponse["data"].length
                jsonResponse["data"] = removeDuplicates(jsonResponse["data"], 'product_id');
                for(var index = 0; index< jsonResponse["data"].length; index++){
                    var image= "";
                    if(jsonResponse.data[index]["image"] != null){
                        image = '<img class="imageStyle" src="' + jsonResponse.data[index]["image"] + '" onclick="openProductPage(' + "'" + jsonResponse.data[index]["handle"] + "'" +')"' +'/>';
                    } 
                    else{
                        image = '<img class="imageStyle" src="' + "assets/templates-icons/_none.png" + '" onclick="openProductPage(' + "'" + jsonResponse.data[index]["handle"] + "'" +')"' +'/>';
                    }
                    var description = jsonResponse.data[index]["product_name"] + "<br>" + jsonResponse.data[index]["handle"];
                    var checkbox = "";
                    if(jsonResponse.data[index]["isChecked"] == "yes"){
                        checkbox = '<label class="kt-switch" style="border-radius: 4px; padding: 4px 5px 0 5px;">' + 
                                        '<span>' +
                                            '<input class="userActivityLog" name="click_to_uncheck_product" type="checkbox" style="position: unset;" id="product_checking_' + jsonResponse.data[index]["product_id"] + '" onclick="recommendedProductsSelection(' + "'product_checking_" + jsonResponse.data[index]["product_id"] + "'" + ')" checked>' + 
                                            '<span>' + 
                                        '</span>' +'</span>' +
                                    '</label>' ;
                                    // '<button class="btn" onclick="uncheckRecommendedProduct(' + "'" + jsonResponse.data[index]["product_id"] + "'" + ')">Remove</button>';
                    }
                    else{
                        checkbox = '<label class="kt-switch" style="border-radius: 4px; padding: 4px 5px 0 5px;">' + 
                                        '<span>' +
                                            '<input type="checkbox" class="userActivityLog" name="click_to_check_product" style="position: unset;" id="product_checking_' + jsonResponse.data[index]["product_id"] + '" onclick="recommendedProductsSelection(' + "'product_checking_" + jsonResponse.data[index]["product_id"] + "'" + ')">' + 
                                            '<span>' + 
                                            '</span>' +'</span>' +
                                        '</label>';
                    }
                    datatableData.push(new Array(image, description, jsonResponse.data[index]["price"], checkbox))
                    // if(jsonResponse.data[index]["image"] != null){
                        
                    // }
                    
                }
            }
        }
        else{
            // getFirstFiveProducts('5', handle, title);
            //Do nothing
        }
        table = jQuery('#recommendedProducts').DataTable({
            "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
            "pagingType": "simple_numbers",
            columns: [
                { title: "" }, 
                { title: "Product Name" }, 
                { title: "Price($)" },
                { title: "Recommend?" }
            ],
            data: datatableData,
            stateSave: false,
            "bDestroy": true,
                'select': {
                'style': 'multi'
                },
            "order": [[ 1, "desc" ]]
        });
    })
    .fail(function(response){
        // jQuery("#tbodyForRecommendedProducts").html('No Products Exist');
    })
    
}

function openProductPage(image_url){
    window.location = image_url;
}

function openSwalForProductSearch(){
    swalWithBootstrapButtons.fire({
        title: 'Please add your product URL here.',
        input: 'text',
        inputAttributes: {
         autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Look up'
    })
    .then((result) => {
        if (result.value) {
            var productUrlArray = result.value.split('/');;
            var handleName = productUrlArray[productUrlArray.length - 1];
            if(handleName == ''){
                handleName = '';
            }
            getFirstFiveProducts('5',handleName,"");
        }
    })
}

function searchByProductName(element){
    if(event.key === 'Enter') {
        getFirstFiveProducts('5',"",element.value);       
    }
}

function searchRecommendedProducts(){
    var productName = jQuery("#productUrlName").val();
    getFirstFiveProducts('5',"",productName);
}

function recommendedProductsSelection(id){
    var currentSelectionFlag = jQuery("#" + id).is(":checked");
    if(currentSelectionFlag == true){
        var productsList = [];
        jQuery("#" + id).val("add");
        productsList.push({"productId" : id.split('_')[2], "action" : "add"});
        checkRecommendedProducts(productsList);
    }
    else{
        jQuery("#" + id).val("remove");
        jQuery("#" + id).attr("checked",false);
        var productsList = [];
        productsList.push({"productId" : id.split('_')[2], "action" : "remove"});
        uncheckRecommendedProduct(productsList);
    }
}

// jQuery('#recommendedProducts-select-all').on('click', function(){
//     var rows = table.rows({ 'search': 'applied' }).nodes();
//     jQuery('input[type="checkbox"]', rows).prop('checked', this.checked);
//  });

//  jQuery('#recommendedProducts tbody').on('change', 'input[type="checkbox"]', function(){
//     if(!this.checked){
//        var el = jQuery('#recommendedProducts-select-all').get(0);
//        if(el && el.checked && ('indeterminate' in el)){
//           el.indeterminate = true;
//        }
//     }
//  });    

function removeDuplicates(originalArray, prop) {
    var newArray = [];
    var lookupObject  = {};

    for(var item in originalArray) {
       lookupObject[originalArray[item][prop]] = originalArray[item];
    }

    for(item in lookupObject) {
        newArray.push(lookupObject[item]);
    }
     return newArray;
}

function showMoreRecommendedProducts(){
    var totalProducts = totalDisplayedProducts + 5;
    totalDisplayedProducts = totalProducts;
    getFirstFiveProducts(totalDisplayedProducts, '', '');
}

function checkRecommendedProducts(productsList){
    var form = new FormData();
    // form.append("dbname ", "10_e30f7093");
    form.append("dbname ", (selectedDomainId + "_" + uuid));
    form.append("product_id_list", JSON.stringify(productsList));

    var settings = {
        "url": url_resource + "/syraconsumer/modify-shopify-checked-status",
        "method": "POST",
        "timeout": 0,
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": form
    };

    jQuery.ajax(settings).done(function (response) {
        var jsonResponse = JSON.parse(response);
        if(jsonResponse.status == 200){
            getFirstFiveProducts('','','');
        }
    });
}

function uncheckRecommendedProduct(productsList){
    var form = new FormData();
    // form.append("dbname ", "10_e30f7093");
    form.append("dbname ", (selectedDomainId + "_" + uuid));
    form.append("product_id_list",JSON.stringify(productsList));

    var settings = {
        "url": url_resource + "/syraconsumer/modify-shopify-checked-status",
        "method": "POST",
        "timeout": 0,
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": form
      };
      
      jQuery.ajax(settings).done(function (response) {
        var jsonResponse = JSON.parse(response);
        if(jsonResponse.status == 200){
            getFirstFiveProducts('','','');
            // jQuery("#product_checking_" + productId).attr("checked",false);
        }
      })
      .fail(function(response){
          swalWithBootstrapButtons.fire("","Internal error occurred.", "error");
      })
}

function openProductPage(handleName){
    var productUrl = "https://" + shopify_store_name + "/products/" + handleName;
    window.open(productUrl, "_blank"); 
}

function getLastUserLocation(APIkey){
    var form = new FormData();
    form.append("APIkey", APIkey);

    var settings = {
    "url":  natura_url_resource + "/natura/get-last-user-geo-location",
    "method": "POST",
    "timeout": 0,
    "processData": false,
    "mimeType": "multipart/form-data",
    "contentType": false,
    "data": form
    };

    jQuery.ajax(settings).done(function (response) {
        var jsonResponse = JSON.parse(response);
        jQuery("#lastUserSessionLocation").html("Last User Session : " + jsonResponse["country"] + "/" + jsonResponse["city"]);
    });
}

function updateAllDetails(){
    updatePersonalDetails();
    updateCompanyDetails();
    updateContactDetails();
    setupWizardChatbot();
}

function displayPublishMessage(){
    if(userExitstingChatbot == false){
        swalWithBootstrapButtons.fire({
            text: "Please setup your Syra AI Chatbot first.",
            showCancelButton: true,
            confirmButtonText: 'Go to Customise'
            }).then((result) => {
            if (result.value) {
                setupWizardChatbot();
            }
        })
    }
}
function publishTabNavigation(){
    if(userExitstingChatbot == false){
        swalWithBootstrapButtons.fire({
            text: "Please setup your Syra AI Chatbot first.",
            showCancelButton: true,
            confirmButtonText: 'Go to Customise'
            }).then((result) => {
            if (result.value) {
                setupWizardChatbot();
            }
        })
    }
    else{
        window.location.href = "admin.php?page=syra-publish";
    }
}
function closeChatbot(){
    jQuery("#badge_text").hide();
    jQuery("#ChatWindow").hide();
    jQuery("#chatstart").hide();
    var activeSetupWizardContentTab = "";
    jQuery(".setup-wizard.active").each(function () {
        activeSetupWizardContentTab = jQuery(this).attr('id');
        if(activeSetupWizardContentTab == "kt_tabs_top_schedule_ai_model_training"){
            setupWizardTrain();
        }
    });
}

function showChatbot(){
    jQuery("#badge_text").show();
    setupWizardChatbot();
    chatbot();
}

function customizeToNavigation(){
    jQuery("#badge_text").hide();
    var form = new FormData();
    form.append("customerId", email);
    var settings = 
    {
        "async": true,
        "url": url_resource + "/syraconsumer/fetch-botDeploment",
        "method": "POST",
        headers: {
            'Authorization': 'Bearer '+access_token,
        },
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
    }
    jQuery.ajax(settings).done(function (response) {
        response = JSON.parse(response);
        if (response.length > 0) 
        {
            for (i = 0; i < response.length; i++) 
            {
                if (i == 0) 
                {
                    customizeBtnClick = false;
                    // updateBotDeployment(ques1,disp1,answ1,ques2,disp2,answ2,ques3,disp3,answ3,ques4,disp4,answ4,ques5,disp5,answ5,txt_website,txt_key)
                    updateBotDeployment(userCredentials, "setupWizardPage");
                }
            }
        }
        else
        {
            deployChatBot();
        }
    })
    .fail(function(response) 
    {           
        
        swalWithBootstrapButtons.fire
        ({
            text: 'fetch-botDeploment'+' -> '+response.status+' -> '+response.statusText,
            icon: "error",
            confirmButtonText: 'Okay'
        });
        
    
    });

}

function knowledgeBaseToNavigation(){
    userExistingTrainingUrls = true;
    if(setTrainingURLId == 0){
        setupWizardScheduleMeeting();
    }
    else{
        for(var elementId=0; elementId<setTrainingURLId; elementId++){
            var recusiveUrlCheck = jQuery("#recursiveBox_" + elementId).is(":checked");
            var recursiveValue = 'n';
            var search = jQuery("#webURL"+elementId).val();
            if(typeof search !== 'undefined'){
                if(recusiveUrlCheck){   
                    recursiveValue = "y";
                }
                else{
                    recursiveValue = "n";
                }
                addTrainingURLs(search, recursiveValue);
            }
        }
    }
    
}