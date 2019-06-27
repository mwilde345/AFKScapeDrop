"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = main;

var screenshot = require('desktop-screenshot');

var sharp = require('sharp');

var LEFT = 0;
var TOP = 1200;
var WIDTH = 800;
var HEIGHT = 400; // 2560 x 1600
// system_profiler SPDisplaysDataType | grep Resolution

function main() {
  return new Promise(function (resolve, reject) {
    screenshot("./pic/screenshot.png", function (error, complete) {
      if (error) {
        console.log("Screenshot failed", error);
        reject();
      } else {
        console.log("Screenshot succeeded"); // timeout for no reason

        setTimeout(function () {
          sharp('./pic/screenshot.png').extract({
            left: LEFT,
            top: TOP,
            width: WIDTH,
            height: HEIGHT
          }).toFile('./pic/cropped.png').then(function (data) {
            console.log("Cropping succeeded");
            resolve(data);
          })["catch"](function (err) {
            reject(err);
          });
        }, 2000);
      }
    });
  });
}