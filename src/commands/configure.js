const {Command} = require('@oclif/core')
const inquirer = require('inquirer');
const Conf  = require('conf')
const config = new Conf();

class ConfigureCommand extends Command {
  async run() {
    console.log('testing')

    let response = await inquirer
      .prompt([
        {
          name: 'userAccessKey',
          message: 'provide us an access key:'
        }
      ])

    this.log(`your access key is recorded`)
    config.set('USER_KEY', String(response.userAccessKey))
    const dummyAPIKey = '123123123123'
    config.set('API_KEY', dummyAPIKey)
    this.log(`Your dummy API key is ${dummyAPIKey} please keep is safe.`)
  }
}

ConfigureCommand.description = 'description of this example command'

module.exports = ConfigureCommand
