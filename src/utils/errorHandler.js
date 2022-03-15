const handleDeploy = (err) => {
  if (err.Error.Code === 'AlreadyExistsException') {
    console.log('You are trying to create a stack that already exists!');
  }
};

const handleDestroy = (err) => {
  console.log(err.Error);
}

module.exports = { handleDeploy, handleDestroy };
