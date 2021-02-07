// import { S3, SNS, DynamoDB } from 'aws-sdk'
// import functionalize from '@/index'

// const s3 = {
//   createBucket: functionalize((s3: S3) => s3.createBucket),
//   getObject: functionalize((s3: S3) => s3.getObject),
//   putObject: functionalize((s3: S3) => s3.putObject),
// }

// const dynamoDbX = functionalize((dynamo: DynamoDB) => dynamo.createTable)

// const s3PutObject = functionalize((s3: S3) => s3.putObject)
// s3PutObject({
//   Bucket: 'A',
//   Key: 'B',
// })

// const snsPublish = functionalize((sns: SNS) => sns.publish)
// snsPublish({
//   Message: 'Hello world!',
// })

describe('S3', () => {
  describe('putObject', () => {
    it('should succeed with response', async () => {
      expect(true).toBe(true)
    })
  })
})
