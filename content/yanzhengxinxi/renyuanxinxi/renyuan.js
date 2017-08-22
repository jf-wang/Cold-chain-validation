var userid = localStorage.getItem("userName")
var userdepid = ''
$.ajax({ // 页面加载获取用户ID
    type: "GET",
    contentType: "application/x-www-form-urlencoded",
    url: "" + url + "/api/User/GetUser?userId=" + userid + "&Token=" + token + "",
    data: {},
    async: false, //关闭异步
    dataType: "json",
    success: function (data, status) {
        userdepid = data.Data.UserDepId
        console.log(data, status)
    },
    error: function (e) {
        alert("111!");
    },
    complete: function () {

    }
});

 depId = localStorage.getItem("depId");
    var img = $("<img src='" + url + "/api/Logo/GetLogo?DepId=" + depId + "' class='gongsologo' >");
    img.appendTo(".head_left")
    $.ajax({ //********************获取公司名***************************/**/ok */
        type: "GET",
        contentType: "application/x-www-form-urlencoded",
        url: "" + url + "/api/Department/GetDep/" + depId + "?Token=" + token + "",
        data: {},
        dataType: "json",
        success: function (data, status) {
            $(".gongsiming").text(data.Data.DepName);
        },
        error: function (e) {
            alert("公司列表请求失败!");
        },
        complete: function () {}
    });

var renyuanxinxi = {}
renyuanxinxi.gongsi = [],
    renyuanxinxi.bumen = [],
    renyuanxinxi.lengku = [],
    renyuanxinxi.baowenxiang = [],
    renyuanxinxi.lengcangche = [],
    renyuanxinxi.yinlianggui = [],
    renyuanxinxi.year = []

//设置年份的选择 
var myDate = new Date();
var month = myDate.getMonth()
var day = myDate.getDate()
var startYear = myDate.getFullYear() - 10; //起始年份 
var endYear = myDate.getFullYear(); //结束年份 
var obj = document.getElementById('myYear')
for (var i = startYear; i <= endYear; i++) {
    var aa = $("<option value='" + i + "'>" + i + "</option>");
    aa.appendTo("#myYear");
}
$('#myYear option:last-child').attr('selected', 'selected')

var year = $('.year').val()

