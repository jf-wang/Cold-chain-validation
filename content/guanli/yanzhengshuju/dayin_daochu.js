  /**
   * 打印
   */
  function printit(MyDiv, type) {
      if (type == 'Preview' && !-[1, ]) {
          document.all.WebBrowser.ExecWB(7, 1);
          location.reload() //刷新页面
      } else {　　
          var newstr = document.getElementById(MyDiv).innerHTML;　　
          var oldstr = document.body.innerHTML;　　
          document.body.innerHTML = newstr;　　
          window.print();　　
          document.body.innerHTML = oldstr;
          location.reload() //刷新页面
          return false;   
      }
  }
  /**
   * 导出
   */
  var idTmr;

  function getExplorer() {
      var explorer = window.navigator.userAgent;
      //ie 
      if (explorer.indexOf("MSIE") >= 0) {
          return 'ie';
      }
      //firefox 
      else if (explorer.indexOf("Firefox") >= 0) {
          return 'Firefox';
      }
      //Chrome
      else if (explorer.indexOf("Chrome") >= 0) {
          return 'Chrome';
      }
      //Opera
      else if (explorer.indexOf("Opera") >= 0) {
          return 'Opera';
      }
      //Safari
      else if (explorer.indexOf("Safari") >= 0) {
          return 'Safari';
      }
  }

  function method1(tableid) { //整个表格拷贝到EXCEL中
      if (getExplorer() == 'ie') {
          var curTbl = document.getElementById(tableid);
          var oXL = new ActiveXObject("Excel.Application");
          //创建AX对象excel 
          var oWB = oXL.Workbooks.Add();
          //获取workbook对象 
          var xlsheet = oWB.Worksheets(1);
          //激活当前sheet 
          var sel = document.body.createTextRange();
          sel.moveToElementText(curTbl);
          //把表格中的内容移到TextRange中 
          sel.select;
          //全选TextRange中内容 
          sel.execCommand("Copy");
          //复制TextRange中内容  
          xlsheet.Paste();
          //粘贴到活动的EXCEL中       
          oXL.Visible = true;
          //设置excel可见属性
          try {
              var fname = oXL.Application.GetSaveAsFilename("Excel.xls", "Excel Spreadsheets (*.xls), *.xls");
          } catch (e) {
              print("Nested catch caught " + e);
          } finally {
              oWB.SaveAs(fname);

              oWB.Close(savechanges = false);
              //xls.visible = false;
              oXL.Quit();
              oXL = null;
              //结束excel进程，退出完成
              //window.setInterval("Cleanup();",1);
              idTmr = window.setInterval("Cleanup();", 1);
          }

      } else {
          tableToExcel('table')
      }
  }

  function Cleanup() {
      window.clearInterval(idTmr);
      CollectGarbage();
  }
  var tableToExcel = (function () {
      var uri = 'data:application/vnd.ms-excel;base64,',
          template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
          base64 = function (s) {
              return window.btoa(unescape(encodeURIComponent(s)))
          },
          format = function (s, c) {
              return s.replace(/{(\w+)}/g,
                  function (m, p) {
                      return c[p];
                  })
          }
      return function (table, name) {
          if (!table.nodeType) table = document.getElementById(table)
          var ctx = {
              worksheet: name || 'Worksheet',
              table: table.innerHTML
          }
          window.location.href = uri + base64(format(template, ctx))
      }
  })()

  var time_chaxun = function () {
      jeDate({
          dateCell: "#dateinfo4",
          format: "YYYY-MM-DD hh:MM",
          isinitVal: true,
          isTime: true, //isClear:false,
          minDate: "1900-01-01 00:00",
          okfun: function (val) {
              alert(val)
          }
      })
      jeDate({
          dateCell: "#dateinfo5",
          format: "YYYY-MM-DD hh:MM",
          isinitVal: true,
          isTime: true, //isClear:false,
          minDate: "1900-01-01 00:00:00",
          okfun: function (val) {
              alert(val)
          }
      })
      jeDate({
          dateCell: "#dateinfo6",
          format: "YYYY-MM-DD",
          isinitVal: true,
          isTime: false, //isClear:false,
          minDate: "1900-01-01 00:00:00",
          okfun: function (val) {
              alert(val)
          }
      })

      $(".xunhuangonsi").click(function () { //点击公司时候变化表头
          var gongsinameid = $(".xunhuangonsi").val();
          if (gongsinameid == 0) {
              $(".gongsi").text("公司名称")
          } else {
              $.ajax({
                  type: "GET",
                  contentType: "application/x-www-form-urlencoded",
                  url: "" + url + "/api/Department/GetDep/" + gongsinameid + "?Token=" + token + "",
                  data: {},
                  dataType: "json",
                  success: function (data, status) {
                      // console.log(data.Data.DepName)
                      // console.log(this.url)
                      $(".gongsi").text(data.Data.DepName)
                  },
                  error: function (e) {
                      // alert("请求失败!");
                      console.log(this.url)
                  },
                  complete: function () {

                  }
              });
          }
      })
  }()
//   time_chaxun();