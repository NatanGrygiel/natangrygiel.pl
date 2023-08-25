// Create a new canvas element
var canvas = document.createElement('FishCanvas');
canvas.width = document.querySelector('.terminal').clientWidth;
canvas.height = document.querySelector('.terminal').clientHeight;

// Append it to your content div
document.querySelector('.content').appendChild(FishCanvas);

// Create a new fisheye effect with the canvas
var fisheye = new Fisheye(FishCanvas);

// Set the distortion (adjust the values to your liking)
fisheye.setDistortion(0.05, 0.05, 0.05);

// Draw the existing content of your terminal div into the fisheye effect
var tempCanvas = document.createElement('FishCanvas');
tempCanvas.width = canvas.width;
tempCanvas.height = canvas.height;
var ctx = tempCanvas.getContext('2d');
ctx.drawImage(document.querySelector('.terminal'), 0, 0);
fisheye.draw(tempCanvas);

// You can clear and redraw whenever the content changes
