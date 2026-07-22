const Jimp = require('jimp');

Jimp.read('./public/98c66a31-d85a-4fe7-a677-3cdb2d970464.jpg')
  .then(img => {
    const width = img.bitmap.width;
    const height = img.bitmap.height;

    // Crop tightly around the knot only
    const startY = Math.floor(height * 0.32);
    const cropH  = Math.floor(height * 0.21);
    const startX = Math.floor(width * 0.12);
    const cropW  = Math.floor(width * 0.76);

    img.crop(startX, startY, cropW, cropH);

    // Remove dark blue background
    img.scan(0, 0, img.bitmap.width, img.bitmap.height, function(x, y, idx) {
      const r = this.bitmap.data[idx];
      const g = this.bitmap.data[idx + 1];
      const b = this.bitmap.data[idx + 2];
      if (r < 35 && g < 70 && b < 130) {
        this.bitmap.data[idx + 3] = 0;
      }
    });

    // Autocrop transparent borders
    img.autocrop({ tolerance: 0.01, cropOnlyFrames: false });

    return img.writeAsync('./public/logo-isystems.png');
  })
  .then(() => console.log('Logo guardado'))
  .catch(console.error);
