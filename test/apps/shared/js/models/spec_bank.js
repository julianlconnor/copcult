define([
  'jquery',
  'expect',
  'sinon',
  'shared/js/models/bank',
  'base/test/fixtures/bank.js',
], function($, expect, sinon, BankModel, bankFixtures) {

  describe('Bank Model', function() {
    var bank;

    beforeEach(function() {
      bank = new BankModel();
    });

    it('instantiates', function() {
      expect(bank).to.be.ok();
    });

    it('validates a valid fixture', function() {
      bank.set(bankFixtures.valid);
      bank.validate();
      expect(bank.isValid()).to.be(true);
    });

  });

});
