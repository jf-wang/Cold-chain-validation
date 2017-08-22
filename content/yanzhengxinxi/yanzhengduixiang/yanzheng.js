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
    },
    error: function (e) {
        alert("111!");
    },
    complete: function () {

    }
});

// console.log(userdepid)

var renyuanxinxi = {}
renyuanxinxi.gongsi = [],
    renyuanxinxi.bumen = [],
    renyuanxinxi.year = [],
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
        // var nowYear = data.Data.EmployeeYear
        // var ds = JSON.parse(data.Data.EmployeeData);
        // console.log(ds)
        // renyuanxinxi.bumen = ds.bumen
        // renyuanxinxi.gongsi = ds.gongsi
        // renyuanxinxi.year = ds.year
        console.log(data.Data)

        if (data.Data != null) {
            var ds = JSON.parse(data.Data.EmployeeData);
            renyuanxinxi.bumen = ds.bumen
            renyuanxinxi.gongsi = ds.gongsi
            renyuanxinxi.year = ds.year
            if (ds.lengku.length != 0) { //  冷库  数据
                console.log(111)
                var ds = JSON.parse(data.Data.EmployeeData);
                // console.log(ds.lengku)
                renyuanxinxi.bumen = ds.bumen
                // console.log(ds.bumen)
                renyuanxinxi.gongsi = ds.gongsi
                renyuanxinxi.year = ds.year
                var nowYear = data.Data.EmployeeYear
                $('.table_1 .tbody').text('');
                $('.zhibiao_year').text('');
                for (var i = 0; i < ds.lengku.length; i++) {
                    var xiangmu = ds.lengku[i].project;
                    var neirong = ds.lengku[i].content;
                    var wc = $("<tr>" +
                        "<td>" + xiangmu + "</td>" +
                        "<td>" + neirong + "</td>" +
                        "</tr>");
                    wc.appendTo(".table_1 .tbody");
                }
            }
            if (ds.baowenxiang.length != 0) { //  保温箱  数据
                var ds = JSON.parse(data.Data.EmployeeData);
                console.log(ds)
                renyuanxinxi.bumen = ds.bumen
                renyuanxinxi.gongsi = ds.gongsi
                renyuanxinxi.year = ds.year
                $('.table_2 .tbody').text('');
                for (var i = 0; i < ds.baowenxiang.length; i++) {
                    var xiangmu = ds.baowenxiang[i].project;
                    var neirong = ds.baowenxiang[i].content;
                    var wc = $("<tr>" +
                        "<td>" + xiangmu + "</td>" +
                        "<td>" + neirong + "</td>" +
                        "</tr>");
                    wc.appendTo(".table_2 .tbody");
                }
            }
            if (ds.lengcangche != 0) { //  冷藏车  数据
                var ds = JSON.parse(data.Data.EmployeeData);
                console.log(ds)
                renyuanxinxi.bumen = ds.bumen
                renyuanxinxi.gongsi = ds.gongsi
                renyuanxinxi.year = ds.year
                $('.table_3 .tbody').text('');
                for (var i = 0; i < ds.lengcangche.length; i++) {
                    var xiangmu = ds.lengcangche[i].project;
                    var neirong = ds.lengcangche[i].content;
                    var wc = $("<tr>" +
                        "<td>" + xiangmu + "</td>" +
                        "<td>" + neirong + "</td>" +
                        "</tr>");
                    wc.appendTo(".table_3 .tbody");
                }
            }
            if (ds.yinlianggui != 0) { //  阴凉柜  数据
                var ds = JSON.parse(data.Data.EmployeeData);
                console.log(ds)
                renyuanxinxi.bumen = ds.bumen
                renyuanxinxi.gongsi = ds.gongsi
                renyuanxinxi.year = ds.year
                $('.table_4 .tbody').text('');
                for (var i = 0; i < ds.yinlianggui.length; i++) {
                    var xiangmu = ds.yinlianggui[i].project;
                    var neirong = ds.yinlianggui[i].content;
                    var wc = $("<tr>" +
                        "<td>" + xiangmu + "</td>" +
                        "<td>" + neirong + "</td>" +
                        "</tr>");
                    wc.appendTo(".table_4 .tbody");
                }
            }
        }
        var wctime = $("<tr>" +
            "<td colspan='10' style='border:0;text-align:right'><span>制表时间</span><span class='maohao'>:</span>" + year + "/" + (month + 1) + "/" + day + "</td>" +
            "</tr>");
        wctime.appendTo('.zhibiao_year')
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
                    var ds = JSON.parse(data.Data.EmployeeData);
                    renyuanxinxi.bumen = ds.bumen
                    renyuanxinxi.gongsi = ds.gongsi
                    renyuanxinxi.year = ds.year
                    if (ds.lengku.length != 0) { //  冷库  数据
                        console.log(11)
                        var ds = JSON.parse(data.Data.EmployeeData);
                        renyuanxinxi.bumen = ds.bumen
                        renyuanxinxi.gongsi = ds.gongsi
                        renyuanxinxi.year = ds.year
                        $('.table_1 .tbody').text('');
                        $('.zhibiao_year').text('');
                        for (var i = 0; i < ds.lengku.length; i++) {
                            var xiangmu = ds.lengku[i].project;
                            var neirong = ds.lengku[i].content;
                            var wc = $("<tr>" +
                                "<td>" + xiangmu + "</td>" +
                                "<td>" + neirong + "</td>" +
                                "</tr>");
                            wc.appendTo(".table_1 .tbody");
                        }
                    }

                    if (ds.baowenxiang.length != 0) { //  保温箱  数据
                        var ds = JSON.parse(data.Data.EmployeeData);
                        renyuanxinxi.bumen = ds.bumen
                        renyuanxinxi.gongsi = ds.gongsi
                        renyuanxinxi.year = ds.year
                        $('.table_2 .tbody').text('');
                        for (var i = 0; i < ds.baowenxiang.length; i++) {
                            var xiangmu = ds.baowenxiang[i].project;
                            var neirong = ds.baowenxiang[i].content;
                            var wc = $("<tr>" +
                                "<td>" + xiangmu + "</td>" +
                                "<td>" + neirong + "</td>" +
                                "</tr>");
                            wc.appendTo(".table_2 .tbody");
                        }
                    }

                    if (ds.lengcangche != 0) { //  冷藏车  数据
                        var ds = JSON.parse(data.Data.EmployeeData);
                        renyuanxinxi.bumen = ds.bumen
                        renyuanxinxi.gongsi = ds.gongsi
                        renyuanxinxi.year = ds.year
                        $('.table_3 .tbody').text('');
                        for (var i = 0; i < ds.lengcangche.length; i++) {
                            var xiangmu = ds.lengcangche[i].project;
                            var neirong = ds.lengcangche[i].content;
                            var wc = $("<tr>" +
                                "<td>" + xiangmu + "</td>" +
                                "<td>" + neirong + "</td>" +
                                "</tr>");
                            wc.appendTo(".table_3 .tbody");
                        }
                    }

                    if (ds.yinlianggui.length != 0) { //  阴凉柜  数据
                        var ds = JSON.parse(data.Data.EmployeeData);
                        renyuanxinxi.bumen = ds.bumen
                        renyuanxinxi.gongsi = ds.gongsi
                        renyuanxinxi.year = ds.year
                        $('.table_4 .tbody').text('');
                        for (var i = 0; i < ds.yinlianggui.length; i++) {
                            var xiangmu = ds.yinlianggui[i].project;
                            var neirong = ds.yinlianggui[i].content;
                            var wc = $("<tr>" +
                                "<td>" + xiangmu + "</td>" +
                                "<td>" + neirong + "</td>" +
                                "</tr>");
                            wc.appendTo(".table_4 .tbody");
                        }
                    } 

                    $('.zhibiao_year').text('')
                    var wctime = $("<tr>" +
                        "<td colspan='10' style='border:0;text-align:right'><span>制表时间</span><span class='maohao'>:</span>" + year + "/" + (month + 1) + "/" + day + "</td>" +
                        "</tr>");
                    wctime.appendTo('.zhibiao_year')

                } else {
                    $('.table_1 .tbody').text('');
                    $('.zhibiao_year').text('');
                    var wc = $("<tr><td>投入使用时间</td><td></td></tr>" +
                        "<tr><td>冷藏车容积</td><td>长*宽*高：（）m*（）m*（）m=（）m³</td></tr>" +
                        "<tr><td>验证信息</td><td></td></tr>" +
                        "<tr><td></td><td></td></tr>" +
                        "<tr><td></td><td></td></tr>" +
                        "<tr><td></td><td></td></tr>"
                    );
                    wc.appendTo(".table_1 .tbody");

                    $('.table_2 .tbody').text('');
                    $('.zhibiao_year').text('');
                    var wc = $("<tr><td>型号</td><td>20L</td></tr>" +
                        "<tr><td>外部尺寸</td><td>600×380×560mm</td></tr>" +
                        "<tr><td>内部尺寸</td><td>530×320×500mm</td></tr>" +
                        "<tr><td>冷排配置数量</td><td>冰排3块</td></tr>" +
                        "<tr><td>蓄冷剂型号</td><td>4号，使用温度范围是2℃-8℃</td></tr>" +
                        "<tr><td>验证类型</td><td>满载验证</td></tr>" +
                        "<tr><td></td><td></td></tr>" +
                        "<tr><td></td><td></td></tr>" +
                        "<tr><td></td><td></td></tr>"
                    );
                    wc.appendTo(".table_2 .tbody");

                    $('.table_3 .tbody').text('');
                    $('.zhibiao_year').text('');
                    var wc = $("<tr><td>车牌号</td><td></td></tr>" +
                        "<tr><td>车型号</td><td></td></tr>" +
                        "<tr><td>生产厂家</td><td></td></tr>" +
                        "<tr><td>投入使用时间</td><td></td></tr>" +
                        "<tr><td>冷藏车容积</td><td>长*宽*高：（）m*（）m*（）m=（）m³</td></tr>" +
                        "<tr><td>验证类型</td><td>空载验证</td></tr>" +
                        "<tr><td></td><td></td></tr>" +
                        "<tr><td></td><td></td></tr>" +
                        "<tr><td></td><td></td></tr>"
                    );
                    wc.appendTo(".table_3 .tbody");

                    $('.table_4 .tbody').text('');
                    $('.zhibiao_year').text('');
                    var wc = $("<tr><td>型号</td><td></td></tr>" +
                        "<tr><td>外部尺寸</td><td>600×380×560mm</td></tr>" +
                        "<tr><td>内部尺寸</td><td>530×320×500mm</td></tr>" +
                        "<tr><td>验证类型</td><td>满载验证</td></tr>" +
                        "<tr><td></td><td></td></tr>" +
                        "<tr><td></td><td></td></tr>" +
                        "<tr><td></td><td></td></tr>"
                    );
                    wc.appendTo(".table_4 .tbody");
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

$(".save").click(function () { //点击 保存 编辑的数据
    $('#table_1 .tbody tr').each(function () { //获取 冷库 数据
        var xiangmu = $(this).find('td:nth(0)').text(); // 获取项目名称
        var neirong = $(this).find('td:nth(1)').text(); // 获取内容
        renyuanxinxi.lengku.push({
            project: xiangmu,
            content: neirong
        });
    });
    $('#table_2 .tbody tr').each(function () { //获取 保温箱 数据
        var xiangmu = $(this).find('td:nth(0)').text(); // 获取项目名称
        var neirong = $(this).find('td:nth(1)').text(); // 获取内容
        renyuanxinxi.baowenxiang.push({
            project: xiangmu,
            content: neirong
        });
    });
    $('#table_3 .tbody tr').each(function () { //获取 冷藏车 数据
        var xiangmu = $(this).find('td:nth(0)').text(); // 获取项目名称
        var neirong = $(this).find('td:nth(1)').text(); // 获取内容
        renyuanxinxi.lengcangche.push({
            project: xiangmu,
            content: neirong
        });
    });
    $('#table_4 .tbody tr').each(function () { //获取 阴凉柜 数据
        var xiangmu = $(this).find('td:nth(0)').text(); // 获取项目名称
        var neirong = $(this).find('td:nth(1)').text(); // 获取内容
        renyuanxinxi.yinlianggui.push({
            project: xiangmu,
            content: neirong
        });
    });
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
            console.log(year)
            console.log(data, status)
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