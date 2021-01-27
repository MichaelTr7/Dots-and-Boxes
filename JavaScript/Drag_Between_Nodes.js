
var Starting_Node;
var Ending_Node;
var Currently_Down = false;
var Start_Top_Position;
var Start_Left_Position;
var Gap;
var Line_Length;
var Direction;
var Mouse_Up_Node;

function Retrieve_Node(){
  Mouse_Up_Node = String(this.className.split(" ")[1]);
}

function Node_Entered(){
  if (typeof this.className !== 'undefined'){
    var Node = document.getElementsByClassName(this.className)[0];
    Node.style.transform = "scale(1.75)";
  }
}

function Node_Left(){
  if (typeof Starting_Node !== 'undefined'){
    var Node = document.getElementsByClassName("Dots " + Starting_Node)[0];
    Node.style.transform = "scale(1)";
  }
}

function Start_Node(){
    
  Mouse_Up_Node = "";
  var Focussed_Line = document.getElementById('Active_Line');
  Focussed_Line.classList.remove('Confirm_Animation');
  Focussed_Line.style.height = "min(2.8vw,2.8vh)";
  Focussed_Line.style.width = "min(2.8vw,2.8vh)";
  Focussed_Line.style.opacity = "1";
  Starting_Node = "";
  Ending_Node = "";
  Start_Top_Position = "";
  Start_Left_Position = "";
  Starting_Node = this.className.split(" ")[1];  
  Currently_Down = true;
  Start_Drawing();
  var Node = document.getElementsByClassName(this.className)[0];
  Node.style.transform = "scale(1.75)";
}

function Trivially_End_Drag(){
  Currently_Down = false;
}

function Start_Drawing(){
  var Line = document.getElementById('Active_Line');
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
    var Magnitude_Displacement_Percentage = 0;
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
    Magnitude_Displacement_Percentage = Magnitude_Displacement;
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
  North_Node.style.backgroundColor = "rgba(255,255,255,1)";
  }
  if((Row_Start+1) >= 1 & (Row_Start+1) <= 10){
  var South_Node_Class = "Dots " + String(Row_Start+1) + "_" + String(Column_Start);
  var South_Node = document.getElementsByClassName(South_Node_Class)[0];
  var South_Vertical_Position = South_Node.getBoundingClientRect().top - Bounding_Box.top;
  var South_Horizontal_Position = South_Node.getBoundingClientRect().left - Bounding_Box.left;
  South_Node.style.backgroundColor = "rgba(255,255,255,1)";
  }
  if((Column_Start-1) >= 1 & (Column_Start-1) <= 10){
  var West_Node_Class = "Dots " + String(Row_Start) + "_" + String(Column_Start-1);
  var West_Node = document.getElementsByClassName(West_Node_Class)[0];
  var West_Vertical_Position = West_Node.getBoundingClientRect().top - Bounding_Box.top;
  var West_Horizontal_Position = West_Node.getBoundingClientRect().left - Bounding_Box.left;
  West_Node.style.backgroundColor = "rgba(255,255,255,1)";
  }
  if((Column_Start+1) >= 1 & (Column_Start+1) <= 10){
  var East_Node_Class = "Dots " + String(Row_Start) + "_" + String(Column_Start+1);
  var East_Node = document.getElementsByClassName(East_Node_Class)[0];
  var East_Vertical_Position = East_Node.getBoundingClientRect().top - Bounding_Box.top;
  var East_Horizontal_Position = East_Node.getBoundingClientRect().left - Bounding_Box.left;
  East_Node.style.backgroundColor = "rgba(255,255,255,1)";
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
  var North_Path_Identifier = String(Starting_Node) + "to" + String(Row_Start-1) + "_" + String(Column_Start);
  var South_Path_Identifier = String(Starting_Node) + "to" + String(Row_Start+1) + "_" + String(Column_Start);
  var West_Path_Identifier = String(Starting_Node) + "to" + String(Row_Start) + "_" + String(Column_Start-1);
  var East_Path_Identifier = String(Starting_Node) + "to" + String(Row_Start) + "_" + String(Column_Start+1);

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
  var Line_Colour = document.getElementById('Active_Line').style.backgroundColor;
  if(Direction == "South"){
    var Tolerance = 0.6*Gap;
    if(Math.abs(Line_Length) > Tolerance){
      South_Node.style.backgroundColor = String(Line_Colour);
    }
  }
  if(Direction == "North"){
    var Tolerance = 0.6*Gap;
    if(Math.abs(Line_Length) > Tolerance){
      North_Node.style.backgroundColor = String(Line_Colour);
    }
  }
  if(Direction == "West"){
    var Tolerance = 0.6*Gap;
    if(Math.abs(Line_Length) > Tolerance){
      West_Node.style.backgroundColor = String(Line_Colour);
    }
  }
  if(Direction == "East"){
    var Tolerance = 0.6*Gap;
    if(Math.abs(Line_Length) > Tolerance){
      East_Node.style.backgroundColor = String(Line_Colour);
    }
  }  
  return Direction;
}

