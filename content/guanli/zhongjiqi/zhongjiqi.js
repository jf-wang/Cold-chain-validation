 var token = localStorage.getItem("token");
 $.ajax({ //页面加载/***/ok */
     type: "GET",
     contentType: "application/x-www-form-urlencoded",
     url: "***",
     data: {},
     dataType: "json",
     success: function(data, status) {
         //  console.log(data,status)
         $(".number").text(data.Data.length)
         for (var i = 0; i < data.Data.length; i++) {
             var code = data.Data[i].RepeaterCode;
             var zhqname = data.Data[i].RepeaterName;
             var bz = data.Data[i].RepeaterMemo;
             var id = data.Data[i].RepeaterId;
             var aa = $("<tr>" +
                 "<td>" + code + "</td>" +
                 "<td>" + zhqname + "</td>" +
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
         alert("中继器管理页面失败!");
     },
     complete: function() {}
 });
 $(".tainjia").click(function() { //新建点击确定的时候收集的信息/**/ok */
     //  window.parent.zhezhao2()
     var code = $(".xinjina_bianhao").val(); //编号
     var wdname = $(".xinjina_name").val(); //温度卡片名称
     //  var lianxiren = $(".quanxian2").val(); //所属公司
     var bz = $(".xinjina_bz").val(); //备注
     $.ajax({
         type: "POST",
         contentType: "application/x-www-form-urlencoded",
         url: "***",
         data: { RepeaterCode: code, RepeaterName: wdname, RepeaterDepId: depId, RepeaterMemo: bz },
         dataType: "json",
         success: function(data, status) {
             if (data.Message == "保存失败。could not execute batch command.[SQL: SQL not available]") {
                 alert("中继器编号不能重复")
                 location.reload() //刷新页面
             } else {
                 location.reload() //刷新页面
             }
         },
         error: function(e) {
             alert("增加中继器请求失败!");
         },
         complete: function() {

         }
     });
 })

 function bianji(row) { //点击编辑的时候获取信息
     window.parent.zhezhao2()
     var code = $(row).parent().siblings().eq(0).html(); //获取当前的编号
     var bmname = $(row).parent().siblings().eq(1).html();
     //  var suoshugongsi = $(row).parent().siblings().eq(2).html();
     var bz = $(row).parent().siblings().eq(2).html();
     var id = $(row).parent().siblings().eq(3).html();
     $(".bianji_bianhao").val(code);
     $(".bianji_name").val(bmname);
     //  $(".quanxian").val(suoshugongsi);
     $(".bianji_bz").val(bz);
     $(".baoxun_bianji").click(function() { //保存编辑的时候
         var b_code = $(".bianji_bianhao").val();
         var b_bmname = $(".bianji_name").val();
         //  var b_gongsi = $(".quanxian1").val();
         var b_bz = $(".bianji_bz").val();
         $.ajax({
             type: "POST",
             contentType: "application/x-www-form-urlencoded",
             url: "***",
             data: { RepeaterId: id, RepeaterDepId: depId, RepeaterCode: b_code, RepeaterName: b_bmname, RepeaterMemo: b_bz },
             dataType: "json",
             success: function(data, status) {
                 if (data.Message == "保存失败。could not execute batch command.[SQL: SQL not available]") {
                     alert("中继器编号不能重复")
                     location.reload() //刷新页面
                 } else {
                     location.reload() //刷新页面
                 }
             },
             error: function(e) {
                 alert("修改中继器请求失败!");
             },
             complete: function() {

             }
         });

     })
 }

 function del(rows) { //点击删除的时候获取id
     window.parent.zhezhao2()
     var id = $(rows).parent().siblings().eq(3).html();
     $(".queding_del").click(function() { //确定删除的时候
         console.log(id)
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
                 alert("删除中继器失败");
             },
             complete: function() {

             }
         });
     })
 }