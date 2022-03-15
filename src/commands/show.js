const { Command } = require('@oclif/core');
const { CloudFormationClient, DescribeStacksCommand } = require('@aws-sdk/client-cloudformation');
const Conf  = require('conf');
const config = new Conf();
const errorHandler = require('../utils/errorHandler');
const getAppName = require('../prompts/getAppName');

const getRegion = (name) => {
  return JSON.parse(config.get('INFRA_NAMES'))
    .filter(infra => infra.name === name)[0]
    .region;
};

const getDNS = (response) => {
  return response.Stacks[0].Outputs
    .filter(outputObj => outputObj.OutputKey === 'ALBDomain')[0]
    .OutputValue;
}

class Show extends Command {
  static description = 'Show the status of your Bastion application';

  async run() {
    const appName = await getAppName();
    const region = getRegion(appName);

    const client = new CloudFormationClient({ region: region });
    const command = new DescribeStacksCommand({ StackName: appName });

    try {
      const response = await client.send(command);
      const status = response.Stacks[0].StackStatus;

      if (status === 'CREATE_COMPLETE') {
        console.log('Your app is ready!');
        console.log(`Your DNS name is: ${getDNS(response)}`);
      } else {
        console.log(`Not ready yet. Your AWS stack status: ${status}`);
      }
    } catch(err) {
      errorHandler.handleShow(err);
    }
  }
}

module.exports = Show;