function Snap_To_End_Node(){
  var Playing_Surface_Bounding_Box = document.getElementById('Dots_Wrapper').getBoundingClientRect();
  var Parent_Width = Playing_Surface_Bounding_Box.right - Playing_Surface_Bounding_Box.left;  
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
  if(Mouse_Up_Node != Starting_Node){
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
    if(Check == true){
      Draw_Line(Starting_Node,Ending_Node);
    }
  }
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
  var Path_Identifier = Starting_Node + "to" + Ending_Node;
  var Line = document.getElementsByClassName(Path_Identifier)[0];
  Line_Style = window.getComputedStyle(Line);
  Line_Colour = String(Line_Style.getPropertyValue('background-color'));  
  if(Line_Colour != "rgba(0, 0, 0, 0.02)"){  
    return false;
  }else{
  return true;
}
}

function Animate_Snap(){
  var Focus_Line = document.getElementById('Active_Line');
  Focus_Line.classList.add('Confirm_Animation');
  var Previous_Ending_Node = document.getElementsByClassName('Dots ' + Ending_Node)[0];
  Previous_Ending_Node.style.backgroundColor = "rgba(255,255,255,1)";
  Focus_Line.style.opacity = "0";  
  Focus_Line.style.height = "min(2.8vw,2.8vh)";
  Focus_Line.style.width = "min(2.8vw,2.8vh)";
}

function Animate_Fling_Back(){
  var Focus_Line = document.getElementById('Active_Line');
  Focus_Line.style.opacity = "0";  
  Focus_Line.style.height = "min(2.8vw,2.8vh)";
  Focus_Line.style.width = "min(2.8vw,2.8vh)";
}

function Node_Highlight_Confirmation(Direction,North_Node,South_Node,West_Node,East_Node){
  var Line_Colour = document.getElementById('Active_Line').style.backgroundColor;
  North_Node.style.backgroundColor = "rgba(255,255,255,1)";
  South_Node.style.backgroundColor = "rgba(255,255,255,1)";
  West_Node.style.backgroundColor = "rgba(255,255,255,1)";
  East_Node.style.backgroundColor = "rgba(255,255,255,1)";
  if(Direction == "South"){
    var Tolerance = 0.6*Gap;
    if(Math.abs(Line_Length) > Tolerance){
      South_Node.style.backgroundColor = String(Line_Colour);
    }
  }
  if(Direction == "North"){
    var Tolerance = 0.6*Gap;
    if(Math.abs(Line_Length) > Tolerance){
      North_Node.style.backgroundColor = String(Line_Colour);
    }
  }
  if(Direction == "West"){
    var Tolerance = 0.7*Gap;
    if(Math.abs(Line_Length) > Tolerance){
      West_Node.style.backgroundColor = String(Line_Colour);
    }
  }
  if(Direction == "East"){
    var Tolerance = 0.7*Gap;
    if(Math.abs(Line_Length) > Tolerance){
      East_Node.style.backgroundColor = String(Line_Colour);
    }
  }  
}

function Draw_Line(Starting_Node,Ending_Node){
  var Path_Identifier = Starting_Node + "to" + Ending_Node;
  var Line = document.getElementsByClassName(Path_Identifier)[0];
  Line.style.backgroundColor = "rgba(225,225,225)";
  Line.dataset.state = "1";
  Check_For_Completed_Square();


}

