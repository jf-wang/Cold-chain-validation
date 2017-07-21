// $.ajax({ //页面加载
//     type: "POST",
//     contentType: "application/x-www-form-urlencoded",
//     url: "" + url + "XMADD",
//     data: {},
//     dataType: "json",
//     success: function(result) {
//         var ds = JSON.parse(result);
//         // console.log(ds);
//         for (var i = 0; i < ds.Table.length; i++) {

//         }
//     },
//     error: function(XMLHttpRequest, textStatus, errorThrown) {
//         alert("新建项目失败");
//     }
// });
jeDate({
    dateCell: "#dateinfo4",
    format: "YYYY-MM-DD",
    isinitVal: true,
    isTime: false, //isClear:false,
    minDate: "1900-01-01 00:00:00",
    okfun: function(val) {
        alert(val)
    }
})