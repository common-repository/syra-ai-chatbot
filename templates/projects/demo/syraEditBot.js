function include(file) {
    var script = document.createElement('script');
    script.src = file;
    script.type = 'text/javascript';
    script.defer = true;

    document.getElementsByTagName('head').item(0).appendChild(script);
}

var baseUrl = document.getElementsByClassName("syraScript")[0].src.split("/");
baseUrl.pop();
baseUrl = baseUrl.join("/") + "/";
include(baseUrl + 'js/importedFilesAndLinks.js');
var sessionId = '';
var APIkey = "";
var botName = '';
var botColor = '';
var dbotColor = '';
var description = '';
var welcomeMsg = '';
var crossimg = '';
var thumbsupimg = '';
var thumbsdownimg = '';
var mailimg = '';
var textcol = '';
var btnimg = '';
var syraIconWithInChatBot = '';
var botResponseBackgroundColor = '';
var leadOnBtnBackgroundColor = '';
var widgetBackgroundColor = '';
var userQuestionBackgroundColor = '';
/* Image Carousel*/
var slideIndexDictionary_syra = {};
var slideIndex_syra = [1];
var slideId_syra = ["mySlides_syra_1"];
/* Image Carousel*/

function createsession() {
    sessionId = uuidv4();
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function getbase(color) {
    var e = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
    if(e != null){
        var t = parseInt(e[1], 16),
        a = parseInt(e[2], 16),
        i = parseInt(e[3], 16);
        t /= 255, a /= 255, i /= 255;
        var o, n = Math.max(t, a, i),
            s = Math.min(t, a, i),
            r = (n + s) / 2;
        if (n == s) o = 0;
        else {
            var l = n - s;
            switch (o = r > .5 ? l / (2 - n - s) : l / (n + s), n) {
                case t:
                    (a - i) / l + (a < i ? 6 : 0);
                    break;
                case a:
                    (i - t) / l + 2;
                    break;
                case i:
                    (t - a) / l + 4
            }
            6
        }
        o *= 100, o = Math.round(o), r *= 100, (r = Math.round(r)) > 50 ? (textcol = "#000000", crossimg = crossImageDarkBase, btnimg = SendBtnImageDarkBase, syraIconWithInChatBot = syraIconWithInChatBotDarkBase) : (textcol = "#ffffff", crossimg = crossImageLightBase, btnimg = SendBtnImageLightBase, syraIconWithInChatBot = syraIconWithInChatBotLightBase);
    }
}

function ColorLuminance(hex, lum) {

    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    lum = lum || 0;

    var rgb = "#",
        c, i;
    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i * 2, 2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ("00" + c).substr(c.length);
    }
    return rgb;
}


function getdeeperbase(color) {

    var e = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color),
        t = parseInt(e[1], 16),
        a = parseInt(e[2], 16),
        i = parseInt(e[3], 16);
    t /= 255, a /= 255, i /= 255;
    var o, n = Math.max(t, a, i),
        s = Math.min(t, a, i),
        r = (n + s) / 2;
    if (n == s) o = 0;
    else {
        var l = n - s;
        switch (o = r > .5 ? l / (2 - n - s) : l / (n + s), n) {
            case t:
                (a - i) / l + (a < i ? 6 : 0);
                break;
            case a:
                (i - t) / l + 2;
                break;
            case i:
                (t - a) / l + 4
        }
        6
    }
    o *= 100, o = Math.round(o), r *= 100, (r = Math.round(r)) > 50 ? (thumbsupimg = thumbsUpImageDarkBase, thumbsdownimg = thumbsDownImageDarkBase, mailimg = mailImageDarkBase) : (thumbsupimg = thumbsUpImageLightBase, thumbsdownimg = thumbsDownImageLightBase, mailimg = mailImageLightBase);
}

