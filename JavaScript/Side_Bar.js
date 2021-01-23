
function Open_Menu(){
  var Slide_Bar = document.getElementById('Sidebar');
  var Root = document.querySelector(':root');
  var Direction = String(getComputedStyle(Root).getPropertyValue('--Direction'));
  if(Direction == "forwards"){
    Root.style.setProperty('--Direction','reverse');
  }else{
    Root.style.setProperty('--Direction','forwards');
  }
  Slide_Bar.classList.remove('Slide_Menu_Animation');
  void Slide_Bar.offsetWidth;
  Slide_Bar.classList.add('Slide_Menu_Animation');
}