$.ajax({ // 页面加载生成对应用户ID内容
    type: "GET",
    contentType: "application/x-www-form-urlencoded",
    url: "" + url + "/api/Employee/GetEmployee?DepId=" + userdepid + "&Year=" + year + "&Token=" + token + "",
    data: {},
    dataType: "json",
    success: function (data, status) {
        console.log(data.Data)
        if (data.Data != null) {
            var nowYear = data.Data.EmployeeYear
            var ds = JSON.parse(data.Data.EmployeeData);
            console.log(ds)
            renyuanxinxi.lengku = ds.lengku
            renyuanxinxi.baowenxiang = ds.baowenxiang
            renyuanxinxi.lengcangche = ds.lengcangche
            renyuanxinxi.yinlianggui = ds.yinlianggui
            renyuanxinxi.year = ds.year
            if (ds.bumen.lenght != 0) {
                $('.tbody').text('');
                $('#year').text('');
                for (var i = 0; i < ds.bumen.length; i++) {
                    var name = ds.bumen[i].name;
                    var renyuan = ds.bumen[i].renyuan;
                    var tel = ds.bumen[i].tel;
                    var wc = $("<tr>" +
                        "<td>" + renyuan + "</td>" +
                        "<td>" + name + "</td>" +
                        "<td>" + tel + "</td>" +
                        "</tr>");
                    wc.appendTo(".tbody");
                }
                // month = ds.year[0].month
                // day = ds.year[0].day
                var wctime = $("<tr>" +
                    "<td colspan='10' style='border:0;text-align:right'><span>制表时间</span><span class='maohao'>:</span>" + nowYear + "/" + (month + 1) + "/" + day + "</td>" +
                    "</tr>");
                wctime.appendTo('#year')
                // $('.gongsi_name').text(ds.gongsi[0].name)
            }
        } else {
            // $('.tbody').text('');
            // $('#year').text('');
            // var wc = $("<tr><td>质量负责人</td><td></td><td></td></tr>" +
            //     "<tr><td>质量部经理</td><td></td><td></td></tr>" +
            //     "<tr><td>质量管理员</td><td></td><td></td></tr>" +
            //     "<tr><td>养护员</td><td></td><td></td></tr>" +
            //     "<tr><td>仓储部经理</td><td></td><td></td></tr>" +
            //     "<tr><td>运输管理员</td><td></td><td></td></tr>" +
            //     "<tr><td>信息部经理</td><td></td><td></td></tr>" +
            //     "<tr><td>信息管理员</td><td></td><td></td></tr>" +
            //     "<tr><td>冷藏车司机</td><td></td><td></td></tr>" +
            //     "<tr><td></td><td></td><td></td></tr>" +
            //     "<tr><td></td><td></td><td></td></tr>" +
            //     "<tr><td></td><td></td><td></td></tr>");
            // wc.appendTo(".tbody");
            // var wctime = $("<tr>" +
            //     "<td colspan='10' style='border:0;text-align:right'><span>制表时间</span><span class='maohao'>:</span>" + year + "/" + (month + 1) + "/" + day + "</td>" +
            //     "</tr>");
            // wctime.appendTo('#year')
        }
        shuangji()
    },
    error: function (e) {
        alert("222!");
        console.log(this.url)
    },
    complete: function () {

    }
});
var gaibian = function () {
    $('.year').change(function () { //年份改变生成数据
        year = $('.year').val()
        var myDate = new Date();
        var month = myDate.getMonth()
        var day = myDate.getDate()
        shuangji()
        $.ajax({ // 页面加载生成对应用户ID内容
            type: "GET",
            contentType: "application/x-www-form-urlencoded",
            url: "" + url + "/api/Employee/GetEmployee?DepId=" + userdepid + "&Year=" + year + "&Token=" + token + "",
            data: {},
            dataType: "json",
            success: function (data, status) {
                console.log(data.Data)
                if (data.Data != null) {
                    var nowYear = data.Data.EmployeeYear
                    var ds = JSON.parse(data.Data.EmployeeData);
                    console.log(ds)
                    renyuanxinxi.lengku = ds.lengku
                    renyuanxinxi.baowenxiang = ds.baowenxiang
                    renyuanxinxi.lengcangche = ds.lengcangche
                    renyuanxinxi.yinlianggui = ds.yinlianggui
                    renyuanxinxi.year = ds.year
                    if (ds.bumen.length != 0) {
                        $('.tbody').text('');
                        $('#year').text('');
                        for (var i = 0; i < ds.bumen.length; i++) {
                            var name = ds.bumen[i].name;
                            var renyuan = ds.bumen[i].renyuan;
                            var tel = ds.bumen[i].tel;
                            var wc = $("<tr>" +
                                "<td>" + renyuan + "</td>" +
                                "<td>" + name + "</td>" +
                                "<td>" + tel + "</td>" +
                                "</tr>");
                            wc.appendTo(".tbody");
                        }
                        // month = ds.year.month
                        // day = ds.year.day
                        var wctime = $("<tr>" +
                            "<td colspan='10' style='border:0;text-align:right'><span>制表时间</span><span class='maohao'>:</span>" + nowYear + "/" + (month + 1) + "/" + day + "</td>" +
                            "</tr>");
                        wctime.appendTo('#year')
                        // $('.gongsi_name').text(ds.gongsi[0].name)
                    }
                } else {
                    $('.tbody').text('');
                    $('#year').text('');
                    var wc = $("<tr><td>质量负责人</td><td></td><td></td></tr>" +
                        "<tr><td>质量部经理</td><td></td><td></td></tr>" +
                        "<tr><td>质量管理员</td><td></td><td></td></tr>" +
                        "<tr><td>养护员</td><td></td><td></td></tr>" +
                        "<tr><td>仓储部经理</td><td></td><td></td></tr>" +
                        "<tr><td>运输管理员</td><td></td><td></td></tr>" +
                        "<tr><td>信息部经理</td><td></td><td></td></tr>" +
                        "<tr><td>信息管理员</td><td></td><td></td></tr>" +
                        "<tr><td>冷藏车司机</td><td></td><td></td></tr>" +
                        "<tr><td></td><td></td><td></td></tr>" +
                        "<tr><td></td><td></td><td></td></tr>" +
                        "<tr><td></td><td></td><td></td></tr>");
                    wc.appendTo(".tbody");
                    var wctime = $("<tr>" +
                        "<td colspan='10' style='border:0;text-align:right'><span>制表时间</span><span class='maohao'>:</span>" + year + "/" + (month + 1) + "/" + day + "</td>" +
                        "</tr>");
                    wctime.appendTo('#year')
                }
                shuangji()
            },
            error: function (e) {
                alert("222!");
                console.log(this.url)
            },
            complete: function () {

            }
        });
    })
}
gaibian()

// console.log(year)
$(".save").click(function () { //点击保存编辑的数据
    $('#tbody tr').each(function () {
        var renyuan_zhiwei = $(this).find('td:nth(0)').text(); // 获取验证小组人员
        var renyuan_name = $(this).find('td:nth(1)').text(); // 获取姓名
        var renyuan_tel = $(this).find('td:nth(2)').text(); // 获取电话
        renyuanxinxi.bumen.push({
            renyuan: renyuan_zhiwei,
            name: renyuan_name,
            tel: renyuan_tel
        });
    });
    var gongsi_name = $('.gongsi_name').text()
    renyuanxinxi.gongsi.push({
        name: gongsi_name
    })
    renyuanxinxi.year.push({
        month: month,
        day: day
    })
    var datas = JSON.stringify(renyuanxinxi) //把数组转换成JSON格式
    $.ajax({
        type: "POST",
        contentType: "application/x-www-form-urlencoded",
        url: "" + url + "/api/Employee/SaveEmpolyee?Token=" + token + "",
        data: {
            EmployeeDepId: userdepid,
            EmployeeYear: year,
            EmployeeData: datas
        },
        dataType: "json",
        success: function (data, status) {
            console.log(data, status)
            console.log(year)
            location.reload() //刷新页面
        },
        error: function (e) {
            alert("111!");
            console.log(this.url)
        },
        complete: function () {

        }
    });
})