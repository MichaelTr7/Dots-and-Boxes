
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
  var Direction = String(getComputedStyle(Root).getPropertyValue('--Slide_Direction_1'));
  if(Direction == "forwards"){
    Root.style.setProperty('--Slide_Direction_1','reverse');
    Root.style.setProperty('--Duration','0.2s');
  }else{
    Root.style.setProperty('--Slide_Direction_1','forwards');
    Root.style.setProperty('--Duration','0.2s');
  }
  Slide_Bar.classList.remove('Slide_Menu_Animation');
  void Slide_Bar.offsetWidth;
  Slide_Bar.classList.add('Slide_Menu_Animation');
}


function Show_Tutorial(){
  var Slide_Bar = document.getElementById('Sidebar');
  var Root = document.querySelector(':root');
  var Direction = String(getComputedStyle(Root).getPropertyValue('--Slide_Direction_1'));
  if(Direction == "forwards"){
    Root.style.setProperty('--Slide_Direction_1','reverse');
    Root.style.setProperty('--Duration','0.2s');
    Slide_Bar.classList.remove('Slide_Menu_Animation');
    void Slide_Bar.offsetWidth;
    Slide_Bar.classList.add('Slide_Menu_Animation');
  }
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


function Close_Panels(){
  var Root = document.querySelector(':root');
  var Left_Menu_Direction = String(getComputedStyle(Root).getPropertyValue('--Slide_Direction_1'));
  var Right_Menu_Direction = String(getComputedStyle(Root).getPropertyValue('--Slide_Direction'));
  if(Left_Menu_Direction == "forwards"){
    Root.style.setProperty('--Slide_Direction_1','reverse');
    Root.style.setProperty('--Duration','0.2s');
    var Slide_Bar = document.getElementById('Sidebar');
    Slide_Bar.classList.remove('Slide_Menu_Animation');
    void Slide_Bar.offsetWidth;
    Slide_Bar.classList.add('Slide_Menu_Animation');
  }
  
  if(Right_Menu_Direction == "forwards"){
    Root.style.setProperty('--Slide_Direction','reverse');
    var Tutorial_Panel = document.getElementById('Tutorial_Modal_Background');
    Tutorial_Panel.classList.remove('Slide_Up_Animation');
    void Tutorial_Panel.offsetWidth;
    Tutorial_Panel.classList.add('Slide_Up_Animation');
  }
}










