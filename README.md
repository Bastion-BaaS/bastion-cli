<p align="center">
  <img src="Bastion_logo.png" width="400" height="400" />
</p>

<h1>Bastion: A self-hosted Backend-as-a-Service deployed using AWS</h1>
Bastion abstracts away the process of creating and maintaining a backend so you don’t have to. It allows you to utilize all the benefits of AWS while giving you complete control over your data and infrastructure. If you would like to know more, read our [CASE_STUDY_LINK].

---
<br>
<h2 align="center">Bastion CLI deploys the infrastructure that your Bastion Instances run on</h2>

### Usage

```sh-session
$ npm install -g bastion-cli
$ bastion <COMMAND>
running command...
$ bastion (-v|--version|version)

bastion-cli/0.1.0 darwin-arm64 node-v16.13.0

$ bastion --help [COMMAND]
USAGE
  $ bastion COMMAND
...
```

# Prerequisites
- AWS Account
- AWS CLI configured with your AWS Account credentials
- Node and NPM installed on your local machine

# Getting Started
- Make sure you have installed the AWS CLI and have given it your AWS credentials
- To install: `npm install -g bastion-baas-cli`
- Run `bastion deploy` and give it a name and region when prompted. This will provision your initial AWS infrastructure so you can begin creating Bastion instances for your backend.

### To integrate your frontend with Bastion backend:
- 

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
- The region you will be deploying your infrastructure to
    - You will be given a list of AWS regions to choose from
    - Default is `us-east-1`

`bastion deploy` can take up to 30 minutes to provision all of your infrastructure. To check the status of your stack, you can use `bastion show`.

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

Displays help for Bastion CLI commands

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

Displays the status of a stack you have created with `bastion deploy`. It tells you if your infrastructure is ready and if so, gives you a DNS name. You will be prompted for the name of the stack you would like to check the status of.
