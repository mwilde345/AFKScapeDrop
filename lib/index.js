"use strict";

var _screencap = _interopRequireDefault(require("./screencap"));

var _textractHandler = _interopRequireDefault(require("./textractHandler"));

var _smsHandler = _interopRequireDefault(require("./smsHandler"));

var _constants = require("constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var FlexSearch = require("flexsearch");

var index = new FlexSearch("speed");
var SEARCH_TOKEN = "shame";
(0, _screencap["default"])().then(function (result) {
  console.log(result);
  (0, _textractHandler["default"])().then(function (imageData) {
    var textArray = [];
    imageData.Blocks.forEach(function (block, i) {
      if ("Text" in block && block.BlockType == "LINE") {
        console.log(block.Text);
        index.add(i, block.Text);
        textArray.push(block.Text);
      }
    });
    console.log(index.info());
    var searchable = textArray.join(" ");
    var results = index.search(SEARCH_TOKEN);

    if (results.length) {
      (0, _smsHandler["default"])().then(function (response) {
        console.log(response);
      });
    }
  });
})["catch"](function (err) {
  console.log("Operation failure! ".concat(err));
});