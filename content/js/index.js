$(".head_off").click(function() {
    window.open("../login.html", "_self");
    localStorage.setItem("gongsiids", "0")
});
$(".head_off img").click(function() {
    window.open("../login.html", "_self");
    localStorage.setItem("gongsiids", "0")
});
var uesrName = localStorage.getItem("userName");
$.ajax({ //请求用户id******************************************************/**/ok */
    type: "GET",
    contentType: "application/x-www-form-urlencoded",
    url: "***",
    data: {},
    dataType: "json",
    success: function(data, status) {
        // console.log(data.Data.UserRole)
        if (data.Data.UserRole == 3) {
            // $("#sideBar ul li:nth-child(4)").text("");
            // $("#sideBar ul li:nth-child(5)").text("");
        } else if (data.Data.UserRole == 2) {
            // $("#sideBar ul li:nth-child(4)").text("");
            // $("#sideBar ul li:nth-child(5)").text("");
        } else {

        }
    },
    error: function(e) {
        alert("公司加载页面失败!");
    },
    complete: function() {}
});
$(".head_btn").click(function() { //请求村存时间间隔
    $.ajax({
        type: "GET",
        contentType: "application/x-www-form-urlencoded",
        url: "***",
        data: {},
        dataType: "json",
        success: function(data, status) {
            $(".shujujiange").val(data.Data)
        },
        error: function(e) {},
        complete: function() {}
    });
})
$(".tainjia").click(function() {
    var time = $(".shujujiange").val();
    $.ajax({
        type: "POST",
        contentType: "application/x-www-form-urlencoded",
        url: "***",
        data: { DepId: depId, Interval: time },
        dataType: "json",
        success: function(data, status) {
            alert(data.Message);
        },
        error: function(e) {},
        complete: function() {}
    });
})