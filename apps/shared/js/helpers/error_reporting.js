define([
], function() {
  function reportXHRError(method, url, jqXHR) {
    // if Raven has yet to load, sob silently.
    if ( !window.Raven ) { return; }

    var ravenError = jqXHR.status + '|' + jqXHR.statusText + '|' + method + '|' + url;
    window.Raven.captureMessage(ravenError, { extra: jqXHR });
  }
  return {
    reportXHRError: reportXHRError
  };
});
