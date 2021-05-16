import * as AWSMock from 'aws-sdk-mock'
import AWS from 'aws-sdk'
import fpAws from '../../src'
import { right } from 'fp-ts/lib/Either'

const putObjectMock = jest.fn()

AWSMock.setSDKInstance(AWS)
AWSMock.mock(
  'S3',
  'putObject',
  (
    params: AWS.S3.PutObjectRequest,
    callback: (
      err: AWS.AWSError | null,
      data: AWS.S3.Types.PutObjectOutput | null
    ) => void
  ) => {
    putObjectMock(params)
    callback(null, params)
  }
)

const s3 = {
  putObject: fpAws((s3: AWS.S3) => s3.putObject),
}

describe('S3', () => {
  describe('putObject', () => {
    it('should succeed with response', async () => {
      const putObjectRequest: AWS.S3.PutObjectRequest = {
        Bucket: 'bucket',
        Key: 'key',
      }
      const putObject = s3.putObject(putObjectRequest)
      expect(await putObject(new AWS.S3())()).toMatchObject(
        right(putObjectRequest)
      )
      expect(putObjectMock).toHaveBeenCalledWith(putObjectRequest)
    })
  })
})
