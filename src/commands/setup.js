const AWS = require('@aws-sdk/client-cloudformation');
const fs = require('fs');
const prompts = require('../prompts');

const setup = async () => {
  const { name, region, az } = await prompts.start();

  // if we want to save any parameters to a config file:
  // const json = JSON.stringify({region, name, az});
  // fs.writeFileSync('../config.json', json, 'utf8');

  const cloudformation = new AWS.CloudFormationClient({ region });
  const template = fs.readFileSync('./src/utils/bastion.yaml', 'utf8');

  const params = {
    StackName: name,
    Parameters: [
      {
        ParameterKey: "Region",
        ParameterValue: region
      },
      {
        ParameterKey: "VpcAz",
        ParameterValue: az
      }
    ],
    TemplateBody: template,
    Capabilities: ['CAPABILITY_NAMED_IAM']
  };

  cloudformation.createStack(params, function(err, data) {
    if (err) console.log(err, err.stack);
    else     console.log(data);
  });
}

module.exports = setup;
