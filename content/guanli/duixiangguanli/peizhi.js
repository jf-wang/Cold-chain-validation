$.ajax({ //根据部门id请求他的中继器
    type: "GET",
    contentType: "application/x-www-form-urlencoded",
    url: "" + url + "/api/Repeater/GetRepeaterList?DepId=" + depId + "&Token=" + token + "",
    data: {},
    dataType: "json",
    success: function(data, status) {
        for (var i = 0; i < data.Data.length; i++) {
            var option = $("<option value='" + data.Data[i].RepeaterId + "'>" + data.Data[i].RepeaterName + "</option>");
            option.appendTo(".xunhuangonsi3");
        }
        var RepeaterId = $(".xunhuangonsi3").val();
        $.ajax({
            type: "GET",
            contentType: "application/x-www-form-urlencoded",
            url: "" + url + "/api/Temp/GetTempListByRepeter?RepId=" + RepeaterId + "&Token=" + token + "",
            data: {},
            dataType: "json",
            success: function(data, status) {
                for (var i = 0; i < data.Data.length; i++) {
                    var aa = $("<li value=" + data.Data[i].TempId + "  onclick='left_xzxm(this)'>" + data.Data[i].TempName + "</li>");
                    aa.appendTo("#before");
                }
            },
            error: function(e) {
                alert("请求失败!");
            },
            complete: function() {}
        });
    },
    error: function(e) {
        alert("请求失败!");
    },
    complete: function() {}
});
$(".xunhuangonsi3").change(function() { //下拉框改变事件
    var RepeaterId = $(".xunhuangonsi3").val();
    $("#before").text(""); //清空
    $.ajax({
        type: "GET",
        contentType: "application/x-www-form-urlencoded",
        url: "" + url + "/api/Temp/GetTempListByRepeter?RepId=" + RepeaterId + "&Token=" + token + "",
        data: {},
        dataType: "json",
        success: function(data, status) {
            // console.log(data)
            for (var i = 0; i < data.Data.length; i++) {
                var aa = $("<li value=" + data.Data[i].TempId + "  onclick='left_xzxm(this)'>" + data.Data[i].TempName + "</li>");
                aa.appendTo("#before");
            }
        },
        error: function(e) {
            alert("请求失败!");
        },
        complete: function() {}
    });
})
var LSDXid = ""

function pl() {
    var shuzu = [];
    var ul = document.getElementById("after").getElementsByTagName("li");
    for (var i = 0; i < ul.length; i++) {
        var cityid = ul[i].getAttribute("value");
        shuzu.push(cityid)
    }
    $.ajax({
        type: "POST",
        contentType: "application/x-www-form-urlencoded",
        url: "" + url + "/api/Check/SetTemps?Token=" + token + "",
        data: { CheckObjId: LSDXid, TempIds: shuzu },
        dataType: "json",
        success: function(data, status) {
            // location.reload() //刷新页面
            $("#after").text("")
            $.ajax({
                type: "GET",
                contentType: "application/x-www-form-urlencoded",
                url: "" + url + "/api/Check/GetTemps?CheckObjId=" + LSDXid + "&Token=" + token + "",
                data: {},
                dataType: "json",
                success: function(data, status) {
                    for (var i = 0; i < data.Data.length; i++) {
                        $.ajax({
                            type: "GET",
                            contentType: "application/x-www-form-urlencoded",
                            url: "" + url + "/api/Temp/GetTemp/" + data.Data[i] + "?Token=" + token + "",
                            data: {},
                            dataType: "json",
                            success: function(data, status) {
                                var kk = $("<li value=" + data.Data.TempId + "  onclick='right_xzxm(this)'>" + data.Data.TempName + "</li>");
                                kk.appendTo("#after");
                            },
                            error: function(e) {
                                alert("请求失败!");
                            },
                            complete: function() {}
                        });
                    }
                },
                error: function(e) {
                    alert("请求失败!");
                },
                complete: function() {}
            });
        },
        error: function(e) {
            alert("请求失败!");
        },
        complete: function() {}
    });


    // $("#before").text("")
    // var RepeaterId = $(".xunhuangonsi3").val();
    // $.ajax({
    //     type: "GET",
    //     contentType: "application/x-www-form-urlencoded",
    //     url: "" + url + "/api/Temp/GetTempListByRepeter?RepId=" + RepeaterId + "&Token=" + token + "",
    //     data: {},
    //     dataType: "json",
    //     success: function(data, status) {
    //         for (var i = 0; i < data.Data.length; i++) {
    //             var aa = $("<li value=" + data.Data[i].TempId + "  onclick='left_xzxm(this)'>" + data.Data[i].TempName + "</li>");
    //             aa.appendTo("#before");
    //         }
    //     },
    //     error: function(e) {
    //         alert("请求失败!");
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
    pl()

}

