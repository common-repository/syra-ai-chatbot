 function populateHelpTable(){
    var allHelpNotifications = 
    [
        {
            name : "Check out other AI Apps for your store",
            link : "https://instamart.ai/"
        },
        {
            name : "How do I analyze the performance of my Chatbot?",
            link : "https://syra.ai/support__trashed/easy-customer-analytics-on-syra-ai-chatbot/"
        },
        {
            name : "How do I embed to my website?",
            link : "https://syra.ai/support__trashed/how-to-install-the-syra-chatbot-on-your-online-store/"
        },
        {
            name : "How do I embed in Facebook?",
            link : "https://syra.ai/support__trashed/how-to-install-syra-ai-chatbots-on-facebook-messenger/"
        },
        {
            name : "How do I embed in Slack?",
            link : "https://syra.ai/support__trashed/how-to-install-syra-ai-chatbots-on-slack/"
        },
        {
            name : "How do I embed in Skype?",
            link : "https://syra.ai/support__trashed/how-to-embed-syra-ai-chatbots-on-skype/"
        },
        {
            name : "Build your own",
            link : "https://chatbots.syra.ai/apis/"
        },
        {
            name : "How do I customize my Chatbot?",
            link : "https://syra.ai/support__trashed/customize-set-up-syra-ai-chatbots-account-on-your-shopify-store/"
        }
    ]
    allHelpNotifications.forEach(function(element){
        var each_Help_Notification = '<a href ="' + element.link +'" class="kt-notification__item" target="_blank">' +
                                        '<div class="kt-notification__item-details">' +
                                            '<div class="kt-notification__item-title">' +
                                                element.name +
                                            '</div>' +
                                        '</div>' +
                                    '</a>';
        jQuery("#help_panel").append(each_Help_Notification);
    })
 }