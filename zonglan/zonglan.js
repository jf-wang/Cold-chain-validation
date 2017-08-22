// var token = localStorage.getItem("token");
// $.ajax({ //页面加载******************************************************/**/ok */
//     type: "GET",
//     contentType: "application/x-www-form-urlencoded",
//     url: "" + url + "/api/Department/GetDepList?Token=" + token + "",
//     data: {},
//     dataType: "json",
//     success: function(data, status) {
//         $(".number").text(data.Data.length)
//         for (var i = 0; i < data.Data.length; i++) {
//             var bmname = data.Data[i].DepName;
//             var id = data.Data[i].DepId;
//             var aa = $("<a href='../content/index.html' target='_blank'>" +
//                 "<li onclick='gongsi(this)'>" +
//                 "<div class='gongsilogo'><img src='../img/logo_lizi.png' alt=''></div>" +
//                 "<span class='font'>" + bmname + "</span>" +
//                 "<span style='display:none'>" + id + "</span>" +
//                 "</li>" +
//                 "</a>");
//             aa.appendTo("ul");
//         }
//     },
//     error: function(e) {
//         alert("公司加载页面失败!");
//     },
//     complete: function() {}
// });

function gongsi(row) {
    var depId = $(row).children().siblings().eq(2).html();
    localStorage.setItem("depId", depId)
    var gongsiname = $(row).children().siblings().eq(1).html();
    localStorage.setItem("gongsiname", gongsiname);
    console.log(localStorage.getItem("gongsiname"))
}