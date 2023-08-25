const canvas = document.getElementById('static-effect');
const ctx = canvas.getContext('2d');
const terminal = document.querySelector('.terminal');

// Set canvas size
canvas.width = terminal.clientWidth;
canvas.height = terminal.clientHeight;

// Function to create static effect
function createStatic() {
  const imageData = ctx.createImageData(canvas.width, canvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const color = Math.random() * 255; // Random grayscale value
    data[i] = color;     // Red
    data[i + 1] = color; // Green
    data[i + 2] = color; // Blue
    data[i + 3] = 255;   // Alpha (fully opaque)
  }

  ctx.putImageData(imageData, 0, 0);
}

// Function to update static effect
function update() {
  createStatic();
  requestAnimationFrame(update); // Continue to update
}

update(); // Start updating
