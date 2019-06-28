const robot = require("robotjs");
const botLeft = robot.getMousePos();
const size = robot.getScreenSize();
const cap = robot.screen.capture(0,0,1680,1050);
const fs = require('fs');
const PNG = require('pngjs').PNG;
console.log(JSON.stringify(botLeft));
console.log(JSON.stringify(size));
console.log(cap.width);
console.log(cap.height);
console.log(cap.byteWidth);
console.log(cap.image.length)

// const robot = require('robotjs')
const Jimp = require('jimp')

function captureImage({ x, y, w, h }) {
  const pic = robot.screen.capture(x, y, w, h)
  const width = pic.byteWidth / pic.bytesPerPixel // pic.width is sometimes wrong!
  const height = pic.height
  const image = new Jimp(width, height)
  let red, green, blue
  pic.image.forEach((byte, i) => {
    switch (i % 4) {
      case 0: return blue = byte
      case 1: return green = byte
      case 2: return red = byte
      case 3: 
        image.bitmap.data[i - 3] = red
        image.bitmap.data[i - 2] = green
        image.bitmap.data[i - 1] = blue
        image.bitmap.data[i] = 255
    }
  })
  return image
}
x = 0;
y = 0;
w = 1680;
h = 1050;
captureImage({ x, y, w, h }).write('capture.png')