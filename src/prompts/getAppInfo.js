const inquirer = require('inquirer');
const ui = require('../utils/ui');
const chalk = require('chalk');

const infraNameValidator = async (input) => {
  return /[A-Za-z]/.test(input);
}

const getAppInfo = async () => {
  ui.printLogo();
  ui.printWelcome();

  let response = await inquirer.prompt([
    {
      name: 'name',
      message: ui.ask('What name do you want to give your Bastion infrastructure?'),
      type: 'input',
      default: 'BastionInitial',
      validate: infraNameValidator
    },
    {
      name: 'region',
      message: ui.ask('In which AWS region do you want to deploy your infrastructure?'),
      type: 'list',
      choices: [
        'us-east-1',
        'us-east-2',
        'us-west-1',
        'us-west-2',
        'eu-west-1',
        'eu-west-2',
        'eu-west-3',
        'eu-central-1',
        'eu-central-2',
        'ap-southeast-1',
        'ap-southeast-2',
      ],
      default: 'us-east-1',
    }
  ]);

  return response;
};

module.exports = getAppInfo; 
