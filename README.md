patron4change
======================================

## Introduction

ASE 2016/17 project. A platform for supporting non-profit personal projects and commitment.

## How to run

```
$ npm i
$ npm start
```

Then visit `localhost:3000`. For development it is recommended to run

```
$ npm i -g nodemon
$ npm run watch
```

for automatic watch and restart of the entire application.

To check code style use

```
$ npm run checkstyle
```

### Upgrade Notes

- It is highly recommended to always __remove__ `node_modules` and reinstall everything to avoid any possible issues

### Configuration

Configuration files for each environment can be found in the `config` directory.
The `default.yml` file contains all parameters. All other configuration files can override these parameters.
The `$NODE_ENV` environment variable is considered when selecting the configuration file for the current environment.

Create a `local.yml` file for any local configuration you might need.

Further information can be found here: https://www.npmjs.com/package/config