function right_xzxm(com2) {
    $(com2).removeClass("active");
    $(com2).addClass('active');
    num2 = $(com2).index();
    $("#after li").eq(num2).attr("onclick", "left_xzxm(this)")
    $("#before").append($("#after li").eq(num2).removeClass("active"));
    pl()
}

$("#right").click(function() {
    // $("#after").append($("#before li").eq(num).removeClass("active"));
    $("#before li").attr("onclick", "right_xzxm(this)")
    $("#after").append($("#before li").removeClass("active"));
    pl()
});

$("#left").click(function() {
    $("#after li").attr("onclick", "left_xzxm(this)")
    $("#before").append($("#after li").removeClass("active"));
    var shuzu = [];
    var ul = document.getElementById("after").getElementsByTagName("li");
    for (var i = 0; i < ul.length; i++) {
        var cityid = ul[i].getAttribute("value");
        shuzu.push(cityid)
    }
    console.log(shuzu)
    $.ajax({
        type: "POST",
        contentType: "application/x-www-form-urlencoded",
        url: "" + url + "/api/Check/SetTemps?Token=" + token + "",
        data: { CheckObjId: LSDXid, TempIds: shuzu },
        dataType: "json",
        success: function(data, status) {
            console.log(this.data)
            console.log(data)
        },
        error: function(e) {
            alert("请求失败!");
        },
        complete: function() {}
    });
});





function peizhi(row) {
     window.parent.zhezhao2()
    var id = $(row).parent().siblings().eq(4).html();
    LSDXid = id;
    $("#after").text("")
    $.ajax({
        type: "GET",
        contentType: "application/x-www-form-urlencoded",
        url: "" + url + "/api/Check/GetTemps?CheckObjId=" + id + "&Token=" + token + "",
        data: {},
        dataType: "json",
        success: function(data, status) {
            for (var i = 0; i < data.Data.length; i++) {
                // console.log(data.Data[i])
                $.ajax({
                    type: "GET",
                    contentType: "application/x-www-form-urlencoded",
                    url: "" + url + "/api/Temp/GetTemp/" + data.Data[i] + "?Token=" + token + "",
                    data: {},
                    dataType: "json",
                    success: function(data, status) {
                        var kk = $("<li value=" + data.Data.TempId + "  onclick='right_xzxm(this)'>" + data.Data.TempName + "</li>");
                        kk.appendTo("#after");
                    },
                    error: function(e) {
                        alert("请求失败!");
                    },
                    complete: function() {}
                });
            }

        },
        error: function(e) {
            alert("请求失败!");
        },
        complete: function() {}
    });
    $(".xuanzexiangmu_true").click(function() {
        var shuzu = [];
        var ul = document.getElementById("after").getElementsByTagName("li");
        for (var i = 0; i < ul.length; i++) {
            var cityid = ul[i].getAttribute("value");
            shuzu.push(cityid)
        }
        $.ajax({
            type: "POST",
            contentType: "application/x-www-form-urlencoded",
            url: "" + url + "/api/Check/SetTemps?Token=" + token + "",
            data: { CheckObjId: id, TempIds: shuzu },
            dataType: "json",
            success: function(data, status) {
                location.reload() //刷新页面
            },
            error: function(e) {
                alert("请求失败!");
            },
            complete: function() {}
        });
    })
}