"use strict";

var robot = require("robotjs");

var botLeft = robot.getMousePos();
var size = robot.getScreenSize();
var cap = robot.screen.capture(0, 0, 1680, 1050);

var fs = require('fs');

var PNG = require('pngjs').PNG;

console.log(JSON.stringify(botLeft));
console.log(JSON.stringify(size));
console.log(cap.width);
console.log(cap.height);
console.log(cap.byteWidth);
console.log(cap.image.length); // const robot = require('robotjs')

var Jimp = require('jimp');

function captureImage(_ref) {
  var x = _ref.x,
      y = _ref.y,
      w = _ref.w,
      h = _ref.h;
  var pic = robot.screen.capture(x, y, w, h);
  var width = pic.byteWidth / pic.bytesPerPixel; // pic.width is sometimes wrong!

  var height = pic.height;
  var image = new Jimp(width, height);
  var red, green, blue;
  pic.image.forEach(function (_byte, i) {
    switch (i % 4) {
      case 0:
        return blue = _byte;

      case 1:
        return green = _byte;

      case 2:
        return red = _byte;

      case 3:
        image.bitmap.data[i - 3] = red;
        image.bitmap.data[i - 2] = green;
        image.bitmap.data[i - 1] = blue;
        image.bitmap.data[i] = 255;
    }
  });
  return image;
}

x = 0;
y = 0;
w = 1680;
h = 1050;
captureImage({
  x: x,
  y: y,
  w: w,
  h: h
}).write('capture.png');