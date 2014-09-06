define([], function() {
  return function() {
    if ( window.location.hostname === 'betaweb.venmo.com' ) {
      return 'https://developer-api-staging.venmo.com';
    }
    return location.protocol + '//api.' + location.hostname;
  };
});
