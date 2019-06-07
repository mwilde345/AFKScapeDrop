"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = main;

var screenshot = require('desktop-screenshot');

var sharp = require('sharp');

var LEFT = 0;
var TOP = 1500;
var WIDTH = 600;
var HEIGHT = 200;

function main() {
  return new Promise(function (resolve, reject) {
    screenshot("screenshot.png", // {
    //   width: 400,
    //   height: 400
    // },
    function (error, complete) {
      if (error) {
        console.log("Screenshot failed", error);
        reject();
      } else {
        console.log("Screenshot succeeded");
        sharp('screenshot.png').extract({
          left: LEFT,
          top: TOP,
          width: WIDTH,
          height: HEIGHT
        }).toFile('cropped.png').then(function (data) {
          resolve(data);
        })["catch"](function (err) {
          reject(err);
        });
      }
    });
  });
}