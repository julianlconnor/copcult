define([
  'shared/js/models/base',
  'shared/js/models/api/user'
], function(BaseModel, User) {

  var Payment = BaseModel.extend({
    parse: function(rsp) {
      var attrs = this._super(rsp) || {};
      if ( attrs.actor ) {
        attrs.actor = new User(attrs.actor, { parse: true });
      }

      if ( attrs.target ) {
        if ( attrs.target.user ) {
          attrs.target = new User(attrs.target.user, { parse: true });
        } else if ( attrs.target.email ) {
          attrs.target = new User({ email: attrs.target.email }, { parse: true });
        } else if ( attrs.target.phone ) {
          attrs.target = new User({ phone: attrs.target.phone }, { parse: true });
        } else {
          attrs.target = new User();
        }
      }
      return attrs;
    },


  });

  return Payment;

});

