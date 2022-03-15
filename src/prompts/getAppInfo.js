const inquirer = require('inquirer');
const chalk = require('chalk');
const Conf  = require('conf');
const config = new Conf();

const infraNameValidator = async (input) => {
  return /[A-Z]/.test(input)
}

const getAppInfo = async () => {
  console.log(chalk.cyan('Welcome to the Bastion CLI!'));

  let response = await inquirer.prompt([
    {
      name: 'name',
      message: 'Choose a name for your infrastructure:',
      type: 'input',
      default: 'BastionInitial',
      validate: infraNameValidator
    },
    {
      name: 'region',
      message: 'Select the region for your Bastion app:',
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
