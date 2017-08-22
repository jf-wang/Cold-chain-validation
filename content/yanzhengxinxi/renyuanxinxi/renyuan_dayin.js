    var imagetable = document.getElementById("imagetable");

    //提示窗口   预览 打印 导出
    function printit(MyDiv, type) {
        if (type == 'Preview' && !-[1, ]) {
            document.all.WebBrowser.ExecWB(7, 1);
            shuangji()
            gaibian()
        } else {　　
            var newstr = document.getElementById('table').innerHTML;　　
            var oldstr = document.body.innerHTML;　　
            document.body.innerHTML = newstr;　　
            window.print();　　
            document.body.innerHTML = oldstr;
            shuangji()
            gaibian()
            return false;
        }
    }
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
                var fname = oXL.Application.GetSaveAsFilename("Excel.xlsx", "Excel Spreadsheets (*.xlsx), *.xlsx");
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
    var tableToExcel = (function() {
        var uri = 'data:application/vnd.ms-excel;base64,',
            template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
            base64 = function(s) {
                return window.btoa(unescape(encodeURIComponent(s)))
            },
            format = function(s, c) {
                return s.replace(/{(\w+)}/g,
                    function(m, p) {
                        return c[p];
                    })
            }
        return function(table, name) {
            if (!table.nodeType) table = document.getElementById(table)
            var ctx = {
                worksheet: name || 'Worksheet',
                table: table.innerHTML
            }
            window.location.href = uri + base64(format(template, ctx))
        }
    })()


    /***************************************************内容双击改变 */
    var shuangji = function() {
        $('.tbody tr td').dblclick(function() { //内容双击改变
            if (!$(this).is('.input')) {
                $(this).addClass('input').html('<input type="text" value="' + $(this).text() + '" />').find('input').focus().blur(function() {
                    $(this).parent().removeClass('input').html($(this).val() || '');
                    console.log(this.value);
                });
            }
        }).hover(function() {
            $(this).addClass('hover');
        }, function() {
            $(this).removeClass('hover');
        });
        $('thead tr:first-child td:last-child').dblclick(function() { //公司名称双击改变
            if (!$(this).is('.input')) {
                $(this).addClass('input').html('<input type="text" value="' + $(this).text() + '" />').find('input').focus().blur(function() {
                    $(this).parent().removeClass('input').html($(this).val() || '');
                    console.log(this.value);
                });
            }
        }).hover(function() {
            $(this).addClass('hover');
        }, function() {
            $(this).removeClass('hover');
        });
    }
    shuangji()
        /**************************************END********************* */
        /***************************************************鼠标右击事件 */
        //   $(function () {
        // 	 $.mouseMoveShow('.mouseright');
        // 	 $.disabledContextMenu();
        // });
        /**************************************END********************* */
        /***************************************增加行*********** */
        // console.log(document.getElementById("tbody").rows.length)

    function addNewRow() {
        var tabObj = document.getElementById("tbody"); //获取添加数据的表格
        var rowsNum = tabObj.rows; //获取当前行数
        //var colsNum=tabObj.rows[rowsNum-1].cells.length;//获取行的列数
        var myNewRow = tabObj.insertRow(rowsNum); //插入新行

        var newTdObj1 = myNewRow.insertCell(0);
        var newTdObj2 = myNewRow.insertCell(1);
        var newTdObj3 = myNewRow.insertCell(2);
        var newTdObj4 = myNewRow.insertCell(3);
        var newTdObj5 = myNewRow.insertCell(4);
        var newTdObj6 = myNewRow.insertCell(5);
        var newTdObj7 = myNewRow.insertCell(6);
        var newTdObj8 = myNewRow.insertCell(7);

    }
    /**************************************END********************* */

    // $(".imagetable td input").blur(function () { //失去焦点的时候收集的信息
    //     var aa = $(this).val()
    //     console.log(aa)
    //     $.ajax({
    //         type: "POST",
    //         contentType: "application/x-www-form-urlencoded",
    //         url: "" + url + "/api/Employee/SaveEmpolyee?Token=" + token + "",
    //         data: {},
    //         dataType: "json",
    //         success: function (data, status) {
    //             console.log(data, status)
    //             console.log(this.url)
    //             console.log(this.data)
    //             // alert(result)
    //         },
    //         error: function (XMLHttpRequest, textStatus, errorThrown) {
    //             alert("新建项目失败");
    //         }
    //     });
    // })

    //获取年份事件