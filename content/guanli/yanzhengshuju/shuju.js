  var depId = localStorage.getItem('depId');
  $.ajax({ //获取对象列表
      type: "GET",
      contentType: "application/x-www-form-urlencoded",
      url: "" + url + "/api/Check/GetCheckObjectList?DepId=" + depId + "&Token=" + token + "",
      data: {},
      dataType: "json",
      success: function(data, status) {
          for (var i = 0; i < data.Data.length; i++) {
              var option4 = $("<option value='" + data.Data[i].CheckObjectId + "'>" + data.Data[i].CheckObjectName + "</option>");
              option4.appendTo(".xunhunazhongjiqi");
          }
          gongyou();
      },
      error: function(e) {
          alert("请求失败");
      },
      complete: function() {}
  });
  $.ajax({ //****************************************************/**/ok */
      type: "GET",
      contentType: "application/x-www-form-urlencoded",
      url: "" + url + "/api/Department/GetDep/" + depId + "?Token=" + token + "",
      data: {},
      dataType: "json",
      success: function(data, status) {
          $(".biaotou").text(data.Data.DepName + "验证数据");
      },
      error: function(e) {
          alert("公司列表请求失败!");
      },
      complete: function() {}
  });
  var Total = "";
  var page = 0;
  var thid = [];
  // var dayin_gongyong = function(){

  function gongyou() {
      thid = [];
      var id = $(".xunhunazhongjiqi").val();
      $(".tr").text("");
      $("tbody").text("")
      $("<th>日期</th>").appendTo(".tr");
      var StartDate = $("#dateinfo4").val();
      var EndDate = $("#dateinfo5").val();
      $(".now_time").text($("#dateinfo6").val())
      $.ajax({
          type: "GET",
          contentType: "application/x-www-form-urlencoded",
          url: "" + url + "/api/Check/GetTemps?CheckObjId=" + id + "&Token=" + token + "",
          data: {},
          dataType: "json",
          success: function(data, status) {
              for (var i = 0; i < data.Data.length; i++) {
                  $.ajax({
                      type: "GET",
                      contentType: "application/x-www-form-urlencoded",
                      url: "" + url + "/api/Temp/GetTemp/" + data.Data[i] + "?Token=" + token + "",
                      data: {},
                      dataType: "json",
                      success: function(data, status) {
                          thid.push(data.Data.TempId);
                          var kk = $("<th value='" + data.Data.TempId + "'>" + data.Data.TempName + - +data.Data.TempId + "</th>");
                          kk.appendTo(".tr");
                      },
                      error: function(e) {
                          alert("请求失败!");
                      },
                      complete: function() {}
                  });
              }
              $.ajax({
                  type: "GET",
                  contentType: "application/x-www-form-urlencoded",
                  url: "" + url + "/api/Temp/GetHistoryData?DepId=" + depId + "&ObjId=" + id + "&StartDate=" + StartDate + "&EndDate=" + EndDate + "&Page=" + page + "&Size=10&Token=" + token + "",
                  data: {},
                  dataType: "json",
                  success: function(data, status) {
                      for (var i = 0; i < data.Data.Data.length; i++) {
                          Total = data.Data.Total;
                          var UpdateTime = data.Data.Data[i].UpdateTime.replace("T", " ")
                              //   console.log(this.url)
                          var tr = $(" <tr class='" + i + "'>" +
                              "<td>" + UpdateTime + "</td>" +
                              "< /tr > ");
                          tr.appendTo("tbody");
                          for (var k = 0; k < thid.length; k++) {
                              var find = false;
                              for (var j = 0; j < data.Data.Data[i].Values.length; j++) {
                                  if (data.Data.Data[i].Values[j].Id == thid[k]) {
                                      find = true;
                                      var td = $("<td>" + data.Data.Data[i].Values[j].Value + "</td>");
                                      td.appendTo("." + i + "");
                                  }
                              }
                              if (!find) {
                                  var td = $("<td>" + "</td>");
                                  td.appendTo("." + i + "");
                              }
                          }
                      }
                  },
                  error: function(e) {
                      alert("请求失败!");
                  },
                  complete: function() {}
              });
          },
          error: function(e) {
              alert("请求失败!");
          },
          complete: function() {}
      });
  }


  $(".yulan").click(function() {
      gongyou();
  })
  $(".bottompage").click(function() {
      page++;
      gongyou();
  })
  $(".toppage").click(function() {
      page--;
      gongyou();
  })

  // }()