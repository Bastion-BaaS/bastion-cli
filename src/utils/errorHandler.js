const ui = require('./ui');

const handleDeploy = (err) => {
  if (err.Error?.Code === 'AlreadyExistsException') {
    ui.warn('You are trying to create a stack that already exists!');
  } else {
    ui.warn(err);
  }
};

const handleDestroy = (err) => {
  ui.warn(err.Error, true);
}

const handleShow = (err) => {
  console.log(ui.ask(err.Error));
}

module.exports = { handleDeploy, handleDestroy, handleShow };
