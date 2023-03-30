
// THis script is providing INSTrument panel drawing.
canvas = document.getElementById("fl_status");
context = canvas.getContext('2d');
// initial status.
fligthStatus(canvas, context, 
  0, // pitch 
  0, // roll
  0, // altitude
  0, // speed
  );

function drawCursor(cvs, ctx, alt, speed){
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    // horizon
    ctx.beginPath();
    ctx.moveTo(0,cvs.height/2);
    ctx.lineTo(cvs.width, cvs.height/2);
    // vertical
    ctx.moveTo(cvs.width/2, 0);
    ctx.lineTo(cvs.width/2, cvs.height);
    ctx.stroke();
    
    ctx.fillStyle = "black";
    ctx.font = "10pt Arial";
    // vertical figures
    ctx.fillText('+20', cvs.width/2, (cvs.height/2)+50);
    ctx.fillText('+10', cvs.width/2, (cvs.height/2)+25);
    ctx.fillText('-10', cvs.width/2, (cvs.height/2)-25);
    ctx.fillText('-20', cvs.width/2, (cvs.height/2)-50);
    
    // speed
    ctx.fillText('Spd:'+speed, 10, cvs.height/2-10);
    // Height
    ctx.fillText('Att:'+alt, cvs.width-50, cvs.height/2-10);    
    ctx.stroke();
}

function drawHorizon(cvs,ctx,pitch,roll){
    var sin_theta = Math.sin(roll);
    var cos_theta = Math.cos(roll);
    var adj_length = cvs.width/2;
    var hypotenuse = adj_length / cos_theta;
    var opp_length = hypotenuse * sin_theta;
    var left_y = cvs.height/2 + Math.round(opp_length);
    var right_y = cvs.height/2 - Math.round(opp_length);
    var pitch_offset = Math.sin(pitch) * adj_length;
    // sky
    ctx.fillStyle="skyblue"; 
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(0,left_y + pitch_offset);
    ctx.lineTo(cvs.width, right_y + pitch_offset);
    ctx.lineTo(cvs.width, 0);
    ctx.closePath();
    ctx.fill();
    // gound
    ctx.fillStyle="green"; 
    ctx.beginPath();
    ctx.moveTo(0,cvs.height);
    ctx.lineTo(0,left_y + pitch_offset);
    ctx.lineTo(cvs.width, right_y + pitch_offset);
    ctx.lineTo(cvs.width, cvs.height);
    ctx.closePath();
    ctx.fill();    
}

function canvasErase(cvs,ctx){
  ctx.clearRect(0,0, cvs.width, cvs.height);
}

function fligthStatus(cvs, ctx, pitch, roll, alt,angle,speed){
  canvasErase(cvs,ctx);
  drawHorizon(cvs,ctx,pitch,roll);
  drawCursor(cvs,ctx,alt,speed);
}

// Compass part.
ccanvas = document.getElementById("compass");
ccontext = ccanvas.getContext('2d');

needle = new Image();
needle.src = 'static/needle.png';
cbody = new Image();
cbody.src = 'static/compass.png';
cbody.onload = bodyLoaded;

function bodyLoaded(){
  console.log("Compass image loaded.");
  compassDraw(0); // initial call.
} // dummy

function compassDraw(degrees){
  // hope square shape.
  ccontext.clearRect(0,0, ccanvas.width, ccanvas.height);
  ccontext.drawImage(cbody,
    0,0,cbody.width, cbody.height,
    0,0,ccanvas.width, ccanvas.height);
  ccontext.save();
  // origin move to center of canvas.
  ccontext.translate(ccanvas.width/2, ccanvas.height/2);
  // rotate by angle
  ccontext.rotate(degrees * (Math.PI / 180));
  // draw needle
  ccontext.drawImage(needle,
     0,0, needle.width, needle.height,
     -ccanvas.width/2, -ccanvas.height/2, ccanvas.width, ccanvas.height);
  // origin back
  ccontext.restore();
}     
