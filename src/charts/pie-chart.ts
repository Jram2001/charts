import { pieChartAngles, pieChartOptions } from "./chart-constant";

let canvas:HTMLCanvasElement;
let options:pieChartOptions;
let ctx:CanvasRenderingContext2D;
let total:number = 0;
let angles:pieChartAngles[] = [];

export function pieChart(element:HTMLCanvasElement , chartOptions : pieChartOptions){
    canvas = element;
    options =  chartOptions;
    if(canvas){
        setDefaultValues();
    }
}

function setDefaultValues(){
    ctx = canvas.getContext('2d')!;
    canvas.style.transform = 'scale(0)';
    total = options.data.reduce((acc: number, val: number) => acc + val, 0)
    drawPieChart(-1);
    // Mouse leave event
    canvas.addEventListener('mouseout', () => {
        drawPieChart(-1);
    });

    // Mouse move event
    canvas.addEventListener('mousemove', (event:MouseEvent) => {
        handleMouseMove(event)
    });
    initialAnimation();
}

let startAngle = 0;


function drawPieChart(scaleIndex = -1) {
    angles?.length ? angles.length = 0 : '';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    startAngle = 0;
    // Iterate through each data value to draw the corresponding pie chart segment
    options.data.forEach((value, index) => {
        // Calculate the end angle of the segment based on its proportion of the total
        const endAngle = startAngle + (value / total) * 2 * Math.PI;
        // Determine the radius of the segment, increasing its size if it's the hovered one (scaleIndex)
        const radius = scaleIndex === index ? (canvas.height / 3) * 1.1 : (canvas.height / 3);
        //Draw current section and update start angle
        startAngle = drawSegment(scaleIndex,index, radius, endAngle);
    });
}

function drawSegment(scaleIndex:number, index : number , radius : number ,endAngle : number){
    ctx.fillStyle = options.colors[scaleIndex ? scaleIndex : index];
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2); // Center of the pie chart
    if(radius > (canvas.height / 3)){
        drawScaleAnimation(radius , endAngle);
    }else{
    ctx.arc(canvas.width / 2, canvas.height / 2, radius, startAngle, endAngle);
    }
    ctx.closePath();
    ctx.fill();
    angles.push({ start: startAngle, end: endAngle, color: options.colors[scaleIndex ? scaleIndex : index] });
    return endAngle; // Return the updated angle
}

function handleMouseMove(event:MouseEvent){
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    // Calculate the angle from the center of the pie chart to the mouse position
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const dx = mouseX - centerX;
    const dy = mouseY - centerY;
    // Calculate the mouse angle relative to the center, ensuring it's in the range [0, 2π]
    const mouseAngle = Math.atan2(dy, dx) > 0 ? Math.atan2(dy, dx) : Math.atan2(dy, dx) + 2 * Math.PI; // Normalize to [0, 2PI]
    // Determine which segment the mouse is over
    let hoveredIndex = -1;
    angles.forEach((angle, index) => {
        if (mouseAngle >= angle.start && mouseAngle < angle.end) {
            hoveredIndex = index; // Set hovered index
        }
    });
    // Redraw the pie chart with the hovered segment enlarged
    drawPieChart(hoveredIndex);
}

function initialAnimation() {
    let pos = 1;
    var scaleAnimation = setInterval(animate, 10); // Continuously scale the canvas
    
    function animate() {
        if (pos >= (options.animationDuration ? options.animationDuration:500) ) {
            clearInterval(scaleAnimation); // Stop the animation once pos reaches 500
            pos = 0; // Reset pos (optional, depending on your needs)
        } else {
            pos+=10;
            canvas.style.transform = `scale(${pos / (options.animationDuration ? options.animationDuration:500)})`; // Apply scaling
        }
    }
}

function drawScaleAnimation(radius : number , endAngle : number){
    radius = (canvas.height / 3);
    let pos = 1;
    var scaleAnimation = setInterval(animate, 1); // Continuously scale the canvas
    function animate() {
        if (pos >= (options.animationDuration ? options.animationDuration:500) ) {
            clearInterval(scaleAnimation); // Stop the animation once pos reaches 500
            pos = 0; // Reset pos (optional, depending on your needs)
        } else {
            pos+=10;
            ctx.arc(canvas.width / 2, canvas.height / 2, radius , startAngle, endAngle);
            ctx.closePath();
            ctx.fill();
        }
        radius = radius + (radius*0.1/(500/10));
    }
}
