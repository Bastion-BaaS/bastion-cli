<p align="center">
  <img src="Bastion_logo.png" width="400" height="400" />
</p>

![shields.io npm version badge](https://img.shields.io/npm/v/bastion-baas-cli)
![shields.io npm license badge](https://img.shields.io/npm/l/bastion-baas-cli)
![shields.io custom website link badge](https://img.shields.io/static/v1?label=website&message=bastion.github.io&color=blue)

<h1>A self-hosted Backend-as-a-Service deployed using AWS</h1>
Bastion abstracts away the process of creating and maintaining a backend so you don’t have to. It allows you to utilize all the benefits of AWS while giving you complete control over your data and infrastructure. If you would like to know more, read our <a href="https://bastion-baas.github.io/case-study">case study</a>.

---
<br>
<h2 align="center">Bastion CLI deploys the infrastructure that your Bastion Instances run on</h2>

### Usage

```sh-session
$ npm install -g bastion-baas-cli
$ bastion <COMMAND>
running command...
$ bastion (-v|--version|version)

bastion-baas-cli/0.1.5 darwin-arm64 node-v16.13.0

$ bastion --help [COMMAND]
USAGE
  $ bastion COMMAND
...
```

# Prerequisites
- AWS Account
- AWS CLI configured with your AWS Account credentials
- Node and NPM installed on your local machine
- Domain name that you own

# Getting Started
- Make sure you have installed the AWS CLI and have given it your AWS credentials
- To install: `npm install -g bastion-baas-cli`
- Run `bastion deploy` and follow the cli prompts. This will provision your initial AWS infrastructure so you can begin creating Bastion instances for your backend
  - Once deployed, you will be given the username and password to login to the admin application

### To integrate your frontend with Bastion backend:
- Login to your admin app with the credentials provided by the cli
- Create an instance and give it a name. This will become the backend for your frontend application
- Use the API key provided to connect your backend to your frontend with the Bastion SDK
- You can view usage of the Bastion SDK here: https://github.com/Bastion-BaaS/bastion-sdk

### Uninstall:
- To uninstall: `npm uninstall -g bastion-baas-cli` (does not remove your AWS infrastructure)


# Commands

- `bastion deploy`
- `bastion destroy`
- `bastion help [COMMAND]`
- `bastion config`
- `bastion show`

<br>


## `bastion deploy`
Deploys the initial AWS infrastructure that your Bastion instances will run on. The name must be different from any other AWS infrastructure stack you have created. You will be prompted for the following information:
- Name to give to your Bastion infrastructure
    - Default is `BastionInitial`
- The AWS region you will be deploying your infrastructure to
    - You will be given a list of AWS regions to choose from
    - Default is `us-east-1`
- The name of the domain that you would like to use for Bastion. This must be a domain you own
- The hosted zone ID of your Route 53 domain. You can find this in Route 53 in your AWS console
- The username that you would like to use to login to the Admin App. This can be whatever you like

`bastion deploy` can take up to 30 minutes to provision all of your infrastructure in AWS. To check the status of your stack, you can use `bastion show`. Your infrastructure will be accessible at the domain that you provided once the AWS resources have been deployed.

<br>
 

## `bastion destroy`

Destroys all of the AWS infrastructure for the name of the stack you provided in `bastion deploy`. It also removes the infrastructure related to that application in your local configuration file. To see where your configuration file lives, enter `bastion config`.

Upon entering this command you will be prompted for the following information:

- The name of the AWS infrastructure stack you want to delete from a list of dropdown options
- A confirmation message asking if you are sure you want to delete your infrastructure

`bastion destroy` can take a few minutes to fully complete. 

If you use `bastion destroy` before `bastion deploy` has fully provisioned your infrastructure, it will still succeed in destroying your stack resources.

<br>


## `bastion help [COMMAND]`

Displays help for Bastion CLI commands.

```
USAGE
  $ bastion help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

<br>


## `bastion config`

Shows the location of your local configuration file. This file contains the names and AWS regions of your infrastructure stacks. The stack name specified on `bastion destroy` removes the corresponding name/region combination from this file.  

<br>


## `bastion show`

Displays the status of a stack you have created with `bastion deploy`. It tells you if your infrastructure is ready and if so, gives you your username, password, and the domain you can find your admin app at. You will be prompted for the name of the stack you would like to check the status of.
