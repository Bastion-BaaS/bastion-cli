const ora = require('ora');
const chalk = require('chalk');

const deployMsgFormat = chalk.blue;

const deployMsg = (message) => {
  return deployMsgFormat(message);
};

const runSpinner = (message) => {
  const spinner = ora(message);
  return spinner.start();
}

module.exports = { runSpinner, deployMsg };
