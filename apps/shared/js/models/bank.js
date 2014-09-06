define([
  'underscore',
  'shared/js/models/base',
  'shared/js/helpers/regex'
], function(_, BaseModel, regex) {
  var BankModel = BaseModel.extend({

    url: '/api/v5/bankaccounts',

    defaults : {
      account_type : 'checking',
      entity_type : 'personal',
      type: 'bank_account'
    },

    validation: {

      routingNumber: {
        required: true,
        pattern: regex.routingNumber
      },

      accountNumber: {
        required: true,
        pattern: regex.accountNumber
      },

      accountNumberConfirm: {
        required: true,
        equalTo: 'accountNumber'
      }

    }

  });

  return BankModel;
});
