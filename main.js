objects=[];
video="";
status="";

function setup(){
canvas=createCanvas(300,280);
canvas.center();
video= createCapture(VIDEO);
video.size(300,280);
video.hide();
}


function start(){
objectDetector=ml5.objectDetector("cocossd",modelLoaded);
document.getElementById("status").innerHTML="Status: Detecting Objects";
}

function modelLoaded(){
console.log("Model Loaded!");
status=true;
}

function gotResult(error,results){
if(error){
console.log(error)
}
console.log(results);
objects=results;
}

function draw(){
image(video,0,0,300,280);

if(status !=""){
objectDetector.detect(video,gotResult);
for(i=0;i<objects.length;i++)
{
 document.getElementById("status").innerHTML="Status: OBJECT DETECTED";
 document.getElementById("number_of_objects").innerHTML="Number of objects are"+objects.length;
 fill("#FF0000");
 percent=floor(objects[i].confidence * 100);
 text(objects[i].label +""+ percent+"%",objects[i].x,objects[i].y);
 noFill();
 stroke("#FF0000");
 rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
}
}
}