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

#### Backend installation

To install postgres on your machine

```
$ sudo apt-get update
$ sudo apt-get install postgresql postgresql-contrib
```

Run the baseline db script to initialise database schema

```
sudo -u postgres psql -f ./db/baseline.sql
```



