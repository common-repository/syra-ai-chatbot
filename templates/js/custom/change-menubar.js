function addToggleActiveMenu(pageName)
{
    var activeNavBarMenuId = "";
    jQuery(".kt-menu__item--active").each(function () {
        activeNavBarMenuId = jQuery(this).attr('id');
    });
    if(activeNavBarMenuId != ""){
        document.getElementById(activeNavBarMenuId).classList.remove("kt-menu__item--active");
    }
    document.getElementById(pageName).classList.add("kt-menu__item--active");
}