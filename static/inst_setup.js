canvas = document.getElementById("fl_status");
ctx = canvas.getContext('2d');

g_x = canvas.width;
g_y = canvas.height / 3;
a_x = canvas.width;
a_y = canvas.height - g_y;

ctx.fillStyle = "brown";
ctx.fillRect(0, a_y, a_x, a_y);

ctx.fillStyle = "skyblue";
ctx.fillRect(0,0, a_x, a_y);


