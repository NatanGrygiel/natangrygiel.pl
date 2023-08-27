self.onmessage = function(event) {
    const { width, height } = event.data;
    const canvas = new OffscreenCanvas(width, height);
    const ctx = canvas.getContext('2d');
    
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;
  
    for (let i = 0; i < data.length; i += 4) {
      const color = Math.random() * 255;
      data[i] = color;
      data[i + 1] = color;
      data[i + 2] = color;
      data[i + 3] = 255;
    }
  
    ctx.putImageData(imageData, 0, 0);
    
    const bitmap = canvas.transferToImageBitmap();
    self.postMessage(bitmap, [bitmap]);
  };
  