import screencap from './screencap'
import textract from './textractHandler'
import sendSMS from './smsHandler'
const FlexSearch = require("flexsearch");
const index = new FlexSearch("speed");
const SEARCH_TOKEN = "shame";

screencap()
.then(result => {
  console.log(result);
  textract()
  .then(imageData => {
    let textArray = [];
    imageData.Blocks.forEach((block, i) => {
      if("Text" in block && block.BlockType=="LINE") {
        console.log(block.Text)
        index.add(i, block.Text);
        textArray.push(block.Text);
      }
    });
    console.log(index.info())
    let searchable = textArray.join(" ")
    const results = index.search(SEARCH_TOKEN);
    if (results.length) {
      sendSMS().then(response => {
        console.log(response);
      });
    }
  })
})
.catch(err => {
  console.log(`Operation failure! ${err}`)
})
