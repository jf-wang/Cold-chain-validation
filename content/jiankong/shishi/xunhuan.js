var depId = localStorage.getItem('depId');
$.ajax({ //获取对象列表
    type: "GET",
    contentType: "application/x-www-form-urlencoded",
    url: "" + url + "/api/Check/GetCheckObjectList?DepId=" + depId + "&Token=" + token + "",
    data: {},
    dataType: "json",
    success: function(data, status) {
        for (var i = 0; i < data.Data.length; i++) {
            var option1 = $("<option value='" + data.Data[i].CheckObjectId + "'>" + data.Data[i].CheckObjectName + "</option>");
            option1.appendTo(".yanzhzengduixiang");
        }
    },
    error: function(e) {
        alert("获取验证对象列表失败");
    },
    complete: function() {}
});