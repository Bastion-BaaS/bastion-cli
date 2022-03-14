const inquirer = require('inquirer');
const chalk = require('chalk');
const Conf  = require('conf');
const config = new Conf();

const getAppInfo = async () => {
  console.log(chalk.cyan('Welcome to the Bastion CLI!'));

  // We can change/add input choices later
  let response = await inquirer.prompt([
    {
      name: 'name',
      message: 'Choose your app name:',
      type: 'input',
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
      ],
      default: 'us-east-1',
    },
    {
      name: 'az',
      message: 'Select your availability zone:',
      type: 'list',
      default: 'us-east-1c',
      choices: [
        'us-east-1a',
        'us-east-1b',
        'us-east-1c',
        'us-east-1d',
      ]
    }
  ]);

  config.set('NAME', response.name);
  config.set('REGION', response.region);

  return response;
};

module.exports = getAppInfo; 
