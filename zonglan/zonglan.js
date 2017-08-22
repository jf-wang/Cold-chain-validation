function gongsi(row) {
    var depId = $(row).children().siblings().eq(2).html();
    localStorage.setItem("depId", depId)
    var gongsiname = $(row).children().siblings().eq(1).html();
    localStorage.setItem("gongsiname", gongsiname);
    console.log(localStorage.getItem("gongsiname"))
}