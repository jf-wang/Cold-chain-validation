$.ajax({ //页面加载
    type: "GET",
    contentType: "application/x-www-form-urlencoded",
    // url: "" + url + "/api/Temp/GetRealtimeData?DepId=&RepeaterId=&TempId=&Token=" + token + "",
    url: "***",
    data: {},
    dataType: "json",
    success: function(data, status) {
        console.log(data, status);
        console.log(data.data);
        console.log(this.url);

    },
    error: function(e) {
        alert("实时数据请求失败!");
        console.log(this.data);
        console.log(this.url);
    },
    complete: function() {

    }
});
$(".yulan").click(function() {
    var DepId = $(".xunhuangonsi").val();
    var RepeaterId = $(".xunhunazhongjiqi").val();
    var TempId = $(".xunhuankapian").val();
    $.ajax({ //页面加载
        type: "GET",
        contentType: "application/x-www-form-urlencoded",
        // url: "" + url + "/api/Temp/GetRealtimeData?DepId=&RepeaterId=&TempId=&Token=" + token + "",
        url: "***",
        data: {},
        dataType: "json",
        success: function(data, status) {
            console.log(data, status);
            console.log(data.data);
            console.log(this.url);

        },
        error: function(e) {
            alert("实时数据请求失败!");
            console.log(this.data);
            console.log(this.url);
        },
        complete: function() {

        }
    });
})