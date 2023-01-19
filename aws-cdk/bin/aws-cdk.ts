#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { AwsCdkStack } from '../lib/aws-cdk-stack';

const app = new cdk.App();


const ExistVPCId = app.node.tryGetContext("ExistVPCId");

let props = { 
  ExistVPCId,
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region:  process.env.CDK_DEFAULT_REGION
  }
 };

new AwsCdkStack(app, 'AwsCdkStack', props);
