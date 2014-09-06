define([
  'q'
], function(q) {
  /*
  * We return a promise that will resolve when the global
  * FB object is loaded.
  *
  * This prevents 'window.FB is undefined' errors if the
  * FB script takes a longer time to load than our
  * production bundle.
  */
  var dfd = q.defer();

  if ( window.FB ) {
    dfd.resolve(window.FB);
  } else {
    window.fbAsyncInit = function() {
      dfd.resolve(window.FB);
    };
  }

  return dfd.promise;
});