function startExecution() {

    response = [{ "name": "Syra Bot", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit adipiscing elit.", "chatbotIcon": "icon-14.png", "welcomeMessage": "Hi. I am Syra Bot and This is a Welcome Message", "backGroundColor": "9A306F", "widgetBackgroundColor": "E6E6E6", "userIcon": "young-lady.png", "botResponseBackgroundColor": "F8D3E3", "userQuestionBackgroundColor": "F9F2D8", "leadOnBtnBackgroundColor": "442262", "question1": "Question No 1", "displayValueOfQuestion1": "Question No 1", "answerUrl1": "Question No 1", "question2": "Question No 2", "displayValueOfQuestion2": "Question No 2", "answerUrl2": "Question No 2", "question3": "Question No 3", "displayValueOfQuestion3": "Question No 3", "answerUrl3": "Question No 3", "question4": "Question No 4", "displayValueOfQuestion4": "Question No 4", "answerUrl4": "Question No 4", "question5": "Question No 5", "displayValueOfQuestion5": "Question No 5", "answerUrl5": "Question No 5" }];

    //response = JSON.parse(response);

    botName = response[0].name;
    jQuery('#botName').html(botName);
    description = response[0].description;
    jQuery('#description').html(description);
    welcomeMsg = response[0].welcomeMessage;
    jQuery('#welcomeMsg').append(welcomeMsg);
    botColor = response[0].backGroundColor;
    dbotColor = ColorLuminance(botColor, -0.3);
    botResponseBackgroundColor = "#" + response[0].botResponseBackgroundColor;
    leadOnBtnBackgroundColor = "#" + response[0].leadOnBtnBackgroundColor;
    userQuestionBackgroundColor = "#" + response[0].userQuestionBackgroundColor;
    widgetBackgroundColor = "#" + response[0].widgetBackgroundColor;
    jQuery('.automated_syra').css("background", widgetBackgroundColor);
    jQuery('.chatBotIconBorder').css("border", widgetBackgroundColor + ' 6px solid');
    jQuery('#syraChatDiv_syra').css("background", widgetBackgroundColor);
    jQuery('#botHeader').css("background-color", "#" + botColor);
    jQuery('#botHeader').css("border-left", "1px solid #d4d4d4");
    getbase(botColor);
    getdeeperbase(dbotColor);
    jQuery('#botName').css("color", textcol);
    jQuery('#description').css("color", textcol);
    jQuery('#X_img').attr("src", crossimg);
    jQuery('#syraIconWithInChatBot').attr("src", syraIconWithInChatBot);
    jQuery('#thumbsup').attr("src", thumbsupimg);
    jQuery('#a_thumbsup').css("background-color", dbotColor);
    jQuery('#thumbsdown').attr("src", thumbsdownimg);
    jQuery('#a_thumbsdown').css("background-color", dbotColor);
    jQuery('#mail').attr("src", mailimg);
    jQuery('#a_mail').css("background-color", dbotColor);
    jQuery('#sendBtn').css("background", "url(" + btnimg + ") no-repeat center center #" + botColor);
    jQuery('#sendBtn').css("background-size", "34px auto");

    var div = document.createElement("div");
    div.setAttribute("style", "margin-bottom: 0px;display: -webkit-flex;-webkit-flex-wrap: wrap;display: flex;flex-wrap: wrap;");

    if (response[0].question1.trim() !== "" && response[0].displayValueOfQuestion1.trim() !== "") {
        var innerDiv = document.createElement("div");
        innerDiv.setAttribute("class", "leadOnUpperDiv");
        innerDiv.setAttribute("style", "top: 33px;width: auto;margin-bottom: 2px;left: 0;right: 0;");
        var a = document.createElement("a");
        a.setAttribute("href", "javascript:void(0)");
        a.setAttribute("name", response[0].question1);
        a.setAttribute("class", "leadOn");

        a.setAttribute("Id", "questionNo1");

        a.setAttribute("style", "font-size: 16px;padding: 4px 6px 2px 7px;border-radius: 16px;font-family: 'AvenirNextLTPro-Regular';background: " + leadOnBtnBackgroundColor + ";text-align: center;color: white;margin-right:5px;");
        a.innerHTML = response[0].displayValueOfQuestion1;
        innerDiv.append(a);
        div.append(innerDiv);
    } else if (response[0].question1.trim() !== "" && response[0].displayValueOfQuestion1.trim() === "") {
        var innerDiv = document.createElement("div");
        innerDiv.setAttribute("class", "leadOnUpperDiv");
        innerDiv.setAttribute("style", "top: 33px;width: auto;margin-bottom: 2px;left: 0;right: 0;");
        var a = document.createElement("a");
        a.setAttribute("href", "javascript:void(0)");
        a.setAttribute("name", response[0].question1);
        a.setAttribute("class", "leadOn");

        a.setAttribute("Id", "questionNo1");

        a.setAttribute("style", "font-size: 16px;padding: 4px 6px 2px 7px;border-radius: 16px;font-family: 'AvenirNextLTPro-Regular';background: " + leadOnBtnBackgroundColor + ";text-align: center;color: white;margin-right:5px;");
        a.innerHTML = response[0].question1;
        innerDiv.append(a);
        div.append(innerDiv);
    }

    if (response[0].question2.trim() !== "" && response[0].displayValueOfQuestion2.trim() !== "") {
        var innerDiv = document.createElement("div");
        innerDiv.setAttribute("class", "leadOnUpperDiv"); //sgr
        innerDiv.setAttribute("style", "top: 33px;width: auto;margin-bottom: 2px;left: 0;right: 0;");
        var a = document.createElement("a");
        a.setAttribute("href", "javascript:void(0)");
        a.setAttribute("name", response[0].question2);
        a.setAttribute("class", "leadOn");
        a.setAttribute("Id", "questionNo2");
        a.setAttribute("style", "font-size: 16px;padding: 4px 6px 2px 7px;border-radius: 16px;font-family: 'AvenirNextLTPro-Regular';background: " + leadOnBtnBackgroundColor + ";text-align: center;color: white;margin-right:5px;");
        a.innerHTML = response[0].displayValueOfQuestion2;
        innerDiv.append(a);
        div.append(innerDiv);
    } else if (response[0].question2.trim() !== "" && response[0].displayValueOfQuestion2.trim() === "") {
        var innerDiv = document.createElement("div");
        innerDiv.setAttribute("class", "leadOnUpperDiv"); //sgr
        innerDiv.setAttribute("style", "top: 33px;width: auto;margin-bottom: 2px;left: 0;right: 0;");
        var a = document.createElement("a");
        a.setAttribute("href", "javascript:void(0)");
        a.setAttribute("name", response[0].question2);
        a.setAttribute("class", "leadOn");
        a.setAttribute("Id", "questionNo2");
        a.setAttribute("style", "font-size: 16px;padding: 4px 6px 2px 7px;border-radius: 16px;font-family: 'AvenirNextLTPro-Regular';background: " + leadOnBtnBackgroundColor + ";text-align: center;color: white;margin-right:5px;");
        a.innerHTML = response[0].question2;
        innerDiv.append(a);
        div.append(innerDiv);
    }

    if (response[0].question3.trim() !== "" && response[0].displayValueOfQuestion3.trim() !== "") {
        var innerDiv = document.createElement("div");
        innerDiv.setAttribute("class", "leadOnUpperDiv"); //sgr
        innerDiv.setAttribute("style", "top: 33px;width: auto;margin-bottom: 2px;left: 0;right: 0;");
        var a = document.createElement("a");
        a.setAttribute("href", "javascript:void(0)");
        a.setAttribute("name", response[0].question3);
        a.setAttribute("class", "leadOn");
        a.setAttribute("Id", "questionNo3");
        a.setAttribute("style", "font-size: 16px;padding: 4px 6px 2px 7px;border-radius: 16px;font-family: 'AvenirNextLTPro-Regular';background: " + leadOnBtnBackgroundColor + ";text-align: center;color: white;margin-right:5px;");
        a.innerHTML = response[0].displayValueOfQuestion3;
        innerDiv.append(a);
        div.append(innerDiv);
    } else if (response[0].question3.trim() !== "" && response[0].displayValueOfQuestion3.trim() === "") {
        var innerDiv = document.createElement("div");
        innerDiv.setAttribute("class", "leadOnUpperDiv"); //sgr
        innerDiv.setAttribute("style", "top: 33px;width: auto;margin-bottom: 2px;left: 0;right: 0;");
        var a = document.createElement("a");
        a.setAttribute("href", "javascript:void(0)");
        a.setAttribute("name", response[0].question3);
        a.setAttribute("class", "leadOn");
        a.setAttribute("Id", "questionNo3");
        a.setAttribute("style", "font-size: 16px;padding: 4px 6px 2px 7px;border-radius: 16px;font-family: 'AvenirNextLTPro-Regular';background: " + leadOnBtnBackgroundColor + ";text-align: center;color: white;margin-right:5px;");
        a.innerHTML = response[0].question3;
        innerDiv.append(a);
        div.append(innerDiv);
    }


    if (response[0].question4.trim() !== "" && response[0].displayValueOfQuestion4.trim() !== "") {
        var innerDiv = document.createElement("div");
        innerDiv.setAttribute("class", "leadOnUpperDiv"); //sgr
        innerDiv.setAttribute("style", "top: 33px;width: auto;margin-bottom: 2px;left: 0;right: 0;");
        var a = document.createElement("a");
        a.setAttribute("href", "javascript:void(0)");
        a.setAttribute("name", response[0].question4);
        a.setAttribute("class", "leadOn");
        a.setAttribute("Id", "questionNo4");
        a.setAttribute("style", "font-size: 16px;padding: 4px 6px 2px 7px;border-radius: 16px;font-family: 'AvenirNextLTPro-Regular';background: " + leadOnBtnBackgroundColor + ";text-align: center;color: white;margin-right:5px;");
        a.innerHTML = response[0].displayValueOfQuestion4;
        innerDiv.append(a);
        div.append(innerDiv);
    } else if (response[0].question4.trim() !== "" && response[0].displayValueOfQuestion4.trim() === "") {
        var innerDiv = document.createElement("div");
        innerDiv.setAttribute("class", "leadOnUpperDiv"); //sgr
        innerDiv.setAttribute("style", "top: 33px;width: auto;margin-bottom: 2px;left: 0;right: 0;");
        var a = document.createElement("a");
        a.setAttribute("href", "javascript:void(0)");
        a.setAttribute("name", response[0].question4);
        a.setAttribute("class", "leadOn");
        a.setAttribute("Id", "questionNo4");
        a.setAttribute("style", "font-size: 16px;padding: 4px 6px 2px 7px;border-radius: 16px;font-family: 'AvenirNextLTPro-Regular';background: " + leadOnBtnBackgroundColor + ";text-align: center;color: white;margin-right:5px;");
        a.innerHTML = response[0].question4;
        innerDiv.append(a);
        div.append(innerDiv);
    }

    if (response[0].question5.trim() !== "" && response[0].displayValueOfQuestion5.trim() !== "") {
        var innerDiv = document.createElement("div");
        innerDiv.setAttribute("class", "leadOnUpperDiv"); //sgr
        innerDiv.setAttribute("style", "top: 33px;width: auto;margin-bottom: 2px;left: 0;right: 0;");
        var a = document.createElement("a");
        a.setAttribute("href", "javascript:void(0)");
        a.setAttribute("name", response[0].question5);
        a.setAttribute("class", "leadOn");
        a.setAttribute("Id", "questionNo5");
        a.setAttribute("style", "font-size: 16px;padding: 4px 6px 2px 7px;border-radius: 16px;font-family: 'AvenirNextLTPro-Regular';background: " + leadOnBtnBackgroundColor + ";text-align: center;color: white;margin-right:5px;");
        a.innerHTML = response[0].displayValueOfQuestion5;
        innerDiv.append(a);
        div.append(innerDiv);
    } else if (response[0].question5.trim() !== "" && response[0].displayValueOfQuestion5.trim() === "") {
        var innerDiv = document.createElement("div");
        innerDiv.setAttribute("class", "leadOnUpperDiv"); //sgr
        innerDiv.setAttribute("style", "top: 33px;width: auto;margin-bottom: 2px;left: 0;right: 0;");
        var a = document.createElement("a");
        a.setAttribute("href", "javascript:void(0)");
        a.setAttribute("name", response[0].question5);
        a.setAttribute("class", "leadOn");
        a.setAttribute("Id", "questionNo5");
        a.setAttribute("style", "font-size: 16px;padding: 4px 6px 2px 7px;border-radius: 16px;font-family: 'AvenirNextLTPro-Regular';background: " + leadOnBtnBackgroundColor + ";text-align: center;color: white;margin-right:5px;");
        a.innerHTML = response[0].question5;
        innerDiv.append(a);
        div.append(innerDiv);
    }

    jQuery("#syraChatInnerDiv").append(div);

    fetchBotDeploymentById(); //it is a mehod from editBotdeployment Page
}

function sendMsgByEnter(e) {
    if (e.keyCode == 13) {
        sendMsg();
    }
}

function sendMsg() {
    jQuery(".typingGif_syra").show();
    var msg = jQuery("#syraMsg").val().trim();
    var outGoingMsg = '<div class="outgoing_msg_syra">' +
        '<div class="outgoingmsg_in_syra">' +
        '<div class="out_you_syra">' +
        '<a href="#" class="chatBotIconBorder" style="border:' + widgetBackgroundColor + ' 6px solid; background: none !important"><img src="' + userIcon + '" class="userIconImg" /></a>' +
        '<div class="clear_syra"></div>' +
        '</div>' +
        '<div class="out_mess_text_syra" style="background-color:' + userQuestionBackgroundColor + '">' +
        '<p>' + msg + '</p>' +
        '</div>' +
        '<div class="timer_syra">' +
        '<span>now</span>' +
        '</div>' +
        '</div>' +
        '<div class="clear_syra"></div>' +
        '</div>';
    jQuery("#syraChatInnerDiv").append(outGoingMsg);
    jQuery("#syraMsg").val("");
    scrollDiv();
    callNaturaAPI(msg);
}

/* For Context Carrying */
var previousIntentName = "";
var previousEntityList = "";
/* End */

/* For Required Entity */
requiredIntent = "";
requiredEntityName = "";
fullFilledEntity = "[]";
/* End */

function callNaturaAPI(msg) {


    var incomingMsg = '<div class="incoming_msg_syra incoming_msg_padding_syra">' +
        '<div class="incomingmsg_in_syra">' +
        '<div class="incom_you_syra">' +
        '<a href="#"  class="chatBotIconBorder" style="border:' + widgetBackgroundColor + ' 6px solid;"><img class="SyraChatBotIcon"  src="' + syraIconWithInChatBotLightBase + '" alt="icon3"></a>' +
        '<div class="clear_syra"></div>' +
        '</div>' +
        '<div class="incom_mess_text_syra" style="background-color:' + botResponseBackgroundColor + '">' +
        '<p> Hi! I am Syra Cognitive Chatbot </p>' +
        '</div>' +
        '<div class="timer_syra timer1_syra">' +
        '<span>a second ago</span>' +
        '</div>' +
        '</div>' +
        '</div>';

    jQuery("#syraChatInnerDiv").append(incomingMsg);
    scrollDiv();
    jQuery(".typingGif_syra").hide();

}

function scrollDiv() {
    jQuery('.chartbox_main_syra').animate({
        scrollTop: jQuery("#syraChatDiv_syra").offset().top
    }, 1000);

    setTimeout(function() {
        jQuery("#syraChatDiv_syra").stop().animate({
            scrollTop: 9999999
        }, 500)
    }, 0000);
}



function chatbot() {

    var control_h = '' +

        '<link rel="stylesheet" type="text/css" href="' + styleCssLink + '">' +
        '<link rel="stylesheet" type="text/css" href="' + responsiveCssLink + '">' +

        '<script>' +
        'function startTheChat(){  jQuery( "#knowledgeBase_tab2" ).removeClass( "offset-md-1 col-md-10" ).addClass( "col-md-9" );jQuery("#deployment_tab3").removeClass("offset-md-1 col-md-10").addClass("col-md-9");jQuery("#goal_tab4").removeClass("offset-md-1 col-md-10").addClass("col-md-9"); jQuery("#design_tab1").removeClass("offset-md-1 col-md-10").addClass("col-md-9");  jQuery("#ChatWindow").fadeToggle(); jQuery("#chatstart").fadeToggle(); createsession(); } jQuery(document).on(\'click\', \'.leadOn\', function () {jQuery("#syraMsg").val(this.name);jQuery("#sendBtn").click();});' +
        '</script>' +

        '<script type="text/javascript">' +
        'function closeChat() { jQuery( "#knowledgeBase_tab2" ).removeClass( "col-md-9" ).addClass( "offset-md-1 col-md-10" );jQuery("#deployment_tab3").removeClass("col-md-9").addClass("offset-md-1 col-md-10");jQuery("#goal_tab4").removeClass("col-md-9").addClass("offset-md-1 col-md-10"); jQuery("#design_tab1").removeClass("col-md-9").addClass("offset-md-1 col-md-10");jQuery("#ChatWindow").fadeOut(300); jQuery("#chatstart").fadeToggle(); }' +
        '</script>';



    jQuery("head").append(control_h);

    var control_b = '' +
        '<a href="javascript:void(0)" id="chatstart" class="float_syra" style="display: none;" onclick="startTheChat()">' +
        '<span class="badge_taxbot_syra" style="font-size:9px;margin-right:28px;margin-top:-2px;background-color:#F6B20E;color: black;">Preview</span>' +
        '<img class="clickableChatBotIcon" src="' + syraIconWithInChatBotLightBase + '" height="100%" width="100%" style="margin-left: 20px;">' +
        '</a>' +
        '<div id="ChatWindow" class="wrapper_syra" style="position:fixed; bottom:0; right:10px;display : none;z-index: 10;">' +
        '<header id="botHeader">' +
        '<div class="header_main_syra">' +
        '<div class="close_me_syra">' +
        '<a href="javascript:void(0)" onclick="closeChat()">' +
        '<img id="X_img" class="chatBotCloseButton_syra" alt="close"/>' +
        '</a>' +
        '</div>' +
        '<div class="likes_syra">' +
        '<ul>' +
        '<li>' +
        '<a href="#" id="a_thumbsup" onclick="a_thumbsupClick()">' +
        '<span>' +
        '<img id="thumbsup" alt="icon"/>' +
        '</span>' +
        '</a>' +
        '</li>' +
        '<li>' +
        '<a href="#" id="a_thumbsdown" onclick="a_thumbsdownClick()">' +
        '<span>' +
        '<img id="thumbsdown" alt="icon1"/>' +
        '</span>' +
        '</a>' +
        '</li>' +
        '<li>' +
        '<a href="https://thirdeyedata.io/contact-us/" target="_blank" id="a_mail">' +
        '<span>' +
        '<img id="mail" alt="icon2" class="heightChangeIcon2_syra"/>' +
        '</span>' +
        '</a>' +
        '</li>' +
        '</ul>' +
        '<div class="clear_syra">' +
        '</div>' +
        '</div>' +
        '<div class="clear_syra">' +
        '</div>' +
        '<div class="header_hd_syra">' +
        '<div class="row">' +
        '<div class="col-2" style="padding-right: 0px !important;">' +
        '<img id="syraIconWithInChatBot" src="' + syraIconWithInChatBotLightBase + '" height="100%" width="100%" style="width:50px;"/>' +
        '</div>' +
        '<div class="col-10">' +
        '<div class="row" style="margin-top:2px;">' +
        '<h2 id="botName"></h2>' +
        '</div>' +
        '<div class="row">' +
        '<p id="description"></p>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</header>' +
        '<div >' +
        '<div class="chartbox_main_syra">' +
        '<div class="chart_box_syra" id="syraChatDiv_syra" style="overflow-y:scroll;border-left: 1px solid #d4d4d4;box-shadow: inset 0px 17px 8px -10px #CCC; background-color:' + widgetBackgroundColor + '">' +
        '<div class="msg_block_syra">' +
        '<div id="syraChatInnerDiv" style="padding-bottom:15px;">' +
        '<div class="incoming_msg_syra">' +
        '<div class="incomingmsg_in_syra">' +
        '<div class="incom_you_syra">' +
        '<a href="#" class="chatBotIconBorder" style="border:' + widgetBackgroundColor + ' 6px solid;">' +
        '<img class="SyraChatBotIcon" src="' + syraIconWithInChatBotLightBase + '" alt="icon3"/>' +
        '</a>' +
        '<div class="clear_syra">' +
        '</div>' +
        '</div>' +
        '<div class="incom_mess_text_syra" style="background-color:' + botResponseBackgroundColor + '">' +
        '<p id="welcomeMsg"></p>' +
        '</div>' +
        '<div class="timer_syra timer1_syra">' +
        '<span>a second ago</span>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="typingGif_syra" style="display:none">' +
        '<p></p>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="automated_syra" style="background:' + widgetBackgroundColor + ';">' +
        '<a href="https://syra.ai/" target="_blank"><p>Cognitive Chatbots, with Domain Awareness.</p></a>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="data_enter_syra">' +
        '<div class="data_box_syra">' +
        '<div class="data_input_syra">' +
        '<input type="text" id="syraMsg" onkeypress="sendMsgByEnter(event)" placeholder="Type a message" autocomplete="off"/>' +
        '</div>' +
        '<div class="data_submit_syra">' +
        '<button onclick="sendMsg()" id="sendBtn">' +
        '</button>' +
        '</div>' +
        '<div class="clear_syra">' +
        '</div>' +
        '</div>' +
        '<div class="clear_syra">' +
        '</div>' +
        '</div>' +
        '</div>' +
        '';

    jQuery("body").append(control_b);
    jQuery('#chatstart').fadeToggle();
    chatbotHeightCalc();
    startExecution();

}

function chatbotHeightCalc() {
    jQuery("#syraChatDiv_syra").height(window.innerHeight - 250); // it would work on all browsers
}

function a_thumbsdownClick() {

    var incomingMsg = '<div class="incoming_msg_syra incoming_msg_padding_syra" style="padding-top:25px">' +
        '<div class="incomingmsg_in_syra">' +
        '<div class="incom_you_syra">' +
        '<a href="#" class="chatBotIconBorder" style="border:' + widgetBackgroundColor + ' 6px solid;"><img class="SyraChatBotIcon" src="' + syraIconWithInChatBotLightBase + '" alt="icon3"></a>' +
        '<div class="clear_syra"></div>' +
        '</div>' +
        '<div class="incom_mess_text_syra" style="background-color:' + botResponseBackgroundColor + '">' +
        '<p> We are sorry to note that you did not have a great experience. You also email us at <b>syra@thirdeyedata.io</b> with your comments.</p>' +
        '</div>' +
        '<div class="timer_syra timer1_syra">' +
        '<span>a second ago</span>' +
        '</div>' +
        '</div>' +
        '</div>';
    jQuery("#syraChatInnerDiv").append(incomingMsg);
    scrollDiv();

}

function a_thumbsupClick() {

    var incomingMsg = '<div class="incoming_msg_syra incoming_msg_padding_syra" style="padding-top:25px">' +
        '<div class="incomingmsg_in_syra">' +
        '<div class="incom_you_syra">' +
        '<a href="#" class="chatBotIconBorder" style="border:' + widgetBackgroundColor + ' 6px solid;"><img class="SyraChatBotIcon" src="' + syraIconWithInChatBotLightBase + '" alt="icon3"></a>' +
        '<div class="clear_syra"></div>' +
        '</div>' +
        '<div class="incom_mess_text_syra" style="background-color:' + botResponseBackgroundColor + '">' +
        '<p> Thanks for your positive feedback. </p>' +
        '</div>' +
        '<div class="timer_syra timer1_syra">' +
        '<span>a second ago</span>' +
        '</div>' +
        '</div>' +
        '</div>';
    jQuery("#syraChatInnerDiv").append(incomingMsg);
    scrollDiv();

}


window.onload = chatbot;