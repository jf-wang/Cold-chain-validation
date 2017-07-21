$(".head_off").click(function() { //点击off按钮出现下拉菜单
    $(".denglukaung").css("display", "block")
})
$(".denglukaung").mouseleave(function() { //鼠标离开下来菜单时候下拉菜单消失
    $(".denglukaung").css("display", "none")
})