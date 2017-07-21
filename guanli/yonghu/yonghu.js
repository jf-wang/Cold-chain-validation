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
             var username = ds.Table[i].username;
             var name = ds.Table[i].name;
             var phone = ds.Table[i].phone;
             var quanxian = ds.Table[i].quanxian;
             var bmid = ds.Table[i].bmid;
             var id = ds.Table[i].id;
             var aa = $("<tr>" +
                 "<td>" + username + "</td>" +
                 "<td>" + name + "</td>" +
                 "<td>" + phone + "</td>" +
                 "<td>" + quanxian + "</td>" +
                 "<td>" + bmid + "</td>" +
                 "<td>" + 否 + "</td>" +
                 "<td>" +
                 "<td>" +
                 "<span class='xuanzexiangmu' onclick='xuanze(this)' data-toggle='modal' data-target='#myModal_xinjianuser'>选择项目</span>" +
                 "</td>" +
                 "<span class='gaoji' data-toggle='modal' data-target='#myModal_passwork'>重置密码</span>|" +
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

 $(".tainjia_xinzeng").click(function() { //新建点击确定的时候手机的信息
     var username = $(".xinjian_username").val(); //用户名
     var name = $(".xinjian_name").val(); //姓名
     var phone = $(".xinjian_phone").val(); //联系方式
     var quanxain = $(".xinjian_quanxian").val() //权限
     var bz = $(".xinjian_bz").val(); //备注
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
     var username = $(row).parent().siblings().eq(1).html(); //获取当前的编号
     var name = $(row).parent().siblings().eq(2).html();
     var phone = $(row).parent().siblings().eq(4).html();
     var quanxian = $(row).parent().siblings().eq(3).html();
     var bz = $(row).parent().siblings().eq(5).html();
     var id = $(row).parent().siblings().eq(6).html();
     $(".bianji_username").val(username);
     $(".bianji_name").val(name);
     $(".bianji_phone").val(phone);
     $(".bianji_quaxnain").val(lianxiren);
     $(".bianji_bz").val(bz);
     $(".tainjia_bianji").click(function() { //保存编辑的时候
         var b_code = $(".bianji_username").val();
         var b_bmname = $(".bianji_name").val();
         var b_phone = $(".bianji_phone").val();
         var b_quanxain = $(".bianji_quaxnain").val();
         var b_bz = $(".bianji_bz").val();
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
 $(".true").click(function() { ///修改密码确定的时候
     var pwd = localStorage.getItem("passWord");
     var id = localStorage.getItem("id");
     var pwd1 = md5($(".originalPassword").val());
     var pwd2 = md5($(".newPassword").val());
     var pwd3 = md5($(".repetitionPassword").val());
     console.log(pwd)
     if (pwd1 == pwd) {
         if (pwd2 == pwd3) {
             $.ajax({
                 type: "POST",
                 contentType: "application/x-www-form-urlencoded",
                 url: "" + url + "XGMM",
                 data: { id: id, pwd1: pwd1, pwd2: pwd2 },
                 dataType: "json",
                 success: function(result) {
                     alert("密码修改成功")
                     location.reload() //刷新页面 
                 },
                 error: function(XMLHttpRequest, textStatus, errorThrown) {
                     alert("数据请求失败,数据保存失败");
                 }
             });
         } else {
             alert("两次密码不一致")
         }
     } else {
         alert("原密码不正确")
     }
 })