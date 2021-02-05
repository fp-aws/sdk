# fp-aws/sdk

Functional wrapper around aws-sdk clients using fp-ts.

## Install

Uses `aws-sdk` and `fp-ts` as peer dependencies, so you'll have to install those two in your application.

```sh
> npm install --save @fp-aws/sdk aws-sdk fp-ts 
```

## Usage

```typescript
import { s3 } from '@fp-aws/sdk'
import { identity } from 'fp-ts/lib/function'
import { fold } from 'fp-ts/lib/Either'

const getFileFromBucket = async (): Promise<string> => {
  const objectGetter = s3.getObject({
    Bucket: 'some_bucket_name',
    Key: 'test.txt',
  })

  const program = objectGetter({
    Region: 'eu-west-1',
    AccessKeyId: 'abcdef...',
    SecretAccessKey: 'xxx...',
  })

  const output = await program()

  const result = fold(
    (error) => `${error}`,
    identity
  )
}
```

## Done

_Nothing done yet, still early days._

## Todo

- S3
- DynamoDB
- SNS
- SQS
