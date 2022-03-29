const ora = require('ora');
const chalk = require('chalk');
const { logo } = require('./logo');

const logoColors = {
  ';': '#3350DE', // Bright Blue
  '.': '#3350DE', // Bright Blue
  'l': '#F85523', // Tomato
  'c': '#F85523', // Tomato
};

const white2 = chalk.hex('#FFFFFF');
const blueRYBBold = chalk.hex('#3350DE').bold;
const redOrangeBold = chalk.hex('#F85523').bold;
const tomatoBold = chalk.hex('#F46C51').bold;

// Unused colors
// const midnightBlue = chalk.hex('#0B1D74');
// const white2Bold = chalk.hex('#FFFFFF').bold;
// const blueRYB = chalk.hex('#3350DE');
// const redOrange = chalk.hex('#F85523');
// const bdazzledBlue = chalk.hex('#485C87');
// const cornflowerBlue = chalk.hex('#7B9EFF');
// const tomato = chalk.hex('#F46C51');

const notify = (message) => {
  console.log(blueRYBBold(message));
};

const runSpinner = (message) => {
  const spinner = ora(message);
  return spinner.start();
};

const printLogo = () => {
  let coloredLogo = '';
  for (let i = 0; i < logo.length; i++) {
    const char = logo[i];
    if (char !== ' ') {
      let charColor = logoColors[char] || '#485C87';
      coloredLogo += chalk.hex(charColor)(char);
    } else {
      coloredLogo += char
    }
  }
  console.log(coloredLogo);
};

const warn = (text, log=true) => {
  if (log) {
    console.log(redOrangeBold(text));
  } else {
    return redOrangeBold(text);
  }
};

const printWelcome = () => {
  console.log(tomatoBold("Welcome to Bastion-CLI!\n"));
  const welcomeMessage = "This tool will provision the infrastructure that your Bastion instances will run on.\n\n" +
    "To make this possible, please make sure you have an authenticated AWS CLI.\n"
  console.log(white2(welcomeMessage));
};

const ask = (text) => {
  return white2(text);
};

module.exports = { runSpinner, notify, printLogo, printWelcome, ask, warn };
