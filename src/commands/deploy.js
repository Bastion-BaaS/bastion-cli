const { Command } = require('@oclif/core');
const { CloudFormationClient, CreateStackCommand } = require('@aws-sdk/client-cloudformation');
const fs = require('fs');
const getAppInfo = require('../prompts/getAppInfo');
const Conf  = require('conf');
const config = new Conf();
const path = require("path");
const template = fs.readFileSync(path.resolve(__dirname, '../utils/bastion.yaml'), 'utf8');
const errorHandler = require('../utils/errorHandler');
const ui = require('../utils/ui');
const credentials = require('../utils/credentials');

const storeInfraName = (infraObj) => {
  let infraArr = JSON.parse(config.get('INFRA_NAMES') || '[]');

  infraArr.push(infraObj);
  config.set('INFRA_NAMES', JSON.stringify(infraArr));
};

class DeployCommand extends Command {
  static description = 'Create AWS infrastructure for your app';

  async run() {
    const { name, region, domain, zone, username } = await getAppInfo();
    const password = credentials.generatePassword();
    const client = new CloudFormationClient({ region });

    const params = {
      StackName: name,
      Parameters: [
        {
          ParameterKey: "Region",
          ParameterValue: region
        },
        {
          ParameterKey: "InfraName",
          ParameterValue: name
        },
        {
          ParameterKey: "AdminAppDomain",
          ParameterValue: domain
        },
        {
          ParameterKey: "AdminHostedZoneId",
          ParameterValue: zone
        },
        {
          ParameterKey: "AdminUsername",
          ParameterValue: username
        },
        {
          ParameterKey: "AdminPassword",
          ParameterValue: password
        }
      ],
      TemplateBody: template,
      Capabilities: ['CAPABILITY_NAMED_IAM']
    };
    const command = new CreateStackCommand(params);

    try {
      const response = await client.send(command);
      if (response.$metadata.httpStatusCode === 200) {
        const successMessage = "\nYour Bastion infrastructure creation started \n" +
          "This will take a few minutes or half an hour \n" +
          "To see your if your admin dashboard is ready use 'bastion show' \n\n";
        ui.notify(successMessage);
        storeInfraName({ name, region, username, password });
        credentials.show(name);
      }
    } catch(err) {
      errorHandler.handleDeploy(err);
    }
  }
}

module.exports = DeployCommand;
