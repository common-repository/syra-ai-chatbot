/*function AddZero(num) {
    return (num >= 0 && num < 10) ? "0" + num : num + "";
}

window.onload = function() {
    var now = new Date();
    var strDateTime = [
        [AddZero(now.getDate()),
            AddZero(now.getMonth() + 1),
            now.getFullYear()
        ].join("/"), [AddZero(now.getHours()),
            AddZero(now.getMinutes())
        ].join(":"),
        now.getHours() >= 12 ? "PM" : "AM"
    ].join(" ");
    document.getElementById("generatedDateTime").innerHTML = strDateTime;
};*/

var settings = {
    "async": true,
    "url": "https://natura.syra.ai/natura/pst-date-time",
    "method": "POST",
}

jQuery.ajax(settings).done(function(response) {
    document.getElementById("generatedDateTime").innerHTML = response.pstTime;
});