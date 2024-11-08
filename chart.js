var myCanvas = document.getElementById("myCanvas");
myCanvas.width = 300;
myCanvas.height = 300;
var ctx = myCanvas.getContext("2d");

function drawLine(ctx, startX, startY, endX, endY, color){
    ctx.save();
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(startX,startY);
    ctx.lineTo(endX,endY);
    ctx.stroke();
    ctx.restore();
}

function drawArc(ctx, centerX, centerY, radius, startAngle, endAngle, color){
    ctx.save();
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.stroke();
    ctx.restore();
}

function drawPieSlice(ctx,centerX, centerY, radius, startAngle, endAngle, fillColor, strokeColor) {
    ctx.save();
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = strokeColor;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle, strokeColor);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}