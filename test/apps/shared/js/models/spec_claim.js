define(['expect',
        'sinon',
        'claims/public/js/models/claim',
        'base/test/fixtures/claim.js'],
        function(expect, sinon, ClaimModel, claimFixtures) {

  describe('Claim Model', function() {
    var claim;
    
    beforeEach(function() {
      claim = new ClaimModel();
    });

    it('instantiates', function() {
      expect(claim).to.be.ok();
    });

    it('creates a payment and user during parse', function() {
      var fixture = claimFixtures.valid.data;
      claim.parse(claimFixtures.valid);

      expect(claim.payment.get('note')).to.be(fixture.story.note);
      expect(claim.payment.get('amount')).to.be(fixture.story.amount);
    });

    it('knows whether or not it is hydrated', function() {
      expect(claim.hydrated()).to.be(false);
      claim.set(claim.parse(claimFixtures.valid));
      expect(claim.hydrated()).to.be(true);
    });

    it('returns a valid verification route', function() {
      claim.parse(claimFixtures.valid);
      expect(claim.verificationRoute()).to.be('verify-phone');
    });

  });

});
