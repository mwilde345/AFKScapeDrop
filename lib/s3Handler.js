"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = main;

var fs = require('fs');

var AWS = require('aws-sdk');

var FILENAME = "cropped";
var EXTENSION = ".png";
var FILEPATH = "./pic/".concat(FILENAME).concat(EXTENSION);
var BUCKETNAME = "afkscapedrop";
var credentials = new AWS.SharedIniFileCredentials({
  profile: 'mwildeadmin'
});
AWS.config.credentials = credentials;
AWS.config.region = 'us-west-2';
var s3 = new AWS.S3(); // function to encode file data to base64 encoded string

function base64_encode(file) {
  // read binary data
  var bitmap = fs.readFileSync(file); // convert binary data to base64 encoded string

  return new Buffer(bitmap).toString('base64');
}

function main() {
  var s3Key = "".concat(FILENAME, "_").concat(new Date().toISOString());
  var params = {
    Body: base64_encode(FILEPATH),
    Bucket: BUCKETNAME,
    Key: s3Key,
    ServerSideEncryption: "AES256"
  };
  return new Promise(function (resolve, reject) {
    s3.putObject(params, function (err, data) {
      if (err) {
        reject("putObject error");
      } else {
        resolve(s3Key);
      }
    });
  });
}