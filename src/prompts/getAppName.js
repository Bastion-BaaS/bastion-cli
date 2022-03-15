const inquirer = require('inquirer');
const Conf  = require('conf');
const config = new Conf();

const infraArr = JSON.parse(config.get('INFRA_NAMES') || '[]');

const getAppName = async () => {
  if (infraArr.length === 0) {
    console.log("It seems like you don't have any bastion infrastructure deployed");
    return;
  }

  let response = await inquirer.prompt([
    {
      name: 'appName',
      message: 'Select the app you want to check the status of:',
      type: 'list',
      choices: infraArr,
    }
  ]);

  return response.appName;
};

module.exports = getAppName; 