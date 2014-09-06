define(function() {

  function getUserAgent() {
    return window.navigator.userAgent.toLowerCase();
  }

  function isIos() {
    var ua = this.getUserAgent();

    return ua.indexOf('iphone') !== -1 ||
           ua.indexOf('ipad') !== -1 ||
           ua.indexOf('ipod') !== -1;
  }

  function isAndroid() {
    return this.getUserAgent().indexOf('android') !== -1;
  }

  function isWeb() {
    return !this.isIos() && !this.isAndroid();
  }

  function isOldIE() {
    // detects IE < 10
    var ua = this.getUserAgent();
    var match = ua.match(/msie (\d*)/);
    if ( match ) {
      var ver = parseInt(match[1], 10);
      if ( ver < 10) {
        return true;
      }
    }
    return false;
  }

  return {
    getUserAgent: getUserAgent,
    isAndroid: isAndroid,
    isIos: isIos,
    isWeb: isWeb,
    isOldIE: isOldIE
  };

});
