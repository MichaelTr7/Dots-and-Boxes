
window.onload = function(){
  var Nodes = document.getElementsByClassName('Dots');
  for(Node = 0; Node < Nodes.length; Node++){
    Nodes[Node].addEventListener("mousedown",Start_Node);
    Nodes[Node].addEventListener("mouseup",End_Node);
    Nodes[Node].addEventListener("mouseup",Node_Left);
  }
  document.addEventListener("mouseup",Trivially_End_Drag);
  document.addEventListener("mouseup",Snap_To_End_Node);
  document.addEventListener("mouseup",Node_Left);
  document.addEventListener("mousemove",Moving);  
}

var Starting_Node;
var Ending_Node;
var Currently_Down = false;
var Start_Top_Position;
var Start_Left_Position;
var Gap;
var Line_Length;
var Direction;

function Node_Entered(){
  var Node = document.getElementsByClassName(this.className)[0];
  Node.style.transform = "scale(1.75)";
}

function Node_Left(){
  var Node = document.getElementsByClassName("Dots " + Starting_Node)[0];
  Node.style.transform = "scale(1)";
}

function Start_Node(){
  Start_Node = "";
  Ending_Node = "";
  Start_Top_Position = "";
  Start_Left_Position = "";
  Starting_Node = this.className.split(" ")[1];  
  Currently_Down = true;
  Start_Drawing();
  var Node = document.getElementsByClassName(this.className)[0];
  Node.style.transform = "scale(1.75)";
  var Line = document.getElementById('Active_Line');
  Line.style.backgroundColor = "rgba(246,73,160,1)";
}

function End_Node(){
  Ending_Node = this.className.split(" ")[1];
  Currently_Down = false;
}

function Trivially_End_Drag(){
  Currently_Down = false;
}

function Start_Drawing(){
  var Line = document.getElementById('Active_Line');
  Line.style.width = "min(2.8vw,2.8vh)";
  Line.style.height = "min(2.8vw,2.8vh)";
  var Target_Start_Node = document.getElementsByClassName("Dots " + Starting_Node)[0];
  var Parent_Container = document.getElementById('Dots_Wrapper');
  Node_Bounds = Target_Start_Node.getBoundingClientRect();
  Parent_Bounds = Parent_Container.getBoundingClientRect();
  var Child_Top = Node_Bounds.top;
  var Child_Left = Node_Bounds.left;
  var Parent_Top = Parent_Bounds.top;
  var Parent_Left = Parent_Bounds.left;
  var Parent_Height = Parent_Bounds.bottom - Parent_Bounds.top;
  var Parent_Width = Parent_Bounds.right - Parent_Bounds.left;
  var Top_Position_Pixels = Child_Top - Parent_Top;
  var Left_Position_Pixels = Child_Left - Parent_Left;
  Start_Top_Position = Top_Position_Pixels;
  Start_Left_Position = Left_Position_Pixels;
  var Position_Top_Percentage = Math.abs(100*Start_Top_Position/Parent_Height);
  var Position_Left_Percentage = Math.abs(100*Start_Left_Position/Parent_Width);
  var Line = document.getElementById('Active_Line');
  Line.style.top = Position_Top_Percentage + "%";
  Line.style.left = Position_Left_Percentage + "%";
}

