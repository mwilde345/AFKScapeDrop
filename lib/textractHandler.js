"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = main;

var fs = require('fs');

var AWS = require('aws-sdk');

var BUCKETNAME = "afkscapedrop"; // const credentials = new AWS.SharedIniFileCredentials({
//   profile: 'mwildeadmin'
// });
// AWS.config.credentials = credentials;

AWS.config.region = 'us-west-2';
var textract = new AWS.Textract();

function main() {
  var image = fs.readFileSync('./pic/cropped.png');
  return new Promise(function (resolve, reject) {
    var params = {
      Document: {
        Bytes: image
      }
    };
    textract.detectDocumentText(params, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}