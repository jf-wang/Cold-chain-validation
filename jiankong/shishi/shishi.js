$.ajax({ //页面加载
    type: "POST",
    contentType: "application/x-www-form-urlencoded",
    url: "" + url + "XMADD",
    data: {},
    dataType: "json",
    success: function(result) {
        var ds = JSON.parse(result);
        // console.log(ds);
        for (var i = 0; i < ds.Table.length; i++) {
            var name = ds.Table.name;
            var wendu = ds.Table.wendu;
            var danwei = ds.Table.danwei;
            var bb = $(" <li>" +
                "<div class='waike'>" +
                "<div class='waike_top'>" +
                "<span class='top_size'>" + name + "</span>" +
                "</div>" +
                "<div class='waike_btm'>" +
                "<span class='btm_size'>" + danwei + danwei + "</span>" +
                "</div>" +
                "</div>" +
                "</li>");
            bb.appendTo("tbody");
        }
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
        alert("新建项目失败");
    }
});