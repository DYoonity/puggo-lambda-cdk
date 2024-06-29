import * as cdk from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as path from "path";
import { Construct } from "constructs";

interface PuggoLambdaStackProps extends cdk.StackProps {
  stageName: string;
}

export class PuggoLambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: PuggoLambdaStackProps) {
    super(scope, id, props);

    const pugLambda = new lambda.Function(this, `PugsLambdaFunction-${props!.stageName}`, {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: "index.handler",
      code: lambda.Code.fromAsset(path.resolve(__dirname, "./lambdas/pug")),
      environment: {
        STAGE_NAME: props!.stageName
      }
    });
  }
}