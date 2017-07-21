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
             var code = ds.Table[i].code;
             var bmname = ds.Table[i].bmname;
             var lianxiren = ds.Table[i].lianxiren;
             var phone = ds.Table[i].phone;
             var bz = ds.Table[i].bz;
             var id = ds.Table[i].id;
             var aa = $("<tr>" +
                 "<td>" + code + "</td>" +
                 "<td>" + bmname + "</td>" +
                 "<td>" + lianxiren + "</td>" +
                 "<td>" + phone + "</td>" +
                 "<td>" + bz + "</td>" +
                 "<td>" +
                 "<span class='bianji' onclick='bianji(this)' data-toggle='modal' data-target='#myModal_bianji'>编辑</span>|" +
                 "<span class='del' onclick='del(this)' data-toggle='modal' data-target='#myModal_del'>删除</span>" +
                 "</td>" +
                 "<td>" + id + "</td>" +
                 "</tr>");
             aa.appendTo("tbody");
         }
     },
     error: function(XMLHttpRequest, textStatus, errorThrown) {
         alert("新建项目失败");
     }
 });

 $(".tainjia").click(function() { //新建点击确定的时候手机的信息
     var code = $(".xinjian_bianhao").val(); //编号
     var bmname = $(".xinjian_bmname").val(); //部门名称
     var lianxiren = $(".xinjian_lianxiren").val(); //联系人
     var phone = $(".xinjian_phone").val(); //联系方式
     var bz = $(".xinjian_beizhu").val(); //备注
     $.ajax({
         type: "POST",
         contentType: "application/x-www-form-urlencoded",
         url: "" + url + "XMADD",
         data: {},
         dataType: "json",
         success: function(result) {
             // console.log(this.data)
             // alert(result)
         },
         error: function(XMLHttpRequest, textStatus, errorThrown) {
             alert("新建项目失败");
         }
     });
 })

 function bianji(row) { //点击编辑的时候获取信息
     var code = $(row).parent().siblings().eq(1).html(); //获取当前的编号
     var bmname = $(row).parent().siblings().eq(2).html();
     var lianxiren = $(row).parent().siblings().eq(3).html();
     var phone = $(row).parent().siblings().eq(4).html();
     var bz = $(row).parent().siblings().eq(5).html();
     var id = $(row).parent().siblings().eq(6).html();
     $(".bianji_code").val(code);
     $(".bianji_bmname").val(bmname);
     $(".bianji_lianxiren").val(lianxiren);
     $(".bianji_phone").val(phone);
     $(".binaji_bz").val(bz);
     $(".baoxun_bianji").click(function() { //保存编辑的时候
         var b_code = $(".bianji_code").val();
         var b_bmname = $(".bianji_bmname").val();
         var b_lainxiren = $(".bianji_lianxiren").val();
         var b_phone = $(".bianji_phone").val();
         var b_bz = $(".binaji_bz").val();
         $.ajax({
             type: "POST",
             contentType: "application/x-www-form-urlencoded",
             url: "" + url + "XMADD",
             data: {},
             dataType: "json",
             success: function(result) {
                 // console.log(this.data)
                 // alert(result)
             },
             error: function(XMLHttpRequest, textStatus, errorThrown) {
                 alert("新建项目失败");
             }
         });

     })
 }

 function del(rows) { //点击删除的时候获取id
     var id = $(row).parent().siblings().eq(6).html();
     $(".queding_del").click(function() { //确定删除的时候
         $.ajax({
             type: "POST",
             contentType: "application/x-www-form-urlencoded",
             url: "" + url + "XMADD",
             data: {},
             dataType: "json",
             success: function(result) {
                 // console.log(this.data)
                 // alert(result)
             },
             error: function(XMLHttpRequest, textStatus, errorThrown) {
                 alert("新建项目失败");
             }
         });
     })
 }