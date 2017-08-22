$.ajax({ //循环公司*****************************************************/**/ok */
    type: "GET",
    contentType: "application/x-www-form-urlencoded",
    url: "" + url + "/api/Department/GetDepList?Token=" + token + "",
    data: {},
    dataType: "json",
    success: function(data, status) {
        for (var i = 0; i < data.Data.length; i++) {
            var li = $("<li value=" + data.Data[i].DepId + "  onclick='left_xzxm(this)'>" + data.Data[i].DepName + "</li>");
            li.appendTo("#before");
        }
    },
    error: function(e) {
        alert("公司列表请求失败!");
    },
    complete: function() {}
});



var LSuserid = ""

function aa() {
    var shuzu = [];
    var ul = document.getElementById("after").getElementsByTagName("li");
    for (var i = 0; i < ul.length; i++) {
        var cityid = ul[i].getAttribute("value");
        shuzu.push(cityid)
    }
    $.ajax({
        type: "POST",
        contentType: "application/x-www-form-urlencoded",
        url: "" + url + "/api/User/SetManageDeps?Token=" + token + "",
        data: { UserId: LSuserid, DepIds: shuzu },
        dataType: "json",
        success: function(data, status) {
            $(".xunhuangonsi3").text("");
            $("#after").text("");
            $.ajax({
                type: "GET",
                contentType: "application/x-www-form-urlencoded",
                url: "" + url + "/api/User/GetManageDeps?userId=" + LSuserid + "&Token=" + token + "",
                data: {},
                dataType: "json",
                success: function(data, status) {
                    for (var i = 0; i < data.Data.length; i++) {
                        var depId = data.Data[i];
                        $.ajax({ //循环公司*****************************************************/**/ok */
                            type: "GET",
                            contentType: "application/x-www-form-urlencoded",
                            url: "" + url + "/api/Department/GetDep/" + depId + "?Token=" + token + "",
                            data: {},
                            dataType: "json",
                            success: function(data, status) {
                                var li = $("<li value=" + data.Data.DepId + "  onclick='right_xzxm(this)'>" + data.Data.DepName + "</li>");
                                li.appendTo("#after");
                                $(".xunhuangonsi3").append("<option value=" + data.Data.DepId + ">" + data.Data.DepName + "</option>");
                            },
                            error: function(e) {
                                alert("公司列表请求失败!");
                            },
                            complete: function() {}
                        });
                    }
                },
                error: function(e) {
                    alert("用户下的公司列表请求失败!");
                },
                complete: function() {}
            });
        },
        error: function(e) {
            alert("多项目添加请求失败!");
        },
        complete: function() {}
    });
    // $("#before").text("")
    // $.ajax({ //循环公司*****************************************************/**/ok */
    //     type: "GET",
    //     contentType: "application/x-www-form-urlencoded",
    //     url: "" + url + "/api/Department/GetDepList?Token=" + token + "",
    //     data: {},
    //     dataType: "json",
    //     success: function(data, status) {
    //         for (var i = 0; i < data.Data.length; i++) {
    //             var li = $("<li value=" + data.Data[i].DepId + "  onclick='left_xzxm(this)'>" + data.Data[i].DepName + "</li>");
    //             li.appendTo("#before");
    //         }
    //     },
    //     error: function(e) {
    //         alert("公司列表请求失败!");
    //     },
    //     complete: function() {}
    // });
}

function left_xzxm(com) {
    $(com).removeClass("active");
    $(com).addClass('active');
    num = $(com).index();
    $("#before li").eq(num).attr("onclick", "right_xzxm(this)")
    $("#after").append($("#before li").eq(num).removeClass("active"));
    aa()
}

function right_xzxm(com2) {
    $(com2).removeClass("active");
    $(com2).addClass('active');
    num2 = $(com2).index();
    $("#after li").eq(num2).attr("onclick", "left_xzxm(this)")
    $("#before").append($("#after li").eq(num2).removeClass("active"));
    aa()
}

