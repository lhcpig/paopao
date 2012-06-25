function drawEllipse(x, y, w, h ,color,ctx) {
    x = x - w/2;
    y = y - h/2;
    var xx = x;
    var yy = y;
    ctx.translate(x+w/2,y+h/2);
    ctx.rotate(Math.PI/4);
    x = -w/2;
    y = -h/2;
    var k = 0.5522848;
    var ox = (w / 2) * k;
    var oy = (h / 2) * k;
    var xe = x + w;
    var ye = y + h;
    var xm = x + w / 2;
    var ym = y + h / 2;
    ctx.beginPath();
    ctx.moveTo(x, ym);
    ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
    ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
    ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
    ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
    ctx.closePath();
    ctx.strokeStyle = 'transparent';
    ctx.stroke();
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 10;
    ctx.shadowColor = color;
    var grad = ctx.createRadialGradient(0, 0, 0 ,0, 0,h*2/3);
    grad.addColorStop(0,color);
    grad.addColorStop(1,'transparent');
    ctx.fillStyle = grad;    
    ctx.fill();
    ctx.rotate(-Math.PI/4);
    ctx.translate(-xx-w/2,-yy-h/2);
}

function drawMoon(x,y,r,color,ctx){
    //ctx.restore();
    ctx.beginPath();
    ctx.translate(x,y);
    ctx.rotate(Math.PI/7);
    ctx.arc(0,0,r*0.9,0,Math.PI/6);
    ctx.arc(0,0,r*0.9,0,Math.PI/6);
    ctx.closePath();
    ctx.strokeStyle = color;
    ctx.stroke();    
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 10;
    ctx.shadowColor = color;
    ctx.fillStyle = color;
    ctx.fill();
    ctx.rotate(-Math.PI/7);
    ctx.translate(-x,-y);
}

function drawBubble(ctx,r,color,x,y){               
    ctx.globalAlpha= 1;
    //ctx.globalAlpha= 0.6;
    var grad1 = ctx.createRadialGradient(x,y,r,x,y,r*1.3);
    grad1.addColorStop(0,'white');
    grad1.addColorStop(0.5,color);
    grad1.addColorStop(1,'white');
    ctx.fillStyle = grad1;
    ctx.arc(x,y,r*1.1,0,Math.PI*2);
    ctx.fill();
    drawEllipse(x-r/2,y-2*r/3,12,36,color,ctx);
    drawMoon(x,y,r,color,ctx);
}
function drawNumber(ctx,num,x,y){
    //var num="35";
    ctx.font = 'bold 20pt 幼圆';
    var len = ctx.measureText(num).width;
    x = x - len / 2;
    y = y + 10 ;
    ctx.fillText(num,x,y);
}
