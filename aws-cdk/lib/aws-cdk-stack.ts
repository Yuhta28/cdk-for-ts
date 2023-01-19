import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { BaseStackProps } from './base-stack-props';

interface AwsCdkStackProps extends BaseStackProps {
  ExistVPCId: string;
}

export class AwsCdkStack extends cdk.Stack {
  readonly props: AwsCdkStackProps;

  constructor(scope: Construct, id: string, props: AwsCdkStackProps) {
    super(scope, id, props);
    this.props = props;
    const {
      ExistVPCId
    } = props;

    const ExistVPC = ec2.Vpc.fromLookup(this, 'ExistVPC', {
      vpcId: ExistVPCId
    });

    const ami = new ec2.AmazonLinuxImage({
      generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,
      cpuType: ec2.AmazonLinuxCpuType.ARM_64
    });

    new ec2.Instance(this, 'EC2', {
      vpc: ExistVPC,
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T4G, ec2.InstanceSize.MICRO),
      machineImage: ami
    });
  }
}
