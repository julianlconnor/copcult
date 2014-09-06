define([
  'shared/js/models/collections/base',
  'shared/js/models/api/payment'
], function(BaseCollection, Payment) {

  var Payments = BaseCollection.extend({
    model: Payment
  });

  return Payments;
});

