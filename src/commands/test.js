const {Command} = require('@oclif/core')
const inquirer = require('inquirer');
const Conf = require('conf');
const config = new Conf();

class TestCommand extends Command {
  async run() {
    console.log('testing')

    let response = await inquirer
      .prompt([
        {
          name: 'yourName',
          message: 'What is your name?'
        }
      ])

    const potentialAPIKey = config.get('API_KEY')
    const currentUserKey = config.get('USER_KEY')

    this.log(`you entered: ${response.yourName} and maybe your api key? ${potentialAPIKey} and your user key: ${currentUserKey}`)
  }
}

TestCommand.description = 'description of this example command'

module.exports = TestCommand
