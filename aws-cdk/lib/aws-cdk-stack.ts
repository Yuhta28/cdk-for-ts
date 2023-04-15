import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { BaseStackProps } from './base-stack-props';
import *  as rds from 'aws-cdk-lib/aws-rds';

interface AwsCdkStackProps extends BaseStackProps {
}

export class AwsCdkStack extends cdk.Stack {
  readonly props: AwsCdkStackProps;

  constructor(scope: Construct, id: string, props: AwsCdkStackProps) {
    super(scope, id, props);
    this.props = props;
    const {
    } = props;

    // new create vpc
    const vpc = new ec2.Vpc(this, 'VPC', {
      ipAddresses: ec2.IpAddresses.cidr('10.1.0.0/16'),
      vpcName: "CDK-VPC",
      natGateways: 1,
      natGatewaySubnets: {
        subnetType: ec2.SubnetType.PUBLIC
      }
    });

    const ami = new ec2.AmazonLinuxImage({
      generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,
      cpuType: ec2.AmazonLinuxCpuType.ARM_64
    });
  }
}
