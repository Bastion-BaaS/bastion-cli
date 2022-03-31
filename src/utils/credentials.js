const crypto = require('crypto');
const Conf  = require('conf');
const config = new Conf();
const ui = require('../utils/ui');

const generatePassword = () => {
  return crypto.randomBytes(10).toString('hex').toLowerCase();
};

const show = (name) => {
  const infraArr = JSON.parse(config.get('INFRA_NAMES') || '[]');
  const currentInfra = infraArr.find(infra => infra.name === name);
  ui.logCredentials(currentInfra.username, currentInfra.password);
}


module.exports = { generatePassword, show };
