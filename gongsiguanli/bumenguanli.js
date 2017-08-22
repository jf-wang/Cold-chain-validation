var token = localStorage.getItem("token");
var depId = localStorage.getItem("depId");
var uesrName = localStorage.getItem("userName");
$.ajax({
    type: "GET",
    contentType: "application/x-www-form-urlencoded",
    url: "***",
    data: {},
    async: false,
    dataType: "json",
    success: function(data, status) {
        console.log(data.Data.UserRole)
        if (data.Data.UserRole == 1 || uesrName == "admin") {
            $.ajax({
                type: "GET",
                contentType: "application/x-www-form-urlencoded",
                url: "***",
                data: {},
                async: false,
                dataType: "json",
                success: function(data, status) {

                    for (var i = 0; i < data.Data.length; i++) {
                        $(".number").text(data.Data.length)
                        $.ajax({ //循环公司*****************************************************/**/ok */
                            type: "GET",
                            contentType: "application/x-www-form-urlencoded",
                            url: "***",
                            data: {},
                            dataType: "json",
                            success: function(data, status) {
                                console.log(data)
                                var code = data.Data.DepCode;
                                // console.log(code)
                                var bmname = data.Data.DepName;
                                var lianxiren = data.Data.DepOwner;
                                var phone = data.Data.DepContact;
                                var bz = data.Data.DepMemo;
                                var id = data.Data.DepId;
                                // console.log(id)
                                var aa = $("<tr>" +
                                    "<td><img src='" + url + "/api/Logo/GetLogo?DepId=" + id + "' class='gongsilogo'></td>" +
                                    "<td>" + code + "</td>" +
                                    "<td>" + bmname + "</td>" +
                                    "<td>" + lianxiren + "</td>" +
                                    "<td>" + phone + "</td>" +
                                    "<td>" + bz + "</td>" +
                                    "<td>" +
                                    "<span class='bianji' onclick='bianji(this)' data-toggle='modal' data-target='#myModal_bianji'>编辑</span>|" +
                                    "<span class='del' onclick='del(this)' data-toggle='modal' data-target='#myModal_del'>删除</span>" +
                                    "</td>" +
                                    "<td style='display:none'>" + id + "</td>" +
                                    "</tr>");
                                aa.appendTo("tbody");
                            },
                            error: function(e) {
                                alert("公司列表请求失败!");
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
        } else {
            $.ajax({
                type: "GET",
                contentType: "application/x-www-form-urlencoded",
                url: "***",
                data: {},
                dataType: "json",
                success: function(data, status) {
                    // console.log(data.Data)
                    for (var i = 0; i < data.Data.length; i++) {
                        var depId = data.Data[i];
                        $(".number").text(data.Data.length)
                        $.ajax({ //循环公司*****************************************************/**/ok */
                            type: "GET",
                            contentType: "application/x-www-form-urlencoded",
                            url: "***",
                            data: {},
                            dataType: "json",
                            success: function(data, status) {
                                var code = data.Data.DepCode;
                                // console.log(code)
                                var bmname = data.Data.DepName;
                                var lianxiren = data.Data.DepOwner;
                                var phone = data.Data.DepContact;
                                var bz = data.Data.DepMemo;
                                var id = data.Data.DepId;
                                // console.log(id)
                                var aa = $("<tr>" +
                                    "<td><img src='" + url + "/api/Logo/GetLogo?DepId=" + id + "' class='gongsilogo'></td>" +
                                    "<td>" + code + "</td>" +
                                    "<td>" + bmname + "</td>" +
                                    "<td>" + lianxiren + "</td>" +
                                    "<td>" + phone + "</td>" +
                                    "<td>" + bz + "</td>" +
                                    "<td>" +
                                    "<span class='bianji' onclick='bianji(this)' data-toggle='modal' data-target='#myModal_bianji'>编辑</span>|" +
                                    "<span class='del' onclick='del(this)' data-toggle='modal' data-target='#myModal_del'>删除</span>" +
                                    "</td>" +
                                    "<td style='display:none'>" + id + "</td>" +
                                    "</tr>");
                                aa.appendTo("tbody");
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


        }
    },
    error: function(e) {
        alert("请求失败!");
    },
    complete: function() {}
});





$(".tainjia").click(function() { //新建点击确定的时候收集的信息//**********************/**/ok */
    var code = $(".xinjian_bianhao").val(); //编号
    var bmname = $(".xinjian_bmname").val(); //公司名称
    var lianxiren = $(".xinjian_lianxiren").val(); //联系人
    var phone = $(".xinjian_phone").val(); //联系方式
    var bz = $(".xinjian_beizhu").val(); //备注
    if (code != "" && bmname != "") { //公司和编号不能为空
        $.ajax({
            type: "POST",
            contentType: "application/x-www-form-urlencoded",
            url: "***",
            data: { DepCode: code, DepName: bmname, DepOwner: lianxiren, DepContact: phone, DepMemo: bz },
            dataType: "json",
            success: function(data, status) {
                alert(data.Message)
                location.reload() //刷新页面
                console.log
            },
            error: function(e) {
                alert("新增公司请求失败!");
            },
            complete: function() {}
        });
    } else {
        alert("请填写编号和公司名称");
    }
})



function bianji(row) { //点击编辑的时候获取信息/**************/ok */
    window.parent.zhezhao()
    var code = $(row).parent().siblings().eq(1).html(); //获取当前的编号
    var bmname = $(row).parent().siblings().eq(2).html();
    var lianxiren = $(row).parent().siblings().eq(3).html();
    var phone = $(row).parent().siblings().eq(4).html();
    var bz = $(row).parent().siblings().eq(5).html();
    var id = $(row).parent().siblings().eq(6).html();
    $(".bianji_code").val(code);
    $(".bianji_bmname").val(bmname);
    $(".bianji_lianxiren").val(lianxiren);
    $(".bianji_phone").val(phone);
    $(".binaji_bz").val(bz);
    $(".baoxun_bianji").click(function() { //保存编辑的时候
        var b_code = $(".bianji_code").val();
        var b_bmname = $(".bianji_bmname").val();
        var b_lainxiren = $(".bianji_lianxiren").val();
        var b_phone = $(".bianji_phone").val();
        var b_bz = $(".binaji_bz").val();
        if (b_code != "" && b_bmname != "") { //公司和编号不能为空
            $.ajax({
                type: "POST",
                contentType: "application/x-www-form-urlencoded",
                url: "***",
                data: { DepId: id, DepCode: b_code, DepName: b_bmname, DepOwner: b_lainxiren, DepContact: b_phone, DepMemo: b_bz },
                dataType: "json",
                success: function(data, status) {
                    alert(data.Message)
                    location.reload() //刷新页面
                },
                error: function(e) {
                    alert("新增公司请求失败!");
                },
                complete: function() {}
            });
        } else {
            alert("请填写编号和公司名称");
        }
    })

    $(".shangchuan").click(function() { //点击修改的时候上传图片
        var formData = new FormData();
        // console.log($("#fileUpload")[0].files[0])
        formData.append("UploadedImage", $("#fileUpload")[0].files[0]);
        // console.log(formData);
        $.ajax({
            url: "***",
            type: 'POST',
            cache: false,
            data: formData,
            // 告诉jQuery不要去处理发送的数据
            processData: false,
            // 告诉jQuery不要去设置Content-Type请求头
            contentType: false,
            success: function(data, ststus) {
                alert(data.Message)
            },
            error: function(responseStr) {
                console.log("error");
                console.log(this.url)
            }
        });

    })
}

function del(rows) { //点击删除的时候获取id/**************/ok */
    window.parent.zhezhao()
    var id = $(rows).parent().siblings().eq(6).html();
    $(".queding_del").click(function() { //确定删除的时候
        // window.parent.QXzhezhao()
        console.log(id)
        $.ajax({
            type: "POST",
            contentType: "application/x-www-form-urlencoded",
            url: "***",
            data: {},
            dataType: "json",
            success: function(data, status) {
                alert(data.Message);
                location.reload() //刷新页面
            },
            error: function(e) {
                alert("删除公司请求失败!");
            },
            complete: function() {}
        });
    })
}