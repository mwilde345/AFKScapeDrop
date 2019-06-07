"use strict";

var _screencap = _interopRequireDefault(require("./screencap"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _screencap["default"])().then(function (result) {
  console.log(result);
});