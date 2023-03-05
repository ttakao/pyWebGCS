canvas = document.getElementById("fl_status");
ctx = canvas.getContext('2d');

ctx.fillStyle = "green";
ctx.fillRect(0, canvas.height/2 , canvas.width, canvas.height);

ctx.fillStyle = "skyblue";
ctx.fillRect(0,0, canvas.width, canvas.height/2);


