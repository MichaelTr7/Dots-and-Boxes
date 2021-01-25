
function Open_Menu(){
  
  var Tutorial_Panel = document.getElementById('Tutorial_Modal_Background');
  var Root = document.querySelector(':root');
  var Direction = String(getComputedStyle(Root).getPropertyValue('--Slide_Direction'));
  if(Direction == "forwards"){
    Root.style.setProperty('--Slide_Direction','reverse');
    Tutorial_Panel.classList.remove('Slide_Up_Animation');
    void Tutorial_Panel.offsetWidth;
    Tutorial_Panel.classList.add('Slide_Up_Animation');
  }
  
  var Slide_Bar = document.getElementById('Sidebar');
  var Root = document.querySelector(':root');
  var Direction = String(getComputedStyle(Root).getPropertyValue('--Direction'));
  if(Direction == "forwards"){
    Root.style.setProperty('--Direction','reverse');
    Root.style.setProperty('--Duration','0.2s');
  }else{
    Root.style.setProperty('--Direction','forwards');
    Root.style.setProperty('--Duration','0.2s');
  }
  Slide_Bar.classList.remove('Slide_Menu_Animation');
  void Slide_Bar.offsetWidth;
  Slide_Bar.classList.add('Slide_Menu_Animation');
}

function Show_Tutorial(){
  
  var Slide_Bar = document.getElementById('Sidebar');
  var Root = document.querySelector(':root');
  var Direction = String(getComputedStyle(Root).getPropertyValue('--Direction'));
  if(Direction == "forwards"){
    Root.style.setProperty('--Direction','reverse');
    Root.style.setProperty('--Duration','0.2s');
    Slide_Bar.classList.remove('Slide_Menu_Animation');
    void Slide_Bar.offsetWidth;
    Slide_Bar.classList.add('Slide_Menu_Animation');
  }
  
  
  console.log("Show Tutorial");
  var Tutorial_Panel = document.getElementById('Tutorial_Modal_Background');
  var Root = document.querySelector(':root');
  var Direction = String(getComputedStyle(Root).getPropertyValue('--Slide_Direction'));
  if(Direction == "forwards"){
    Root.style.setProperty('--Slide_Direction','reverse');
  }else{
    Root.style.setProperty('--Slide_Direction','forwards');
  }
  Tutorial_Panel.classList.remove('Slide_Up_Animation');
  void Tutorial_Panel.offsetWidth;
  Tutorial_Panel.classList.add('Slide_Up_Animation');
}



function Close_Side_Bar(){
  var Slide_Menu = document.getElementById('Sidebar');
  Slide_Menu_Style = window.getComputedStyle(Slide_Menu);
  Slide_Menu_Position = String(Slide_Menu_Style.getPropertyValue('left'));  
  if(Slide_Menu_Position == "0px"){
      Open_Menu();
  }  
}