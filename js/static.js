let canvas, ctx, terminal;
let frames = [];
let frameIndex = 0;
const numFrames = 10; // Number of frames to pre-render

const worker = new Worker('js/worker.js');

// Function to set up the canvas and context
function setupCanvas() {
  canvas = document.getElementById('static-effect');
  ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  terminal = document.querySelector('.terminal');

  // Correct for high DPI displays
  const dpr = window.devicePixelRatio || 1;
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
  ctx.drawImage(frames[frameIndex], 0, 0);
  frameIndex = (frameIndex + 1) % frames.length;
  requestAnimationFrame(update);
}

// Listen for window resize
window.addEventListener('resize', setupCanvas);

// Initial setup
setupCanvas();
