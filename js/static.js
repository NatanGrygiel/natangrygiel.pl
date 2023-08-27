let canvas, ctx, terminal;
let frames = [];
let frameIndex = 0;
let scale_factor;  // Declare here but don't define yet
const numFrames = 10; // Number of frames to pre-render

const worker = new Worker('js/worker.js');

// Function to set up the canvas and context
function setupCanvas() {
  canvas = document.getElementById('static-effect');
  ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = true; // Make it blurry
  terminal = document.querySelector('.terminal');
  // Correct for high DPI displays
  const dpr = window.devicePixelRatio || 1;
  scale_factor = dpr > 1 ? 1 : 2;  // Define it here after dpr
  canvas.width = terminal.clientWidth * dpr;
  canvas.height = terminal.clientHeight * dpr;
  ctx.scale(dpr, dpr);

  // Pre-render frames and start updating
  preRenderFrames();
}

// Function to pre-render static frames
function preRenderFrames() {
  let renderedFrames = 0;
  
  worker.onmessage = function(event) {
    frames.push(event.data);
    renderedFrames++;
    
    // Start the animation loop only after all frames are rendered
    if (renderedFrames === numFrames) {
      update();
    }
  };

  for (let i = 0; i < numFrames; i++) {
    worker.postMessage({
      width: canvas.width,
      height: canvas.height
    });
  }
}

// Function to update static effect
function update() {
  ctx.save(); // Save the current state
  ctx.scale(scale_factor, scale_factor);
  ctx.drawImage(frames[frameIndex], 0, 0);
  ctx.restore(); // Restore to the original state
  frameIndex = (frameIndex + 1) % frames.length;
  requestAnimationFrame(update);
}

// Listen for window resize
window.addEventListener('resize', setupCanvas);

// Initial setup
setupCanvas();
