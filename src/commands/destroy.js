const { Command } = require('@oclif/core');
const { CloudFormationClient, DeleteStackCommand } = require('@aws-sdk/client-cloudformation');
const deletePrompt = require('../prompts/deletePrompt');
const Conf  = require('conf');
const config = new Conf();
const errorHandler = require('../utils/errorHandler');
const ui = require('../utils/ui');

const removeInfraFromStore = (infraName) => {
  let infraArr = JSON.parse(config.get('INFRA_NAMES') || '[]');

  const newInfraArr = infraArr.filter(infraObj => infraObj.name !== infraName);
  config.set('INFRA_NAMES', JSON.stringify(newInfraArr));
}

class DestroyCommand extends Command {
  static description = 'Deletes all of your AWS infrastructure for your application';
  async run() {
    const confirmDelete = await deletePrompt();
    if (!confirmDelete || !confirmDelete.confirm) {
      console.log(ui.ask('Deletion cancelled'));
      this.exit(0);
    }

    const infra = confirmDelete.infra;
    const client = new CloudFormationClient({ region: infra.region });
    const command = new DeleteStackCommand({ StackName: infra.name });

    try {
      const response = await client.send(command);
      if (response.$metadata.httpStatusCode === 200) {
        const successMessage = "\nYour Bastion infrastructure deletion started \n" +
          "This will take a few minutes and you won't be able use bastion during this time \n" +
          "To see your if your admin dashboard is fully destroyed use 'bastion show' \n";
          ui.notify(successMessage);
        removeInfraFromStore(infra.name);
      }
    } catch(err) {
      errorHandler.handleDestroy(err);
    }
  }
}

module.exports = DestroyCommand;
