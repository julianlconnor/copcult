define([
  'shared/js/models/base',
  'shared/js/models/payment',
], function(BaseModel, PaymentModel) {

  var ClaimModel = BaseModel.extend({

    urlRoot: '/api/v5/claims',

    url: function() {
      return this.urlRoot + '/' + this.get('id') + '/' + this.get('key');
    },

    parse: function(response) {
      var data = response.data;

      this.payment = new PaymentModel(data.story);

      if ( data.cashout_info ) {
        data.nextBusinessDay = data.cashout_info.next_business_day;
        data.bankName = data.cashout_info.bank_name;
      }

      data.statusCode = data.status_code;
      delete data.status_code;

      delete data.cashout_info;

      return data;
    },

    hydrated: function() {
      return this.has('story');
    },

    verificationRoute: function() {
      var type = !!this.payment.get('target').phone ? 'phone' : 'email';
      return 'verify-' + type;
    },

    isClaimed: function() {
      return !!this.get('claimed');
    }

  });

  return ClaimModel;

});
