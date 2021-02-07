import { Service, AWSError } from 'aws-sdk'
import { Request } from 'aws-sdk/lib/request'
import { taskify, TaskEither } from 'fp-ts/lib/TaskEither'

export interface AwsSdkFunction<AWSRequest, AWSOutput> {
  (
    request: AWSRequest,
    callback?: (err: AWSError, data: AWSOutput) => void
  ): Request<AWSOutput, AWSError>
  (callback?: (err: AWSError, data: AWSOutput) => void): Request<
    AWSOutput,
    AWSError
  >
}

/**
 * 
 * @example
 * 
    const s3 = {
      createBucket: functionalize((s3: S3) => s3.createBucket),
      getObject: functionalize((s3: S3) => s3.getObject),
      putObject: functionalize((s3: S3) => s3.putObject),
    }

    const dynamoDbX = functionalize((dynamo: DynamoDB) => dynamo.createTable)

    const s3PutObject = functionalize((s3: S3) => s3.putObject)
    s3PutObject({
      Bucket: 'A',
      Key: 'B',
    })

    const snsPublish = functionalize((sns: SNS) => sns.publish)
    snsPublish({
      Message: 'Hello world!',
    }) 
 */
export const functionalize = <AWSService extends Service, Request, AWSOutput>(
  functionSelector: (service: AWSService) => AwsSdkFunction<Request, AWSOutput>
) => (request: Request) => (
  service: AWSService
): TaskEither<AWSError, AWSOutput> => {
  const sdkFunction = functionSelector(service)
  const taskified = taskify<Request, AWSError, AWSOutput>(sdkFunction)
  return taskified(request)
}

export default functionalize
