define(function() {
  /**
  * Simple module that our client code can use in order to be aware of
  * what env we're running in.
  */

  var host = window.location.host;

  var devHost = 'http://dev.venmo.com/';
  var stagingHost = 'https://betaweb.venmo.com/';
  var productionHost = 'https://venmo.com/';

  return {
    onDev: /^dev.venmo.com/.test(host),
    onStaging: /^betaweb.venmo.com/.test(host),
    onProduction: /^venmo.com/.test(host),

    devHost: devHost,
    stagingHost: stagingHost,
    productionHost: productionHost
  };

});
