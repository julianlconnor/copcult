define([
  'jquery',
  'expect',
  'sinon',
  'q',
  'react',
  'jsx!shared/js/components/facebook/connect'
], function($, expect, sinon, q, React, FacebookConnectView) {

  // TODO: tests for clicking connect/disconnect

  window.FB = {
    getLoginStatus: function() {},
    api: function() {}
  };

  window.fbAsyncInit();

  describe('Facebook connect view', function() {
    var root, fbConnectView, getLoginStatusStub, apiStub, loginStub, logoutStub;

    beforeEach(function() {
      root = document.createElement('div');
      getLoginStatusStub = sinon.stub(window.FB, 'getLoginStatus');
      apiStub = sinon.stub(window.FB, 'api');
    });

    afterEach(function() {
      getLoginStatusStub.restore();
      apiStub.restore();
      React.unmountComponentAtNode(root);
    });

    it('triggers fbNoLogin & displays facebook connect button when user is not logged in', function(done) {
      fbConnectView = React.renderComponent(new FacebookConnectView(), root);

      getLoginStatusStub.callsArgWith(0, {
        status: 'unknown'
      });

      // wrapped to wait for render to update
      setTimeout(function() {
        expect(root.querySelector('.button.facebook')).to.be.ok();
        done();
      });
    });

    it('triggers fbAuthed & fbGotUser and displays current user when user is logged in & authed', function(done) {
      getLoginStatusStub.callsArgWith(0, {
        status: 'connected',
        authResponse: {
          'accessToken': 'asdf'
        }
      });

      apiStub.callsArgWith(1, {
        name: 'Andrew Kortina',
        email: 'kortina@venmo.com'
      });

      var authedStub = sinon.stub();

      fbConnectView = React.renderComponent(new FacebookConnectView({
        onAuthed: authedStub,
        onGotUser: function(response) {
          expect(authedStub.calledOnce).to.be(true);
          expect(root.innerHTML).to.contain('Andrew Kortina');
          done();
        }
      }), root);
    });

  });

});
