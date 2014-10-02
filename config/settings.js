/*
* Lazily loads settings depending on the environment.
*/
var _ = require('lodash');
var constants = require('./constants');

var settings = function() {
  var settingsObject;
  var env = process.env.NODE_ENV.toLowerCase();

  if ( env !== 'development' &&
       env !== 'staging' &&
       env !== 'production' ) {
    throw new Error('NODE_ENV was not provided. Unable to provide settings.');
  }

  settingsObject = require('./settings/' + env);
  if ( !settingsObject ) {
    throw new Error('Unable to find settings file with current NODE_ENV:' + env);
  }

  return _.extend({
    onDev: function() {
      return env === 'development';
    },
    onStaging: function() {
      return env === 'staging';
    },
    onProduction: function() {
      return env === 'production';
    }
  }, constants, settingsObject);
};

module.exports = settings;
