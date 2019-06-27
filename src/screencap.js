const screenshot = require('desktop-screenshot');
const sharp = require('sharp');
const LEFT = 0;
const TOP = 1600;
const WIDTH = 800;
const HEIGHT = 400;
// 2560 x 1600
// system_profiler SPDisplaysDataType | grep Resolution

export default function main() {
  return new Promise((resolve, reject) => {
    screenshot("./pic/screenshot.png",
    function (error, complete) {
      if (error) {
        console.log("Screenshot failed", error);
        reject();
      } else {
        console.log("Screenshot succeeded");
        // timeout for no reason
        setTimeout(()=> {
          sharp('./pic/screenshot.png')
          .extract({ left: LEFT, top: TOP, width: WIDTH, height: HEIGHT })
          .toFile('./pic/cropped.png')
          .then(data => {
            console.log("Cropping succeeded")
            resolve(data)
          })
          .catch(err => {
            reject(err);
          });
        }, 2000)
        
      }
    });
  })
}