    var imagetable = document.getElementById("imagetable");
    // $("thead tr th").css("background","red")
    // $("thead").css("fontSize","40px")
    // $("#imagetable").css()
    








  /***************************************************表头双击改变 */
  $("thead th").dblclick(function(){//表头双击改变
    if(!$(this).is('.input')){
        $(this).addClass('input').html('<input type="text" value="'+ $(this).text() +'" />').find('input').focus().blur(function(){
        $(this).parent().removeClass('input').html($(this).val() || '');
      });
    }
    }).hover(function(){
        $(this).addClass('hover');
    },function(){
        $(this).removeClass('hover');
  
  });
      console.log($('.td1_1').text())
  /**************************************END********************* */
  /***************************************************内容双击改变 */
  $(".tbody td:nth-child(2), .tbody td:nth-child(3)").dblclick(function(){//内容双击改变
    if(!$(this).is('.input')){
        $(this).addClass('input').html('<input type="text" value="'+ $(this).text() +'" />').find('input').focus().blur(function(){
        $(this).parent().removeClass('input').html($(this).val() || '');
        console.log(this.value);
      });
    }
    }).hover(function(){
        $(this).addClass('hover');
    },function(){
        $(this).removeClass('hover');
  });

  $('.tbody tr:nth-child(10) td, .tbody tr:nth-child(11) td, .tbody tr:nth-child(12) td').dblclick(function(){//内容双击改变
    if(!$(this).is('.input')){
        $(this).addClass('input').html('<input type="text" value="'+ $(this).text() +'" />').find('input').focus().blur(function(){
        $(this).parent().removeClass('input').html($(this).val() || '');
        console.log(this.value);
      });
    }
    }).hover(function(){
        $(this).addClass('hover');
    },function(){
        $(this).removeClass('hover');
  });
  $('.tbody tr:nth-child(1) td').dblclick(function(){})
  $('thead tr:first-child td:last-child').dblclick(function(){//内容双击改变
    if(!$(this).is('.input')){
        $(this).addClass('input').html('<input type="text" value="'+ $(this).text() +'" />').find('input').focus().blur(function(){
        $(this).parent().removeClass('input').html($(this).val() || '');
        console.log(this.value);
      });
    }
    }).hover(function(){
        $(this).addClass('hover');
    },function(){
        $(this).removeClass('hover');
  });
/**************************************END********************* */
/***************************************************鼠标右击事件 */
//   $(function () {
// 	 $.mouseMoveShow('.mouseright');
// 	 $.disabledContextMenu();
// });
/**************************************END********************* */
/***************************************增加行*********** */
console.log(document.getElementById("tbody").rows.length)

   function addNewRow(){
   var tabObj=document.getElementById("tbody");//获取添加数据的表格
   var rowsNum = tabObj.rows;  //获取当前行数
   //var colsNum=tabObj.rows[rowsNum-1].cells.length;//获取行的列数
   var myNewRow = tabObj.insertRow(rowsNum);//插入新行

   var newTdObj1=myNewRow.insertCell(0);
   var newTdObj2=myNewRow.insertCell(1);
   var newTdObj3=myNewRow.insertCell(2);
   var newTdObj4=myNewRow.insertCell(3);
   var newTdObj5=myNewRow.insertCell(4);
   var newTdObj6=myNewRow.insertCell(5);
   var newTdObj7=myNewRow.insertCell(6);
   var newTdObj8=myNewRow.insertCell(7);
    
  }
/**************************************END********************* */