function Check_For_Completed_Square(){
  var Path_Identifier = Starting_Node + "to" + Ending_Node;
  var Drawn_Line = document.getElementsByClassName(Path_Identifier)[0];
  var Line_Orientation = String(Drawn_Line.className.split(" ")[0]);
  var Path = String(Drawn_Line.className.split(" ")[1]);
  var Line_Colour = document.getElementById('Active_Line').style.backgroundColor;
  var Active_Line = document.getElementById('Active_Line');
  var Score = 0;
  
  if(Line_Orientation == "Vertical_Lines"){
    var Current_Column = parseInt((Path.split("to")[0]).split("_")[1]);
    var Top_Row = parseInt((Path.split("to")[0]).split("_")[0]);
    var Bottom_Row = parseInt((Path.split("to")[1]).split("_")[0]);
    var Parallel_Left_Identifier =  String(Top_Row) + "_" + String(Current_Column-1) + "to" + String(Bottom_Row) + "_" + String(Current_Column-1);
    var Parallel_Right_Identifier =  String(Top_Row) + "_" + String(Current_Column+1) + "to" + String(Bottom_Row) + "_" + String(Current_Column+1);
    var Perpendicular_Top_Left_Identifier = String(Top_Row) + "_" + String(Current_Column) + "to" + String(Top_Row) + "_" + String(Current_Column-1); 
    var Perpendicular_Bottom_Left_Identifier = String(Bottom_Row) + "_" + String(Current_Column) + "to" + String(Bottom_Row) + "_" + String(Current_Column-1); 
    var Perpendicular_Top_Right_Identifier = String(Top_Row) + "_" + String(Current_Column) + "to" + String(Top_Row) + "_" + String(Current_Column+1); 
    var Perpendicular_Bottom_Right_Identifier = String(Bottom_Row) + "_" + String(Current_Column) + "to" + String(Bottom_Row) + "_" + String(Current_Column+1); 

    //Left neighbourhood
    if(Current_Column != 1){
      var Parallel_Left_Line = document.getElementsByClassName(Parallel_Left_Identifier)[0];
      var Perpendicular_Top_Left_Line = document.getElementsByClassName(Perpendicular_Top_Left_Identifier)[0];
      var Perpendicular_Bottom_Left_Line = document.getElementsByClassName(Perpendicular_Bottom_Left_Identifier)[0];
      var Check_1 = parseInt(Parallel_Left_Line.dataset.state);
      var Check_2 = parseInt(Perpendicular_Top_Left_Line.dataset.state);
      var Check_3 = parseInt(Perpendicular_Bottom_Left_Line.dataset.state);
      var Perimeter_Check = Check_1 + Check_2 + Check_3; 
      if(Perimeter_Check == 3){
      Score = Score + 1;
      var Box_Identifier = "Boxes " + String(Top_Row) + "_" + String(Current_Column-1);
      var Box_To_Fill = document.getElementsByClassName(Box_Identifier)[0];
      if(Line_Colour == "rgb(246, 73, 160)"){
        Box_To_Fill.classList.add('Pink_Box');
        Box_To_Fill.dataset.state = "Pink";
      }
      else{
        Box_To_Fill.classList.add('Blue_Box');
        Box_To_Fill.dataset.state = "Blue";
      }
      }         
    }

    //Right neighbourhood 
    if(Current_Column != 10){
      var Parallel_Right_Line = document.getElementsByClassName(Parallel_Right_Identifier)[0];
      var Perpendicular_Top_Right_Line = document.getElementsByClassName(Perpendicular_Top_Right_Identifier)[0];
      var Perpendicular_Bottom_Right_Line = document.getElementsByClassName(Perpendicular_Bottom_Right_Identifier)[0];
      var Check_1 = parseInt(Parallel_Right_Line.dataset.state);
      var Check_2 = parseInt(Perpendicular_Top_Right_Line.dataset.state);
      var Check_3 = parseInt(Perpendicular_Bottom_Right_Line.dataset.state);
      var Perimeter_Check = Check_1 + Check_2 + Check_3;   
      if(Perimeter_Check == 3){
      Score = Score + 1;
      var Box_Identifier = "Boxes " + String(Top_Row) + "_" + String(Current_Column);
      var Box_To_Fill = document.getElementsByClassName(Box_Identifier)[0];
      if(Line_Colour == "rgb(246, 73, 160)"){
        Box_To_Fill.classList.add('Pink_Box');
        Box_To_Fill.dataset.state = "Pink";
      }
      else{
        Box_To_Fill.classList.add('Blue_Box');
        Box_To_Fill.dataset.state = "Blue";
      }
      }       
    }
  
    }
    else{
      var Current_Row = parseInt((Path.split("to")[0]).split("_")[0]);
      var Left_Column = parseInt((Path.split("to")[0]).split("_")[1]);
      var Right_Column = parseInt((Path.split("to")[1]).split("_")[1]);
        
      var Parallel_Top_Identifier = String(Current_Row-1) + "_" + String(Left_Column) + "to" + String(Current_Row-1) + "_" + String(Right_Column);
      var Perpendicular_Top_Left_Identifier = String(Current_Row) + "_" + String(Left_Column) + "to" +  String(Current_Row-1) + "_" + String(Left_Column);
      var Perpendicular_Top_Right_Identifier = String(Current_Row) + "_" + String(Right_Column) + "to" +  String(Current_Row-1) + "_" + String(Right_Column);
      var Parallel_Bottom_Identifier = String(Current_Row+1) + "_" + String(Left_Column) + "to" + String(Current_Row+1) + "_" + String(Right_Column);
      var Perpendicular_Bottom_Left_Identifier = String(Current_Row) + "_" + String(Left_Column) + "to" +  String(Current_Row+1) + "_" + String(Left_Column);
      var Perpendicular_Bottom_Right_Identifier = String(Current_Row) + "_" + String(Right_Column) + "to" +  String(Current_Row+1) + "_" + String(Right_Column);
      
      // Top neighbourhood
      if(Current_Row != 1){
        var Parallel_Top_Line = document.getElementsByClassName(Parallel_Top_Identifier)[0];
        var Perpendicular_Top_Left_Line = document.getElementsByClassName(Perpendicular_Top_Left_Identifier)[0];
        var Perpendicular_Top_Right_Line = document.getElementsByClassName(Perpendicular_Top_Right_Identifier)[0];
        var Check_1 = parseInt(Parallel_Top_Line.dataset.state);
        var Check_2 = parseInt(Perpendicular_Top_Left_Line.dataset.state);
        var Check_3 = parseInt(Perpendicular_Top_Right_Line.dataset.state);
        var Perimeter_Check = Check_1 + Check_2 + Check_3;
        if(Perimeter_Check == 3){
        Score = Score + 1;
        var Box_Identifier = "Boxes " + String(Current_Row-1) + "_" + String(Left_Column);
        var Box_To_Fill = document.getElementsByClassName(Box_Identifier)[0];
        if(Line_Colour == "rgb(246, 73, 160)"){
          Box_To_Fill.classList.add('Pink_Box');
          Box_To_Fill.dataset.state = "Pink";
        }
        else{
          Box_To_Fill.classList.add('Blue_Box');
          Box_To_Fill.dataset.state = "Blue";
        }
        }       
      }

      // Bottom neighbourhood
      if(Current_Row != 10){
        var Parallel_Bottom_Line = document.getElementsByClassName(Parallel_Bottom_Identifier)[0];
        var Perpendicular_Bottom_Left_Line = document.getElementsByClassName(Perpendicular_Bottom_Left_Identifier)[0];
        var Perpendicular_Bottom_Right_Line = document.getElementsByClassName(Perpendicular_Bottom_Right_Identifier)[0];  
        var Check_1 = parseInt(Parallel_Bottom_Line.dataset.state);
        var Check_2 = parseInt(Perpendicular_Bottom_Left_Line.dataset.state);
        var Check_3 = parseInt(Perpendicular_Bottom_Right_Line.dataset.state);
        var Perimeter_Check = Check_1 + Check_2 + Check_3;
        if(Perimeter_Check == 3){
        Score = Score + 1;
        var Box_Identifier = "Boxes " + String(Current_Row) + "_" + String(Left_Column);
        var Box_To_Fill = document.getElementsByClassName(Box_Identifier)[0];
        if(Line_Colour == "rgb(246, 73, 160)"){
          Box_To_Fill.classList.add('Pink_Box');
          Box_To_Fill.dataset.state = "Pink";
        }
        else{
          Box_To_Fill.classList.add('Blue_Box');
          Box_To_Fill.dataset.state = "Blue";
        }
        }       
      }
  }
  if(Score == 0){
    Alternate_Line_Colour();
  } 
    Check_For_Finished_Game();  
}

