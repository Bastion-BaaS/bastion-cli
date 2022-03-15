const inquirer = require('inquirer');
const Conf  = require('conf');
const ui = require('../utils/ui');
const config = new Conf();

const getCurrentInfraNames = () => {
  let infraArr = JSON.parse(config.get('INFRA_NAMES') || '[]');
  return infraArr
}

const deletePrompt = async () => {
  let currentInfras = getCurrentInfraNames();
  if (currentInfras.length === 0) {
    const message = "It seems like you dont have any Bastion infrastructure deployed";
    ui.warn(message);
    return;
  }

  let selection = currentInfras.map(infraObj => infraObj.name);

  let infraToDestroy = await inquirer.prompt([
    {
      name: 'name',
      message: 'Choose the Bastion infrastructure you want to destroy:',
      type: 'list',
      choices: selection
    }
  ]);

  ui.warn(`This will delete your entire app: ${infraToDestroy.name}`);
  const confirmMsg = ui.warn('Are you absolutely sure you want to delete your app?', false);

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
