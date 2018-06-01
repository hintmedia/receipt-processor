const AWS = require('aws-sdk')

const getObject = (bucketName, objectKey) => {
  const s3 = new AWS.S3({ apiVersion: '2006-03-01' })
  const params = { Bucket: bucketName, Key: objectKey }
  return s3.getObject(params).createReadStream()
}

module.exports = getObject
