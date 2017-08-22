 $.ajax({ //页面加载
     type: "GET",
     contentType: "application/x-www-form-urlencoded",
     url: "***",
     data: {},
     dataType: "json",
     success: function(data, status) {
         console.log(data, status)
         console.log(data.Data)
         console.log(this.url)
         $('.number').text(data.Data.length)
         for (var i = 0; i < data.Data.length; i++) {
             var code = data.Data[i].TempCode;
             var ssname = data.Data[i].TempName;
             var subuzhongjiqi = data.Data[i].TempRepeaterId;
             var bz = data.Data[i].TempMemo;
             var id = data.Data[i].TempId;
             $.ajax({
                 type: "GET",
                 contentType: "application/x-www-form-urlencoded",
                 url: "***",
                 data: {},
                 async: false,
                 dataType: "json",
                 success: function(data, status) {
                     console.log(data, status)
                 },
                 error: function(e) {
                     alert("新增中继器请求失败!");
                 },
                 complete: function() {}
             });
             var aa = $("<tr>" +
                 "<td>" + code + "</td>" +
                 "<td></td>" +
                 "<td></td>" +
                 "<td>" + ssname + "</td>" +
                 "<td></td>" +
                 "<td></td>" +
                 "<td></td>" +
                 "<td></td>" +
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
         alert("获取温度卡片列表失败");
         console.log(this.url)
     },
     complete: function() {}
 });

 $(".tainjia").click(function() { //新建点击确定的时候收集的信息
     var codes = $(".xinjina_bianhao").val(); //编号
     var wdname = $(".xinjina_name").val(); //温度卡片名称
     var zhongjiqi = $(".xunhunazhongjiqi1").val(); //所属中继器
     var bz = $(".xinjina_bz").val(); //备注
     $.ajax({
         type: "POST",
         contentType: "application/x-www-form-urlencoded",
         url: "***",
         data: {
             TempCode: codes,
             TempName: wdname,
             TempRepeaterId: zhongjiqi,
             TempMemo: bz
         },
         dataType: "json",
         success: function(data, status) {
             location.reload() //刷新页面
         },
         error: function(e) {
             alert("新增中继器请求失败!");

         },
         complete: function() {}
     });
 })

 function bianji(row) { //点击编辑的时候获取信息
     window.parent.zhezhao2()
     var code = $(row).parent().siblings().eq(0).html(); //获取当前的编号
     var bmname = $(row).parent().siblings().eq(1).html();
     var lianxiren = $(row).parent().siblings().eq(2).html();
     var bz = $(row).parent().siblings().eq(3).html();
     var id = $(row).parent().siblings().eq(4).html();
     $(".bianji_bianhao").val(code);
     $(".bianji_name").val(bmname);
     $(".xunhunazhongjiqi2").val(lianxiren);
     $(".bianji_bz").val(bz);
     $(".baoxun_bianji").click(function() { //保存编辑的时候
         var b_code = $(".bianji_bianhao").val();
         var b_bmname = $(".bianji_name").val();
         var b_zhongjiqi = $(".xunhunazhongjiqi2").val();
         var b_bz = $(".bianji_bz").val();
         $.ajax({
             type: "POST",
             contentType: "application/x-www-form-urlencoded",
             url: "***",
             data: {
                 TempId: id,
                 TempCode: b_code,
                 TempName: b_bmname,
                 TempRepeaterId: b_zhongjiqi,
                 TempMemo: b_bz
             },
             dataType: "json",
             success: function(data, status) {
                 //  console.log(data, status)
                 //  console.log(this.url)
                 //  console.log(this.data)
                 location.reload() //刷新页面
             },
             error: function(e) {
                 alert("修改中继器请求失败!");
                 //  console.log(this.url)
                 //  console.log(this.data)
             },
             complete: function() {}
         });

     })
 }

 function del(rows) { //点击删除的时候获取id
     window.parent.zhezhao2()
     var id = $(rows).parent().siblings().eq(4).html();
     $(".queding_del").click(function() { //确定删除的时候
         $.ajax({
             type: "POST",
             contentType: "application/x-www-form-urlencoded",
             url: "***",
             data: {},
             dataType: "json",
             success: function(data, status) {
                 //  console.log(data, status)
                 //  console.log(this.url)
                 location.reload() //刷新页面
             },
             error: function(e) {
                 alert("删除中继器请求失败!");
                 //  console.log(this.url)
             },
             complete: function() {}
         });
     })
 }


 $.ajax({ //页面加载
     type: "GET",
     contentType: "application/x-www-form-urlencoded",
     url: "***",
     data: {},
     dataType: "json",
     success: function(data, status) {
         //  console.log(data, status)
         //  console.log(this.url)
         //   console.log(data.Data)
         $('.number').text(data.Data.length)
         for (var i = 0; i < data.Data.length; i++) {
             var zhqname = data.Data[i].TempName;
             var id = data.Data[i].TempId;
             var aa = $("<option value='" + id + "'>" + zhqname + "</option>");
             aa.appendTo(".xunhunayanzheng");
         }
     },
     error: function(e) {
         alert("获取验证对象列表失败");
         console.log(this.url)
     },
     complete: function() {}
 });
























 $.ajax({ //循环中继器*****************************************************/**/ok */
     type: "GET",
     contentType: "application/x-www-form-urlencoded",
     url: "***",
     data: {},
     dataType: "json",
     success: function(data, status) {
         for (var i = 0; i < data.Data.length; i++) {
             var bmname = data.Data[i].RepeaterName;
             var id = data.Data[i].RepeaterId;
             var cc = $("<option value='" + id + "'>" + bmname + "</option>");
             cc.appendTo(".xunhunazhongjiqi1");
         }
     },
     error: function(e) {
         alert("中继器列表请求失败!");
     },
     complete: function() {}
 });
 $.ajax({ //循环中继器*****************************************************/**/ok */
     type: "GET",
     contentType: "application/x-www-form-urlencoded",
     url: "***",
     data: {},
     dataType: "json",
     success: function(data, status) {
         for (var i = 0; i < data.Data.length; i++) {
             var bmname = data.Data[i].RepeaterName;
             var id = data.Data[i].RepeaterId;
             var cc = $("<option value='" + id + "'>" + bmname + "</option>");
             cc.appendTo(".xunhunazhongjiqi2");
         }
     },
     error: function(e) {
         alert("中继器列表请求失败!");
     },
     complete: function() {}
 });