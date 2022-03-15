const { Command } = require('@oclif/core');
const { CloudFormationClient, DescribeStacksCommand } = require('@aws-sdk/client-cloudformation');
const Conf  = require('conf');
const config = new Conf();
const ui = require('../utils/ui');
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
    if (!appName) { return };

    const region = getRegion(appName);

    const client = new CloudFormationClient({ region: region });
    const command = new DescribeStacksCommand({ StackName: appName });
    let spinner;

    try {
      spinner = ui.runSpinner(ui.ask('Retrieving your stack status...'));
      const response = await client.send(command);
      const status = response.Stacks[0].StackStatus;

      if (status === 'CREATE_COMPLETE') {
        ui.notify('Your app is ready!');
        ui.notify(`Your DNS name is: ${getDNS(response)}`);
      } else {
        spinner.fail(console.log(ui.ask(`Not ready yet. Your AWS stack status: ${status}`)));
      }
    } catch(err) {
      errorHandler.handleShow(err);
    }
  }
}

module.exports = Show;
