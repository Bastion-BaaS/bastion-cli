const {Command} = require('@oclif/core')
const inquirer = require('inquirer');

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

    this.log(`you entered: ${response.yourName}`)
  }
}

TestCommand.description = 'description of this example command'

module.exports = TestCommand
