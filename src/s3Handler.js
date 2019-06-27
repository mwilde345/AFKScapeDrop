const fs = require('fs');
const AWS = require('aws-sdk');
const FILENAME = "cropped"
const EXTENSION = ".png"
const FILEPATH = `./pic/${FILENAME}${EXTENSION}`
const BUCKETNAME = "afkscapedrop"

const credentials = new AWS.SharedIniFileCredentials({
  profile: 'mwildeadmin'
});
AWS.config.credentials = credentials;
AWS.config.region = 'us-west-2';

const s3 = new AWS.S3();

// function to encode file data to base64 encoded string
function base64_encode(file) {
  // read binary data
  var bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return new Buffer(bitmap).toString('base64');
}

export default function main() {
  const s3Key = `${FILENAME}_${new Date().toISOString()}`
  const params = {
    Body: base64_encode(FILEPATH),
    Bucket: BUCKETNAME,
    Key: s3Key,
    ServerSideEncryption: "AES256"
  };
  return new Promise((resolve, reject) => {
    s3.putObject(params, (err, data) => {
      if (err) {
        reject("putObject error")
      } else {
        resolve(s3Key)
      }
    })
  })
}