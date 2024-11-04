const canvas = document.getElementById('pieChart');
const ctx = canvas.getContext('2d');

// Sample data
const data = [30, 50, 20 , 20 , 20];  // Values for each segment
const colors = ['#ff6384', '#36a2eb', '#ffce56' , '#ffbe56' , '#ffae56'];  // Colors for each segment

// Calculate total
const total = data.reduce((acc, val) => acc + val, 0);

// Starting angle in radians
let startAngle = 0;

data.forEach((value, index) => {
  // Calculate the end angle
  const endAngle = startAngle + (value / total) * 2 * Math.PI;

  // Set the color
  ctx.fillStyle = colors[index];

  // Draw the segment
  ctx.beginPath();
  ctx.moveTo(canvas.width / 3, canvas.height / 3);  // Center of the pie chart
  ctx.arc(canvas.width / 3, canvas.height / 3, canvas.height / 3, startAngle, endAngle);
  ctx.closePath();
  ctx.fill();

  // Update start angle for next segment
  startAngle = endAngle;
});
