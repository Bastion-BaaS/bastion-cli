const ui = require('./ui');

const handleDeploy = (err) => {
  if (err.Error.Code === 'AlreadyExistsException') {
    ui.warn('You are trying to create a stack that already exists!');
  }
};

const handleDestroy = (err) => {
  ui.warn(err.Error, true);
}

module.exports = { handleDeploy, handleDestroy };