function Alternate_Line_Colour(){
  var Focussed_Line = document.getElementById('Active_Line');
  var LED_Light_Bar = document.getElementsByClassName('LED_Indicator')[0];
  Line_Style = window.getComputedStyle(Focussed_Line);
  var Previous_Colour = String(Line_Style.getPropertyValue('background-color'));
  if(Previous_Colour == "rgb(246, 73, 160)"){
      Focussed_Line.style.backgroundColor = "rgb(160, 50, 240)";
      LED_Light_Bar.classList.add('LED_Indicator_Blue');
  }
  else{
      Focussed_Line.style.backgroundColor = "rgb(246, 73, 160)";  
      LED_Light_Bar.classList.remove('LED_Indicator_Blue');
  }
}

function Check_For_Finished_Game(){
  var Boxes = document.getElementsByClassName('Boxes');
  var Total = 0;
  for(Box_Index = 0; Box_Index < Boxes.length; Box_Index++){
    if(String(Boxes[Box_Index].dataset.state) != "0"){
    Total = Total + 1;  
  }
  }
  if(Total == parseInt(Boxes.length)){
    console.log("Game Done");
    Evaluate_Winner();    
  }
}

function Evaluate_Winner(){
  var Colour_1 = "rgba(246, 75, 120, 1)";
  var Colour_2 = "rgba(134, 110, 240, 1)";
  var Pink_Total = 0;
  var Blue_Total = 0;
  
  var Boxes = document.getElementsByClassName('Boxes');
  for(Box_Index = 0; Box_Index < Boxes.length; Box_Index++){
    var Box_Colour = String(Boxes[Box_Index].dataset.state);
    if(Box_Colour == "Pink"){
      Pink_Total = Pink_Total + 1;
    }
    if(Box_Colour == "Blue"){
      Blue_Total = Blue_Total + 1;
    }  
  }
  
  console.log(Pink_Total);

  
  var Winner_Text = document.getElementById('Winner_Text');
  var Winner_Icon = document.getElementById('Winner_Icon');
  if(Pink_Total > Blue_Total){
    var Winner = "Pink";
    Winner_Icon.style.background = "linear-gradient(0deg, #EE459A 0%, #F95371 100%)";
    Winner_Text.innerHTML = "<br>The Winner is Pink<br>" + String(Pink_Total) + ":" + String(Blue_Total);
  }
  else{
    var Winner = "Blue";
    Winner_Icon.style.background = "linear-gradient(180deg, #8675F7 0%, #75B1F7 100%)";
    Winner_Text.innerHTML = "<br>The Winner is Blue<br>" + String(Pink_Total) + ":" + String(Blue_Total);
  }
  var Winner_Panel = document.getElementById('Modal_Background');
  Winner_Panel.style.display = "block";
  Winner_Panel.classList.add('Blur_In_Animation');
}


