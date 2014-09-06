define([
  'underscore',
  'shared/js/models/base',
  'shared/js/helpers/regex'
], function(_, BaseModel, regex) {
  var SettingsModel = BaseModel.extend({

    url: '/api/v5/',

    validation: {
      firstName: {
        required: true,
        pattern: regex.name
      },
      lastName: {
        required: true,
        pattern: regex.name
      },
      zipcode: {
        required: true,
        pattern: regex.zipcode
      }
    },

    initialize: function( attributes, options ) {
      if ( ! options.user ) { throw new Error("You must provide a user"); }

      var user = options.user;

      this.set(_.extend({}, user.attributes));

    }

  });

  return SettingsModel;
});
