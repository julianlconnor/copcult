define([
  'shared/js/helpers/env',
  'shared/js/helpers/constants'
], function(env, constants) {

  return {
    imagePath: function(imageName) {
      var url;

      if ( env.onDev ) {
        url = env.devHost + 'w/build/images/' + imageName;
      } else if ( env.onStaging ) {
        url = env.stagingHost + 'w/build/images' + imageName;
      } else {
        /**
        * Production.
        */
        url = constants.CDN_URL + imageName;
      }

      return url;
    },

  };

});
