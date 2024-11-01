function logout() {

    var form = new FormData();
    form.append("access_token", access_token);
    var settings = {
        "async": true,
        "url": url_resource + "/syraconsumer/revoke-token",
        "method": "POST",
        headers: {
            'Authorization': 'Bearer ' + access_token,
        },
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
    }
    jQuery.ajax(settings).done(function(response) {
            response = JSON.parse(response);
            if (response.status_code === 200) {
                var d = new Date();
                d.setTime(d.getTime() + (-1 * 24 * 60 * 60 * 1000));
                var expires = "expires=" + d.toUTCString();
                document.cookie = "email=;" + expires + ";path=/";
                document.cookie = "fName=;" + expires + ";path=/";
                document.cookie = "lName=;" + expires + ";path=/";
                document.cookie = "refresh_token=;" + expires + ";path=/";
                document.cookie = "access_token=;" + expires + ";path=/";
                shopify_access_token = "";
                shopify_store_name = "";
                if (document.cookie.match(new RegExp('(^| )shopify_access_token=([^;]+)')) != null) {
                    var match = document.cookie.match(new RegExp('(^| )shopify_access_token=([^;]+)'));
                    shopify_access_token = match[2];
                }
                if (document.cookie.match(new RegExp('(^| )shopify_store_name=([^;]+)')) != null) {
                    var match = document.cookie.match(new RegExp('(^| )shopify_store_name=([^;]+)'));
                    shopify_store_name = match[2];
                }

                window.location.href = 'admin.php?page=syra-dashboard';
            } else {
                swal
                    ({
                        title: "Error!",
                        text: 'revoke-token Response error!!',
                        icon: "error",
                        button: "OK",
                    });
            }


        })
        .fail(function(response) {
            swal
                ({
                    title: "API Error!",
                    text: 'revoke-token' + ' -> ' + response.status + ' -> ' + response.statusText,
                    icon: "error",
                    button: "OK",
                });
        });

}