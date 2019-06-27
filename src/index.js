import screencap from './screencap'
import textract from './textractHandler'
const FlexSearch = require("flexsearch");
const index = new FlexSearch("speed");

screencap()
.then(result => {
  console.log(result);
  textract()
  .then(imageData => {
    let textArray = [];
    imageData.Blocks.forEach(block => {
      if("Text" in block && block.BlockType=="WORD") {
        textArray.push(block.Text);
      }
    });
    let searchable = textArray.join(" ")
    index.add(10, searchable)
    index.search("Box")
  })
})
.catch(err => {
  console.log(`Operation failure! ${err}`)
})
