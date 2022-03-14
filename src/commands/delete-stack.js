const { Command } = require('@oclif/core');
const { CloudFormationClient, DeleteStackCommand } = require('@aws-sdk/client-cloudformation');
const deletePrompt = require('../prompts/deletePrompt');
const Conf  = require('conf');
const config = new Conf();

class DeleteStack extends Command {
  static description = 'Deletes all of your AWS infrastructure for your application';

  async run() {
    const confirmDelete = await deletePrompt();
    if (!confirmDelete) {
      console.log('Deletion cancelled');
      this.exit(0);
    }

    const name = config.get('NAME');
    const region =  config.get('REGION');
    const client = new CloudFormationClient({ region });
    const command = new DeleteStackCommand({ StackName: name });

    client.send(command, function(err, data) {
      if (err) {
        console.log(err, err.stack)
      } else {
        console.log(data)
        console.log('Beginning AWS stack deletion. This may take a few minutes');
        config.clear();
      }
    });
  }
}

module.exports = DeleteStack;