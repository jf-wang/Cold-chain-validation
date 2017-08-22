$(".head_off").click(function() {
    window.open("./login.html", "_self");
});
$(".head_off img").click(function() {
    window.open("./login.html", "_self");
});
var uesrName = localStorage.getItem("userName");
$.ajax({ //请求用户id******************************************************/**/ok */
    type: "GET",
    contentType: "application/x-www-form-urlencoded",
    url: "" + url + "/api/User/GetUser?userId=" + uesrName + "&Token=" + token + "",
    data: {},
    dataType: "json",
    success: function(data, status) {
        console.log(data.Data.UserRole)

        if (data.Data.UserRole == 2) {
            localStorage.setItem("UserRole", "2")
                 $("#sideBar ul li:nth-child(3)").text("");
            $("#sideBar ul li:nth-child(4)").text("");
            // $("#sideBar ul li:nth-child(5)").text("");
        } else {
            localStorage.setItem("UserRole", "1")

        }
    },
    error: function(e) {
        alert("公司加载页面失败!");
    },
    complete: function() {}
});