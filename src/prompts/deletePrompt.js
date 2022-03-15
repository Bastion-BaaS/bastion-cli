const inquirer = require('inquirer');
const chalk = require('chalk');
const Conf  = require('conf');
const config = new Conf();
const danger = chalk.hex('#800015').bold;

const getCurrentInfraNames = () => {
  let infraArr = JSON.parse(config.get('INFRA_NAMES') || '[]');
  return infraArr
}

const deletePrompt = async () => {
  let currentInfras = getCurrentInfraNames();
  if (currentInfras.length === 0) {
    const message = "It seems like you dont have any bastion infrastructure deployed"
    return;
  }

  let selection = currentInfras.map(infraObj => infraObj.name);

  let infraToDestroy = await inquirer.prompt([
    {
      name: 'name',
      message: 'Choose the bastion infrastructure you want to destroy:',
      type: 'list',
      choices: selection
    }
  ]);

  console.log(danger(`This will delete your entire app: ${infraToDestroy.name}`));
  const confirmMsg = danger('Are you absolutely sure you want to delete your app?)');

  let response = await inquirer.prompt([
    {
      name: 'confirm',
      message: confirmMsg,
      type: 'confirm',
      default: false
    }
  ]);

  const infra = currentInfras.find(infraObj => infraObj.name = infraToDestroy.name);
  return { confirm: response.confirm, infra };
};

module.exports = deletePrompt; 
