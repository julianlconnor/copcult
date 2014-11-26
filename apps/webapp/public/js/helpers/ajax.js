var Promise = require('bluebird');
var $ = require('jquery');

function ajax(settings) {

  function addToData(key, val) {
    if ( settings.data === null || typeof settings.data !== 'object' ) {
      settings.data = {};
    }
    settings.data[key] = val;
  }

  addToData('userId', window.jaded.user.id);

  return Promise.resolve($.ajax(settings)).then(null, function(err) {
    /**
    * Plug in error handler over here.
    */
    throw err;
  });
}

module.exports = ajax;
