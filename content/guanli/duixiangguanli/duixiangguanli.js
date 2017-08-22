var checkId = localStorage.getItem('depId')
$.ajax({ //页面加载
    type: "GET",
    contentType: "application/x-www-form-urlencoded",
    url: "***",
    data: {},
    dataType: "json",
    success: function(data, status) {
        $('.number').text(data.Data.length)
        for (var i = 0; i < data.Data.length; i++) {
            var code = data.Data[i].CheckObjectCode;
            var zhqname = data.Data[i].CheckObjectName;
            var bz = data.Data[i].CheckObjectMemo;
            var id = data.Data[i].CheckObjectId;
            var aa = $("<tr>" +
                "<td>" + code + "</td>" +
                "<td>" + zhqname + "</td>" +
                "<td>" +
                "<span class='YZDXpeizhi' onclick='peizhi(this)' data-toggle='modal' data-target='#myModal_peizhi'>验证对象配置</span>" +
                "</td>" +
                "<td>" + bz + "</td>" +
                "<td>" +
                "<span class='bianji' onclick='bianji(this)' data-toggle='modal' data-target='#myModal_bianji'>编辑</span>|" +
                "<span class='del' onclick='del(this)' data-toggle='modal' data-target='#myModal_del'>删除</span>" +
                "</td>" +
                "<td style='display:none'>" + id + "</td>" +
                "</tr>");
            aa.appendTo("tbody");
        }
    },
    error: function(e) {
        alert("获取验证对象列表失败");
        console.log(this.url)
    },
    complete: function() {}
});

$(".tainjia").click(function() { //新建点击确定的时候收集的信息
    window.parent.zhezhao2()
    var codes = $(".xinjina_bianhao").val(); //编号
    // console.log(codes)
    var wdname = $(".xinjina_name").val(); //验证对象名称
    var bz = $(".xinjina_bz").val(); //备注
    $.ajax({
        type: "POST",
        contentType: "application/x-www-form-urlencoded",
        url: "***",
        data: {
            CheckObjectDepId: checkId,
            CheckObjectCode: codes,
            CheckObjectName: wdname,
            CheckObjectMemo: bz,
            CheckObjectEnabled: 1
        },
        dataType: "json",
        success: function(data, status) {
            console.log(data, status)
            location.reload() //刷新页面
        },
        error: function(e) {
            alert("新增验证对象请求失败!");

        },
        complete: function() {}
    });
})

function bianji(row) { //点击编辑的时候获取信息
    window.parent.zhezhao2()
    var code = $(row).parent().siblings().eq(0).html(); //获取当前的编号
    var bmname = $(row).parent().siblings().eq(1).html();
    var bz = $(row).parent().siblings().eq(3).html();
    var id = $(row).parent().siblings().eq(4).html();
    console.log(id)
    $(".bianji_bianhao").val(code);
    $(".bianji_name").val(bmname);
    $(".bianji_bz").val(bz);
    $(".baoxun_bianji").click(function() { //保存编辑的时候
        var b_code = $(".bianji_bianhao").val();
        var b_bmname = $(".bianji_name").val();
        var b_bz = $(".bianji_bz").val();
        $.ajax({
            type: "POST",
            contentType: "application/x-www-form-urlencoded",
            url: "***",
            data: {
                CheckObjectId: id,
                CheckObjectCode: b_code,
                CheckObjectName: b_bmname,
                CheckObjectDepId: checkId,
                CheckObjectMemo: b_bz
            },
            dataType: "json",
            success: function(data, status) {
                //   console.log(data, status)
                //  console.log(this.url)
                //  console.log(this.data)
                location.reload() //刷新页面
            },
            error: function(e) {
                alert("修改中继器请求失败!");
                //  console.log(this.url)
                //  console.log(this.data)
            },
            complete: function() {}
        });

    })
}

function del(rows) { //点击删除的时候获取id
    window.parent.zhezhao2()
    var id = $(rows).parent().siblings().eq(4).html();
    console.log(id)
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
                alert("删除中继器请求失败!");
                console.log(this.url)
            },
            complete: function() {}
        });
    })
}


$.ajax({ //循环中继器*****************************************************/**/ok */
    type: "GET",
    contentType: "application/x-www-form-urlencoded",
    url: "***",
    data: {},
    dataType: "json",
    success: function(data, status) {
        for (var i = 0; i < data.Data.length; i++) {
            var bmname = data.Data[i].RepeaterName;
            var id = data.Data[i].RepeaterId;
            var cc = $("<option value='" + id + "'>" + bmname + "</option>");
            cc.appendTo(".xunhunazhongjiqi1");
        }
    },
    error: function(e) {
        alert("中继器列表请求失败!");
    },
    complete: function() {}
});
$.ajax({ //循环中继器*****************************************************/**/ok */
    type: "GET",
    contentType: "application/x-www-form-urlencoded",
    url: "***",
    data: {},
    dataType: "json",
    success: function(data, status) {
        for (var i = 0; i < data.Data.length; i++) {
            var bmname = data.Data[i].RepeaterName;
            var id = data.Data[i].RepeaterId;
            var cc = $("<option value='" + id + "'>" + bmname + "</option>");
            cc.appendTo(".xunhunazhongjiqi2");
        }
    },
    error: function(e) {
        alert("中继器列表请求失败!");
    },
    complete: function() {}
});