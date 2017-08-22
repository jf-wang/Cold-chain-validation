function jiazai() {
    $.ajax({ //页面加载/*************************ok */
        type: "GET",
        contentType: "application/x-www-form-urlencoded",
        url: "***",
        data: {},
        dataType: "json",
        async: false,
        success: function(data, status) {
            $(".number").text(data.Data.length)
            for (var i = 0; i < data.Data.length; i++) {
                var username = data.Data[i].UserId;
                var name = data.Data[i].UserName;
                var phone = data.Data[i].UserTel;
                var quanxian = data.Data[i].UserRole;
                var bmid = data.Data[i].UserDepId;
                var UserEnabled = data.Data[i].UserEnabled;
                // console.log(quanxian)
                var bmname = "";
                var duoxiangmu = "";
                var j = i + 1;
                $.ajax({
                    type: "GET",
                    contentType: "application/x-www-form-urlencoded",
                    url: "***",
                    data: {},
                    async: false,
                    dataType: "json",
                    success: function(data, status) {
                        // console.log(data)
                        bmname = data.Data.DepName;
                    },
                    error: function(e) {
                        alert("部门名称请求失败!");
                    },
                    complete: function() {}
                });
                $.ajax({
                    type: "GET",
                    contentType: "application/x-www-form-urlencoded",
                    url: "***",
                    data: {},
                    async: false,
                    dataType: "json",
                    success: function(data, status) {
                        // console.log(data.Data.length)
                        // bmname = data.Data.DepName;
                        if (data.Data.length > 1) {
                            duoxiangmu = "是"
                        } else {
                            duoxiangmu = "否"
                        }
                    },
                    error: function(e) {
                        alert("部门名称请求失败!");
                    },
                    complete: function() {}
                });

                var aa = $("<tr>" +
                    "<td>" + username + "</td>" +
                    "<td>" + name + "</td>" +
                    "<td>" + phone + "</td>" +
                    "<td class='quanxiana'></td>" +
                    "<td>" + bmname + "</td>" +
                    "<td> " + duoxiangmu + "</td>" +
                    "<td>" +
                    "<span class='xuanzexiangmu' onclick='xuanze(this)' data-toggle='modal' data-target='#myModal_xinjianuser'>选择公司</span>" +
                    "</td>" +
                    "<td>" +
                    "<span class='gaoji' onclick='mima(this)' data-toggle='modal' data-target='#myModal_passwork'>修改密码</span>|" +
                    "<span class='bianji' onclick='bianji(this)' data-toggle='modal' data-target='#myModal_bianji'>编辑</span>|" +
                    "<span class='del' onclick='del(this)' data-toggle='modal' data-target='#myModal_del'>删除</span>" +
                    "</td>" +
                    "<td style='display:none'>" + UserEnabled + "</td>" +
                    "<td style='display:none'>" + bmid + "</td>" +
                    "</tr>");

                aa.appendTo("tbody");
                if (quanxian == 1) {
                    $("tbody tr:nth-child(" + j + ")").find("td").eq(3).text("管理")
                } else if (quanxian == 2) {
                    $("tbody tr:nth-child(" + j + ")").find("td").eq(3).text("维护")
                } else if (quanxian == 3) {
                    $("tbody tr:nth-child(" + j + ")").find("td").eq(3).text("监控");
                    $("tbody tr:nth-child(" + j + ")").find("td").eq(5).attr('data-toggle', '');
                    // $('.xuanzexiangmu').attr('data-toggle', '')
                }
            }
        },
        error: function(e) {
            alert("用户管理加载失败!");
        },
        complete: function() {}
    });
}
jiazai(); //执行下函数

$.ajax({ //循环公司*****************************************************/**/ok */
    type: "GET",
    contentType: "application/x-www-form-urlencoded",
    url: "***",
    data: {},
    dataType: "json",
    success: function(data, status) {
        for (var i = 0; i < data.Data.length; i++) {
            var bmname = data.Data[i].DepName;
            var id = data.Data[i].DepId;
            var cc = $("<option value='" + id + "'>" + bmname + "</option>");
            cc.appendTo(".xinjian_bumenid");
        }
    },
    error: function(e) {
        alert("公司列表请求失败!");
    },
    complete: function() {}
});

$.ajax({ //循环公司*****************************************************/**/ok */
    type: "GET",
    contentType: "application/x-www-form-urlencoded",
    url: "***",
    data: {},
    dataType: "json",
    success: function(data, status) {
        for (var i = 0; i < data.Data.length; i++) {
            var bmname = data.Data[i].DepName;
            var id = data.Data[i].DepId;
            var cc = $("<option value='" + id + "'>" + bmname + "</option>");
            cc.appendTo(".xinjian_bumenid2");
        }
    },
    error: function(e) {
        alert("公司列表请求失败!");
    },
    complete: function() {}
});
$(".tainjia_xinzeng").click(function() { //新建点击确定的时候收集的信息/***ok */
    var username = $(".xinjian_username").val(); //用户名
    var name = $(".xinjian_name").val(); //姓名
    var phone = $(".xinjian_phone").val(); //联系方式
    var UserDepId = $(".xinjian_bumenid").val(); //部门id
    var qiyong = $(".xinjian_qiyong").val(); //是否启用
    var quanxain = $(".xinjian_quanxian").val() //权限
    if (username != "" && name != "" && phone != "") {
        $.ajax({
            type: "POST",
            contentType: "application/x-www-form-urlencoded",
            url: "***",
            data: {
                UserId: username,
                UserName: name,
                UserTel: phone,
                UserDepId: UserDepId,
                UserEnabled: qiyong,
                UserRole: quanxain
            },
            dataType: "json",
            success: function(data, status) {
                location.reload() //刷新页面
            },
            error: function(e) {
                alert("新增用户请求失败!");
            },
            complete: function() {}
        });
    } else {
        alert("请正确完整填写用户信息")
    }

})

