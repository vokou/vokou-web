var AWS = require('aws-sdk');
var fs = require('fs');
var path = require('path');

var s3 = new AWS.S3();
var data = fs.readFileSync(path.resolve(__dirname, 'dist/bundle.js'));
var params = {
  ACL    : 'public-read',
  Bucket : 'vokou',
  Key    : 'bundle' + process.env.TS + '.js',
  Body   : data
};

if (process.env.V_ENV === 'PRO') {
  params.Bucket = 'vokou-pro';
}
s3.putObject(params, function(err, data) {
  if (err) {
    console.log('Failed');
    console.log(err);
  } else {
    console.log('Bundle Upload Succeed');
  }

  // Check if vendor needs to be updated
  if (process.env.UV === 'T') {
    data = fs.readFileSync(path.resolve(__dirname, 'dist/vendors.js'));
    params.Key = 'vendors' + process.env.TS + '.js';
    params.Body = data;
    s3.putObject(params, function(err, data) {
      if (err) {
        console.log('Failed');
        console.log(err);
      } else {
        console.log('Vendors Upload Succeed');
      }
    });
  }
});