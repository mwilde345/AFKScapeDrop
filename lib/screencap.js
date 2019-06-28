"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = main;

var screenshot = require('desktop-screenshot');

var sharp = require('sharp');

var robot = require("robotjs");

var MAX_Y = 2560;
var MAX_X = 1600;

var Jimp = require('jimp'); // 2560 x 1600
// system_profiler SPDisplaysDataType | grep Resolution


function main() {
  var windowFrame = {};
  console.log("Place cursor in bottom left of chatbox");
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      var botLeft = robot.getMousePos();
      windowFrame.bottom = botLeft.y;
      windowFrame.left = botLeft.x;
      console.log("captured bottom left");
      resolve();
    }, 3000);
  }).then(function () {
    console.log("Place cursor in top right of chatbox");
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        var topRight = robot.getMousePos();
        windowFrame['top'] = topRight.y;
        windowFrame.right = topRight.x;
        console.log("captured top right");
        resolve();
      }, 3000);
    });
  }).then(function () {
    console.log(JSON.stringify(windowFrame));
    var LEFT = windowFrame.left;
    var TOP = windowFrame.top;
    var WIDTH = windowFrame.right - windowFrame.left;
    var HEIGHT = windowFrame.bottom - windowFrame.top;
    return new Promise(function (resolve, reject) {
      captureImage({
        x: LEFT,
        y: TOP,
        w: WIDTH,
        h: HEIGHT
      }).then(function (_ref) {
        var width = _ref.width,
            height = _ref.height;
        sharp('./pic/screenshot.png').extract({
          left: 0,
          top: 0,
          width: width,
          height: height
        }).toFile('./pic/cropped.png').then(function (data) {
          console.log("Cropping succeeded");
          resolve(data);
        })["catch"](function (err) {
          reject(err);
        });
      }); // screenshot("./pic/screenshot.png",
      //   function (error, complete) {
      //     if (error) {
      //       console.log("Screenshot failed", error);
      //       reject();
      //     } else {
      //       console.log("Screenshot succeeded");
      //       // timeout for no reason
      //       setTimeout(() => {
      //         sharp('./pic/screenshot.png')
      //           .extract({ left: LEFT, top: TOP, width: WIDTH, height: HEIGHT })
      //           .toFile('./pic/cropped.png')
      //           .then(data => {
      //             console.log("Cropping succeeded")
      //             resolve(data)
      //           })
      //           .catch(err => {
      //             reject(err);
      //           });
      //       }, 10)
      //     }
      //   });
    });
  });

  function captureImage(_ref2) {
    var x = _ref2.x,
        y = _ref2.y,
        w = _ref2.w,
        h = _ref2.h;
    var pic = robot.screen.capture(x, y, w, h);
    var width = pic.byteWidth / pic.bytesPerPixel; // pic.width is sometimes wrong!

    var height = pic.height;
    var image = new Jimp(width, height);
    var red, green, blue;
    return new Promise(function (resolve) {
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
      image.write('./pic/screenshot.png');
      resolve({
        width: width,
        height: height
      });
    });
  }
}