const screenshot = require('desktop-screenshot');
const sharp = require('sharp');
const robot = require("robotjs");


const MAX_Y = 2560;
const MAX_X = 1600;

const Jimp = require('jimp')
// 2560 x 1600
// system_profiler SPDisplaysDataType | grep Resolution

export default function main() {
  let windowFrame = {}
  console.log("Place cursor in bottom left of chatbox");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const botLeft = robot.getMousePos();
      windowFrame.bottom = botLeft.y;
      windowFrame.left = botLeft.x;
      console.log("captured bottom left");
      resolve();
    }, 3000);
  })
    .then(() => {
      console.log("Place cursor in top right of chatbox");
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const topRight = robot.getMousePos();
          windowFrame['top'] = topRight.y;
          windowFrame.right = topRight.x;
          console.log("captured top right");
          resolve();
        }, 3000)
      })
    })
    .then(() => {
      console.log(JSON.stringify(windowFrame));
      const LEFT = windowFrame.left;
      const TOP = windowFrame.top;
      const WIDTH = windowFrame.right - windowFrame.left;
      const HEIGHT = windowFrame.bottom - windowFrame.top;
      return new Promise((resolve, reject) => {
        captureImage({ x: LEFT, y: TOP, w: WIDTH, h: HEIGHT })
          .then(({width, height}) => {
            sharp('./pic/screenshot.png')
                  .extract({ left: 0, top: 0, width: width, height: height })
                  .toFile('./pic/cropped.png')
                  .then(data => {
                    console.log("Cropping succeeded")
                    resolve(data)
                  })
                  .catch(err => {
                    reject(err);
                  });
          })

        // screenshot("./pic/screenshot.png",
        //   function (error, complete) {
        //     if (error) {
        //       console.log("Screenshot failed", error);
        //       reject();
        //     } else {
        //       console.log("Screenshot succeeded");
        //       // timeout for no reason
        //       setTimeout(() => {
        //         sharp('./pic/screenshot.png')
        //           .extract({ left: LEFT, top: TOP, width: WIDTH, height: HEIGHT })
        //           .toFile('./pic/cropped.png')
        //           .then(data => {
        //             console.log("Cropping succeeded")
        //             resolve(data)
        //           })
        //           .catch(err => {
        //             reject(err);
        //           });
        //       }, 10)

        //     }
        //   });
      })
    });
  function captureImage({ x, y, w, h }) {
    const pic = robot.screen.capture(x, y, w, h)
    const width = pic.byteWidth / pic.bytesPerPixel // pic.width is sometimes wrong!
    const height = pic.height
    const image = new Jimp(width, height)
    let red, green, blue
    return new Promise(resolve => {
      pic.image.forEach((byte, i) => {
        switch (i % 4) {
          case 0: return blue = byte
          case 1: return green = byte
          case 2: return red = byte
          case 3:
            image.bitmap.data[i - 3] = red
            image.bitmap.data[i - 2] = green
            image.bitmap.data[i - 1] = blue
            image.bitmap.data[i] = 255
        }
      })
      image.write('./pic/screenshot.png')
      resolve({width, height})
    });
  }
}