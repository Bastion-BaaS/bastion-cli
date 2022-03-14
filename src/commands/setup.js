const { Command } = require('@oclif/core');
const { CloudFormationClient, CreateStackCommand, DescribeStacksCommand } = require('@aws-sdk/client-cloudformation');
const fs = require('fs');
const getAppInfo = require('../prompts/getAppInfo');
const Conf  = require('conf');
const config = new Conf();

// eventually move this function to different file
const stackUpdate = async (client, StackName) => {
  console.log('Beginning AWS stack creation. This may take a few minutes');
  let currentState = '';

  while(currentState !== 'CREATE_COMPLETE') {
    await new Promise(_ => setTimeout(_, 5000));

    const response = await client.send(new DescribeStacksCommand({ StackName }));
    currentState = response.Stacks[0].StackStatus;
  }

  console.log('Successfully created your AWS stack!');
}

class Setup extends Command {
  static description = 'Create AWS infrastructure for your app';

  async run() {
    const { name, region, az } = await getAppInfo();

    // if we want to save any parameters to a config file:
    // const json = JSON.stringify({region, name, az});
    // fs.writeFileSync('../config.json', json, 'utf8');

    const client = new CloudFormationClient({ region });
    const template = fs.readFileSync('./src/utils/testingTemplate.yaml', 'utf8');

    const params = {
      StackName: name,
      Parameters: [
        {
          ParameterKey: "Region",
          ParameterValue: region
        },
        {
          ParameterKey: "VpcAz",
          ParameterValue: az
        }
      ],
      TemplateBody: template,
      Capabilities: ['CAPABILITY_NAMED_IAM']
    };

    const command = new CreateStackCommand(params);

    client.send(command, function(err, data) {
      if (err) console.log(err, err.stack);
      // else     console.log(data);
    });

    await stackUpdate(client, name);
  }
}

module.exports = Setup;