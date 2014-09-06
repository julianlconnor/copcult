define([
  'sinon',
  'shared/js/helpers/user_agent',
  'base/test/fixtures/user_agent.js'
], function(sinon, userAgent, userAgentFixtures) {

  describe('User Agent', function() {

    it('returns true for isIos if on ios', function() {
      var stub = sinon.stub(userAgent, 'getUserAgent').returns(userAgentFixtures.ios.toLowerCase());

      expect(userAgent.isIos()).to.be(true);
      stub.restore();
    });

    it('returns true for isAndroid if on android', function() {
      var ua = userAgentFixtures.android.toLowerCase();
      var stub = sinon.stub(userAgent, 'getUserAgent').returns(ua);

      expect(userAgent.isAndroid()).to.be(true);
      stub.restore();
    });

    it('returns true for web if on web', function() {
      var ua = userAgentFixtures.web.toLowerCase();
      var stub = sinon.stub(userAgent, 'getUserAgent').returns(ua);

      expect(userAgent.isWeb()).to.be(true);
      stub.restore();
    });

    it('returns true for isOldIe if on IE < 10, false if not', function() {
      var ua = userAgentFixtures.oldIE.toLowerCase();
      var stub = sinon.stub(userAgent, 'getUserAgent').returns(ua);
      expect(userAgent.isOldIE()).to.be(true);

      stub.restore();
      stub = sinon.stub(userAgent, 'getUserAgent').returns(userAgentFixtures.newIE.toLowerCase());
      expect(userAgent.isOldIE()).to.be(false);
    });

  });

});
