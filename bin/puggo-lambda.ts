#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { PuggoCodePipelineStack } from '../lib/codepipeline-stack';

const app = new cdk.App();

new PuggoCodePipelineStack(app, 'PuggoCodePipelineStack', {
  env: {
    account: '693645687349',
    region: 'us-east-1',
  },
  stackName: 'PuggoCodePipelineStack',
  description: 'Testing App for Lambda Deployments',
});
