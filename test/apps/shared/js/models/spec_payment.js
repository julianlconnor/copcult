define([
  'expect',
  'sinon',
  'shared/js/models/payment',
], function(expect, sinon, PaymentModel) {

  describe('Payment Model', function() {
    it('instantiates', function() {
      expect(new PaymentModel()).to.be.ok();
    });

    it('returns formatted time ago', function() {
      var paymentModel = new PaymentModel({ timestamp: (new Date()).getTime() });
      expect(paymentModel.getTimeAgo()).to.be('1m');
    });

    it('appends timeAgo to toJSON response', function() {
      var paymentModel = new PaymentModel({ timestamp: (new Date()).getTime() });
      expect(paymentModel.toJSON().timeAgo).to.be.ok();
    });

  });

});