function Moving(e){
  if(Currently_Down){
    var Line = document.getElementById('Active_Line');
    var Playing_Surface_Bounding_Box = document.getElementById('Dots_Wrapper').getBoundingClientRect();
    var Parent_Top = Playing_Surface_Bounding_Box.top;
    var Parent_Left = Playing_Surface_Bounding_Box.left;
    var Parent_Height = Playing_Surface_Bounding_Box.bottom - Parent_Bounds.top;
    var Parent_Width = Playing_Surface_Bounding_Box.right - Parent_Bounds.left;
    var Mouse_Top_Position = event.clientY - Parent_Top;    
    var Mouse_Left_Position = event.clientX - Parent_Left;
    var Vertical_Displacement = Math.abs(Start_Top_Position - Mouse_Top_Position);
    var Horizontal_Displacement = Math.abs(Start_Left_Position - Mouse_Left_Position);
    var Node_Left_Position = document.getElementsByClassName("Dots 1_1")[0].getBoundingClientRect().left;
    var Node_Right_Position = document.getElementsByClassName("Dots 1_2" )[0].getBoundingClientRect().left;
    var Node_Width = document.getElementsByClassName("Dots 1_2" )[0].getBoundingClientRect().width;
    Gap = Math.abs(100*(Node_Left_Position - (Node_Right_Position+Node_Width*1.25))/Parent_Width);
    var Magnitude_Displacement = Math.sqrt(Math.pow(Horizontal_Displacement,2) + Math.pow(Vertical_Displacement,2));
    Magnitude_Displacement = Math.min(100*Magnitude_Displacement/Parent_Width,Gap);
    var Magnitude_Displacement_Percentage = Magnitude_Displacement;
    // Calculating direction
    Direction = Get_Direction(Mouse_Top_Position,Start_Top_Position,Mouse_Left_Position,Start_Left_Position);
    if(Direction == "South"){
      Line.style.marginLeft = "min(-0.1vw,-0.1vh)";
      Line.style.transformOrigin = "top center";
      Line.style.transform = "rotateZ(0deg)"
      Line.style.marginTop = "min(-0.15vw,-0.15vh)";
      var Displacement_Percentage = 100*Vertical_Displacement/Parent_Width;
      Displacement_Percentage = Math.min(Displacement_Percentage,Gap);
      Line.style.width = "min(2.8vw,2.8vh)";
      Line.style.height = Displacement_Percentage + "%";
      Line_Length = Magnitude_Displacement_Percentage;
    }
    if(Direction == "North"){
      var Vertical_Displacement = Math.abs(Start_Top_Position - Mouse_Top_Position);
      var Displacement_Percentage = 100*(Vertical_Displacement + Node_Width)/Parent_Width;
      Displacement_Percentage = Math.min(Displacement_Percentage,Gap);
      if(Displacement_Percentage <= (100*Node_Width/Parent_Width)){
        Displacement_Percentage = 100*Node_Width/Parent_Width;
      }
      Displacement_Percentage = Math.min(Displacement_Percentage,Gap);
      Line.style.transformOrigin = "top center";
      Line.style.transform = "rotateZ(180deg)"
      Line.style.marginLeft = "min(-0.1vw,-0.1vh)";
      Line.style.width = "min(2.8vw,2.8vh)";
      Line.style.height = Displacement_Percentage + "%";
      Line.style.marginTop = "min(2.649vw,2.649vh)";
      Line_Length = Magnitude_Displacement_Percentage;
    }
    if(Direction == "East"){
      Line.style.height = "min(2.8vw,2.8vh)";
      Line.style.marginTop = "min(-0.125vw,-0.125vh)";
      Line.style.marginLeft = "min(-0.126vw,-0.126vh)";
      Line.style.transformOrigin = "left center";
      Line.style.transform = "rotateZ(0deg)"
      var Displacement_Percentage = 100*(Horizontal_Displacement + Node_Width)/Parent_Width;
      Displacement_Percentage = Math.min(Displacement_Percentage,Gap);
      Line.style.width = Displacement_Percentage + "%";
      Line_Length = Magnitude_Displacement_Percentage;
    }
    if(Direction == "West"){
      Line.style.transform = "rotateZ(0deg)"
      Line.style.marginTop = "min(-0.123vw,-0.123vh)";
      Line.style.height = "min(2.8vw,2.8vh)";
      Line.style.marginLeft = "min(2.79vw,2.79vh)";
      Line.style.transformOrigin = "left center";
      Line.style.transform = "rotateZ(180deg)"
      var Displacement_Percentage = 100*(Horizontal_Displacement + Node_Width)/Parent_Width;
      Displacement_Percentage = Math.min(Displacement_Percentage,Gap);
      Line.style.width = Displacement_Percentage + "%";
      Line_Length = Magnitude_Displacement_Percentage;
    }
  }
}

