"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = main;

function main() {
  var accountSid = process.env.TWILIO_ACCOUNT_SID;
  var authToken = process.env.TWILIO_AUTH_TOKEN;

  var client = require('twilio')(accountSid, authToken);

  return new Promise(function (resolve, reject) {
    client.messages.create({
      body: 'you have 5 seconds.',
      from: '+14353834329',
      to: '+14355925998'
    }).then(function (message) {
      return resolve(message);
    }).done();
  });
}