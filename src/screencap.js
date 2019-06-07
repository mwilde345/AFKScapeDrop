const screenshot = require('desktop-screenshot');
const sharp = require('sharp');
const LEFT = 0;
const TOP = 1080;
const WIDTH = 600;
const HEIGHT = 200;

export default function main() {
  return new Promise((resolve, reject) => {
    screenshot("screenshot.png", 
    // {
    //   width: 400,
    //   height: 400
    // },
    function (error, complete) {
      if (error) {
        console.log("Screenshot failed", error);
        reject();
      } else {
        console.log("Screenshot succeeded");
        sharp('screenshot.png')
          .extract({ left: LEFT, top: TOP, width: WIDTH, height: HEIGHT })
          .toFile('cropped.png')
          .then(data => {
            resolve(data)
          })
          .catch(err => {
            reject(err);
          });
      }
    });
  })
}