$("#right").click(function() {
    // $("#after").append($("#before li").eq(num).removeClass("active"));
    $("#before li").attr("onclick", "right_xzxm(this)")
    $("#after").append($("#before li").removeClass("active"));
    aa()
});

$("#left").click(function() {
    // $("#before").append($("#after li").eq(num).removeClass("active"));
    $("#after li").attr("onclick", "left_xzxm(this)")
    $("#before").append($("#after li").removeClass("active"));
    aa()
});


function xuanze(cc) { //选择项目时候点击)
    window.parent.zhezhao()
    var shuzu = [];
    $(".xunhuangonsi3").text("");
    $("#after").text("");
    var userId = $(cc).parent().siblings().eq(0).html();
    LSuserid = userId
    var name = $(cc).parent().siblings().eq(1).html();
    var phone = $(cc).parent().siblings().eq(2).html();
    var quanxian = $(cc).parent().siblings().eq(3).html();
    var bumen = $(cc).parent().siblings().eq(4).html();
    var UserEnabled = $(cc).parent().siblings().eq(7).html();
    $.ajax({
        type: "GET",
        contentType: "application/x-www-form-urlencoded",
        url: "" + url + "/api/User/GetManageDeps?userId=" + userId + "&Token=" + token + "",
        data: {},
        dataType: "json",
        success: function(data, status) {
            for (var i = 0; i < data.Data.length; i++) {
                var depId = data.Data[i];
                $.ajax({ //循环公司*****************************************************/**/ok */
                    type: "GET",
                    contentType: "application/x-www-form-urlencoded",
                    url: "" + url + "/api/Department/GetDep/" + depId + "?Token=" + token + "",
                    data: {},
                    dataType: "json",
                    success: function(data, status) {
                        var li = $("<li value=" + data.Data.DepId + "  onclick='right_xzxm(this)'>" + data.Data.DepName + "</li>");
                        li.appendTo("#after");
                        $(".xunhuangonsi3").append("<option value=" + data.Data.DepId + ">" + data.Data.DepName + "</option>");
                    },
                    error: function(e) {
                        alert("公司列表请求失败!");
                    },
                    complete: function() {}
                });
            }
        },
        error: function(e) {
            alert("用户下的公司列表请求失败!");
        },
        complete: function() {}
    });

    $(".xuanzexiangmu_true").click(function() { //项目选择完后点击
        var ul = document.getElementById("after").getElementsByTagName("li");
        for (var i = 0; i < ul.length; i++) {
            var cityid = ul[i].getAttribute("value");
            shuzu.push(cityid)
        }
        $.ajax({
            type: "POST",
            contentType: "application/x-www-form-urlencoded",
            url: "" + url + "/api/User/SetManageDeps?Token=" + token + "",
            data: { UserId: userId, DepIds: shuzu },
            dataType: "json",
            success: function(data, status) {

                location.reload() //刷新页面
            },
            error: function(e) {
                alert("多项目添加请求失败!");
            },
            complete: function() {}
        });
        var UserRole = ""
        if (quanxian == "管理") {
            UserRole = 2
        } else if (quanxian == "维护") {
            UserRole = 1
        } else if (quanxian == "监控") {
            UserRole = 3
        } else

            $.ajax({
            type: "POST",
            contentType: "application/x-www-form-urlencoded",
            url: "" + url + "/api/User/SaveUser?Token=" + token + "",
            data: {
                UserId: userId,
                UserName: name,
                UserTel: phone,
                UserDepId: $(".xunhuangonsi3").val(),
                UserEnabled: UserEnabled,
                UserRole: UserRole
            },
            dataType: "json",
            success: function(data, status) {
                location.reload() //刷新页面
            },
            error: function(e) {
                alert("默认公司请求失败!");
            },
            complete: function() {}
        });
    })
}