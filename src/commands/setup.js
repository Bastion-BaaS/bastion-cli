const { Command } = require('@oclif/core');
const { CloudFormationClient, CreateStackCommand } = require('@aws-sdk/client-cloudformation');
const fs = require('fs');
const getAppInfo = require('../prompts/getAppInfo');

class Setup extends Command {
  static description = 'Create AWS infrastructure for your app';

  async run() {
    const { name, region, az } = await getAppInfo();

    // if we want to save any parameters to a config file:
    // const json = JSON.stringify({region, name, az});
    // fs.writeFileSync('../config.json', json, 'utf8');

    const client = new CloudFormationClient({ region });
    const template = fs.readFileSync('./src/utils/bastion.yaml', 'utf8');

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
      else     console.log(data);
    });
  }
}

module.exports = Setup;