function Get_Direction(Mouse_Top_Position,Start_Top_Position,Mouse_Left_Position,Start_Left_Position){
  var Direction;
  var Bounding_Box = document.getElementById('Dots_Wrapper').getBoundingClientRect();
  var Parent_Top = Bounding_Box.top;
  var Parent_Left = Bounding_Box.left;
  var Parent_Height = Bounding_Box.bottom - Parent_Bounds.top;
  var Parent_Width = Bounding_Box.right - Parent_Bounds.left;
  var Mouse_Top_Position = event.clientY - Parent_Top;    
  var Mouse_Left_Position = event.clientX - Parent_Left;
  var Row_Start = parseInt(Starting_Node.split("_")[0]);
  var Column_Start = parseInt(Starting_Node.split("_")[1]);
  if((Row_Start-1) >= 1 & (Row_Start-1) <= 10){
  var North_Node_Class = "Dots " + String(Row_Start-1) + "_" + String(Column_Start);
  var North_Node = document.getElementsByClassName(North_Node_Class)[0];
  var Bounding_Box = document.getElementById('Dots_Wrapper').getBoundingClientRect();
  var North_Vertical_Position = North_Node.getBoundingClientRect().top - Bounding_Box.top;
  var North_Horizontal_Position = North_Node.getBoundingClientRect().left - Bounding_Box.left;
  }
  if((Row_Start+1) >= 1 & (Row_Start+1) <= 10){
  var South_Node_Class = "Dots " + String(Row_Start+1) + "_" + String(Column_Start);
  var South_Node = document.getElementsByClassName(South_Node_Class)[0];
  var South_Vertical_Position = South_Node.getBoundingClientRect().top - Bounding_Box.top;
  var South_Horizontal_Position = South_Node.getBoundingClientRect().left - Bounding_Box.left;
  }
  if((Column_Start-1) >= 1 & (Column_Start-1) <= 10){
  var West_Node_Class = "Dots " + String(Row_Start) + "_" + String(Column_Start-1);
  var West_Node = document.getElementsByClassName(West_Node_Class)[0];
  var West_Vertical_Position = West_Node.getBoundingClientRect().top - Bounding_Box.top;
  var West_Horizontal_Position = West_Node.getBoundingClientRect().left - Bounding_Box.left;
  }
  if((Column_Start+1) >= 1 & (Column_Start+1) <= 10){
  var East_Node_Class = "Dots " + String(Row_Start) + "_" + String(Column_Start+1);
  var East_Node = document.getElementsByClassName(East_Node_Class)[0];
  var East_Vertical_Position = East_Node.getBoundingClientRect().top - Bounding_Box.top;
  var East_Horizontal_Position = East_Node.getBoundingClientRect().left - Bounding_Box.left;
  }
  var North_Node_Displacement = Math.sqrt(Math.pow((Mouse_Left_Position-North_Horizontal_Position),2) + Math.pow((Mouse_Top_Position-North_Vertical_Position),2));
  var South_Node_Displacement = Math.sqrt(Math.pow((Mouse_Left_Position-South_Horizontal_Position),2) + Math.pow((Mouse_Top_Position-South_Vertical_Position),2));
  var West_Node_Displacement = Math.sqrt(Math.pow((Mouse_Left_Position-West_Horizontal_Position),2) + Math.pow((Mouse_Top_Position-West_Vertical_Position),2));
  var East_Node_Displacement = Math.sqrt(Math.pow((Mouse_Left_Position-East_Horizontal_Position),2) + Math.pow((Mouse_Top_Position-East_Vertical_Position),2));
  var Displacement_Array = [North_Node_Displacement,South_Node_Displacement,West_Node_Displacement,East_Node_Displacement];
  var Filtered_Displacement_Array = Displacement_Array.filter(Displacement_Value => !Number.isNaN(Displacement_Value));
  // var Minimum_Value = Filtered_Displacement_Array.sort()[0];
  // var Minimum_Index = Displacement_Array.indexOf(Math.min(Minimum_Value));  
  var Compass_Conversion = {0: "North",1: "South",2: "West",3: "East"};
  if(Mouse_Top_Position >= Start_Top_Position & !isNaN(Displacement_Array[1])){
     Direction = "South";
  }
  if(Start_Top_Position > Mouse_Top_Position & !isNaN(Displacement_Array[0])){
    Direction = "North";
  }
  if(Mouse_Left_Position - Start_Left_Position > Gap*0.9 & !isNaN(Displacement_Array[3])){
    Direction =  "East";
  }    
  if(Mouse_Left_Position - Start_Left_Position < -Gap*0.9 & !isNaN(Displacement_Array[2])){
    Direction = "West";
  }    
  return Direction;
}