function Reset_Game(){
  var Boxes = document.getElementsByClassName('Boxes');
  var Vertical_Lines = document.getElementsByClassName('Vertical_Lines');
  var Horizontal_Lines = document.getElementsByClassName('Horizontal_Lines');
  
  for(Index = 0; Index < Boxes.length; Index++){
    Boxes[Index].dataset.state = "0";
    Boxes[Index].classList.remove('Pink_Box');
    Boxes[Index].classList.remove('Blue_Box');
  }
  
  for(Index = 0; Index < Vertical_Lines.length; Index++){
    Vertical_Lines[Index].dataset.state = "0";
    Vertical_Lines[Index].style.backgroundColor = "rgba(0,0,0,0.02)";
  }
  
  for(Index = 0; Index < Horizontal_Lines.length; Index++){
    Horizontal_Lines[Index].dataset.state = "0";
    Horizontal_Lines[Index].style.backgroundColor = "rgba(0,0,0,0.02)";
  }
  
  var Winner_Panel = document.getElementById('Modal_Background');
  Winner_Panel.classList.remove('Blur_In_Animation');
  Winner_Panel.classList.add('Blur_Out_Animation');
  var Window_Fade_Duration = 800;
  setTimeout(function () {
    Winner_Panel.style.display = "none";  
    Winner_Panel.classList.remove('Blur_Out_Animation');
  }, Window_Fade_Duration);
}







