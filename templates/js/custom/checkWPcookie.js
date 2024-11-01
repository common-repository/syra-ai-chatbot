function checkWPCookie() 
{
    /* For Wordpress */
    if (document.cookie.match(new RegExp('(^| )source=(wordpress)')) != null){
        jQuery("#kt_header_menu_wrapper").hide();
    }
    /* End */
}