function bianji(row) { //点击编辑的时候获取信息/************有bug */
    window.parent.zhezhao()
    var username = $(row).parent().siblings().eq(0).html(); //获取当前的编号
    var name = $(row).parent().siblings().eq(1).html();
    var phone = $(row).parent().siblings().eq(2).html();
    var quanxian = $(row).parent().siblings().eq(3).html();
    var bumen = $(row).parent().siblings().eq(4).html();
    var UserEnabled = $(row).parent().siblings().eq(7).html();
    $(".bianji_username").val(username);
    $(".bianji_name").val(name);
    $(".bianji_phone").val(phone);
    $(".tainjia_bianji").click(function() { //保存编辑的时候
        var b_username = $(".bianji_username").val();
        var b_bmname = $(".bianji_name").val();
        var b_phone = $(".bianji_phone").val();
        var b_bumen = $(".xinjian_bumenid2").val();
        var qiyong = $(".binaji_qiyong").val();
        var b_quanxain = $(".bianji_quaxnain").val();
        $.ajax({
            type: "POST",
            contentType: "application/x-www-form-urlencoded",
            url: "***",
            data: {
                UserId: b_username,
                UserName: b_bmname,
                UserTel: b_phone,
                UserDepId: b_bumen,
                UserEnabled: qiyong,
                UserRole: b_quanxain
            },
            dataType: "json",
            success: function(data, status) {
                alert(data.Message)
                location.reload() //刷新页面
                    //  console.log(data, status)
            },
            error: function(e) {
                alert("编辑用户信息请求失败!");
            },
            complete: function() {}
        });
    })
}

function del(rows) { //点击删除的时候获取id/************************ok */
    window.parent.zhezhao()
    var id = $(rows).parent().siblings().eq(0).html();
    $(".queding_del").click(function() { //确定删除的时候
        $.ajax({
            type: "POST",
            contentType: "application/x-www-form-urlencoded",
            url: "***",
            data: {
                id: id
            },
            dataType: "json",
            success: function(data, status) {
                alert(data.Message)
                location.reload() //刷新页面 
            },
            error: function(e) {
                alert("删除用户失败!");
            },
            complete: function() {}
        });
    })
}

function mima(row) {
    window.parent.zhezhao()
    var username = $(row).parent().siblings().eq(0).html();
    $(".passwork_true").click(function() { //*/密码修改ok * /
        var pwd1 = $(".passwork_first").val();
        var pwd2 = $(".passwork_second").val();
        var pwd3 = $(".passwork_third").val();
        if (pwd2 == pwd3) {
            $.ajax({
                type: "POST",
                contentType: "application/x-www-form-urlencoded",
                url: "***",
                data: {
                    UserId: username,
                    NewPassword: pwd2,
                    OldPassword: pwd1
                },
                dataType: "json",
                success: function(data, status) {
                    alert(data.Message)
                        // console.log(data)
                    location.reload() //刷新页面 
                },
                error: function(e) {
                    alert("用户管理加载失败!");
                },
                complete: function() {

                }
            });
        } else {
            alert("两次密码不一致")
        }
    });
}
$(".xiangmushuaxuan").change(function() { //下拉列表筛选
    if ($(".xiangmushuaxuan").val() == "") {
        $("tbody").text("")
        jiazai();
    } else if ($(".xiangmushuaxuan").val() == 1) {
        $("tbody").text("")
        jiazai();
        for (var i = 0; i < $("tbody tr").length; i++) {
            if ($("tbody tr").eq(i).find(".quanxiana").text() != "管理") {
                $("tbody tr").eq(i).css("display", "none")
            }
        }
    } else if ($(".xiangmushuaxuan").val() == 2) {
        $("tbody").text("")
        jiazai();
        for (var i = 0; i < $("tbody tr").length; i++) {
            if ($("tbody tr").eq(i).find(".quanxiana").text() != "维护") {
                $("tbody tr").eq(i).css("display", "none")
            }
        }
    } else if ($(".xiangmushuaxuan").val() == 3) {
        $("tbody").text("")
        jiazai();
        for (var i = 0; i < $("tbody tr").length; i++) {
            if ($("tbody tr").eq(i).find(".quanxiana").text() != "监控") {
                $("tbody tr").eq(i).css("display", "none");
            }
        }
    }

})