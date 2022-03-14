const inquirer = require('inquirer');
const chalk = require('chalk');
const Conf  = require('conf');
const config = new Conf();

const danger = chalk.hex('#800015').bold;

const deletePrompt = async () => {
  console.log(danger(`This will delete your entire app: ${config.get('NAME')}`));

  const confirmMsg = danger('Are you absolutely sure you want to delete your app?)');

  let response = await inquirer.prompt([
    {
      name: 'confirm',
      message: confirmMsg,
      type: 'confirm',
      default: false
    }
  ]);

  return response.confirm;
};

module.exports = deletePrompt; 