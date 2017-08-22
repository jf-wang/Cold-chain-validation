$.ajax({ //页面加载

    type: "GET",
    contentType: "application/x-www-form-urlencoded",
    url: "***",
    data: {},
    async: false,
    dataType: "json",
    success: function(data, status) {
        $(".shuju").text(data.Data.length)
        for (var i = 0; i < data.Data.length; i++) {
            var j = i + 1;
            var tempName = data.Data[i].TempName; //名字
            var Data = data.Data[i].Data; //温度
            var Battery = data.Data[i].Battery; //电量
            var High = data.Data[i].High; //温度上限
            var Low = data.Data[i].Low; //温度下限
            var IsGood = data.Data[i].IsGood; //是否离线
            var Moisture = data.Data[i].Moisture; //湿度    
            var Signal = data.Data[i].Signal; //信号
            var cc = $(
                '<li>' +
                '<div class="waike">' +
                '<div class="waike_top">' +
                '<span class="top_size">' + tempName + '</span>' +
                '<div class="xinghao">' +
                '<span class="XHimg"></span>' +
                '<span class="XHnuber">--</span>' +
                '</div>' +
                '<div class="dianliang">' +
                '<span class="DLimg"></span>' +
                '<span class="DLnuber">' + Battery + "%" + '</span>' +
                '</div>' +
                '</div>' +
                '<div class="waike_btm">' +
                '<div class="waike_btm_right">' +
                '<div class="right_top">' +
                '<span class="wendu">温度:</span><br>' +
                '<span class="wendu_ber">' + Data + "℃" + '</span>' +
                '</div>' +
                '<div class="right_bot">' +
                '<span class="shidu">湿度:</span><br>' +
                '<span class="shidu_ber">--</span>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>');

            cc.appendTo(".ul")
            if (Data > High || Data < Low) {
                $(".ul li:nth-child(" + j + ")").find(".wendu_ber").css("color", "rgb(255,70,70)");
            }
            if (IsGood == 0) {
                $(".ul li:nth-child(" + j + ")").find(".waike_btm").css("background", "#ccc");
            }
        }
    },
    error: function(e) {
        alert("请求失败!");
    },
    complete: function() {

    }
});
$(".yanzhzengduixiang").change(function() {
    var yanzhengduxiang = $(".yanzhzengduixiang").val();
    $(".ul").text("")
    $.ajax({ //页面加载
        type: "GET",
        contentType: "application/x-www-form-urlencoded",
        url: "***",
        data: {},
        async: false,
        dataType: "json",
        success: function(data, status) {
            // console.log(data)
            $(".shuju").text(data.Data.length)
            for (var i = 0; i < data.Data.length; i++) {
                var j = i + 1;
                var tempName = data.Data[i].TempName; //名字
                var Data = data.Data[i].Data; //温度
                var Battery = data.Data[i].Battery; //电量
                var High = data.Data[i].High; //温度上限
                var Low = data.Data[i].Low; //温度下限
                var IsGood = data.Data[i].IsGood; //是否离线
                var Moisture = data.Data[i].Moisture; //湿度    
                var Signal = data.Data[i].Signal; //信号
                var cc = $(
                    '<li>' +
                    '<div class="waike">' +
                    '<div class="waike_top">' +
                    '<span class="top_size">' + tempName + '</span>' +
                    '<div class="xinghao">' +
                    '<span class="XHimg"></span>' +
                    '<span class="XHnuber">--</span>' +
                    '</div>' +
                    '<div class="dianliang">' +
                    '<span class="DLimg"></span>' +
                    '<span class="DLnuber">' + Battery + "%" + '</span>' +
                    '</div>' +
                    '</div>' +
                    '<div class="waike_btm">' +
                    '<div class="waike_btm_right">' +
                    '<div class="right_top">' +
                    '<span class="wendu">温度:</span><br>' +
                    '<span class="wendu_ber">' + Data + "℃" + '</span>' +
                    '</div>' +
                    '<div class="right_bot">' +
                    '<span class="shidu">湿度:</span><br>' +
                    '<span class="shidu_ber">--</span>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</li>');

                cc.appendTo(".ul")
                if (Data > High || Data < Low) {
                    $(".ul li:nth-child(" + j + ")").find(".wendu_ber").css("color", "rgb(255,70,70)");
                }
                if (IsGood == 0) {
                    $(".ul li:nth-child(" + j + ")").find(".waike_btm").css("background", "#ccc");
                }
            }
        },
        error: function(e) {
            alert("请求失败!");
        },
        complete: function() {

        }
    });
})

function DSshuaxin() {
    var yanzhengduxiang = $(".yanzhzengduixiang").val();
    $(".ul").text("")
    $.ajax({ //页面加载
        type: "GET",
        contentType: "application/x-www-form-urlencoded",
        url: "***",
        data: {},
        async: false,
        dataType: "json",
        success: function(data, status) {
            // console.log(data)
            $(".shuju").text(data.Data.length)
            for (var i = 0; i < data.Data.length; i++) {
                var j = i + 1;
                var tempName = data.Data[i].TempName; //名字
                var Data = data.Data[i].Data; //温度
                var Battery = data.Data[i].Battery; //电量
                var High = data.Data[i].High; //温度上限
                var Low = data.Data[i].Low; //温度下限
                var IsGood = data.Data[i].IsGood; //是否离线
                var Moisture = data.Data[i].Moisture; //湿度    
                var Signal = data.Data[i].Signal; //信号
                var cc = $(
                    '<li>' +
                    '<div class="waike">' +
                    '<div class="waike_top">' +
                    '<span class="top_size">' + tempName + '</span>' +
                    '<div class="xinghao">' +
                    '<span class="XHimg"></span>' +
                    '<span class="XHnuber">--</span>' +
                    '</div>' +
                    '<div class="dianliang">' +
                    '<span class="DLimg"></span>' +
                    '<span class="DLnuber">' + Battery + "%" + '</span>' +
                    '</div>' +
                    '</div>' +
                    '<div class="waike_btm">' +
                    '<div class="waike_btm_right">' +
                    '<div class="right_top">' +
                    '<span class="wendu">温度:</span><br>' +
                    '<span class="wendu_ber">' + Data + "℃" + '</span>' +
                    '</div>' +
                    '<div class="right_bot">' +
                    '<span class="shidu">湿度:</span><br>' +
                    '<span class="shidu_ber">--</span>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</li>');

                cc.appendTo(".ul")
                if (Data > High || Data < Low) {
                    $(".ul li:nth-child(" + j + ")").find(".wendu_ber").css("color", "rgb(255,70,70)");
                }
                if (IsGood == 0) {
                    $(".ul li:nth-child(" + j + ")").find(".waike_btm").css("background", "#ccc");
                }
            }
        },
        error: function(e) {
            alert("请求失败!");
        },
        complete: function() {

        }
    });
    // alert(11)
    console.log("刷新了")
}
setInterval("DSshuaxin()", 10000);