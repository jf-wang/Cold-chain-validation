var depId = localStorage.getItem('depId');
$.ajax({ //根据部门id请求他的中继器ok
    type: "GET",
    contentType: "application/x-www-form-urlencoded",
    url: "***",
    data: {},
    dataType: "json",
    success: function(data, status) {
        for (var i = 0; i < data.Data.length; i++) {
            var option = $("<option value='" + data.Data[i].RepeaterId + "'>" + data.Data[i].RepeaterName + "</option>");
            option.appendTo(".zhongjiqi");
        }
        var RepeaterId = $(".zhongjiqi").val();
        $.ajax({
            type: "GET",
            contentType: "application/x-www-form-urlencoded",
            url: "***",
            data: {},
            dataType: "json",
            success: function(data, status) {
                console.log(data)
                    // console.log(this.url)
                for (var i = 0; i < data.Data.length; i++) {
                    var code = data.Data[i].TempCode;
                    var zhqname = data.Data[i].TempName;
                    var bz = data.Data[i].TempMemo;
                    var id = data.Data[i].TempId;
                    var wenduHigh = data.Data[i].TempHigh;
                    var wenduLow = data.Data[i].TempLow;
                    var tongdao = data.Data[i].TempPosition;
                    var aa = $("<tr>" +
                        "<td>" +
                        "<input type='checkbox' name='test'class='onclickinput' value='" + id + "' />" +
                        "</td>" +
                        "<td>" + code + "</td>" +
                        "<td>" + zhqname + "</td>" +
                        "<td>" + tongdao + "</td>" +
                        "<td>" + wenduHigh + "</td>" +
                        "<td>" + wenduLow + "</td>" +
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


$(".zhongjiqi").change(function() { //下拉框改变事件ok
    $("tbody").text(""); //清空tbody
    var RepeaterId = $(".zhongjiqi").val();
    $.ajax({
        type: "GET",
        contentType: "application/x-www-form-urlencoded",
        url: "***",
        data: {},
        dataType: "json",
        success: function(data, status) {
            for (var i = 0; i < data.Data.length; i++) {
                var code = data.Data[i].TempCode;
                var zhqname = data.Data[i].TempName;
                var bz = data.Data[i].TempMemo;
                var id = data.Data[i].TempId;
                var wenduHigh = data.Data[i].TempHigh;
                var wenduLow = data.Data[i].TempLow;
                var tongdao = data.Data[i].TempPosition;
                var aa = $("<tr>" +
                    "<td>" +
                    "<input type='checkbox' name='test'class='onclickinput' value='" + id + "' />" +
                    "</td>" +
                    "<td>" + code + "</td>" +
                    "<td>" + zhqname + "</td>" +
                    "<td>" + tongdao + "</td>" +
                    "<td>" + wenduHigh + "</td>" +
                    "<td>" + wenduLow + "</td>" +
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
            alert("请求失败!");
        },
        complete: function() {}
    });
})


$(".tainjia").click(function() { //新建ok
    // window.parent.zhezhao2()
    var code = $(".xinjina_bianhao").val();
    var name = $(".xinjina_name").val();
    var tongdao = $(".tongdao2").val();
    var bz = $(".rr").val();
    var high = $('.cc').val();
    var low = $('.xx').val()
    var TempRepeaterId = $(".zhongjiqi").val();
    $.ajax({
        type: "POST",
        contentType: "application/x-www-form-urlencoded",
        url: "***",
        data: {
            TempName: name,
            TempRepeaterId: TempRepeaterId,
            TempMemo: bz,
            TempCode: code,
            TempHigh: high,
            TempLow: low,
            TempPosition: tongdao
        },
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

function bianji(row) { //编辑ok
    window.parent.zhezhao2()
    var RepeaterId = $(".zhongjiqi").val();
    var code = $(row).parent().siblings().eq(1).html(); //获取当前的编号
    var bmname = $(row).parent().siblings().eq(2).html();
    var tongdao = $(row).parent().siblings().eq(3).html();
    var bj_high = $(row).parent().siblings().eq(4).html();
    var bj_low = $(row).parent().siblings().eq(5).html();
    var bz = $(row).parent().siblings().eq(6).html();
    var id = $(row).parent().siblings().eq(7).html();
    $(".bianji_bianhao").val(code);
    $(".bianji_name").val(bmname);
    $(".tongdao").val(tongdao);
    $(".bianji_wenduUp").val(bj_high);
    $(".bianji_wenduDown").val(bj_low);
    $(".bianji_bz").val(bz);
    $(".baoxun_bianji").click(function() {
        var b_code = $(".bianji_bianhao").val();
        var b_name = $(".bianji_name").val();
        var b_tongdao = $(".tongdao").val();
        var b_wenduUp = $(".bianji_wenduUp").val();
        var b_wenduDown = $(".bianji_wenduDown").val();
        var b_bz = $(".bianji_bz").val();
        $.ajax({
            type: "POST",
            contentType: "application/x-www-form-urlencoded",
            url: "***",
            data: {
                TempName: b_name,
                TempRepeaterId: RepeaterId,
                TempMemo: b_bz,
                TempCode: b_code,
                TempHigh: b_wenduUp, //保存温度上限
                TempLow: b_wenduDown, //保存温度下限
                TempPosition: b_tongdao,
                TempId: id
            },
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

function del(rows) {
    window.parent.zhezhao2()
    var id = $(rows).parent().siblings().eq(7).html();
    $(".queding_del").click(function() {
        $.ajax({
            type: "POST",
            contentType: "application/x-www-form-urlencoded",
            url: "***",
            data: {},
            dataType: "json",
            success: function(data, status) {
                alert(data.Message)
                location.reload() //刷新页面
            },
            error: function(e) {
                alert("请求失败!");
                //  console.log(this.url)
            },
            complete: function() {}
        });
    })
}

$(".tainjia_oll").click(function() {
    var qishibianhao = $(".qishi_bianhao").val(); //起始编号
    var shebeigeshu = $(".shebigeshu").val(); //设备个数
    var qishitongdao = $(".qishitongdao").val(); //起始通道
    var shang = $(".shang").val(); //温度上限
    var xia = $(".xia").val(); //温度下限
    var duobz = $(".duobz").val(); //额备注
    var TempRepeaterId = $(".zhongjiqi").val();
    for (var i = 0; i < shebeigeshu; i++) {
        $.ajax({
            type: "POST",
            contentType: "application/x-www-form-urlencoded",
            url: "***",
            data: {
                TempName: qishibianhao,
                TempRepeaterId: TempRepeaterId,
                TempMemo: duobz,
                TempCode: qishibianhao,
                TempHigh: shang,
                TempLow: xia,
                TempPosition: qishitongdao
            },
            dataType: "json",
            success: function(data, status) {
                location.reload() //刷新页面
            },
            error: function(e) {
                alert("请求失败!");
            },
            complete: function() {}
        });
        qishibianhao++
        if (qishibianhao.toString().length == 1) {
            qishibianhao = '0000' + qishibianhao
        } else if (qishibianhao.toString().length == 2) {
            qishibianhao = '000' + qishibianhao
        } else if (qishibianhao.toString().length == 3) {
            qishibianhao = '00' + qishibianhao
        } else if (qishibianhao.toString().length == 4) {
            qishibianhao = '0' + qishibianhao
        } else {
            qishibianhao = qishibianhao
        }
        // console.log(qishibianhao)
        qishitongdao++
    }
})
$(".del_oll").click(function() { //批量删除
    var trs = $("tbody tr").length;
    console.log(trs);
    var oInput = document.getElementsByName("test");
    for (var i = 0; i < oInput.length; i++) {
        if (oInput[i].checked) {
            $.ajax({
                type: "POST",
                contentType: "application/x-www-form-urlencoded",
                url: "***",
                data: {},
                dataType: "json",
                success: function(data, status) {
                    // alert(data.Message)
                    location.reload() //刷新页面
                },
                error: function(e) {
                    alert("请求失败!");
                    //  console.log(this.url)
                },
                complete: function() {}
            });
        };
    };
})


for (var i = 1; i < 101; i++) {
    var option = $("<option value='" + i + "'>" + i + "</option>");
    option.appendTo(".tongdao");
}

for (var i = 1; i < 101; i++) {
    var option = $("<option value='" + i + "'>" + i + "</option>");
    option.appendTo(".tongdao2");
}