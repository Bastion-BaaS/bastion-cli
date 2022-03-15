const { Command } = require('@oclif/core');
const Conf  = require('conf');
const config = new Conf();
const ui = require('../utils/ui');

class ConfigCommand extends Command {
  static description = 'Show config file location';

  async run() {
    ui.notify(`Location of your configuration file is:\n ${ui.ask(config.path)}\n`);
  }
}

module.exports = ConfigCommand;
