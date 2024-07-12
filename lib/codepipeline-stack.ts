import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as pipelines from 'aws-cdk-lib/pipelines';
import { PuggoLambdaStack } from './puggo-lambda-stack';

export class PuggoCodePipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const githubAccessToken =
      cdk.SecretValue.secretsManager('cdk-github-token');

    const pipeline = new pipelines.CodePipeline(this, 'PuggoCodePipeline', {
      pipelineName: 'PuggoCodePipeline',
      synth: new pipelines.ShellStep('Synth', {
        input: pipelines.CodePipelineSource.gitHub(
          'DYoonity/puggo-lambda-cdk',
          'main',
          {
            authentication: githubAccessToken,
          },
        ),
        commands: ['npm i', 'npm run build-all', 'npx cdk synth'],
      }),
    });

    const stagingStage = new cdk.Stage(this, 'StagingStage');
    const lambdaStackStaging = new PuggoLambdaStack(
      stagingStage,
      'PuggoLambdaStack-Staging',
      {
        env: {
          account: '693645687349',
          region: 'us-east-1',
        },
        stackName: 'PuggoLambdaStack-Staging',
        description: 'Testing App for Lambda Staging',
        stageName: 'staging',
      },
    );

    pipeline.addStage(stagingStage);

    const prodStage = new cdk.Stage(this, 'ProductionStage');
    const lambdaStackProd = new PuggoLambdaStack(
      prodStage,
      'PuggoLambdaStack-Prod',
      {
        env: {
          account: '693645687349',
          region: 'us-east-1',
        },
        stackName: 'PuggoLambdaStack-Prod',
        description: 'Testing App for Lambda Prod',
        stageName: 'production',
      },
    );

    pipeline.addStage(prodStage, {
      pre: [new pipelines.ManualApprovalStep('PromoteToProd')],
    });
  }
}
