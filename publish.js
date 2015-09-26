var AWS = require('aws-sdk');
var fs = require('fs');
var path = require('path');

var s3 = new AWS.S3();
var data = fs.readFileSync(path.resolve(__dirname, 'build/bundle.js'));
var params = {
  ACL    : 'public-read',
  Bucket : 'vokou',
  Key    : 'bundle.js',
  Body   : data
};
s3.putObject(params, function(err, data) {
  if (err) {
    console.log('Failed');
    console.log(err);
  } else {
    console.log('Succeed');
  }
});