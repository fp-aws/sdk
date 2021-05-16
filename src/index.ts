import { Service, AWSError } from 'aws-sdk'
import { Request } from 'aws-sdk/lib/request'
import { pipe } from 'fp-ts/lib/function'
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
      createBucket: fpAws((s3: S3) => s3.createBucket),
      getObject: fpAws((s3: S3) => s3.getObject),
      putObject: fpAws((s3: S3) => s3.putObject),
    }
    s3.putObject({
      Bucket: 'A',
      Key: 'B',
    })

    const snsPublish = fpAws((sns: SNS) => sns.publish)
    snsPublish({
      Message: 'Hello world!',
    }) 
 */
export const fpAws =
  <AWSService extends Service, Request, AWSOutput>(
    functionSelector: (
      service: AWSService
    ) => AwsSdkFunction<Request, AWSOutput>
  ) =>
  (request: Request) =>
  (service: AWSService): TaskEither<AWSError, AWSOutput> =>
    pipe(service, functionSelector, (_) =>
      taskify<Request, AWSError, AWSOutput>(_)
    )(request)

export default fpAws
