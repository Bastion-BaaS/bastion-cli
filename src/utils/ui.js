const ora = require('ora');
const chalk = require('chalk');
const { logo } = require('./logo');

// for future use
// const lightPurple = chalk.hex('#7B44FF');
// const darkBlue = chalk.hex('#4158D9');
const lightPurpleBold = chalk.hex('#7B44FF').bold;
const lightBlue = chalk.hex('#5241FF');
const lightBlueBold = chalk.hex('#5241FF').bold;
const white = chalk.hex('#F2F2F2');
const white2 = chalk.hex('#EBEBF2');
const red = chalk.hex('##F21313').bold;

const notify = (message) => {
  console.log(lightBlueBold(message));
};

const runSpinner = (message) => {
  const spinner = ora(message);
  return spinner.start();
};

const printLogo = () => {
  console.log(lightBlue(logo));
};

const warn = (text, log=true) => {
  if (log) {
    console.log(red(text));
  } else {
    return red(text);
  }
};

const printWelcome = () => {
  console.log(lightPurpleBold("Welcome to Bastion-CLI!\n"));
  const welcomeMessage = "This tool will provision the infrastructure that your Bastion instances will run on.\n\n" +
    "To make this possible, please make sure you have an authenticated AWS CLI.\n"
  console.log(white(welcomeMessage));
};

const ask = (text) => {
  return white2(text);
};

module.exports = { runSpinner, notify, printLogo, printWelcome, ask, warn };
