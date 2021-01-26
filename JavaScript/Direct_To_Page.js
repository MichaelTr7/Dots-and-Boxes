
function Direct_To_Page(){
  var Page_Index = parseInt(this.className.split(" ")[1])-1;
  var Pages = ["./Pages/About.html","./index.html"];
  window.location.href = Pages[Page_Index];  
}

function Direct_To_Back_To_Page(){
  var Page_Index = parseInt(this.className.split(" ")[1])-1;
  var Pages = ["./About.html","../index.html"];
  window.location.href = Pages[Page_Index];  
}