function Snap_To_End_Node(){
  var Playing_Surface_Bounding_Box = document.getElementById('Dots_Wrapper').getBoundingClientRect();
  var Parent_Width = Playing_Surface_Bounding_Box.right - Parent_Bounds.left;  
  var Node_Left_Position = document.getElementsByClassName("Dots 1_1")[0].getBoundingClientRect().left;
  var Node_Right_Position = document.getElementsByClassName("Dots 1_2" )[0].getBoundingClientRect().left;
  var Node_Width = document.getElementsByClassName("Dots 1_2" )[0].getBoundingClientRect().width;
  Gap = Math.abs(100*(Node_Left_Position - (Node_Right_Position+Node_Width*1.25))/Parent_Width);
  var Line = document.getElementById('Active_Line');
  var Tolerance = 0.6*Gap;
  if(Math.abs(Line_Length) > Tolerance){
    var New_Snap_Length = Gap;
    Confirm_Drawing();
  if(Direction == "North"|Direction == "South"){
    Line.style.height = New_Snap_Length + "%";
  }
  if(Direction == "West"|Direction == "East"){
    Line.style.width = New_Snap_Length + "%";
  }
    Animate_Snap();
  }else{
    Animate_Fling_Back();
  }
}

function Confirm_Drawing(){
    var Row_Start = parseInt(Starting_Node.split("_")[0]);
    var Column_Start = parseInt(Starting_Node.split("_")[1]);
    if(Direction == "North"){
      var Row_End = Row_Start - 1;
      var Column_End = Column_Start;
    }
    if(Direction == "South"){
      var Row_End = Row_Start + 1;
      var Column_End = Column_Start;
    }
    if(Direction == "West"){
      var Row_End = Row_Start;
      var Column_End = Column_Start - 1;
    }
    if(Direction == "East"){
      var Row_End = Row_Start;
      var Column_End = Column_Start + 1;
    }    
    Ending_Node = String(Row_End) + "_" + String(Column_End); 
    var Check = Validate_Selected_Nodes(Starting_Node,Ending_Node);
    console.log(Starting_Node + " " + Ending_Node);
    console.log(Check);
}

function Validate_Selected_Nodes(Node_1,Node_2){
  var Row_Start = parseInt(Node_1.split("_")[0]);
  var Column_Start = parseInt(Node_1.split("_")[1]);
  var Row_End = Node_2.split("_")[0];
  var Column_End = Node_2.split("_")[1];
  // Ignore matching nodes
  if(Node_1 == Node_2){
    return false;
  }
  // Ignore if both nodes are true 
  var Node_1_Value = parseInt(document.getElementsByClassName("Dots " + Node_1)[0].dataset.state);
  var Node_2_Value = parseInt(document.getElementsByClassName("Dots " + Node_2)[0].dataset.state);
  if(Node_1_Value == 1 && Node_2_Value == 1){  
    return false;
  }else{
  document.getElementsByClassName("Dots " + Node_1)[0].dataset.state = "1";
  document.getElementsByClassName("Dots " + Node_2)[0].dataset.state = "1";
  return true;
}
}





function Animate_Snap(){
  console.log("Snap");

  
}

function Animate_Fling_Back(){
  console.log("Fling Back");
  var Focus_Line = document.getElementById('Active_Line');
  Focus_Line.style.backgroundColor = "rgba(255,255,255,0)";
  Focus_Line.style.height = "min(2.8vw,2.8vh)";
  Focus_Line.style.width = "min(2.8vw,2.8vh)";
  
}





