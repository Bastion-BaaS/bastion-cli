const inquirer = require('inquirer');
const Conf  = require('conf');
const ui = require('../utils/ui');
const config = new Conf();

const infraArr = JSON.parse(config.get('INFRA_NAMES') || '[]');

const getAppName = async () => {
  if (infraArr.length === 0) {
    ui.warn("It seems like you don't have any bastion infrastructure deployed");
    return;
  }

  let response = await inquirer.prompt([
    {
      name: 'appName',
      message: ui.ask('Select the app you want to check the status of:'),
      type: 'list',
      choices: infraArr,
    }
  ]);

  return response.appName;
};

module.exports = getAppName; 
