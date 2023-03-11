
// THis script is providing instrument panel drawing.

function drawCursor(cvs, ctx, alt){
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
    ctx.fillText('+20', canvas.width/2, (canvas.height/2)+50);
    ctx.fillText('+10', canvas.width/2, (canvas.height/2)+25);
    ctx.fillText('-10', canvas.width/2, (canvas.height/2)-25);
    ctx.fillText('-20', canvas.width/2, (canvas.height/2)-50);
    
    // Height
    ctx.fillText('Att:'+alt, canvas.width-50, canvas.height/2-10);    

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

function fligthStatus(cvs, ctx, pitch, roll, alt){
  canvasErase(cvs,ctx);
  drawHorizon(cvs,ctx,0,0);
  drawCursor(cvs,ctx,alt);
}

canvas = document.getElementById("fl_status");
context = canvas.getContext('2d');
// initial status.
fligthStatus(canvas, context, 0, 0, 0);

