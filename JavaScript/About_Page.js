
window.onload = function(){
  document.getElementById('Open_Menu_Button').addEventListener("click",Open_Menu);
  document.getElementsByClassName('Navigation_Buttons')[0].addEventListener("click",Direct_To_Back_To_Page);
  document.getElementsByClassName('Navigation_Buttons')[1].addEventListener("click",Direct_To_Back_To_Page);
  document.getElementById('Backdrop').addEventListener("click",Close_Panels);
  document.getElementById('Gameplay_Tutorial_Grid').addEventListener("click",Close_Panels);
  document.getElementById('Game_Banner').addEventListener("click",Close_Panels);
}

