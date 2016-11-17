const NODE_ENV = process.env.NODE_ENV;
const dotenv = require('dotenv');

const webpack = require('webpack');
const fs      = require('fs');
const path    = require('path'),
      join    = path.join,
      resolve = path.resolve;

const getConfig = require('hjs-webpack');

const isDev  = NODE_ENV === 'development';
const isTest = NODE_ENV === 'test';

const root    = resolve(__dirname);
const src     = join(root, 'src');
const modules = join(root, 'node_modules');
const dest    = join(root, 'dist');

var config = getConfig({
  isDev: isDev,
  in: join(src, 'index.js'),
  out: dest,
  html: function (context) {
    return {
      'index.html': context.defaultTemplate({
        title: 'auth0 React Sample',
        publicPath: isDev ? 'http://localhost:3000/' : '',
        meta: {
          'name': 'My Library',
          'description': 'A reactJS app for making library of programming languages and paradigms'
        },
        html: '<div id="root"></div>'
      })
    }
  }
});

// ENV variables
const dotEnvVars = dotenv.config();
const environmentEnv = dotenv.config({
  path: join(root, 'config', `${NODE_ENV}.config.js`),
  silent: true,
});
const envVariables =
    Object.assign({}, dotEnvVars, environmentEnv);

const defines =
  Object.keys(envVariables)
  .reduce((memo, key) => {
    const val = JSON.stringify(envVariables[key]);
    memo[`__${key.toUpperCase()}__`] = val;
    return memo;
  }, {
    __NODE_ENV__: JSON.stringify(NODE_ENV)
  });

config.plugins = [
  new webpack.DefinePlugin(defines)
].concat(config.plugins);
// END ENV variables

// CSS modules

// END postcss

// Roots
config.resolve.root = [src, modules]
// config.resolve.alias = {
// //  'css': join(src, 'styles'),
//   'components': join(src, 'components'),
//   'utils': join(src, 'utils'),
//
// //  'styles': join(src, 'styles')
// }
// end Roots

// Testing
if (isTest) {
  config.externals = {
    'react/addons': true,
    'react/lib/ReactContext': true,
    'react/lib/ExecutionEnvironment': true,
  }
  config.module.noParse = /[/\\]sinon\.js/;
  config.resolve.alias['sinon'] = 'sinon/pkg/sinon';

  config.plugins = config.plugins.filter(p => {
    const name = p.constructor.toString();
    const fnName = name.match(/^function (.*)\((.*\))/)

    const idx = [
      'DedupePlugin',
      'UglifyJsPlugin'
    ].indexOf(fnName[1]);
    return idx < 0;
  })
}
// End Testing

module.exports = config;
