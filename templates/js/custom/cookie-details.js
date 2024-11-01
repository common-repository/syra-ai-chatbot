function extractUserDetaisFromCookie(){
    if (document.cookie.match(new RegExp('(^| )email=([^;]+)')) == null) {
        window.location.href = 'admin.php?page=syra-dashboard';
    }
    var jsonResponse = {};
    //to fetch Username from cookie details
    var username_Match_RegExp = document.cookie.match(new RegExp('(^| )fName=([^;]+)'));
    var username = username_Match_RegExp[2];
    jsonResponse.username = username;
    //to fetch email address
    var email_Match_RegExp = document.cookie.match(new RegExp('(^| )email=([^;]+)'));
    email = decodeURIComponent(email_Match_RegExp[2]);
    jsonResponse.email = email;
    //to fetch access-token from cookies
    var accesstoken_Match_RegExp = document.cookie.match(new RegExp('(^| )access_token=([^;]+)'));
    access_token = accesstoken_Match_RegExp[2];
    //step value
    notificationStep = 0;
    //get zendesk cookie
    if (document.cookie.match(new RegExp('(^| )zendesk_access_token=([^;]+)')) != null) {
        var match = document.cookie.match(new RegExp('(^| )zendesk_access_token=([^;]+)'));
        zendesk_access_token = match[2];
    }
    //set shopify url
    if (document.cookie.match(new RegExp('(^| )shopify_store_name=([^;]+)')) != null) {
        shopURL = email.replace("@",".");
        var shopifyStore_Match_RegExp = document.cookie.match(new RegExp('(^| )shopify_store_name=([^;]+)'));
        shopify_website_url = "https://"+shopifyStore_Match_RegExp[2]+".myshopify.com";
        shopify_store_name = shopifyStore_Match_RegExp[2];
    }
    //set shopify token value
    var shopifyToken_Match_RegExp = document.cookie.match(new RegExp('(^| )shopify_access_token=([^;]+)'));
    shopify_access_token = "";
    publishChatbotButtonFlag = true;
    if(shopifyToken_Match_RegExp != null){
        shopify_access_token = shopifyToken_Match_RegExp[2];
        selectedDomainId = "10";
    }
    else if(document.cookie.match(new RegExp('(^| )zendesk_access_token=([^;]+)')) != null){
        selectedDomainId = "11";
    }
    else{
        selectedDomainId = "12";
    }
    //session timeout
    var now = new Date();
    if (document.cookie.match(new RegExp('(^| )email=([^;]+)'))){
        var m = (document.cookie.match(new RegExp('(^| )CK_SESSION=([^;]+)')));
        var match = document.cookie.match(new RegExp('(^| )email=([^;]+)'));
        email = decodeURIComponent(match[2]);
        // var cookie_datetime = new Date(m[2]);
        // var cookie_expiry_time = (cookie_datetime.getTime());
        // var current_time = (now.getTime());
        // if(shopifyToken_Match_RegExp != null){
        //     var shopifyUrl = url_resource + "/shopify-login.html?access_token=" + shopify_access_token + "&shop=" + shopify_store_name
        //     setTimeout(function(){ window.location.href = shopifyUrl; }, (cookie_expiry_time - current_time));
        // }
        // else{
        //     setTimeout(function(){ window.location.href = 'admin.php?page=syra-dashboard'; }, (cookie_expiry_time - current_time));
        // }
    }
    jsonResponse.access_token = access_token;
    return jsonResponse;
}
