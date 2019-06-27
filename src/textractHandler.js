const fs = require('fs');
const AWS = require('aws-sdk');
const BUCKETNAME = "afkscapedrop"

const credentials = new AWS.SharedIniFileCredentials({
  profile: 'mwildeadmin'
});
AWS.config.credentials = credentials;
AWS.config.region = 'us-west-2';

const textract = new AWS.Textract();

export default function main(s3Key) {
  const image = fs.readFileSync('./pic/cropped.png');
  return new Promise((resolve, reject) => {
    const params = {
      Document: {
        Bytes: image
      }
    };
    textract.detectDocumentText(params, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data);
      }
    });
  })
}