
function Direct_To_Page(){
  var Page_Index = parseInt(this.className.split(" ")[1])-1;
  var Pages = ["./Pages/About.html","./Pages/How_To_Play.html"];
  window.location.href = Pages[Page_Index];  
}

