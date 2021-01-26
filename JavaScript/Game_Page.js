
window.onload = function(){
  var Nodes = document.getElementsByClassName('Dots');
  for(Node = 0; Node < Nodes.length; Node++){
    Nodes[Node].addEventListener("mousedown",Start_Node);
    Nodes[Node].addEventListener("mouseup",Node_Left);
    Nodes[Node].addEventListener("mouseup",Retrieve_Node);
    Nodes[Node].addEventListener("mouseup",Close_Panels);
  }
  document.addEventListener("mouseup",Trivially_End_Drag);
  document.addEventListener("mouseup",Snap_To_End_Node);
  document.addEventListener("mouseup",Node_Left);
  document.addEventListener("mousemove",Moving); 
  document.getElementById('Active_Line').style.opacity = "0"; 
  document.getElementById('Active_Line').style.backgroundColor = "rgb(246, 73, 160)";
  document.getElementById('Overlay').addEventListener("click",Open_Menu);  
  document.getElementById('Help_Button').addEventListener("click",Show_Tutorial);
  document.getElementById('Return_To_Game_Button').addEventListener("click",Show_Tutorial);
  document.getElementById('Backdrop').addEventListener("click",Close_Panels);
  document.getElementById('Playing_Surface').addEventListener("click",Close_Panels);
  document.getElementById('Title').addEventListener("click",Close_Panels);
  document.getElementById('LED_Indicator').addEventListener("click",Close_Panels);
  document.getElementsByClassName('Navigation_Buttons')[0].addEventListener("click",Direct_To_Page);
  document.getElementsByClassName('Navigation_Buttons')[1].addEventListener("click",Direct_To_Page);

  window.addEventListener('resize', Close_Panels);

  // document.body.addEventListener("click",Close_Panels);
  var Reset_Button = document.getElementById('Play_Again_Button');
  Reset_Button.addEventListener("click",Reset_Game);
}