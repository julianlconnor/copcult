define([], function() {
  return {
    /**
     * Validate (US) phone numbers like we do on the server
     * https://github.braintreeps.com/venmo/venmo-platform/blob/master/lib/utils.py#L732
     *
     * @param {String} phone - a phone number
     * @returns {Boolean}
     **/
    isValidPhone: function(phone) {
      if ( typeof phone === 'string' || phone instanceof String ) {
        // remove all non-digit characters and check length
        phone = phone.replace(/\D/g, '');
        return phone.length === 10 || phone.length === 11;
      } else {
        return false;
      }
    }

  };
});
