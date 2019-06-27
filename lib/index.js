"use strict";

var _screencap = _interopRequireDefault(require("./screencap"));

var _textractHandler = _interopRequireDefault(require("./textractHandler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var FlexSearch = require("flexsearch");

var index = new FlexSearch("speed");
(0, _screencap["default"])().then(function (result) {
  console.log(result);
  (0, _textractHandler["default"])().then(function (imageData) {
    var textArray = [];
    imageData.Blocks.forEach(function (block) {
      if ("Text" in block && block.BlockType == "WORD") {
        textArray.push(block.Text);
      }
    });
    var searchable = textArray.join(" ");
    index.add(10, searchable);
    console.log(index.search("Box"));
  });
})["catch"](function (err) {
  console.log("Operation failure! ".concat(err));
});