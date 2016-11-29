// use babel-register to precompile ES6 syntax
require('babel-register')

const hook = require('css-modules-require-hook');

if ('browser' !== process.env.APP_ENV) {
  hook({
    extensions: ['.scss'],
    preprocessCss: data => {
      return data;
    }
  });
}

require('./server')
