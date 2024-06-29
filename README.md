# AWS CDK, CodePipeline, and Lambda

Here you can deploy an AWS Lambda function using CodePipeline all with AWS CDK using Typescript.

## How This Works

You have a main CDK Stack that houses your AWS CodePipeline. This needs to be deployed manually via your CLI using `npx cdk deploy`.
Within that Pipeline, using the simplified `pipelines` CDK module, you can easily deploy your nested Stack which contains your core infrastructure, in this case a simple Lambda function. You can utilize a lot more infrastructure as well, including additional Lambdas, API Gateways, etc.

Note that the `pipelines` construct is explicitly not designed to manage ECR deployments for ECS to load the images into. For an explanation on this, please refer to [This RevApps Blog Post](https://revapps.io/blog/ecs_pipeline)

## Prerequisites

1. Have Node and Typescript installed on your local machine
2. Have an AWS Account with the Account Id readily available
3. Have the AWS CLI and AWS CDK CLI installed on your local machine

I also suggest a general working knowledge of AWS CDK, Typescript, and CI/CD Pipelines in general. Knowledge of Lambda functions will also help.

## Additional Information

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template


cdk deploy PuggoCodePipelineStack --profile <NAME>