
// THis script is providing instrument panel drawing.

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

function drawCompass(cvs,ctx,angle){
    ctx.beginPath();
    ctx.strokeStyle = "orange";
    ctx.lineWidth = 1;
    var center_x = cvs.width*(19/20);
    var center_y = cvs.height*(1/10);
    var radius = 10;
    ctx.arc(center_x, center_y, radius, 0, Math.PI*2,true);
    ctx.stroke();

    ctx.fillStyle = "red";
    ctx.font = "4pt Arial";
    // vertical figures
    ctx.fillText('N', cvs.width*(19/20)-2,cvs.height*(1/10)-10);
    ctx.stroke();
   
    var r_line = angle * (Math.PI / 180);

    x1 = center_x + Math.sin(r_line) * radius;
    y1 = center_y + Math.cos(r_line) * radius;
    x2 = center_x - Math.sin(r_line) * radius;
    y2 = center_y - Math.cos(r_line) * radius;
    ctx.strokeStyle="red"; 
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2, y2);
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
  drawCompass(cvs,ctx,angle);

}

canvas = document.getElementById("fl_status");
context = canvas.getContext('2d');
// initial status.
fligthStatus(canvas, context, 
  0, // pitch 
  0, // roll
  0, // altitude
  0, // heading angle
  0, // speed
  );

