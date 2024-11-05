const canvas = document.getElementById('pieChart');
const ctx = canvas.getContext('2d');

// Sample data
const data = [30, 50, 20];  // Values for each segment
const colors = ['#ff6384', '#36a2eb', '#ffce56'];  // Colors for each segment

// Calculate total
const total = data.reduce((acc, val) => acc + val, 0);

// Store the angles for hover detection
let angles = [];
let startAngle = 0;

// Draw the pie chart
function drawPieChart(scaleIndex = 3) {
    angles = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    startAngle = 0; // Reset start angle for redrawing

    data.forEach((value, index) => {
        const endAngle = startAngle + (value / total) * 2 * Math.PI;
        // Calculate radius based on whether it's the hovered segment
        const radius = scaleIndex === index ? (canvas.height / 2) * 1.1 : (canvas.height / 2); // Increase size for hovered segment
        
        // Draw the segment
        ctx.fillStyle = colors[index];
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height / 2);  // Center of the pie chart
        ctx.arc(canvas.width / 2, canvas.height / 2, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fill();

        // Store the start and end angles for this segment
        angles.push({ start: startAngle, end: endAngle, color: colors[index] });

        // Update start angle for the next segment
        startAngle = endAngle;
    });
}

// Initial draw
drawPieChart();

// Mouse move event
canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // Calculate the angle from the center of the pie chart to the mouse position
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const dx = mouseX - centerX;
    const dy = mouseY - centerY;
    const mouseAngle = Math.atan2(dy, dx) > 0 ? Math.atan2(dy, dx) : Math.atan2(dy, dx) + 2* Math.PI; // Normalize to [0, 2PI]
    // Determine which segment the mouse is over
    let hoveredIndex = -1;
    angles.forEach((angle, index) => {
        if (mouseAngle >= angle.start && mouseAngle < angle.end) {
            hoveredIndex = index; // Set hovered index
        }
    });
    // Redraw the pie chart with the hovered segment enlarged
    drawPieChart(hoveredIndex);
});
